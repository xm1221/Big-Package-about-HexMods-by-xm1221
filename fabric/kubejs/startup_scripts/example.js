// priority: 0

// Visit the wiki for more info - https://kubejs.com/

console.info('Hello, World! (Loaded startup scripts)')


let DEFAULT_MODEL = "deepseek-r1:1.5b";
let OLLAMA_API_URL = "https://fastai.fast/chat/completions";
let MAX_HISTORY_LENGTH = 20;
/**
 * 获取玩家的对话历史，若不存在则初始化
 */
function getPlayerHistory(player) {
    let history = player.persistentData.ai_chat_history;
    if (!history) {
        history = [];
        history.push({
            role: "system",
            content: "你是一个 Minecraft 助手，请用中文回答。回答应当简洁、有帮助。"
        });
        player.persistentData.ai_chat_history = history;
    }
    return history;
}

/**
 * 保存玩家的对话历史，并清理多余字段，限制长度
 */
function savePlayerHistory(player, history) {
    // 限制历史长度：保留系统消息 + 最近的消息
    if (history.length > MAX_HISTORY_LENGTH) {
        let systemMsg = history[0];
        let recentMsgs = history.slice(1 - MAX_HISTORY_LENGTH);
        // 不使用展开运算符，改用 concat
        history = [systemMsg].concat(recentMsgs);
    }
    // 清理每条消息，只保留 role 和 content
    let cleanHistory = [];
    for (let i = 0; i < history.length; i++) {
        let msg = history[i];
        cleanHistory.push({
            role: msg.role,
            content: msg.content
        });
    }
    player.persistentData.ai_chat_history = cleanHistory;
}

/**
 * 向 Ollama 发送聊天请求（异步）
 */
function doChat(player, userMessage, callback) {
    let history = getPlayerHistory(player);
    
    // 添加用户消息
    history.push({ role: "user", content: userMessage });
    
    // 构建干净的消息列表（只含 role, content）
    let cleanMessages = [];
    for (let i = 0; i < history.length; i++) {
        let msg = history[i];
        cleanMessages.push({
            role: msg.role,
            content: msg.content
        });
    }
    
    let requestBody = JSON.stringify({
        model: DEFAULT_MODEL,
        messages: cleanMessages,
        stream: false,
        options: { temperature: 0.7 }
    });
    
    // 调试：打印请求体（可选，生产环境可注释）
    //console.log("Ollama request: " + requestBody);
    
    let uuid = UUID.randomUUID();
    let headers = ["Content-Type", "application/json","Authorization", "sk-1aa1ed5d04a55b5c2e7a68e90ef26dad1f9e9cb618ed1a25322d25bec232b4e4"];
    
    HTTPRequestsHandler.INSTANCE.makeAndQueueRequest(uuid, OLLAMA_API_URL, headers, "POST", requestBody);
    
    let attempts = 0;
    let maxAttempts = 60;   // 15秒超时
    
    function checkResult() {
        let result = HTTPRequestsHandler.INSTANCE.getResponse(uuid);
        if (result !== null) {
            HTTPRequestsHandler.INSTANCE.clearResponse(uuid);
            
            let throwableOpt = result.right();
            if (throwableOpt.isPresent()) {
                callback(throwableOpt.get().toString(), null);
                return;
            }
            
            let responseOpt = result.left();
            if (responseOpt.isPresent()) {
                let response = responseOpt.get();
                let statusCode = response.statusCode();
                let responseBody = response.body();
                
                if (statusCode === 200) {
                    try {
                        console.log(`${responseBody}AAAAAAAAA`)
                        let jsonResponse = JSON.parse(responseBody);
                        console.log(`${jsonResponse}AAAAAAAAA`)
                        let reply = ""
                        if (!reply) {
                            callback("AI 返回内容为空", null);
                            return;
                        }
                        // 将助手回复加入历史
                        history.push({ role: "assistant", content: reply });
                        savePlayerHistory(player, history);
                        callback(null, reply);
                    } catch (e) {
                        callback("解析 JSON 失败: " + e.message, null);
                    }
                } else {
                    callback("HTTP " + statusCode + ": " + responseBody.substring(0, 150), null);
                }
            } else {
                callback("未知错误：没有响应对象", null);
            }
        } else if (++attempts >= maxAttempts) {
            HTTPRequestsHandler.INSTANCE.clearResponse(uuid);
            callback("请求超时，请稍后再试", null);
        } else {
            Utils.server.scheduleInTicks(5, checkResult);
        }
    }
    
    Utils.server.scheduleInTicks(5, checkResult);
}
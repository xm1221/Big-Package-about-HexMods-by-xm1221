// priority: 0

// Visit the wiki for more info - https://kubejs.com/

console.info('Hello, World! (Loaded startup scripts)')

function doBaiduSearch(keyword, callback) {
    const uuid = UUID.randomUUID();
    const url = `https://www.baidu.com/s?wd=${encodeURIComponent(keyword)}`;
    const headers = ["User-Agent", "Mozilla/5.0"];
    
    // 发起请求
    HTTPRequestsHandler.INSTANCE.makeAndQueueRequest(uuid, url, headers, "GET", null);
    
    // 每 5 ticks (0.25秒) 检查一次，最多检查 40 次 (10 秒)
    let attempts = 0;
    
    let interval = () => {
        const result = HTTPRequestsHandler.INSTANCE.getResponse(uuid);
        if (result !== null) {
            //clearInterval(interval);
            HTTPRequestsHandler.INSTANCE.clearResponse(uuid); // 清理
            const throwableOpt = result.right();
            if (throwableOpt.isPresent()) {
                callback(throwableOpt.get().toString(), null);
            } else {
                const responseOpt = result.left();
                if (responseOpt.isPresent()) {
                    const response = responseOpt.get();
                    callback(null, {
                        status: response.statusCode(),
                        body: response.body()
                    });
                } else {
                    callback("Unknown error", null);
                }
            }
        } else if (++attempts >= 40) {
            clearInterval(interval);
            HTTPRequestsHandler.INSTANCE.clearResponse(uuid);
            callback("Request timeout", null);
        }
    }  // 100 毫秒 = 5 ticks
    Utils.server.scheduleInTicks(5,interval)
}


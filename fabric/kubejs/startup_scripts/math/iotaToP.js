    let easyNBTmap = [
        ["hexcasting:","·h"],
        ["level","·l"],
        ["entity","·e"],
        ["list",":、l"],
        ["data","·d"],
        ["type","·t"],
        ["vec3",":·v"],
        ["value","、v"],
        ["data:","、d"],
        ["extra","、e"],
        ["text","、t"],
        ["inline","·i"],
        ["username","·u"],
        ["size","·s"],
        [":","："],
        ["uuid","；u"],
        ["pattern","·p"],

    ]
    easyNBTmap.sort((a, b) => b[0].length - a[0].length);
    let reverseMap = easyNBTmap.map(pair => [pair[1], pair[0]]);
reverseMap.sort((a, b) => b[0].length - a[0].length); // 目标串长的优先
// 五进制映射
const __charMap = { q:0, a:1, w:2, e:3, d:4 };
const __revMap = ['q','a','w','e','d'];

// 数字 → 五进制字符串（动态长度，无前导零）
function __toBase5Dynamic(num) {
    if (num === 0) return 'q';
    let digits = [];
    while (num > 0) {
        digits.push(__revMap[num % 5]);
        num = Math.floor(num / 5);
    }
    return digits.reverse().join('');
}

// 五进制字符串 → 数字
function __fromBase5Dynamic(str) {
    let num = 0;
    for (let i = 0; i < str.length(); i++) {
        let val = __charMap[str.substring(i,i+1)];
        if (val === undefined) throw new Error(`非法五进制字符: ${str[i]}`);
        num = num * 5 + val;
    }
    return num;
}

// 统计字符串中字符频率，返回按频率降序排列的字符数组
function __getCharFrequencySorted(str) {
    let freq = {}
    //console.log(str.length)
    for (let i = 0; i < str.length(); i++) {
        let ch = str.substring(i,i+1)
        //console.log(ch)
        freq[ch]=(ch,(freq[ch] || 0) + 1);
        //console.log(freq)
    }
    //console.log(freq)
   let entries = Object.entries(freq)
    entries.sort((a, b) => b[1]-a[1]);
    //console.log([entries])
    let res =[]
    entries.forEach(element => {
        let e=element[0]
        res.push(e)
    });
  
    return res
}

function __nbtToSNBT(nbt) {
    let str = nbt.toString();
    // 应用替换（长优先）
    for (let pair of easyNBTmap) {
        // 使用正则全局替换，并转义特殊字符（如 : . 等）
        let regex = new RegExp(pair[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        str = str.replace(regex, pair[1]);
    }
    return str;
}

function __snbtToNBT(str) {
    // 反向替换（长优先）
    for (let pair of reverseMap) {
        let regex = new RegExp(pair[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        str = str.replace(regex, pair[1]);
    }
    return TagParser.parseTag(str);
}
/**
 * 压缩 NBT 对象为动态长度编码字符串
 * @param {CompoundTag} nbt - 要压缩的 NBT 对象
 * @returns {string} 压缩后的字符串（仅包含 q,a,w,e,d,s 和版本标识）
 */
global.compressNBT = function(nbt) {
    if (!(nbt instanceof CompoundTag)) {
        throw new Error("compressNBT 需要 CompoundTag 对象");
    }
    let str = __nbtToSNBT(nbt);
    let chars = __getCharFrequencySorted(str);
    //console.log(str)
    //console.log(chars)

    // 构建映射表部分
    let mappingPart = '';
    chars.forEach(ch=>{
        let code = ch.codePointAt(0)

        //console.log(code)
        mappingPart += __toBase5Dynamic(code) + 's';
    })
    //console.log(111,mappingPart)

    // 映射表末尾再加一个 's' 形成 'ss' 分隔
    let mappingWithSep = mappingPart + 's';

    // 构建正文部分
    let charToIdx = {}
    for (let i = 0; i < chars.length; i++) charToIdx[chars[i]]=i
    let bodyPart = '';
    for (let i = 0; i < str.length(); i++) {
        let idx = charToIdx[str.substring(i,i+1)];
        if (idx === undefined) throw new Error(`字符 "${str.substring(i,i+1)}" 未出现在频率统计中`);
        bodyPart += __toBase5Dynamic(idx) + 's';
    }
    //console.log(111,bodyPart)

    // 最终格式：版本 + 's' + 映射表部分(以s结尾) + 正文部分(以s结尾)
    return "dadeds" + mappingWithSep + bodyPart
};

/**
 * 解压缩动态长度编码字符串为 NBT 对象
 * @param {string} compressed - 由 compressNBT 生成的字符串
 * @returns {CompoundTag} 还原的 NBT 对象
 */
global.decompressNBT = function(compressed) {
    // 分割版本
    let firstS = compressed.indexOf('s');
    if (firstS === -1) throw new Error("无效格式：缺少版本分隔符");
    let version = compressed.substring(0, firstS);
    if (version !== "daded") throw new Error(`不支持的版本: ${version}`);
    let rest = compressed.substring(firstS+1);

    // 查找 "ss" 分隔映射表和正文
    let sepIndex = rest.indexOf("ss");
    if (sepIndex === -1) throw new Error("无效格式：缺少 'ss' 分隔符");
    let mappingWithSep = rest.substring(0, sepIndex + 1); // 包含末尾的s
    let bodyPart = rest.substring(sepIndex + 2);
    //console.log(`${mappingWithSep},121,${bodyPart}`)
    // 解析映射表
    if (!mappingWithSep.endsWith('s')) throw new Error("映射表格式错误");
    let mappingTokens = mappingWithSep.split('s');
    let chars = [];
    mappingTokens.forEach(token=> {
        //if (token === "") continue;
        //console.log(token)
        let code = __fromBase5Dynamic(token);
        //console.log(code)
        chars.push(String.fromCharCode(code));
        //console.log(chars)
    })

    // 解析正文
    let bodyTokens = bodyPart.split('s');
    let resultStr = '';
    for (let token of bodyTokens) {
        if (token === "") continue;
        let idx = __fromBase5Dynamic(token);
        if (idx < 0 || idx >= chars.length) throw new Error(`索引 ${idx} 超出字符列表范围`);
        resultStr += chars[idx];
    }

    // 还原为 NBT
    return __snbtToNBT(resultStr);
};

// 可选：测试函数（可注释）
// let testNbt = new CompoundTag();
// testNbt.putString("hello", "world");
// let compressed = global.compressNBT(testNbt);
// console.log(compressed);
// let decompressed = global.decompressNBT(compressed);
// console.log(decompressed.getString("hello"));

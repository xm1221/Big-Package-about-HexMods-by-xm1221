

const charMap = { 'q': 0, 'a': 1, 'w': 2, 'e': 3, 'd': 4 };
const revMap = ['q', 'a', 'w', 'e', 'd'];

// 9 位五进制可覆盖 0 ~ 5^9-1 = 1953124 > 1114111，满足所有 Unicode 字符
const DIGITS = 9;
const MAX_CODE = Math.pow(5, DIGITS) - 1;

function toBase5(num, minDigits) {
    if (num === 0) return revMap[0];
    let digits = [];
    while (num > 0) {
        digits.push(revMap[num % 5]);
        num = Math.floor(num / 5);
    }
    let result = digits.reverse().join('');
    while (result.length < minDigits) result = revMap[0] + result;
    return result;
}

function fromBase5(str) {
    let num = 0;
    let len 
    if(typeof str == "string"){
          len = str.length
        }
        else{
          len = str.length()
        }
    for (let i = 0; i < len; i++) {
        let ch = str.substring(i, i+1);
        let val = charMap[ch];
        if (val === undefined) {
            throw new Error(`无效的图案字符 "${ch}" 在位置 ${i}，只允许 q,a,w,e,d`);
        }
        num = num * 5 + val;
    }
    return num;
}

function textToPatternStr(text) {
    let result = '';
    for (let ch of text) {
        let code = ch.codePointAt(0);
        if (code > MAX_CODE) {
            throw new Error(`字符超出编码范围: ${ch} (码点 ${code})，最大支持 ${MAX_CODE}`);
        }
        result += toBase5(code, DIGITS);
    }
    return result;
}

/**
 * 将码点转换为 UTF-16 字符串（兼容 Rhino，支持所有 Unicode）
 * @param {number} codePoint
 * @returns {string}
 */
function codePointToUTF16(codePoint) {
    if (codePoint <= 0xFFFF) {
        return String.fromCharCode(codePoint);
    }
    // 将码点转换为代理对
    codePoint -= 0x10000;
    let high = 0xD800 + (codePoint >> 10);
    let low = 0xDC00 + (codePoint & 0x3FF);
    return String.fromCharCode(high, low);
}

function patternStrToText(patternStr) {
        let len
        if(typeof patternStr == "string"){
          len = patternStr.length
        }
        else{
          len = patternStr.length()
        }
        if (len % DIGITS !== 0) {
        let pat = new HexPattern.fromAnglesUnchecked(patternStr,HexDir.NORTH_EAST)
        let iota = new PatternIota(pat)
        throw new MishapInvalidIota(iota,0,`笔顺长度为 ${DIGITS} 的倍数的图案`);
    }
    let result = '';
    for (let i = 0; i < len; i += DIGITS) {
        let chunk = patternStr.substring(i, i + DIGITS);
        let code = fromBase5(chunk);
        result += codePointToUTF16(code);
    }
    return result;
}

function PatToElse(sign,level){

    let nbt = global.decompressNBT(sign)
        nbt = TagParser.parseTag(nbt);
        let iota = deserializeIota(nbt,level)
        return iota
        
}

function IotaToPat(iota){
    if(iota instanceof ListIota){
        let list = iota.list
        let str =""
       list.forEach(e=>{
         if(!(e instanceof PatternIota)){
            e =IotaToPat(e)
            let sign = e.pattern.anglesSignature()
            let esign = sign+"ss"
            str = str+ esign
         }
         else{
         let sign = e.pattern.anglesSignature()
         str = str+ sign +"sss"
         }
       })
       let pat = HexPattern.fromAnglesUnchecked(str,HexDir.NORTH_EAST)
       iota = new PatternIota(pat)
       return iota
     
      }
      if(iota instanceof PatternIota){
        return iota
      }
      let tag = serializeIota(iota)
      let sign = global.compressNBT(tag)
      let pat = new HexPattern.fromAnglesUnchecked(sign,HexDir.EAST)
      let patiota = new PatternIota(pat)
      return patiota
}


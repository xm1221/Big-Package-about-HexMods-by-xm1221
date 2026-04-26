//util
function toStandardGalactic(text) {
    // 字符映射表（根据 Minecraft 附魔台实际显示整理）
    let sgaMap = {
        'A': 'ꓯ', 'B': '𐊡', 'C': 'Ↄ', 'D': '◖', 'E': 'Ǝ', 'F': 'Ⅎ',
        'G': '⅁', 'H': 'H', 'I': 'I', 'J': 'ſ', 'K': '⋊', 'L': '⅂',
        'M': 'W', 'N': 'N', 'O': 'O', 'P': 'Ԁ', 'Q': 'Ό', 'R': 'ᴚ',
        'S': 'S', 'T': '⊥', 'U': '∩', 'V': 'ʌ', 'W': 'M', 'X': 'X',
        'Y': '⅄', 'Z': 'Z',
        'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ',
        'g': 'ƃ', 'h': 'ɥ', 'i': 'ı', 'j': 'ɾ', 'k': 'ʞ', 'l': 'ʃ',
        'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ',
        's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x',
        'y': 'ʎ', 'z': 'z',
        "1":"I","2":"II","3":"III"
    };
    
    return text.split('').map(ch => sgaMap[ch] || ch).join('');
}

// 监听 tooltip_append 事件
ArchEvents.handleClient('tooltip_append', proxyEvent => {
    // 获取参数：ItemStack, List<Component>, TooltipFlag
    let itemStack = proxyEvent.getArg(0);
    let lines = proxyEvent.getArg(1);   // 这是一个 Java List，可以添加 Component
    //let flag = proxyEvent.getArg(2);
    let nbt = itemStack.nbt
    if(!nbt)return
    if(nbt.getBoolean("hide")!=true)return
    if((nbt.get("data")&&nbt.get("data")["hexcasting:data"])||nbt.get("iota")){
    // 添加自定义提示行
    lines.pop()
    let text = Text.literal(`该文本已被隐藏`).obfuscated(true)
    lines.add(text)
}
    else if (nbt.get("pages")){
    lines.pop()
    let text = Text.literal(`该文本已被隐藏`).obfuscated(true)
    lines.add(text)
    }
});



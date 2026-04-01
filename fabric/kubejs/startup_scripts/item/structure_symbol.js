// priority: 5
let configPath = 'kubejs/config/structures.json';

// 读取配置文件，如果不存在或格式错误则创建默认映射
let structuresMap = JsonIO.read(configPath);
if (!structuresMap || typeof structuresMap !== 'object' || Array.isArray(structuresMap)) {
    console.log('[结构精魄] 配置文件不存在或格式错误，正在创建默认映射...');
    structuresMap = {
        // 原版结构
        "minecraft:village_plains": 0xFF8B9A6E,
        "minecraft:village_desert": 0xFFEDC9AF,
        "minecraft:village_savanna": 0xFFC19A6B,
        "minecraft:village_taiga": 0xFF3A6B4A,
        "minecraft:stronghold": 0xFF4A4A4A,
        "minecraft:ancient_city": 0xFF2F4F4F,
        "minecraft:trail_ruins": 0xFFA67B5B,
        "minecraft:jungle_pyramid": 0xFF4A8B4A,
        "minecraft:desert_pyramid": 0xFFC19A6B,
        "minecraft:igloo": 0xFFF0F8FF,
        "minecraft:swamp_hut": 0xFF4F6644,
        "minecraft:pillager_outpost": 0xFF8B5A2B,
        "minecraft:shipwreck": 0xFF8B4513,
        "minecraft:ocean_ruin": 0xFF4682B4,
        "minecraft:bastion_remnant": 0xFF8B0000,
        "minecraft:fortress": 0xFF8B0000,
        "minecraft:end_city": 0xFFDAA520,
        // 自定义结构（添加以下五个）
        "miehex:abadoned_greatwork": 0xFF5A4A3A,      
        "miehex:ruined_circle_overworld": 0xFF6B8E23, 
        "miehex:ruined_circle_nether": 0xFF8B4513,    
        "miehex:ruined_circle_shulk": 0xFF2F4F4F,            
        "miehex:tower": 0xFFA0522D                     
    };
    JsonIO.write(configPath, structuresMap);
    console.log(`[结构精魄] 默认配置文件已写入: ${configPath}`);
    
    // 验证写入是否成功
    let check = JsonIO.read(configPath);
    if (check && typeof check === 'object' && !Array.isArray(check)) {
        console.log(`[结构精魄] 配置文件验证成功，包含 ${Object.keys(check).length} 个条目`);
    } else {
        console.log(`[结构精魄] 警告：配置文件写入失败，请检查路径和权限`);
    }
}

StartupEvents.registry('item', event => {
    let finalMap = JsonIO.read(configPath);
    if (!finalMap || typeof finalMap !== 'object' || Array.isArray(finalMap)) {
        console.log('[结构精魄] 无法读取有效的配置文件，物品注册中止');
        return;
    }

    let entries = Object.entries(finalMap);
    entries.forEach(([structureId, colorValue]) => {
        

        let alpha = (colorValue >> 24) & 0xFF;
        let red = (colorValue >> 16) & 0xFF;
        let green = (colorValue>> 8) & 0xFF;
        let blue = colorValue & 0xFF;

        let itemIdPart = structureId.replace(':', '_');
        let itemId = `miehex:${itemIdPart}_structure_symbol`;

        event.create(itemId)
            .texture('miehex:item/structure_symbol')
            .color(0, (itemstack, index) => Color.rgba(red, green, blue, alpha))
            .tag('structure_symbol')
            .maxStackSize(16)
            .glow(true)
    });

    console.log(`[结构精魄] 已注册 ${entries.length} 个带颜色的结构精魄`);
});
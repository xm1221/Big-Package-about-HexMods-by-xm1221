// priority: 10
let Path = 'kubejs/config/biomes.json';

// 读取配置文件，如果不存在或格式错误则创建示例配置
let biomeMap = JsonIO.read(Path);
if (!biomeMap || typeof biomeMap !== 'object' || Array.isArray(biomeMap)) {
    console.log('[群系精魄] 配置文件不存在或格式错误，正在创建示例配置...');
    // 默认配置
    biomeMap = {
        
  "minecraft:plains": 0xFF8B9A6E,
  "minecraft:sunflower_plains": 0xFFE5D45E,
  "minecraft:snowy_plains": 0xFFF0F8FF,
  "minecraft:ice_spikes": 0xFFADD8E6,
  "minecraft:desert": 0xFFEDC9AF,
  "minecraft:swamp": 0xFF4F6644,
  "minecraft:mangrove_swamp": 0xFF8B5A2B,
  "minecraft:forest": 0xFF2E8B57,
  "minecraft:flower_forest": 0xFFFFB6C1,
  "minecraft:birch_forest": 0xFFD2B48C,
  "minecraft:dark_forest": 0xFF1A3A1A,
  "minecraft:old_growth_birch_forest": 0xFFA89070,
  "minecraft:taiga": 0xFF3A6B4A,
  "minecraft:snowy_taiga": 0xFFB0E0E6,
  "minecraft:old_growth_pine_taiga": 0xFF4A6B4A,
  "minecraft:old_growth_spruce_taiga": 0xFF2A4B2A,
  "minecraft:savanna": 0xFFC19A6B,
  "minecraft:savanna_plateau": 0xFFA67B5B,
  "minecraft:windswept_savanna": 0xFF8B5A2B,
  "minecraft:jungle": 0xFF4A8B4A,
  "minecraft:sparse_jungle": 0xFF6A9B6A,
  "minecraft:bamboo_jungle": 0xFF6B8E23,
  "minecraft:badlands": 0xFFB87333,
  "minecraft:wooded_badlands": 0xFF9A7B4A,
  "minecraft:eroded_badlands": 0xFF8B5A2B,
  "minecraft:mushroom_fields": 0xFFA0522D,
  "minecraft:windswept_hills": 0xFF708090,
  "minecraft:windswept_forest": 0xFF567856,
  "minecraft:windswept_gravelly_hills": 0xFF696969,
  "minecraft:meadow": 0xFF96C8A2,
  "minecraft:grove": 0xFFD2E8D2,
  "minecraft:snowy_slopes": 0xFFE8F0F8,
  "minecraft:jagged_peaks": 0xFFA9A9A9,
  "minecraft:frozen_peaks": 0xFFE0F0FF,
  "minecraft:stony_peaks": 0xFF808080,
  "minecraft:ocean": 0xFF1E90FF,
  "minecraft:deep_ocean": 0xFF00008B,
  "minecraft:warm_ocean": 0xFF48D1CC,
  "minecraft:lukewarm_ocean": 0xFF20B2AA,
  "minecraft:deep_lukewarm_ocean": 0xFF1E7A7A,
  "minecraft:cold_ocean": 0xFF4682B4,
  "minecraft:deep_cold_ocean": 0xFF2F4F4F,
  "minecraft:frozen_ocean": 0xFFB0E2FF,
  "minecraft:deep_frozen_ocean": 0xFF8CB4D8,
  "minecraft:river": 0xFF3366CC,
  "minecraft:frozen_river": 0xFFA0D0FF,
  "minecraft:beach": 0xFFFFFACD,
  "minecraft:snowy_beach": 0xFFFAF0E6,
  "minecraft:stony_shore": 0xFFA9A9A9,
  "minecraft:lush_caves": 0xFF9BCD9B,
  "minecraft:dripstone_caves": 0xFFCD853F,
  "minecraft:deep_dark": 0xFF2F4F4F,
  "minecraft:nether_wastes": 0xFF8B0000,
  "minecraft:warped_forest": 0xFF20B2AA,
  "minecraft:crimson_forest": 0xFFDC143C,
  "minecraft:soul_sand_valley": 0xFF708090,
  "minecraft:basalt_deltas": 0xFF4A4A4A,
  "minecraft:the_end": 0xFFDAA520,
  "minecraft:end_highlands": 0xFF9ACD32,
  "minecraft:end_midlands": 0xFF8FBC8F,
  "minecraft:end_barrens": 0xFF808080,
  "minecraft:small_end_islands": 0xFFB0C4DE,
  "minecraft:cherry_grove": 0xFFFFAEB9,
  "minecraft:the_void": 0xFFF0F8FF

 

    };
    JsonIO.write(Path, biomeMap);
    console.log(`[群系精魄] 示例配置文件已写入: ${Path}`);

    let check = JsonIO.read(Path);
    if (check && typeof check === 'object' && !Array.isArray(check)) {
        console.log(`[群系精魄] 配置文件验证成功，请根据需要编辑 ${Path} 添加更多群系`);
    } else {
        console.log(`[群系精魄] 警告：配置文件写入失败，请检查路径和权限`);
    }
}

StartupEvents.registry('item', event => {
    let finalMap = JsonIO.read(Path);
    if (!finalMap || typeof finalMap !== 'object' || Array.isArray(finalMap)) {
        console.log('[群系精魄] 无法读取有效的配置文件，物品注册中止');
        return;
    }

    // 更新全局映射，供其他图案使用
    global.biomeMapping = {};

    Object.entries(finalMap).forEach(([fullId, colorValue]) => {
        // 确保颜色值为数字
        let colorInt = colorValue
        // 直接提取 RGBA 分量
        let alpha = (colorInt >> 24) & 0xFF;
        let red = (colorInt >> 16) & 0xFF;
        let green = (colorInt >> 8) & 0xFF;
        let blue = colorInt & 0xFF;

        let path = fullId.split(':')[1];
        let itemId = `miehex:${path}_symbol`;

        event.create(itemId)
            .texture('miehex:item/symbol')
            .color(0, (itemstack, index) => Color.rgba(red, green, blue, alpha))
            .tag('biome_symbols')
            .maxStackSize(64);

        global.biomeMapping[itemId] = fullId;
    });

    console.log(`[群系精魄] 已注册 ${Object.keys(finalMap).length} 个群系精魄`);
});
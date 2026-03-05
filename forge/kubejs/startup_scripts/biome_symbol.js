// kubejs/startup_scripts/biome_symbols.js
// priority: 10
const biomeColors = {
    // 主世界基础
    "plains": 0xFF8B9A6E,         // 草绿色
    "sunflower_plains": 0xFFE5D45E, // 向日葵黄
    "snowy_plains": 0xFFF0F8FF,   // 雪白
    "ice_spikes": 0xFFADD8E6,     // 淡蓝
    "desert": 0xFFEDC9AF,         // 沙漠黄
    "swamp": 0xFF4F6644,          // 沼泽绿
    "mangrove_swamp": 0xFF8B5A2B, // 红褐
    "forest": 0xFF2E8B57,         // 森林绿
    "flower_forest": 0xFFFFB6C1,  // 花粉色
    "birch_forest": 0xFFD2B48C,   // 桦木棕
    "dark_forest": 0xFF1A3A1A,    // 深绿
    "old_growth_birch_forest": 0xFFA89070,
    "taiga": 0xFF3A6B4A,          // 针叶绿
    "snowy_taiga": 0xFFB0E0E6,
    "old_growth_pine_taiga": 0xFF4A6B4A,
    "old_growth_spruce_taiga": 0xFF2A4B2A,
    "savanna": 0xFFC19A6B,        // 热带草原棕
    "savanna_plateau": 0xFFA67B5B,
    "windswept_savanna": 0xFF8B5A2B,
    "jungle": 0xFF4A8B4A,         // 丛林绿
    "sparse_jungle": 0xFF6A9B6A,
    "bamboo_jungle": 0xFF6B8E23,  // 竹绿
    "badlands": 0xFFB87333,       // 恶地红铜
    "wooded_badlands": 0xFF9A7B4A,
    "eroded_badlands": 0xFF8B5A2B,
    "mushroom_fields": 0xFFA0522D, // 蘑菇棕
    // 山峰类
    "windswept_hills": 0xFF708090,
    "windswept_forest": 0xFF567856,
    "windswept_gravelly_hills": 0xFF696969,
    "meadow": 0xFF96C8A2,         // 草甸绿
    "grove": 0xFFD2E8D2,
    "snowy_slopes": 0xFFE8F0F8,
    "jagged_peaks": 0xFFA9A9A9,
    "frozen_peaks": 0xFFE0F0FF,
    "stony_peaks": 0xFF808080,
    // 海洋类
    "ocean": 0xFF1E90FF,          // 道奇蓝
    "deep_ocean": 0xFF00008B,     // 深蓝
    "warm_ocean": 0xFF48D1CC,     // 青绿
    "lukewarm_ocean": 0xFF20B2AA,
    "deep_lukewarm_ocean": 0xFF1E7A7A,
    "cold_ocean": 0xFF4682B4,     // 钢蓝
    "deep_cold_ocean": 0xFF2F4F4F,
    "frozen_ocean": 0xFFB0E2FF,
    "deep_frozen_ocean": 0xFF8CB4D8,
    "river": 0xFF3366CC,
    "frozen_river": 0xFFA0D0FF,
    "beach": 0xFFFFFACD,          // 柠檬黄
    "snowy_beach": 0xFFFAF0E6,
    "stony_shore": 0xFFA9A9A9,
    // 洞穴类
    "lush_caves": 0xFF9BCD9B,
    "dripstone_caves": 0xFFCD853F,
    "deep_dark": 0xFF2F4F4F,
    // 下界
    "nether_wastes": 0xFF8B0000,  // 暗红
    "warped_forest": 0xFF20B2AA,
    "crimson_forest": 0xFFDC143C,
    "soul_sand_valley": 0xFF708090,
    "basalt_deltas": 0xFF4A4A4A,
    // 末地
    "the_end": 0xFFDAA520,
    "end_highlands": 0xFF9ACD32,
    "end_midlands": 0xFF8FBC8F,
    "end_barrens": 0xFF808080,
    "small_end_islands": 0xFFB0C4DE,
    // 新增
    "cherry_grove": 0xFFFFAEB9,   // 樱花粉
    "the_void": 0xFFF0F8FF
};

// 所有需要注册的群系 ID（与之前相同）
const biomeIds = [
    "minecraft:plains",
    "minecraft:sunflower_plains",
    "minecraft:snowy_plains",
    "minecraft:ice_spikes",
    "minecraft:desert",
    "minecraft:swamp",
    "minecraft:mangrove_swamp",
    "minecraft:forest",
    "minecraft:flower_forest",
    "minecraft:birch_forest",
    "minecraft:dark_forest",
    "minecraft:old_growth_birch_forest",
    "minecraft:taiga",
    "minecraft:snowy_taiga",
    "minecraft:old_growth_pine_taiga",
    "minecraft:old_growth_spruce_taiga",
    "minecraft:savanna",
    "minecraft:savanna_plateau",
    "minecraft:windswept_savanna",
    "minecraft:jungle",
    "minecraft:sparse_jungle",
    "minecraft:bamboo_jungle",
    "minecraft:badlands",
    "minecraft:wooded_badlands",
    "minecraft:eroded_badlands",
    "minecraft:mushroom_fields",
    "minecraft:windswept_hills",
    "minecraft:windswept_forest",
    "minecraft:windswept_gravelly_hills",
    "minecraft:meadow",
    "minecraft:grove",
    "minecraft:snowy_slopes",
    "minecraft:jagged_peaks",
    "minecraft:frozen_peaks",
    "minecraft:stony_peaks",
    "minecraft:ocean",
    "minecraft:deep_ocean",
    "minecraft:warm_ocean",
    "minecraft:lukewarm_ocean",
    "minecraft:deep_lukewarm_ocean",
    "minecraft:cold_ocean",
    "minecraft:deep_cold_ocean",
    "minecraft:frozen_ocean",
    "minecraft:deep_frozen_ocean",
    "minecraft:river",
    "minecraft:frozen_river",
    "minecraft:beach",
    "minecraft:snowy_beach",
    "minecraft:stony_shore",
    "minecraft:lush_caves",
    "minecraft:dripstone_caves",
    "minecraft:deep_dark",
    "minecraft:nether_wastes",
    "minecraft:warped_forest",
    "minecraft:crimson_forest",
    "minecraft:soul_sand_valley",
    "minecraft:basalt_deltas",
    "minecraft:the_end",
    "minecraft:end_highlands",
    "minecraft:end_midlands",
    "minecraft:end_barrens",
    "minecraft:small_end_islands",
    "minecraft:cherry_grove",
    "minecraft:the_void"
];

// 注册物品
StartupEvents.registry('item', event => {
    biomeIds.forEach(fullId => {
        let path = fullId.split(':')[1];
        let itemId = `miehex:${path}_symbol`;
        let colorValue = biomeColors[path] || 0xFFFFFFFF; // ARGB格式

        // 从ARGB提取RGBA分量
        let alpha = (colorValue >> 24) & 0xFF;
        let red = (colorValue >> 16) & 0xFF;
        let green = (colorValue >> 8) & 0xFF;
        let blue = colorValue & 0xFF;

        event.create(itemId)
            .texture('miehex:item/symbol')
            .color(0, (itemstack, index) => Color.rgba(red, green, blue, alpha))
            .tag('biome_symbols')
            .maxStackSize(64);

        if (!global.biomeMapping) global.biomeMapping = {};
        global.biomeMapping[itemId] = fullId;
    });
});
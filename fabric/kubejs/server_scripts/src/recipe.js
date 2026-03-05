ServerEvents.recipes(event =>{
    event.shapeless(Item.of('hexcasting:amethyst_dust',5),['minecraft:amethyst_shard'])
    event.smoking(Item.of('minecraft:leather',1),['minecraft:rotten_flesh'])
    event.shapeless(Item.of('ftbquests:book', "{RepairCost:0,display:{Name:'{\"text\":\"你的咒法学研究笔记\"}'}}"),['minecraft:dirt'])
    
    event.remove({id:'ftbquests:book'})
    event.remove({id:'hierophantics:flay_bed'})

    })

ServerEvents.recipes(event =>{
  
    event.remove({input:'minecraft:stick',output:Item.of('hexchanting:amethyst_sword', '{Damage:0}')})
    event.remove({input:'minecraft:stick',output:Item.of('hexchanting:amethyst_axe', '{Damage:0}')})
    event.remove({input:'minecraft:stick',output:Item.of('hexchanting:amethyst_pickaxe', '{Damage:0}')})
    event.remove({input:'minecraft:stick',output:Item.of('hexchanting:amethyst_hoe', '{Damage:0}')})
    event.remove({input:'minecraft:stick',output:Item.of('hexchanting:amethyst_shovel', '{Damage:0}')})
    event.remove({input:'hexcasting:charged_amethyst',output:'#minecraft:trimmable_armor'})

    event.smithing('hexchanting:amethyst_sword','hexcasting:artifact','minecraft:diamond_sword','hexcasting:charged_amethyst')
    event.smithing('hexchanting:amethyst_axe','hexcasting:artifact','minecraft:diamond_axe','hexcasting:charged_amethyst')
    event.smithing('hexchanting:amethyst_pickaxe','hexcasting:artifact','minecraft:diamond_pickaxe','hexcasting:charged_amethyst')
    event.smithing('hexchanting:amethyst_shovel','hexcasting:artifact','minecraft:diamond_shovel','hexcasting:charged_amethyst')
    event.smithing('hexchanting:amethyst_hoe','hexcasting:artifact','minecraft:diamond_hoe','hexcasting:charged_amethyst')
    event.smithing('hierophantics:flay_bed','minecraft:end_crystal','#minecraft:beds','hexcasting:quenched_allay_shard')
    
    
    
})
ServerEvents.recipes(event=>{
    
        event.shapeless('minecraft:experience_bottle',['minecraft:gunpowder','#forge:potions','minecraft:sculk'
            ,'minecraft:sculk','minecraft:sculk','minecraft:sculk'
            ,'minecraft:sculk','minecraft:sculk','minecraft:sculk'
        ])
        
    
})
//粹灵裂痕,理念入口
ServerEvents.recipes(e=>{

    e.shaped('miehex:ideas_world_entry',[
        ["hexcasting:quenched_allay_shard","miehex:pure_allay_shard","hexcasting:quenched_allay_shard"],
        ["miehex:pure_allay_shard","#minecraft:biome_symbols","miehex:pure_allay_shard"],
        ["hexcasting:quenched_allay_shard","miehex:pure_allay_shard","hexcasting:quenched_allay_shard"]
    ]).id("miehex:entry")
})

//结构精魄
ServerEvents.recipes(e=>{
    const symbols = {
  "minecraft:village_plains": "miehex:minecraft_village_plains_structure_symbol",
  "minecraft:village_desert": "miehex:minecraft_village_desert_structure_symbol",
  "minecraft:village_savanna": "miehex:minecraft_village_savanna_structure_symbol",
  "minecraft:village_taiga": "miehex:minecraft_village_taiga_structure_symbol",
  "minecraft:stronghold": "miehex:minecraft_stronghold_structure_symbol",
  "minecraft:ancient_city": "miehex:minecraft_ancient_city_structure_symbol",
  "minecraft:trail_ruins": "miehex:minecraft_trail_ruins_structure_symbol",
  "minecraft:jungle_pyramid": "miehex:minecraft_jungle_pyramid_structure_symbol",
  "minecraft:desert_pyramid": "miehex:minecraft_desert_pyramid_structure_symbol",
  "minecraft:igloo": "miehex:minecraft_igloo_structure_symbol",
  "minecraft:swamp_hut": "miehex:minecraft_swamp_hut_structure_symbol",
  "minecraft:pillager_outpost": "miehex:minecraft_pillager_outpost_structure_symbol",
  "minecraft:shipwreck": "miehex:minecraft_shipwreck_structure_symbol",
  "minecraft:ocean_ruin": "miehex:minecraft_ocean_ruin_structure_symbol",
  "minecraft:bastion_remnant": "miehex:minecraft_bastion_remnant_structure_symbol",
  "minecraft:fortress": "miehex:minecraft_fortress_structure_symbol",
  "minecraft:end_city": "miehex:minecraft_end_city_structure_symbol",
  "miehex:abadoned_greatwork": "miehex:miehex_abadoned_greatwork_structure_symbol",
  "miehex:ruined_circle_overworld": "miehex:miehex_ruined_circle_overworld_structure_symbol",
  "miehex:ruined_circle_nether": "miehex:miehex_ruined_circle_nether_structure_symbol",
  "miehex:ruined_circle_shulk": "miehex:miehex_ruined_circle_shulk_structure_symbol",
  "miehex:tower": "miehex:miehex_tower_structure_symbol",
  "minecraft:plains": "miehex:plains_symbol",
  "minecraft:sunflower_plains": "miehex:sunflower_plains_symbol",
  "minecraft:snowy_plains": "miehex:snowy_plains_symbol",
  "minecraft:ice_spikes": "miehex:ice_spikes_symbol",
  "minecraft:desert": "miehex:desert_symbol",
  "minecraft:swamp": "miehex:swamp_symbol",
  "minecraft:mangrove_swamp": "miehex:mangrove_swamp_symbol",
  "minecraft:forest": "miehex:forest_symbol",
  "minecraft:flower_forest": "miehex:flower_forest_symbol",
  "minecraft:birch_forest": "miehex:birch_forest_symbol",
  "minecraft:dark_forest": "miehex:dark_forest_symbol",
  "minecraft:old_growth_birch_forest": "miehex:old_growth_birch_forest_symbol",
  "minecraft:taiga": "miehex:taiga_symbol",
  "minecraft:snowy_taiga": "miehex:snowy_taiga_symbol",
  "minecraft:old_growth_pine_taiga": "miehex:old_growth_pine_taiga_symbol",
  "minecraft:old_growth_spruce_taiga": "miehex:old_growth_spruce_taiga_symbol",
  "minecraft:savanna": "miehex:savanna_symbol",
  "minecraft:savanna_plateau": "miehex:savanna_plateau_symbol",
  "minecraft:windswept_savanna": "miehex:windswept_savanna_symbol",
  "minecraft:jungle": "miehex:jungle_symbol",
  "minecraft:sparse_jungle": "miehex:sparse_jungle_symbol",
  "minecraft:bamboo_jungle": "miehex:bamboo_jungle_symbol",
  "minecraft:badlands": "miehex:badlands_symbol",
  "minecraft:wooded_badlands": "miehex:wooded_badlands_symbol",
  "minecraft:eroded_badlands": "miehex:eroded_badlands_symbol",
  "minecraft:mushroom_fields": "miehex:mushroom_fields_symbol",
  "minecraft:windswept_hills": "miehex:windswept_hills_symbol",
  "minecraft:windswept_forest": "miehex:windswept_forest_symbol",
  "minecraft:windswept_gravelly_hills": "miehex:windswept_gravelly_hills_symbol",
  "minecraft:meadow": "miehex:meadow_symbol",
  "minecraft:grove": "miehex:grove_symbol",
  "minecraft:snowy_slopes": "miehex:snowy_slopes_symbol",
  "minecraft:jagged_peaks": "miehex:jagged_peaks_symbol",
  "minecraft:frozen_peaks": "miehex:frozen_peaks_symbol",
  "minecraft:stony_peaks": "miehex:stony_peaks_symbol",
  "minecraft:ocean": "miehex:ocean_symbol",
  "minecraft:deep_ocean": "miehex:deep_ocean_symbol",
  "minecraft:warm_ocean": "miehex:warm_ocean_symbol",
  "minecraft:lukewarm_ocean": "miehex:lukewarm_ocean_symbol",
  "minecraft:deep_lukewarm_ocean": "miehex:deep_lukewarm_ocean_symbol",
  "minecraft:cold_ocean": "miehex:cold_ocean_symbol",
  "minecraft:deep_cold_ocean": "miehex:deep_cold_ocean_symbol",
  "minecraft:frozen_ocean": "miehex:frozen_ocean_symbol",
  "minecraft:deep_frozen_ocean": "miehex:deep_frozen_ocean_symbol",
  "minecraft:river": "miehex:river_symbol",
  "minecraft:frozen_river": "miehex:frozen_river_symbol",
  "minecraft:beach": "miehex:beach_symbol",
  "minecraft:snowy_beach": "miehex:snowy_beach_symbol",
  "minecraft:stony_shore": "miehex:stony_shore_symbol",
  "minecraft:lush_caves": "miehex:lush_caves_symbol",
  "minecraft:dripstone_caves": "miehex:dripstone_caves_symbol",
  "minecraft:deep_dark": "miehex:deep_dark_symbol",
  "minecraft:nether_wastes": "miehex:nether_wastes_symbol",
  "minecraft:warped_forest": "miehex:warped_forest_symbol",
  "minecraft:crimson_forest": "miehex:crimson_forest_symbol",
  "minecraft:soul_sand_valley": "miehex:soul_sand_valley_symbol",
  "minecraft:basalt_deltas": "miehex:basalt_deltas_symbol",
  "minecraft:the_end": "miehex:the_end_symbol",
  "minecraft:end_highlands": "miehex:end_highlands_symbol",
  "minecraft:end_midlands": "miehex:end_midlands_symbol",
  "minecraft:end_barrens": "miehex:end_barrens_symbol",
  "minecraft:small_end_islands": "miehex:small_end_islands_symbol",
  "minecraft:cherry_grove": "miehex:cherry_grove_symbol",
  "minecraft:the_void": "miehex:the_void_symbol"

}

  let crafter = [
    // 村庄结构
    ["minecraft:village_plains", "minecraft:oak_log", "minecraft:cobblestone", "minecraft:plains"],
    ["minecraft:village_desert", "minecraft:acacia_log", "minecraft:sandstone", "minecraft:desert"],
    ["minecraft:village_savanna", "minecraft:acacia_log", "minecraft:cobblestone", "minecraft:savanna"],
    ["minecraft:village_taiga", "minecraft:spruce_log", "minecraft:cobblestone", "minecraft:taiga"],

    // 其他原版结构
    ["minecraft:stronghold", "minecraft:stone_bricks", "minecraft:ender_pearl", "minecraft:plains"],
    ["minecraft:ancient_city", "minecraft:deepslate", "minecraft:echo_shard", "minecraft:deep_dark"],
    ["minecraft:trail_ruins", "minecraft:terracotta", "minecraft:sand", "minecraft:jungle"],
    ["minecraft:jungle_pyramid", "minecraft:mossy_cobblestone", "minecraft:vine", "minecraft:jungle"],
    ["minecraft:desert_pyramid", "minecraft:sandstone", "minecraft:sand", "minecraft:desert"],
    ["minecraft:igloo", "minecraft:snow_block", "minecraft:ice", "minecraft:snowy_plains"],
    ["minecraft:swamp_hut", "minecraft:oak_log", "minecraft:brown_mushroom", "minecraft:swamp"],
    ["minecraft:pillager_outpost", "minecraft:spruce_log", "minecraft:iron_ingot", "minecraft:plains"],
    ["minecraft:shipwreck", "minecraft:oak_log", "minecraft:iron_ingot", "minecraft:ocean"],
    ["minecraft:ocean_ruin", "minecraft:stone_bricks", "minecraft:prismarine", "minecraft:ocean"],
    ["minecraft:bastion_remnant", "minecraft:blackstone", "minecraft:gold_ingot", "minecraft:nether_wastes"],
    ["minecraft:fortress", "minecraft:nether_bricks", "minecraft:blaze_rod", "minecraft:nether_wastes"],
    ["minecraft:end_city", "minecraft:purpur_block", "minecraft:shulker_shell", "minecraft:the_end"],

    // 自定义结构
    ["miehex:abadoned_greatwork", 'hexcasting:edified_log', 'hexcasting:slate_block', "minecraft:nether_wastes"],
    ["miehex:ruined_circle_overworld", "minecraft:stone_bricks", 'hexcasting:slate_block', "minecraft:plains"],
    ["miehex:ruined_circle_nether",'hexcasting:slate_block', "minecraft:soul_sand", "minecraft:nether_wastes"],
    ["miehex:ruined_circle_shulk", 'hexcasting:slate', "minecraft:sculk", "minecraft:deep_dark"],
    ["miehex:tower", "minecraft:stone_bricks", 'hexcasting:slate_block', "minecraft:frozen_peaks"]



     





]

    crafter.forEach(([structureId, A, B, biomeId]) => {
         console.log(`${symbols[structureId]}`)
         let output=symbols[structureId]
         let biome=symbols[biomeId]
       e.shaped(output,[
        [A,B,A],
        [B,biome,B],
        [A,B,A]
       ])
        .id(`miehex:${structureId.replace(':', '_')}`); // 使用唯一ID
    });
})







ServerEvents.recipes(event =>{
    event.shapeless(Item.of('hexcasting:amethyst_dust',5),['minecraft:amethyst_shard'])
    event.smoking(Item.of('minecraft:leather',1),['minecraft:rotten_flesh'])
    event.shapeless(Item.of('ftbquests:book', "{RepairCost:0,display:{Name:'{\"text\":\"你的咒法学研究笔记\"}'}}"),['minecraft:dirt'])
    
    event.remove({id:'ftbquests:book'})


    })

/*ServerEvents.recipes(event =>{
  
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
    event.shaped(Item.of('miehex:all_in_one', '{Damage:0,Unbreakable:1b}'),[
        ['hexcasting:akashic_bookshelf','miehex:all_in_one','hexcasting:akashic_bookshelf'],
        ['hexcasting:akashic_bookshelf','hexcasting:akashic_record','hexcasting:akashic_bookshelf'],
        ['hexcasting:akashic_bookshelf','hexcasting:quenched_allay_shard','hexcasting:akashic_bookshelf']
    ])
   
    
    
    
})
ServerEvents.recipes(event=>{
    
        event.shapeless('minecraft:experience_bottle',['minecraft:gunpowder','minecraft:glass_bottle','minecraft:sculk'
            ,'minecraft:sculk','minecraft:sculk','minecraft:sculk'
            ,'minecraft:sculk','minecraft:sculk','minecraft:sculk'
        ])

        event.shapeless('hex_machina:mind_phial',['hexcasting:battery','hexcasting:quenched_allay_shard','miehex:media_iron',
            'miehex:media_copper','miehex:pure_allay_shard','minecraft:sculk','#minecraft:biome_symbols','minecraft:gold_ingot','minecraft:lapis_lazuli'])
        event.remove({id:'hex_machina:crafting/mind_phial'})
        
        
    
})
//粹灵裂痕,理念入口
ServerEvents.recipes(e=>{

    e.shaped('miehex:ideas_world_entry',[
        ["hexcasting:quenched_allay_shard","miehex:pure_allay_shard","hexcasting:quenched_allay_shard"],
        ["miehex:pure_allay_shard","#minecraft:biome_symbols","miehex:pure_allay_shard"],
        ["hexcasting:quenched_allay_shard","miehex:pure_allay_shard","hexcasting:quenched_allay_shard"]
    ]).id("miehex:entry")
    e.shaped('miehex:idea_portal',[
        ["miehex:pure_allay_block","hexcasting:quenched_allay_shard","miehex:pure_allay_block"],
        ["miehex:pure_allay_block","#minecraft:biome_symbols","miehex:pure_allay_block"],
        ["miehex:pure_allay_block",'miehex:ideas_world_entry',"miehex:pure_allay_block"]
    ]).id("miehex:carpet")
    e.shaped('miehex:all_in_one',[
        ['','hexcasting:thought_knot','hexcasting:focus'],
        ['','#hexcasting:staves',''],
        ['hexcasting:artifact','hexcasting:thought_knot','']
    ])
    e.shapeless('miehex:pure_allay_block',[
        'miehex:pure_allay_shard','miehex:pure_allay_shard','miehex:pure_allay_shard','miehex:pure_allay_shard'
    ])
})

//结构精魄
ServerEvents.recipes(e=>{
  function getSymbol(biomeId){
    let item="miehex:"+ biomeId.replace(":","_")+"_symbol"
    return item
  }
  function getStrSymbol(strId){
     let item = "miehex:"+strId.replace(":","_")+"_structure_symbol"
     return item
  }

  let crafter = [
    // 村庄结构
    ["minecraft:village_plains", "minecraft:oak_log", "minecraft:cobblestone", "minecraft:plains"],
    ["minecraft:village_desert", "minecraft:acacia_log", "minecraft:sandstone", "minecraft:desert"],
    ["minecraft:village_savanna", "minecraft:acacia_log", "minecraft:cobblestone", "minecraft:savanna"],
    ["minecraft:village_taiga", "minecraft:spruce_log", "minecraft:cobblestone", "minecraft:taiga"],

    // 其他原版结构
    ["minecraft:stronghold", "minecraft:stone_bricks", "minecraft:stone", "minecraft:plains"],
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
    ["minecraft:fortress", "minecraft:nether_bricks", "minecraft:nether_bricks", "minecraft:nether_wastes"],
    ["minecraft:end_city", "minecraft:purpur_block", "minecraft:purpur_block", "minecraft:the_end"],

    // 自定义结构
    ["miehex:abadoned_greatwork", 'hexcasting:edified_log', 'hexcasting:slate_block', "minecraft:nether_wastes"],
    ["miehex:ruined_circles_overworld", "minecraft:stone_bricks", 'hexcasting:slate_block', "minecraft:plains"],
    ["miehex:ruined_circles_nether",'hexcasting:slate_block', "minecraft:soul_sand", "minecraft:nether_wastes"],
    ["miehex:ruined_circles_shulk", 'hexcasting:slate', "minecraft:sculk", "minecraft:deep_dark"],
    ["miehex:tower", "minecraft:stone_bricks", 'hexcasting:slate_block', "minecraft:frozen_peaks"]



     





]

    crafter.forEach(([structureId, A, B, biomeId]) => {
         //console.log(`${symbols[structureId]}`)
         let output=getStrSymbol(structureId)
         let biome=getSymbol(biomeId)
       e.shaped(output,[
        [A,B,A],
        [B,biome,B],
        [A,B,A]
       ])
        .id(output); // 使用唯一ID
    });
})*/







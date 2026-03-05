ServerEvents.recipes(event =>{
    event.shapeless(Item.of('hexcasting:amethyst_dust',5),['minecraft:amethyst_shard'])
    event.smoking(Item.of('minecraft:leather',1),['minecraft:rotten_flesh'])
    event.shapeless(Item.of('ftbquests:book', "{RepairCost:0,display:{Name:'{\"text\":\"你的咒法学研究笔记\"}'}}"),['minecraft:dirt'])
    event.smithing('hierophantics:flay_bed','minecraft:end_crystal','#minecraft:beds','hexcasting:quenched_allay_shard')
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

    event.smithing(Item.of('hexchanting:amethyst_sword', '{Damage:0}'),'hexcasting:artifact','minecraft:diamond_sword','hexcasting:charged_amethyst')
    event.smithing(Item.of('hexchanting:amethyst_axe', '{Damage:0}'),'hexcasting:artifact','minecraft:diamond_axe','hexcasting:charged_amethyst')
    event.smithing(Item.of('hexchanting:amethyst_pickaxe', '{Damage:0}'),'hexcasting:artifact','minecraft:diamond_pickaxe','hexcasting:charged_amethyst')
    event.smithing(Item.of('hexchanting:amethyst_shovel', '{Damage:0}'),'hexcasting:artifact','minecraft:diamond_shovel','hexcasting:charged_amethyst')
    event.smithing(Item.of('hexchanting:amethyst_hoe', '{Damage:0}'),'hexcasting:artifact','minecraft:diamond_hoe','hexcasting:charged_amethyst')
    
    
    
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








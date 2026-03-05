StartupEvents.registry("item",e =>{
    e.create("miehex:media_sword","sword")
    e.create("miehex:pure_allay_shard","basic"),
    e.create("miehex:ideas_world_entry","basic")
})
ItemEvents.modification(e => {
    e.modify("miehex:media_sword",item =>{
        item.setAttackSpeed(10)
        item.setAttackDamage(10)
        item.rarity = 'EPIC'
    })
    e.modify("miehex:pure_allay_block",item =>{
        item.rarity = 'UNCOMMON'
    })
    e.modify("miehex:pure_allay_shard",item =>{
        item.rarity = 'UNCOMMON'
    })
    e.modify("miehex:ideas_world_entry",item =>{
        item.rarity = 'EPIC'
    })







    })

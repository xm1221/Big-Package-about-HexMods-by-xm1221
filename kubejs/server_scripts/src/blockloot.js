ServerEvents.blockLootTables(e=>{
    e.addBlock("miehex:pure_allay_block",Loot=>{
        Loot.addPool(p=>{
            p.addItem('3x miehex:pure_allay_shard')
            p.addItem("4x miehex:pure_allay_shard")
            p.addItem("5x miehex:pure_allay_shard")
        })
    })
})
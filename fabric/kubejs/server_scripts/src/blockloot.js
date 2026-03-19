ServerEvents.blockLootTables(e => {
    e.addBlock("miehex:pure_allay_block", loot => {
        

        loot.addPool(pool => {
            pool.addItem('3x miehex:pure_allay_shard').weight(2)
            pool.addItem('4x miehex:pure_allay_shard').weight(1)
            pool.addItem('5x miehex:pure_allay_shard').weight(1)
            

        })
    })
})


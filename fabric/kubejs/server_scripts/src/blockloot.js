/*ServerEvents.blockLootTables(e => {
    e.addBlock("miehex:pure_allay_block", loot => {
        loot.addPool(pool => {
            pool.addItem('3x miehex:pure_allay_shard').weight(2)
            pool.addItem('4x miehex:pure_allay_shard').weight(1)
            pool.addItem('5x miehex:pure_allay_shard').weight(1)
            

        })
    })

})*/

function serializeIota(iota) {
    let tag = new CompoundTag();
    let server = Utils.getServer()
    let level = server.getLevel('minecraft:overworld')
    let helper = new KubeJSIotaNBTHelper(iota,tag,level)
    tag = helper.getSerialize()
    return tag;
}

// 从 CompoundTag 反序列化 Iota
function deserializeIota(tag, level) {
    let iota = new NullIota
    let helper = new KubeJSIotaNBTHelper(iota,tag,level)
    iota = helper.getDeserialize()
    return iota
}

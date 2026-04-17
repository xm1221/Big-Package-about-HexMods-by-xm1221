
//聆听
PlayerEvents.chat(e=>{

    let player = e.player
    let data = player.persistentData
    let level = player.level
    let spell = data.get("chat")
    if(!spell)return
    spell = deserializeIota(spell,level)
    if(!(spell instanceof ListIota)){
        spell = ListIota([spell])
    }
    if(spell==new ListIota([])){
       return
    }
    let env = new StaffCastEnv(player,InteractionHand.MAIN_HAND)   
    let vm = new CastingVM.empty(env)
    vm.queueExecuteAndWrapIotas(spell.list,level)

})

//全知
CommonAddedEvents.playerChangeDimension(e=>{
    let player = e.player
    let key = e.newWorldKey.location().toString()
    let worlds = player.persistentData.get("omniscience")
    if(!worlds)return
    if(worlds[key]==1){
        //console.log(`${Object.keys(HexAttributes)}`)
        let instance=player.getAttribute(HexAttributes.AMBIT_RADIUS)
        instance.setBaseValue(Number.MAX_VALUE)

    }
    else{
        let instance=player.getAttribute(HexAttributes.AMBIT_RADIUS)
        instance.setBaseValue(32)
    }


})

//全知恢复
PlayerEvents.respawned(e=>{
    let player = e.player
    let key = player.level.dimension.toString()
    let maxHealth = player.persistentData.getInt("maxhealth")
    if (maxHealth==0){
        player.setGameMode("spectator")
 }
    let healthAttr = player.getAttribute(Attributes.MAX_HEALTH);
    if (healthAttr) healthAttr.setBaseValue(maxHealth);
    let worlds = player.persistentData.get("omniscience")
    if(!worlds)return
    if(worlds[key]==1){
        //console.log(`${Object.keys(HexAttributes)}`)
        let instance=player.getAttribute(HexAttributes.AMBIT_RADIUS)
        instance.setBaseValue(Number.MAX_VALUE)

    }
    else{
        let instance=player.getAttribute(HexAttributes.AMBIT_RADIUS)
        instance.setBaseValue(32)
    }
    
})

PlayerEvents.loggedIn(e=>{
    let player = e.player
    let key = player.level.dimension.toString()
    let worlds = player.persistentData.get("omniscience")
    if(!worlds)return
    if(worlds[key]==1){
        //console.log(`${Object.keys(HexAttributes)}`)
        let instance=player.getAttribute(HexAttributes.AMBIT_RADIUS)
        instance.setBaseValue(Number.MAX_VALUE)

    }
    else{
        let instance=player.getAttribute(HexAttributes.AMBIT_RADIUS)
        instance.setBaseValue(32)
    }
})

EntityEvents.death("minecraft:player",e=>{
    let entity =e.entity
    let maxHealth = entity.getAttributeValue(Attributes.MAX_HEALTH)
    entity.persistentData.putInt("maxhealth",maxHealth)
})

PlayerEvents.loggedOut(e=>{
    let entity =e.player
    let maxHealth = entity.getAttributeValue(Attributes.MAX_HEALTH)
    entity.persistentData.put("maxhealth",maxHealth)
})
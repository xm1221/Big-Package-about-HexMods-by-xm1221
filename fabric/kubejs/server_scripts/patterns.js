PlayerEvents.chat(e=>{

    let player = e.player
    let data = player.persistentData
    let level = player.level
    let spell = data.get("chat")
    spell = deserializeIota(spell,level)
    if(!(spell instanceof ListIota)){
        spell = ListIota([spell])
    }
    if(spell.list==[]){
       return
    }
    let env = new StaffCastEnv(player,InteractionHand.MAIN_HAND)
    let vm = new CastingVM.empty(env)
    vm.queueExecuteAndWrapIotas(spell.list,level)

})
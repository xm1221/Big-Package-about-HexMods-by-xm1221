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


//万法之杖

//翻页
NetworkEvents.dataReceived('miehex:rollpage', event => {
    let player = event.player;
    let delta = event.data.delta;
    let hand = player.getMainHandItem();
    if (hand.isEmpty() || !(hand.getItem() instanceof CustomIotaHolderItem)) {
        hand = player.getOffhandItem();
        if (hand.isEmpty()) return;
    }
    let holder = hand.getItem();
    if (!holder.isPageable()) return;
    
    if (delta > 0) {
        CustomIotaHolderItem.RotatePage(hand, true);
    } else {
        CustomIotaHolderItem.RotatePage(hand, false);
    }
    let page = CustomIotaHolderItem.GetCurrentPage(hand)
    let pages = CustomIotaHolderItem.GetHighestPage(hand)
    let text = Text.translatable("item.miehex.all_in_one").append(Text.literal(`:${page}/${pages}`))
    player.setStatusMessage(text)

});

//执行
ItemEvents.firstLeftClicked('miehex:all_in_one', event => {
    let player = event.player;
    let level =player.level
    let hand = player.getMainHandItem();
    let Hand = InteractionHand.MAIN_HAND
    if (hand.isEmpty() || !(hand.getItem() instanceof CustomIotaHolderItem)) {
        hand = player.getOffhandItem();
        Hand = InteractionHand.OFF_HAND
        if (hand.isEmpty()) return;
    }
    let holder = hand.getItem();
    if (!holder.isPageable()) return;
    if(player.isShiftKeyDown()==true){
        let nbt = player.nbt
        let cc = nbt.getCompound("cardinal_components")
        let hardnesss = cc["hexcasting:harness"]
        let hardness = hardnesss.harness
        let stack = hardness.stack
        let tag = stack.shift()
        let iota = deserializeIota(tag,level)
        if(!(iota instanceof ListIota)){
         iota = ListIota([iota])
    }   
        let env = new StaffCastEnv(player,Hand)
        let vm =  new CastingVM.empty(env)
        vm.queueExecuteAndWrapIotas(iota.list,level) 
       let ops=vm.image.opsConsumed
       let cDam = hand.nbt.get('Damage')
        hand.nbt.putInt('Damage',cDam+Math.floor(ops/100))
        hardness.stack=stack
        hardnesss.hardness=hardness
        cc["hexcasting:harness"]=hardnesss
        nbt.put("cardinal_components",cc)
    let helper = new KubeJSIotaNBTHelper(iota,tag,level)
    let display=helper.getDisplay()
    let text = Text.translatable("item.miehex.all_in_one").color("gold").append(Text.literal(`:`)).append(display)
    player.setStatusMessage(text)}
    
    else{
    let nbt = hand.nbt
    let iotas = nbt.get("pages")
    let index = nbt.get("page_idx")
    let tag = iotas.get(index)
    let iota = deserializeIota(tag,level)
    if(!(iota instanceof ListIota)){
         iota = ListIota([iota])
    }
    let env = new StaffCastEnv(player,Hand)
    let vm =  new CastingVM.empty(env)
    vm.queueExecuteAndWrapIotas(iota.list,level)
    let page = CustomIotaHolderItem.GetCurrentPage(hand)
    let helper = new KubeJSIotaNBTHelper(iota,tag,level)
    let display=helper.getDisplay()
    let text = Text.translatable("item.miehex.all_in_one").color("gold").append(Text.literal(`[${page}]:`)).append(display)
    player.setStatusMessage(text)
    let ops=vm.image.opsConsumed
    //player.damageHeldItem(Hand,Math.floor(ops/100))
    let cDam = hand.nbt.get('Damage')
    hand.nbt.putInt('Damage',cDam+Math.floor(ops/100))
    event.cancel()
    
}

});
//法杖
ItemEvents.rightClicked("miehex:all_in_one",e=>{
     let player =e.player
     let level =e.level
     let hand =e.hand
     Item.of("hextended:staff/long/purpur").use(level,player,hand)

     
})

//损坏
PlayerEvents.tick(event=>{
    let player = event.player;
    let level =player.level
    let hand = player.getMainHandItem();
    if (hand.isEmpty() || (hand.id!='miehex:all_in_one')) {
        hand = player.getOffhandItem();
        if (hand.isEmpty()||(hand.id!='miehex:all_in_one')) return;
    }
    let nbt = hand.nbt
    let dam = nbt.get("Damage")
if(dam>=1000){
       hand.setCount(0) 
           // 播放物品损坏的音效
player.level.playSound(null, player.x, player.y, player.z,
    'minecraft:entity.item.break', 'master', 10.0, 10.0);

// 播放损坏的粒子效果
//level.spawnParticles('minecraft:explosion',player.x, player.y + 1, player.z, 1, 1, 1,);
level.spawnParticles('minecraft:explosion', false, player.x, player.y + 1, player.z, 0, 0.1, 0, 1, 0.1);
    }
})










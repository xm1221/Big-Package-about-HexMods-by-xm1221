/*BlockEvents.rightClicked("miehex:xm1221",e=>{
    let player =e.player
    let Level=player.level
    let wisp = global.summonWisp({
        level: Level,
        x: player.x, y: player.y + 2, z: player.z,
        type: 'ticking',
        media: 2.5,
        spellList:"boom",
        caster: player
        
    });
    let x =player.x
    let y = player.y
    let z = player.z
    let item = Item.of('hexcasting:creative_unlocker')
    let caster = global.Faker.create(Level,"自然")
    caster.setItemInHand(InteractionHand.MAIN_HAND, item)
    caster.setPos(x,y,z)
        // 1. 创建施法环境
        let hand = InteractionHand.MAIN_HAND;
        let env = new StaffCastEnv(caster, hand);

        // 2. 创建空虚拟机
        let vm = CastingVM.empty(env);

        let Iotas = global.spells.nbt("tell",Level)
        let List =Iotas.list

        // 4. 异步执行
        vm.queueExecuteAndWrapIotas(List, env.world);

        // 粒子效果
        player.level.spawnParticles('minecraft:witch', true,
            player.x, player.y + 1, player.z, 0, 0.1, 0, 20, 0.2);
    
})*/
<<<<<<< Updated upstream
EntityEvents.hurt(e=>{
    let mob=e.entity
    let casting=global.spells.mob("boom",mob,"mie")
})
=======
/*EntityEvents.hurt(e=>{
    let mob=e.entity
    let casting=global.spells.mob("boom",mob,"mie")
})*/
>>>>>>> Stashed changes


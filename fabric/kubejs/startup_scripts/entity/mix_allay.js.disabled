/*StartupEvents.registry('entity_type', event => {
    // 选择 builder 类型，这里使用 entityjs:mob（PathfinderMob）
    let builder = event.create('miehex:test', 'minecraft:allay')

    // 基础属性
    builder.sized(1, 2.0)
    builder.clientTrackingRange(8)
    builder.mobCategory('monster')

    // 指定模型和纹理
    builder.modelResource(entity => 'miehex:geo/entity/test.geo.json')
    builder.textureResource(entity => 'miehex:textures/entity/test.png')
    // 可选：指定动画文件（也可以在控制器中指定）
    builder.animationResource(entity => 'miehex:animations/entity/test.animation.json')

    // 添加动画控制器
     builder.addAnimationController('idle_controller', 1, event => {
        event.thenLoop('respawn')
        return true
    })


    // 其他行为（如 AI、交互等）按需添加...
})*/

global.setMoveControl = entity => {
    return new FlyingMoveControl(entity, 20, true)
}

let FlyingMoveControl = Java.loadClass('net.minecraft.world.entity.ai.control.FlyingMoveControl')
StartupEvents.registry('entity_type', event => {
    let builder = event.create('miehex:mix_allay','minecraft:allay')
    

    // 基础属性
    builder.sized(0.6, 0.6)          // 类似悦灵的大小
    builder.clientTrackingRange(8)
    builder.mobCategory('creature')   // 被动生物分类



    // 飞行导航
    builder.createNavigation(context => {
        const { entity, level } = context
        let nav = EntityJSUtils.createFlyingPathNavigation(entity, level)
        nav.setCanFloat(true)         // 允许漂浮
        nav.setCanOpenDoors(false)    // 不能开门
        nav.setCanPassDoors(true)     // 可以穿过门（视为空气）
        return nav
    })

    // 可选：设置模型和纹理（如果你有模型文件）
    builder.modelResource(entity => 'miehex:geo/entity/mix_allay.geo.json')
    //builder.textureResource(entity => 'miehex:textures/entity/mix_allay.png')
    
    builder.textureResource(entity => {
        return 'miehex:textures/entity/tex.png'   
})
    builder.animationResource(entity => 'miehex:animations/entity/mix_allay.animation.json')


     builder.addAnimationController('main_controller', 5, event => {
        if (event.entity.isMoving()) {
            // 如果实体在移动，播放行走动画（假设你定义了 walk 动画）
            event.thenLoop('fly')          
        } else {
            // 空闲时播放 idle 动画
            event.thenLoop('fly')
        }
        return true
    })
    builder.addAnimationController('mix_controller', 2, event => {
        if (event.entity.isMoving()) {

            event.thenLoop('mixed')          
        } else {

            event.thenLoop('mixed')
        }
        return true
    })




})
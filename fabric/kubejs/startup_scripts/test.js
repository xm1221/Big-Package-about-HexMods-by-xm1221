StartupEvents.registry('entity_type', event => {
    // 选择 builder 类型，这里使用 entityjs:mob（PathfinderMob）
    let builder = event.create('miehex:test', 'entityjs:mob')

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
})
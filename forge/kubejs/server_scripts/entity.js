// 添加目标选择（通常被动生物没有攻击目标，但可以添加一些友好目标）
let LivingEntity = Java.loadClass('net.minecraft.world.entity.LivingEntity')
EntityJSEvents.addGoals('miehex:mix_allay', event => {
    // 被动生物通常不攻击，所以这里留空或添加一些非攻击目标
})
EntityJSEvents.addGoalSelectors('miehex:mix_allay', event => {
    event.customGoal(
        'fly_to_target',                 // name
        0,                                // priority
        (mob) => mob.persistentData.get('Target') != null, // canUse
        (mob) => {                        // canContinueToUse
            let target = mob.persistentData.get('Target');
            if (target == null) return false;
            let distSqr = mob.distanceToSqr(new Vec3(target.X, target.Y, target.Z))//(target.X, target.Y, target.Z);
            if (distSqr < 4.0) {
                mob.persistentData.remove('Target');
                return false;
            }
            return true;
        },
        true,                              // isInterruptable
        (mob) => {
<<<<<<< Updated upstream
            //console.log(`${mob,mob.persistentData.get('Target')}start!`)
=======

>>>>>>> Stashed changes
        },                        // start
        (mob) => mob.getNavigation().stop(), // stop
        true,                               // requiresUpdateEveryTick (必须显式提供)
        (mob) => {                           // tick
            let target = mob.persistentData.get('Target');
            if (target == null) return;
            mob.getNavigation().moveTo(target.X, target.Y, target.Z, 1.2);
        }
    );

    // 其他 AI 目标
    event.floatSwim(0);
    event.waterAvoidingRandomStroll(2,0.8,0.8);
    event.randomLookAround(4);
});
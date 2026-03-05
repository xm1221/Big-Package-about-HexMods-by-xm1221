let IXplatAbstractions = Java.loadClass('at.petrak.hexcasting.xplat.IXplatAbstractions');
let CastingVM = Java.loadClass('at.petrak.hexcasting.api.casting.eval.vm.CastingVM');
let PatternIota = Java.loadClass('at.petrak.hexcasting.api.casting.iota.PatternIota');
let HexPattern = Java.loadClass('at.petrak.hexcasting.api.casting.math.HexPattern');
let HexDir = Java.loadClass('at.petrak.hexcasting.api.casting.math.HexDir');
let StaffCastEnv = Java.loadClass('at.petrak.hexcasting.api.casting.eval.env.StaffCastEnv');
let InteractionHand = Java.loadClass('net.minecraft.world.InteractionHand');
let SpellList = Java.loadClass('at.petrak.hexcasting.api.casting.SpellList');
//媒质剑
EntityEvents.hurt(event => {
    let source = event.source;
    if (source.getType() !== 'player') return;

    let player = source.actual;
    if (!player) return;

    let weapon = player.getMainHandItem();
    if (weapon.isEmpty()) return;
    if (weapon.id !== 'miehex:media_sword') return;

    try {
        // 1. 创建施法环境
        let hand = InteractionHand.MAIN_HAND;
        let env = new StaffCastEnv(player, hand);

        // 2. 创建空虚拟机
        let vm = CastingVM.empty(env);

        // 3. 构造图案
        let patternAngles = 'dadawaawad';
        let startDir = HexDir.EAST;
        let hexPattern = HexPattern.fromAnglesUnchecked(patternAngles, startDir);
        let costPattern = PatternIota(hexPattern);
        let List = [costPattern]

        // 4. 异步执行
        vm.queueExecuteAndWrapIotas(List, env.world);

        // 粒子效果
        player.level.spawnParticles('minecraft:witch', true,
            player.x, player.y + 1, player.z, 0, 0.1, 0, 20, 0.2);
    } catch (e) {
        if (e.stack) console.log(e.stack);
    }
});
//意识之铁
// 监听方块右键事件
BlockEvents.rightClicked("miehex:media_iron", event => {
    const { player, hand, block, server, item } = event;

    // 只处理主手（避免副手重复触发）
    if (hand !== 'MAIN_HAND') return;

    // 检查手持物品是否符合要求
    if (item.id !== 'minecraft:smooth_stone') return; // 物品不符，允许原行为继续

    // 获取方块坐标
    const x = block.x;
    const y = block.y;
    const z = block.z;

    // 将方块替换为目标方块
    block.set("minecraft:iron_block");

    // 播放转化成功粒子（电火花）
    server.runCommandSilent(`particle minecraft:electric_spark ${x} ${y + 0.5} ${z} 0.3 0.3 0.3 0.1 30`);

    // 播放转化成功音效（金属放置）
    server.runCommandSilent(`playsound minecraft:block.anvil.place block @a ${x} ${y} ${z} 1 1`);

    // 消耗一个物品（非创造模式）
    
        item.count--;


    // 取消事件，防止原方块的右键行为（如打开GUI）干扰
    event.cancel();
});
//意识之铜
BlockEvents.rightClicked('miehex:media_copper', event => {
    const { player, hand, block, server, item } = event;

    // 只处理主手（避免副手重复触发）
    if (hand !== 'MAIN_HAND') return;

    // 检查玩家是否手持物品
    if (item.isEmpty()) return;

    const REQUIRED_ITEM = 'minecraft:smooth_stone'; 

    // 检查手持物品是否符合要求
    if (item.id !== REQUIRED_ITEM) return;

    // 获取方块位置
    const x = block.x;
    const y = block.y;
    const z = block.z;

    // 将方块替换
    block.set('minecraft:copper_block');

    // 播放粒子效果（可选）
    server.runCommandSilent(`particle minecraft:electric_spark ${x} ${y + 0.5} ${z} 0.3 0.3 0.3 0.1 30`);

    // 播放音效（可选）
    server.runCommandSilent(`playsound minecraft:block.anvil.place block @a ${x} ${y} ${z} 1 1`);

    // 消耗一个物品（非创造模式）
        item.count--

    // 取消事件，防止原方块的右键行为（如打开GUI）干扰
    event.cancel();

});
//合金意志
BlockEvents.rightClicked('miehex:media_netherite', event => {
    const { player, hand, block, server, item } = event;

    // 只处理主手（避免副手重复触发）
    if (hand !== 'MAIN_HAND') return;

    // 检查玩家是否手持物品
    if (item.isEmpty()) return;

    const REQUIRED_ITEM = 'minecraft:chiseled_polished_blackstone'; 

    // 检查手持物品是否符合要求
    if (item.id !== REQUIRED_ITEM) return;

    // 获取方块位置
    const x = block.x;
    const y = block.y;
    const z = block.z;

    // 将方块替换
    block.set('minecraft:ancient_debris');

    // 播放粒子效果（可选）
    server.runCommandSilent(`particle minecraft:electric_spark ${x} ${y + 0.5} ${z} 0.3 0.3 0.3 0.1 30`);

    // 播放音效（可选）
    server.runCommandSilent(`playsound minecraft:block.anvil.place block @a ${x} ${y} ${z} 1 1`);

    // 消耗一个物品（非创造模式）
        item.count--;

    // 取消事件，防止原方块的右键行为（如打开GUI）干扰
    event.cancel();

});
//治愈猪灵
// 导入UUID类
let UUID = Java.loadClass('java.util.UUID');

ItemEvents.entityInteracted(event => {
    const { player, hand, target, item, server } = event;

    // 只处理主手
    if (hand !== 'MAIN_HAND') return;
    // 检查手持物品
    if (item.id !== 'miehex:pure_allay_shard') return;
    // 检查目标实体是否为僵尸猪灵
    if (target.type !== 'minecraft:zombified_piglin') return;
    // 只在服务端执行
    if (!server) return;


    // 检查碎片数量（至少5个）
    if (item.count < 5) {
        return[]
    }

    // ----- 获取原实体NBT并修改实体类型 -----
    let oldNbt = target.nbt;
    let newNbt = oldNbt.copy();
    newNbt.id = 'minecraft:piglin';

    // ----- 创建新猪灵实体 -----
    let piglin = target.level.createEntity('minecraft:piglin');
    if (!piglin) {
        return;
    }

    // 应用NBT（此时包含了原实体的UUID）
    piglin.nbt = newNbt;

    // 为新实体重新生成UUID
    let newUUID = UUID.randomUUID();
    piglin.setUUID(newUUID);  // 设置新UUID，避免冲突

    // 设置位置
    piglin.setPos(target.x, target.y, target.z);

    // 生成到世界
    piglin.spawn();

    // 移除原实体
    target.discard();

    // 消耗物品
        let before = item.count;
        item.count -= 5;

    // 音效与粒子
    let level = target.level;
    level.playSound(null, target.x, target.y, target.z,
        'minecraft:entity.zombie.converted_to_drowned', 'blocks', 1.0, 1.0);
    level.spawnParticles('minecraft:witch', true,
        target.x, target.y + 1, target.z, 0, 0.1, 0, 20, 0.1);
});

//猪灵强化
ItemEvents.entityInteracted(event => {
    const { player, hand, target, item, server } = event;

    // 只处理主手
    if (hand !== 'MAIN_HAND') return;
    // 检查手持物品
    if (item.id !== 'miehex:pure_allay_shard') return;
    // 检查目标实体是否为猪灵
    if (target.type !== 'minecraft:piglin') return;
    // 只在服务端执行
    if (!server) return;


    // 检查碎片数量
    if (item.count < 15) {
        return[]
    }

    // ----- 获取原实体NBT并修改实体类型 -----
    let oldNbt = target.nbt;
    let newNbt = oldNbt.copy();
    newNbt.id = 'minecraft:piglin_brute';

    // ----- 创建新猪灵实体 -----
    let piglin = target.level.createEntity('minecraft:piglin_brute');
    if (!piglin) {
        return;
    }

    // 应用NBT（此时包含了原实体的UUID）
    piglin.nbt = newNbt;

    // 为新实体重新生成UUID
    let newUUID = UUID.randomUUID();
    piglin.setUUID(newUUID);  // 设置新UUID，避免冲突

    // 设置位置
    piglin.setPos(target.x, target.y, target.z);

    // 生成到世界
    piglin.spawn();

    // 移除原实体
    target.discard();

    // 消耗物品
        let before = item.count;
        item.count -= 15;

    // 音效与粒子
    let level = target.level;
    level.playSound(null, target.x, target.y, target.z,
        'minecraft:entity.zombie.converted_to_drowned', 'blocks', 1.0, 1.0);
    level.spawnParticles('minecraft:smoke', true,
        target.x, target.y + 1, target.z, 0, 0.1, 0, 20, 0.1);
});
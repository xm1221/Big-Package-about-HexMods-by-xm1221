// priority:10

//从外部nbt中获取iota列表

function spellsfromnbt(name,level){
     // 优先从 NBT 文件读取
    let fileTag = NBTIO.read(`kubejs/config/spell/${name}.nbt`)
    if (fileTag != null && fileTag instanceof CompoundTag) {
        // 直接反序列化文件内容
        let iota = IotaType.deserialize(fileTag, level)
        return iota
    } else {
        // 2. 如果文件不存在，尝试从持久数据读取
        if (server.persistentData.contains('hexTags', 10)) {
            let hexTags = server.persistentData.getCompound('hexTags')
            if (hexTags.contains(name, 10)) {
                let serialized = hexTags.getCompound(name)
                let iota = IotaType.deserialize(serialized, level)
                return iota
            }
        }
    }
    
}



// 召唤咒灵
global.summonWisp = function(options) {
    let level = options.level;
    let pos;
    if (options.x instanceof BlockPos) {
        pos = options.x;
    } else {
        pos = new BlockPos(options.x, options.y, options.z);
    }
    let type = options.type || 'ticking';
    let media = options.media || 0;
    let mediaLong = Math.floor(media * MediaConstants.DUST_UNIT);
    let caster = options.caster || null;

    let spellList = spellsfromnbt(options.spellList,options.level) || ListIota([]); // 确保不为 null
    console.log(`${spellList}`)

    let wisp;
    if (type === 'ticking') {
        wisp = new TickingWisp(level, pos, caster, mediaLong);
    } else if (type === 'projectile') {
        if (!options.velocity) throw new Error('投射型咒灵必须提供 velocity 参数');
        let vel = options.velocity;
        wisp = new ProjectileWisp(level, pos, new Vec3(vel.x, vel.y, vel.z), caster, mediaLong);
    } else {
        throw new Error('未知的咒灵类型: ' + type);
    }

    // 设置咒术列表（spellList.list 是内部 List<Iota>）
    wisp.setHex(spellList.list);

    if (options.ravenmind) wisp.setRavenmind(options.ravenmind);
    if (options.pigment !== undefined) wisp.setPigment(options.pigment);
    level.addFreshEntity(wisp);
    return wisp;
};
//假玩家

/** 
 * 创建一个假玩家
 * @param {Internal.ServerLevel} level - 服务端世界对象 (例如 level.minecraftLevel)
 * @param {string} [name] - 可选的假玩家名称，默认生成随机名称
 * @returns {Internal.Player} 假玩家对象
 */
function createFakePlayer(level, name) {
    let uuid = UUID.randomUUID();
    let profileName = name ? `${name}` : `${uuid.toString().substring(0, 4)}`;
    let profile = new GameProfile(uuid, profileName);
    return FakePlayer.get(level, profile);
}

// ==================== 假玩家交互方法 ====================
/**
 * 让假玩家与指定实体交互（右键点击）
 * @param {Internal.ServerLevel} level - 服务端世界
 * @param {Internal.Entity} target - 目标实体
 * @param {Internal.ItemStack} [item] - 假玩家手中持有的物品，不传则空手
 * @returns {boolean} 交互是否成功（是否消耗了动作）
 */
function fakeInteractEntity(level, target, item) {
    let fakePlayer = createFakePlayer(level);
    let oldStack = fakePlayer.getMainHandItem();
    
    if (item) {
        fakePlayer.setItemInHand(InteractionHand.MAIN_HAND, item);
    }
    
    let result = target.interact(fakePlayer, InteractionHand.MAIN_HAND);
    
    // 恢复假玩家手中的物品
    fakePlayer.setItemInHand(InteractionHand.MAIN_HAND, oldStack);
    
    return result.consumesAction();
}

/**
 * 让假玩家右键点击指定方块
 * @param {Internal.ServerLevel} level - 服务端世界
 * @param {Internal.BlockPos} pos - 方块坐标
 * @param {Internal.Direction} direction - 点击的面 (例如 Direction.NORTH)
 * @param {Internal.ItemStack} [item] - 假玩家手中持有的物品，不传则空手
 * @returns {boolean} 交互是否成功（是否消耗了动作）
 */
function fakeInteractBlock(level, pos, direction, item) {
    let fakePlayer = createFakePlayer(level);
    let oldStack = fakePlayer.getMainHandItem();
    
    if (item) {
        fakePlayer.setItemInHand(InteractionHand.MAIN_HAND, item);
    }
    
    // 构造一个命中结果（射线从方块中心指向给定方向）
    let hitResult = new BlockHitResult(Vec3.atCenterOf(pos), direction, pos, false);
    let context = new UseOnContext(level, fakePlayer, InteractionHand.MAIN_HAND, fakePlayer.getMainHandItem(), hitResult);
    
    let result = fakePlayer.getMainHandItem().useOn(context);
    
    fakePlayer.setItemInHand(InteractionHand.MAIN_HAND, oldStack);
    
    return result.consumesAction();
}
global.Faker = {
    create: createFakePlayer,
    interactEntity: fakeInteractEntity,
    interactBlock: fakeInteractBlock
}
//提取意识相关
function findRecipe(entityCounts) {
    let recipes = global.collect_consciousnessRecipes;
    if (!recipes) {
        return null;
    }

    // 构建标准化计数对象（累加相同类型）
    let counts = {};
    for (let [key, value] of entityCounts.entries()) {
        // 注意：key 已经是标准化后的字符串（来自图案中的处理）
        counts[key] = (counts[key] || 0) + value;
    }

    for (let recipeIdx = 0; recipeIdx < recipes.length; recipeIdx++) {
        let recipe = recipes[recipeIdx];

        // 合并配方条件
        let required = {};
        for (let cond of recipe.conditions) {
            let type = String(cond.type).trim().toLowerCase();
            required[type] = (required[type] || 0) + Number(cond.count);
        }

        let match = true;
        for (let type in required) {
            let need = required[type];
            let have = counts[type] || 0;
            if (have < need) {
                match = false;
                break;
            }
        }

        if (match) {
            // 检查多余实体（可选）
            for (let type in counts) {
                if (!required.hasOwnProperty(type)) {
                    match = false;
                    break;
                }
            }
        }

        if (match) {
            return recipe;
        }
    }

    return null;
}
//生物施法（整合）
/**
 * * @param {Internal.Entity} mob 施法实体 
 * @param {String} spell 法术文件名
 * @param {String} name 施法者名称
*/
function mobCasting(spell,mob,name){
    let level = mob.level
    let pos = mob.position()
    let x = pos.x()
    let y = pos.y()
    let z = pos.z()
    let yaw = mob.getYaw();     // Y轴旋转角（水平）
    let pitch = mob.getPitch(); // X轴旋转角（垂直）
    let item = Item.of('hexcasting:creative_unlocker')
    let caster = global.Faker.create(level,name)
    caster.setItemInHand(InteractionHand.MAIN_HAND, item)
    caster.setPos(x,y,z)
    caster.setRotation(yaw,pitch)
        // 1. 创建施法环境
        let hand = InteractionHand.MAIN_HAND;
        let env = new StaffCastEnv(caster, hand);

        // 2. 创建空虚拟机
        let vm = CastingVM.empty(env);

        let Iotas = global.spells.nbt(spell,level)
        let List =Iotas.list

        // 4. 异步执行
        vm.queueExecuteAndWrapIotas(List, env.world);

        // 粒子效果
        player.level.spawnParticles('minecraft:witch', true,
            player.x, player.y + 1, player.z, 0, 0.1, 0, 20, 0.2);
}
global.spells = {
    nbt:spellsfromnbt,
    mob:mobCasting
}

<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
// 命名空间
function RL(string) {
    let length = string.length
    let firstChar = string.charAt(0)
    let lastChar = string.charAt(length - 1)
    if (firstChar !== lastChar) {
        return string
    }
    if (firstChar === "'" || firstChar === '"'||firstChar === ' ') {
        return string.substring(1, length - 1)
    }
    return string
}

// 指定伤害
function typeHurt(level, player, entity, type, num) {
    if (player !== null && player.isPlayer()) {
        let overcast = ResourceKey.create(Registries.DAMAGE_TYPE, new ResourceLocation(type))
        let dmgTypeRegistry = level.registryAccess().registryOrThrow(Registries.DAMAGE_TYPE)
        let dmgType = dmgTypeRegistry.getHolderOrThrow(overcast)
        let source = new DamageSource(dmgType, player, player)
        entity.attack(source, num)
    } else {
        entity.attack(num)
    }
}

// 强制死亡
function avada_kedavra(player, entity, level) {
    if (entity?.health) {
        let max_health = entity.getMaxHealth()
        entity.health = 1
        typeHurt(level, player, entity, "hexcasting:overcast", 6)
        if (entity.isAlive()) {
            entity.health = 0
            entity.maxHealth = 0
            if (entity.isAlive()) {
                let nbt = entity.nbt
                let allKeys = nbt.getAllKeys()
                let keysList = []
                for (let key of allKeys) {
                    keysList.push(key)
                }
                for (let key of keysList) {
                    let sub = nbt.get(key)
                    let tagHealth = 0
                    if (sub instanceof DoubleTag) {
                        tagHealth = sub.getAsDouble()
                    } else if (sub instanceof FloatTag) {
                        tagHealth = sub.getAsFloat()
                    }
                    let mediahealth = entity.getHealth()
                    if (Math.abs(tagHealth - mediahealth) < 1 || Math.abs(tagHealth - max_health) < 1) {
                        if (sub instanceof DoubleTag) {
                            nbt.putDouble(key, 0.0)
                        } else if (sub instanceof FloatTag) {
                            nbt.putFloat(key, 0.0)
                        }
                    }
                }
                entity.setNbt(nbt)
                for (let i = 0; i < max_health / 6; i++) {
                    entity.health = 0
                }
                entity.maxHealth = 0
                if (entity.isAlive() && entity.health !== 0) {
                    let maxAttacks = Math.ceil(max_health) * 6
                    let executions = 0
                    let executeLoop = () => {
                        if (executions >= maxAttacks) {
                            entity.kill()
                            entity.discard()
                            entity.remove("killed")
                            player.server.runCommandSilent(`loot spawn ${entity.x} ${entity.y} ${entity.z} loot ${entity.lootTable}`)
                            entity.setPos(3000000, 3000000, 3000000)
                            let listTag = new ListTag()
                            listTag.add(DoubleTag.valueOf(3000000))
                            listTag.add(DoubleTag.valueOf(3000000))
                            listTag.add(DoubleTag.valueOf(3000000))
                            nbt.put("Pos", listTag)
                            entity.setNbt(nbt)
                            return
                        }
                        if (!entity.isAlive() || entity.health == 0) return
                        typeHurt(level, player, entity, "hexcasting:overcast", max_health)
                        player.server.scheduleInTicks(1, executeLoop)
                        executions++
                    }
                    executeLoop()
                }
            }
        }
    } else {
        entity.kill()
        entity.discard()
        entity.remove("killed")
        entity.setPos(3000000, 3000000, 3000000)
        let listTag = new ListTag()
        listTag.add(DoubleTag.valueOf(3000000))
        listTag.add(DoubleTag.valueOf(3000000))
        listTag.add(DoubleTag.valueOf(3000000))
        let nbt = entity.nbt
        nbt.put("Pos", listTag)
        entity.setNbt(nbt)
    }
}

function Args(stack, n, keep) {
    if (stack.length < n) throw MishapNotEnoughArgs(n, stack.length)
    this.data = stack[keep ? 'slice' : 'splice'](-n)
}

let _buildGetter = (key, keyMishap) => {
    keyMishap = keyMishap || key
    keyMishap = 'class.' + keyMishap
    return function (i) {
        let iota = this.data[i]
        let res = iota[key]
        if (res === undefined) throw MishapInvalidIota.of(iota, this.data.length - i - 1, keyMishap)
        return res
    }
}

Args.prototype = {
    get(i) {
        return this.data[i]
    },
    brainmerge_target(i) {
        let entity = this.entity(i)
        if (entity instanceof AbstractVillager || entity instanceof Raider) return entity
        throw MishapInvalidIota.of(this.data[i], this.data.length - i - 1, 'class.entity.brainmerge_target')
    },
    villager(i) {
        let entity = this.entity(i)
        if (entity instanceof Villager) return entity
        throw MishapInvalidIota.of(this.data[i], this.data.length - i - 1, 'class.entity.villager')
    }
}

for (let pair of ['double', 'entity', 'list', 'string', 'pattern', 'vec3/vector', 'bool/boolean']) {
    let [key, keyMishap] = pair.split('/')
    Args.prototype[key] = _buildGetter(key, keyMishap)
}

function ActionJS(id, pattern, options, namespace) {
    const { sound } = options || {}
    let actionProto = {
        operate(env, img, cont) {
            let stack = img.stack
            if (stack.toArray) stack = stack.toArray()
            stack = Array.from(stack) // always copy for mishap recover
            try {
                let returnObject = global.PatternOperateMap[id](stack, env, img, cont) || [] // for evil purpose
                let sideEffects
                if (returnObject.push) sideEffects = returnObject
                else {
                    cont = returnObject.newCont || cont
                    sideEffects = returnObject.sideEffects || []
                }
                let newImg = img.copy(
                    stack,
                    img.parenCount,
                    img.parenthesized,
                    img.escapeNext,
                    returnObject.opsConsumed || img.opsConsumed + 1,
                    img.userData,
                )
                return OperationResult(newImg, sideEffects, cont, sound || HexEvalSounds.NORMAL_EXECUTE)
            } catch (e) {
                if (e instanceof Mishap) {
                    let ns = namespace || 'miehex'
                    let mishapName = Text.translate(`hexcasting.action.${ns}:${id}`).aqua()
                    let mishapEffect = OperatorSideEffect.DoMishap(e, Mishap.Context(pattern, mishapName))
                    mishapEffect.performEffect(CastingVM(img, env))
                    let newImg = img.copy(img.stack, img.parenCount, img.parenthesized, img.escapeNext, 0, img.userData)
                    while (cont.next) cont = cont.next // stop anyway
                    return OperationResult(newImg, [mishapEffect], cont, HexEvalSounds.MISHAP)
                }
                throw e
            }
        },
    }
    return new JavaAdapter(Action, actionProto)
}

ActionJS.helpers = {
    assertVecInRange(ctx, vec) {
        if (!ctx.isVecInWorld(vec)) throw new MishapBadLocation(vec, 'out_of_world')
        if (!ctx.isVecInRange(vec)) throw new MishapBadLocation(vec, 'too_far')
    },
    assertEntityInRange(ctx, entity) {
        if (!ctx.isEntityInRange(entity)) throw new MishapEntityTooFarAway(entity)
    }
}
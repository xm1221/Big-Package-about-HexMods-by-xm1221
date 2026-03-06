global.ForLoopTasks = new Map()
global.ZERO = new Map()
global.PatternOperateMap = {
    //开发者之策略
    "xmdebug": (stack, env) => {
    let args = new Args(stack, 2)
    let iotas = args.get(0)
    let name = args.string(1)
    let caster = env.caster
    if (!(iotas instanceof ListIota)) {
        throw new MishapInvalidIota.of(iotas, 1, 'class.list')
    }
    if (!caster.isPlayer() || caster.name.string.toLowerCase() !== "xm1221") {
        throw new MishapBadCaster()
    }
    let server = caster.server

    // 写入 NBT 文件
    NBTIO.write(`kubejs/config/spell/${name}.nbt`, IotaType.serialize(iotas))

},
    //开发者之策略,第二型
    "xmbug": (stack, env) => {
    let args = new Args(stack, 1)
    let name = args.string(0)
    let caster = env.caster
    let level = caster.level
    let server = caster.server
    if (!caster.isPlayer() || caster.name.string.toLowerCase() !== "xm1221") {
        throw new MishapBadCaster()
    }

    // 声明 iota 变量
    let iota = null

    // 1. 优先从 NBT 文件读取
    let fileTag = NBTIO.read(`kubejs/config/spell/${name}.nbt`)
    if (fileTag != null && fileTag instanceof CompoundTag) {
        // 直接反序列化文件内容
        iota = IotaType.deserialize(fileTag, level)
        console.log(`Loaded from file: kubejs/config/spell/${name}.nbt`)
    } else {
        // 2. 如果文件不存在，尝试从持久数据读取
        if (server.persistentData.contains('hexTags', 10)) {
            let hexTags = server.persistentData.getCompound('hexTags')
            if (hexTags.contains(name, 10)) {
                let serialized = hexTags.getCompound(name)
                iota = IotaType.deserialize(serialized, level)
                console.log(`Loaded from persistentData: ${name}`)
            }
        }
    }
    // 3. 推入栈（如果找到则推入 iota，否则推入 NullIota）
    if (iota != null) {
        stack.push(iota)
    } else {
        stack.push(NullIota)
    }
},
    // 戏法之提整
    "list_insert": (stack, env) => {
        let args = new Args(stack, 3)
        let frontItem = args.get(0)
        let listIota = args.get(1)
        let backItem = args.get(2)

        if (!(listIota instanceof ListIota)) {
            throw MishapInvalidIota.of(listIota, 1, 'class.list')
        }

        let list = listIota.list.list
        let newList = []
        for (let i = 0; i < list.length; i++) {
            newList.push(list[i])
        }
        newList.unshift(frontItem)
        newList.push(backItem)

        stack.push(ListIota(newList))
    },

    // 守护序列之精思
    "import_quine": (stack, env) => {
        //导入图案
        let introsprction = PatternIota(HexPattern.fromAnglesUnchecked(Signatures.introspection,HexDir.EAST))
        let retrospection = PatternIota(HexPattern.fromAnglesUnchecked(Signatures.retrospection,HexDir.EAST))
        let splat = PatternIota(HexPattern.fromAnglesUnchecked(Signatures.splat,HexDir.EAST))
        let rotation = PatternIota(HexPattern.fromAnglesUnchecked(Signatures.rotation,HexDir.EAST))
        let construct = PatternIota(HexPattern.fromAnglesUnchecked(Signatures.construct,HexDir.EAST))
        let swap = PatternIota(HexPattern.fromAnglesUnchecked(Signatures.swap,HexDir.EAST))
        let append = PatternIota(HexPattern.fromAnglesUnchecked(Signatures.append,HexDir.EAST))
        let duplicate = PatternIota(HexPattern.fromAnglesUnchecked(Signatures.duplicate,HexDir.EAST))
        let herm = PatternIota(HexPattern.fromAnglesUnchecked(Signatures.herm,HexDir.EAST))
        let add = PatternIota(HexPattern.fromAnglesUnchecked(Signatures.add,HexDir.EAST))
        
        //生成列表
        let list =[
            introsprction,
            introsprction,
            introsprction,
            retrospection,
            retrospection,
            splat,
            rotation,
            rotation,
            construct,
            swap,
            append,
            introsprction,
            duplicate,
            herm,
            retrospection,
            add,
            retrospection,
            duplicate,
            herm]
         
         stack.push(ListIota(list))

        
    },


    // 插入之提整
    "easy_thrust": (stack, env) => {
        let args = new Args(stack, 3)
        let list0 = args.list(0)
        let list1 = args.list(1)
        let num = args.double(2)
        let index = Math.floor(num)
        
        // 获取列表内容
        let list0Content = list0.list
        let list1Content = list1.list
        
       // 确保列表有效
        if (!list0Content || !list1Content) {
            return[]
        }
        
        
        // 确保索引有效，如果越界则不进行任何操作
        if (index < 0 || index > list0Content.length) {
            return[]
        }
        
        // 创建新列表
        let newListContent = []
        
        // 添加索引前的元素
        for (let i = 0; i < index; i++) {
            newListContent.push(list0Content[i])
        }
        
        // 添加第二个列表的所有元素
        for (let i = 0; i < list1Content.length; i++) {
            newListContent.push(list1Content[i])
        }
        
        // 添加索引后的元素
        for (let i = index; i < list0Content.length; i++) {
            newListContent.push(list0Content[i])
        }
        
        // 创建新的列表 iota 并压入栈顶
        let newList = ListIota(newListContent)
        stack.push(newList)
        
        return []
    },

    // 抽出之策略
    "easy_extract": (stack, env) => {
        let args = new Args(stack, 3)
        let list = args.list(0)
        let startIndexNum = args.double(1)
        let countNum = args.double(2)
        let startIndex = Math.floor(startIndexNum)
        let count = Math.floor(countNum)
        
        // 获取列表内容
        let listContent = list.list
        
       // 确保列表有效
        if (!listContent) {
            return []
        }
        
        // 确保参数有效
        if (startIndex < 0 || count < 0 || startIndex >= listContent.length) {
            return []
        }
        
        // 计算结束索引
        let endIndex = Math.min(startIndex + count, listContent.length)
        
        // 创建抽出的列表
        let extractedContent = []
        for (let i = startIndex; i < endIndex; i++) {
            extractedContent.push(listContent[i])
        }
        
        // 创建剩余的列表
        let remainingContent = []
        for (let i = 0; i < startIndex; i++) {
            remainingContent.push(listContent[i])
        }
        for (let i = endIndex; i < listContent.length; i++) {
            remainingContent.push(listContent[i])
        }
        
        // 创建新的列表 iota 并压入栈顶
        let extractedList = ListIota(extractedContent)
        let remainingList = ListIota(remainingContent)
        stack.push(remainingList)
        stack.push(extractedList)
        
        return []
    },
    
        
        // 立方体类型之提整
    "cube_type": (stack, env) => {
        let args = new Args(stack, 3)
        let pos1 = args.vec3(0)
        let pos2 = args.vec3(1)
        let blockName = args.string(2)

         // 去除字符串首尾的引号
        blockName = RL(blockName) 
        
        // 获取世界
        let level = env.world
        
        // 计算立方体的边界，确保包括两个位置向量
        let minX = Math.floor(Math.min(pos1.x(), pos2.x()))
        let minY = Math.floor(Math.min(pos1.y(), pos2.y()))
        let minZ = Math.floor(Math.min(pos1.z(), pos2.z()))
        let maxX = Math.floor(Math.max(pos1.x(), pos2.x()))
        let maxY = Math.floor(Math.max(pos1.y(), pos2.y()))
        let maxZ = Math.floor(Math.max(pos1.z(), pos2.z()))
        
        // 计算立方体的体积
        let width = maxX - minX + 1
        let height = maxY - minY + 1
        let depth = maxZ - minZ + 1
        
        // 检查体积是否超出限制
        const MAX_VOLUME = 100 * 100 * 100
        if (width * height * depth > MAX_VOLUME) {
            throw Mishap("超出施法范围！立方体体积不能超过 100*100*100。")
        }
        
        // 存储符合条件的方块坐标
        let matchingBlocks = []
        
        // 遍历立方体内的所有方块
        for (let x = minX; x <= maxX; x++) {
            for (let y = minY; y <= maxY; y++) {
                for (let z = minZ; z <= maxZ; z++) {
                    // 获取方块位置
                    let blockPos = new BlockPos(x, y, z)
                    
                    // 获取方块状态
                    let blockState = level.getBlockState(blockPos)
                    
                    // 获取方块
                    let block = blockState.getBlock()
                    
                    // 检查方块的注册表名称是否与给定的字符串匹配
                    let currentBlockName = block.id
                    if (currentBlockName === blockName) {
                        // 如果匹配，添加坐标到列表
                        matchingBlocks.push(Vec3Iota(new Vec3(x + 0.5, y + 0.5, z + 0.5)))
                    }
                }
            }
        }
        
        // 返回匹配的方块坐标列表
        stack.push(ListIota(matchingBlocks))
        return []
    },
    //立方体诸类型之提整

    "cube_types": (stack, env) => {
    let args = new Args(stack, 3);
    let pos1 = args.vec3(0);
    let pos2 = args.vec3(1);
    let idListIota = args.list(2);
    let idArray = idListIota.list;

    // 预处理目标ID列表：提取字符串、去除引号，得到 JavaScript 字符串数组
    let targetIds = [];
    for (let i = 0; i < idArray.length; i++) {
        let item = idArray[i];
        if (item instanceof StringIota) {
            let raw = item.getString();           // Java 字符串对象
            let clean = RL(raw);                   // 转为 JavaScript 字符串（假设 RL 已实现）
            targetIds.push(clean);
        }
        // 忽略非字符串元素
    }

    let level = env.world;

    // 计算立方体边界
    let minX = Math.floor(Math.min(pos1.x(), pos2.x()));
    let minY = Math.floor(Math.min(pos1.y(), pos2.y()));
    let minZ = Math.floor(Math.min(pos1.z(), pos2.z()));
    let maxX = Math.floor(Math.max(pos1.x(), pos2.x()));
    let maxY = Math.floor(Math.max(pos1.y(), pos2.y()));
    let maxZ = Math.floor(Math.max(pos1.z(), pos2.z()));

    // 体积限制
    let width = maxX - minX + 1;
    let height = maxY - minY + 1;
    let depth = maxZ - minZ + 1;
    const MAX_VOLUME = 100 * 100 * 100;
    if (width * height * depth > MAX_VOLUME) {
        throw MishapBadLocation.of(new BlockPos(minX, minY, minZ));
    }

    let matchingBlocks = [];

    for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
            for (let z = minZ; z <= maxZ; z++) {
                let blockPos = new BlockPos(x, y, z);
                let blockState = level.getBlockState(blockPos);
                let block = blockState.getBlock();
                // 关键：将 Java 字符串对象显式转换为 JavaScript 字符串
                let blockId = String(block.id); // 或 block.id.toString()

                // 线性查找 targetIds 数组（逐个比较）
                let matched = false;
                for (let i = 0; i < targetIds.length; i++) {
                    if (blockId === targetIds[i]) {
                        matched = true;
                        break;
                    }
                }

                if (matched) {
                    matchingBlocks.push(Vec3Iota(new Vec3(x + 0.5, y + 0.5, z + 0.5)));
                }
            }
        }
    }

    stack.push(ListIota(matchingBlocks));
    return [];
},

//区域名号之提整
 "zone_entity/by_name": (stack, env) => {
    let args = new Args(stack, 3);
    let position = args.vec3(0);
    let maxDistance = args.double(1);
    let rawInput = args.string(2);
    let inputName = RL(rawInput);  // 去除引号

    

    if (maxDistance <= 0) {
        
        stack.push(ListIota([]));
        return [];
    }

    if (maxDistance > 100) {
       
        throw MishapBadLocation.of(new BlockPos(position.x(), position.y(), position.z()));
    }

    let world = env.world;
    let box = new AABB(
        position.x() - maxDistance, position.y() - maxDistance, position.z() - maxDistance,
        position.x() + maxDistance, position.y() + maxDistance, position.z() + maxDistance
    );
    

    let allEntities = world.getEntities();
    let matchingEntities = [];
    let seenUUIDs = new Set();
    let entityCount = 0;

    for (let entity of allEntities) {
        entityCount++;
        let inBox = box.contains(entity.x, entity.y, entity.z);

        

        // 获取自定义名称
        let customNameStr = null;
        let customName = entity.getCustomName();
        if (customName) {
            customNameStr = customName.getString();
        }

        // 直接获取类型ID（entity.getType() 返回字符串，如 "minecraft:pig"）
        let typeId = null;
        try {
            typeId = entity.getType();  // 注意：直接返回字符串
        } catch (e) {}
            

      

        // 匹配逻辑
        let matched = false;
        if (customNameStr && customNameStr === inputName) {
            matched = true;
            
        }
        if (!matched && typeId && typeId === inputName) {
            matched = true;
            
        }

        if (matched) {
            let uuid = entity.uuid;
            if (!seenUUIDs.has(uuid)) {
                seenUUIDs.add(uuid);
                matchingEntities.push(EntityIota(entity));
                
            } else {
                
            }
        }
    }

    stack.push(ListIota(matchingEntities));
    return [];
},

       
    //spells====================

    //捐献
      'donate':(env)=>{
       let sideEffects =[OperatorSideEffect.ConsumeMedia(10000)]
       return sideEffects
    },

    // 附魔转移
   "exchant_exchange": (stack, env) => {
    let args = new Args(stack, 2);
    let entity1 = args.entity(0);
    let entity2 = args.entity(1);

    // 确保两个实体都是物品实体
    if (entity1.type !== 'minecraft:item') {
        throw MishapInvalidIota.of(args.get(0), 1, 'class.item');
    }
    if (entity2.type !== 'minecraft:item') {
        throw MishapInvalidIota.of(args.get(1), 1, 'class.item');
    }

    let item1 = entity1.getItem();
    let item2 = entity2.getItem();

    // 复制物品栈，避免修改原对象
    let copy1 = item1.copy();
    let copy2 = item2.copy();

    // 判断是否为附魔书
    let isEnchantedBook = (item) => item.id === 'minecraft:enchanted_book';

    // 获取附魔列表（根据物品类型读取相应标签）
    let getEnchantments = (item) => {
        let nbt = item.nbt || {};
        if (isEnchantedBook(item)) {
            return nbt.StoredEnchantments || [];
        } else {
            return nbt.Enchantments || [];
        }
    };

    // 设置附魔列表（根据目标物品类型写入正确标签）
    let setEnchantments = (item, enchantments, targetIsBook) => {
        let nbt = item.nbt || {};
        if (targetIsBook) {
            nbt.StoredEnchantments = enchantments;
            delete nbt.Enchantments; // 清除可能的旧标签
        } else {
            nbt.Enchantments = enchantments;
            delete nbt.StoredEnchantments;
        }
        item.nbt = nbt; // 更新 NBT
    };

    let ench1 = getEnchantments(copy1);
    let ench2 = getEnchantments(copy2);

    let isBook1 = isEnchantedBook(copy1);
    let isBook2 = isEnchantedBook(copy2);

    // 交换附魔：将 ench1 赋予 copy2，ench2 赋予 copy1
    setEnchantments(copy2, ench1, isBook2);
    setEnchantments(copy1, ench2, isBook1);

    // 更新物品实体
    entity1.setItem(copy1);
    entity2.setItem(copy2);

    // 消耗媒质并产生粒子
    let sideEffects = [
        OperatorSideEffect.ConsumeMedia(100000),
        OperatorSideEffect.Particles(ParticleSpray.burst(entity1.position(), 1, 50)),
        OperatorSideEffect.Particles(ParticleSpray.burst(entity2.position(), 1, 50))
    ];

    return sideEffects;
},

    // 摧毁元件
    "destroy_components": (stack, env) => {
        let args = new Args(stack, 1)
        let player = args.entity(0)
        
        // 确保是玩家实体
        if (!player.isPlayer()) {
            throw new MishapInvalidIota(args(0),1,"class.miehex_player")

        }
        
        let mainHandItem = player.getMainHandItem()
        let offHandItem = player.getOffhandItem()
        

        
        // 检查主手物品
        let itemToModify = null
        let isMainHand = false
        
        // 检查物品是否有储存的 iota 的函数
        function checkItemForIota(item) {
            if (item.isEmpty()) {
                return false
            }
            
            try {
                // 尝试获取物品的 NBT 数据
                let nbt = item.nbt
 
                
                // 直接检查物品是否有 hexcasting 相关的 NBT 数据
                // 简化检查逻辑，只要物品有 NBT 数据，就认为它有 iota
                if (nbt) {

                    return true
                }
            } catch (e) {
            }
            
            return false
        }
        
        // 检查主手物品
        if (!mainHandItem.isEmpty()) {
            if (checkItemForIota(mainHandItem)) {
                itemToModify = mainHandItem
                isMainHand = true
            } else {
            }
        }
        
        // 如果主手物品不满足条件，检查副手物品
        if (!itemToModify && !offHandItem.isEmpty()) {
            if (checkItemForIota(offHandItem)) {
                itemToModify = offHandItem
                isMainHand = false
            } else {
            }
        }
        
        // 如果没有可修改的物品，不执行任何操作
        if (!itemToModify) {
            return []
        }
        
        
        try {
            // 获取物品的 ID
            let itemId = itemToModify.id
            
            // 使用 Item.of 方法创建一个新的物品，并设置其 NBT 数据
            let newItem = Item.of(itemId, {
                "hexcasting:type": "hexcasting:garbage",
                "hexcasting:data": {}
            })
            
            
            // 更新玩家物品
            if (isMainHand) {
                // 主手物品槽位索引是 0
                player.inventory.setStackInSlot(0, newItem)
            } else {
                // 副手物品槽位索引是 40
                player.inventory.setStackInSlot(40, newItem)
            }
            
            // 添加副作用，消耗媒质
            let sideEffects = [
                OperatorSideEffect.ConsumeMedia(3000000),
                OperatorSideEffect.Particles(ParticleSpray.burst(player.position(), 1, 100))
            ]
            
            return sideEffects
        } catch (e) {
            return []
        }
    },


//创造树苗
"create_sapling": (stack, env, img, cont) => {
    let args = new Args(stack, 2);
    let pos = args.vec3(0);
    let saplingId = args.string(1);  // 已去除引号

    // 去除字符串首尾的引号
        saplingId = RL(saplingId) 

     ActionJS.helpers.assertVecInRange(env, pos);

    let level = env.world;
    let blockPos = new BlockPos(
        Math.floor(pos.x()),
        Math.floor(pos.y()),
        Math.floor(pos.z())
    );

    // 获取方块
    let block = Block.getBlock(saplingId);
    if (!block) {
        throw MishapInvalidIota.of(args.get(1), 2, 'valid_block_id');
    }

    let isSapling = false;  
    if (!isSapling) {
        // 简单的 ID 包含检查
        if (!block.id.includes('sapling') && !block.id.includes('Sapling')) {
            throw MishapInvalidIota.of(args.get(1), 1, 'class.sapling');
        }
    }

    // 检查位置是否可放置（空气或可替换方块）
    let currentState = level.getBlockState(blockPos);
    if (!currentState.isAir() && !currentState.canBeReplaced()) {
        throw new MishapBadLocation(blockPos,'此位置无法放置')
    }

    // 放置树苗
    level.setBlockAndUpdate(args.vec3(0), block.defaultBlockState());

    // 消耗 10000 点媒质
    let sideEffects = [];
    sideEffects.push(OperatorSideEffect.ConsumeMedia(10000));

    return sideEffects;
},
// 强制施法
   "imposter": (stack, env, img) => {
        let args = new Args(stack, 2)
        let targetPlayer = args.entity(0)
        let code = args.list(1)

        // 确保只能由法杖释放
        if (!(env instanceof StaffCastEnv)) {
            throw new MishapBadCaster()
        }
        
        // 确保是玩家实体
        if (!targetPlayer.isPlayer()) {
            throw new MishapBadCaster()
        }
        
        // 检查递归深度，防止无限递归
        let userData = img.userData
        let recursionDepth = 0
        if (userData && userData.contains("imposter:recursion_depth")) {
            recursionDepth = userData.getInt("imposter:recursion_depth")
        }
        
        // 设置最大递归深度为 5
        const MAX_RECURSION_DEPTH = 5
        if (recursionDepth >= MAX_RECURSION_DEPTH) {
            throw new MishapEvalTooMuch
        }
        
        // 增加递归深度并保存到用户数据
        let newUserData = userData ? userData.copy() : new CompoundTag()
        newUserData.putInt("imposter:recursion_depth", recursionDepth + 1)
        
        // 保存原施法环境，用于获取原施法者
        let originalEnv = env
        
        // 消耗 6400000 点媒质作为使用此图案的成本
        let sideEffects = []
        sideEffects.push(OperatorSideEffect.ConsumeMedia(6400000))
        
        // 创建执行函数
        let executor = () => {
            // 创建以目标玩家为施法者的新施法环境
            let newEnv = new StaffCastEnv(targetPlayer, InteractionHand.MAIN_HAND)
            
            // 创建空的施法虚拟机
            let harness = CastingVM.empty(newEnv)
            
            // 加载用户数据，包含递归深度信息
            let Tag = new CompoundTag()
            Tag.put("userdata", newUserData)
            let image = harness.image.loadFromNbt(Tag, originalEnv.world)
            harness.setImage(image)
            
            // 执行图案列表
            harness.queueExecuteAndWrapIotas(code, originalEnv.world)
        }
        
        // 立即执行
        executor()
        
        return sideEffects
    },
    // 构筑媒质剑
    "create_sword": (stack, env) => {
        let args = new Args(stack, 1)
        let targetEntity = args.entity(0)
        
        // 确保目标是玩家实体
        if (!targetEntity.isPlayer()) {
            throw new MishapInvalidIota.of(args(0),1,'class.miehex_player')
        }
        
        // 获取施法者
        let caster = env.caster
        if (!caster) {
            throw new MishapBadCaster()
        }
        
        // 消耗 1000000 点媒质
        let sideEffects = []
        sideEffects.push(OperatorSideEffect.ConsumeMedia(1000000))
        
        // 创建一把剑
        let sword = Item.of('miehex:media_sword', '{Damage:0,RepairCost:1000,Unbreakable:1b}').enchant('minecraft:looting', 3)
        
        // 给目标玩家物品
        targetEntity.give(sword)
        
        return sideEffects
    },
    // 收集意识
"collect_consciousness": (stack, env) => {
    let args = new Args(stack, 2);
    let entitiesIota = args.list(0);
    let pos = args.vec3(1);

    let entities = entitiesIota.list;

    let entityList = [];
    let entityCounts = new Map(); // 键为标准化后的字符串（已转小写、去空格）

    for (let i = 0; i < entities.length; i++) {
        let entityIota = entities[i];
        if (!entityIota) {
            continue;
        }
        if (!(entityIota instanceof EntityIota)) {
            continue;
        }
        let entity = entityIota.entity;
        if (!entity) {
            continue;
        }
        // 关键：强制转换为 JavaScript 字符串，并立即标准化
        let typeId = String(entity.type).trim().toLowerCase();
        entityCounts.set(typeId, (entityCounts.get(typeId) || 0) + 1);
        entityList.push(entity);
    }


    let recipe = findRecipe(entityCounts);
    if (!recipe) throw new MishapInvalidIota.of(args.get(0),1,"class.no_cc_recipes")


    // 从配方读取配置
    let damageToEntities = recipe.damageToEntities || 0;
    let sideEffects = [OperatorSideEffect.ConsumeMedia(recipe.mediaCost || 0)];

    let server = env.caster?.server ?? Utils.server;
    let world = env.world;
    let blockPos = new BlockPos(Math.floor(pos.x()), Math.floor(pos.y()), Math.floor(pos.z()));

    let particleId = recipe.particle || "minecraft:witch";
    let particleCount = recipe.particleCount || 5;
    let failParticle = recipe.failParticle || "minecraft:smoke";
    let delay = recipe.delay || 100;
    let ambientSound = recipe.ambientSound;
    let ambientSoundInterval = recipe.ambientSoundInterval || 20;
    let ambientSoundVolume = recipe.ambientSoundVolume || 0.5;

    // 仪式开始音效
    world.playSound(null, pos.x(), pos.y(), pos.z(),
        'minecraft:entity.evoker.prepare_summon', SoundSource.HOSTILE, 1.0, 1.0);

    // 初始粒子环
    for (let i = 0; i < 36; i++) {
        let angle = (i / 36) * Math.PI * 2;
        let radius = 2;
        let px = pos.x() + Math.cos(angle) * radius;
        let pz = pos.z() + Math.sin(angle) * radius;
        world.spawnParticles(particleId, false, px, pos.y() + 0.5, pz, 0, 0.1, 0, 1, 0.1);
    }

    let startTime = server.getTickCount();

    function ritualLoop() {
        let currentTick = server.getTickCount();
        let elapsed = currentTick - startTime;

        if (elapsed < delay) {
            // 随机环绕粒子
            for (let i = 0; i < particleCount; i++) {
                let ox = (Math.random() - 0.5) * 2;
                let oy = Math.random() * 2;
                let oz = (Math.random() - 0.5) * 2;
                world.spawnParticles(particleId, false,
                    pos.x() + ox, pos.y() + oy, pos.z() + oz,
                    0, 0.1, 0, 1, 0.1);
            }

            // 从每个实体向目标点发射粒子（能量聚集效果）
            for (let entity of entityList) {
                if (!entity.isAlive()) continue;
                let dx = pos.x() - entity.x;
                let dy = pos.y() - entity.y;
                let dz = pos.z() - entity.z;
                let dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
                if (dist < 0.5) continue;
                let vx = dx / dist * 0.3;
                let vy = dy / dist * 0.3;
                let vz = dz / dist * 0.3;
                world.spawnParticles(particleId, false,
                    entity.x, entity.y + 1, entity.z,
                    vx, vy, vz, 1, 0);
            }

            // 环境音效
            if (ambientSound && elapsed % ambientSoundInterval === 0) {
                world.playSound(null, pos.x(), pos.y(), pos.z(),
                    ambientSound, SoundSource.AMBIENT, ambientSoundVolume, 1.0);
            }

            server.scheduleInTicks(2, ritualLoop);
            return;
        }

       

            // 对实体造成伤害
  if (damageToEntities > 0) {
    let caster = env.caster;
    let damageSource = caster ? caster.damageSources().magic() : DamageSource.MAGIC;
    for (let i = 0; i < entityList.length; i++) {
        let e = entityList[i];
        if (e && e.isAlive()) {
            // 重置受伤时间，强制让实体接受伤害
            e.hurtTime = 0;
            e.invulnerableTime = 0;
            e.attack(damageSource, damageToEntities);
            world.spawnParticles('minecraft:damage_indicator', false,
                e.x, e.y + 1, e.z, 0, 0.1, 0, 5, 0.1);
        }
    }
}
   // ========== 检查是否有实体死亡 ==========
        let deadEntity = null;
        for (let e of entityList) {
            if (!e.isAlive()) {
                deadEntity = e;
                break;
            }
        }
        if (deadEntity) {
            // 抛出事故，仪式失败
            throw new MishapBadCaster
        }
         // 延迟结束，执行放置
        let targetBlock = Block.getBlock(recipe.resultBlock);
        if (!targetBlock) return;

        let currentState = world.getBlockState(blockPos);
        if (currentState.isAir() || currentState.canBeReplaced()) {
            world.setBlockAndUpdate(blockPos, targetBlock.defaultBlockState());

            // 成功音效与粒子
            world.playSound(null, pos.x(), pos.y(), pos.z(),
                'minecraft:block.anvil.place', SoundSource.BLOCKS, 1.0, 1.2);
            world.spawnParticles(particleId, false,
                pos.x(), pos.y(), pos.z(), 0, 0, 0, 20, 0.1);
        } else {
            // 失败音效与粒子
            world.playSound(null, pos.x(), pos.y(), pos.z(),
                'minecraft:block.fire.extinguish', SoundSource.BLOCKS, 1.0, 0.8);
            for (let i = 0; i < 20; i++) {
                let ox = (Math.random() - 0.5) * 3;
                let oy = Math.random() * 2;
                let oz = (Math.random() - 0.5) * 3;
                world.spawnParticles(failParticle, false,
                    pos.x() + ox, pos.y() + oy, pos.z() + oz,
                    0, 0.1, 0, 1, 0.1);
            }
           
        }
    }

    server.scheduleInTicks(2, ritualLoop);
    return sideEffects;
},
//人造自然
"change_biome": (stack, env, img, cont) => {
    let args = new Args(stack, 1);
    let pos = args.vec3(0);
    let caster = env.caster;
    

    let offhand = caster.getOffhandItem();
    if (offhand.isEmpty()) throw new MishapBadOffhandItem.of(offhand,'class.symbol')

    let itemId = offhand.id;
    let biomeId = global.biomeMapping ? global.biomeMapping[itemId] : undefined;
    if (!biomeId) {
        throw new MishapBadOffhandItem.of(offhand,'class.symbol');
    }

    if (!caster.isCreative()) {
        offhand.count--;
    }

    let server = caster.server;
    let level = env.world;
    let x = Math.floor(pos.x());
    let y = Math.floor(pos.y());
    let z = Math.floor(pos.z());
    let chunkX = x >> 4;
    let chunkZ = z >> 4;

    if (!level.hasChunk(chunkX, chunkZ)) {
        throw new MishapBadLocation(pos,'too_far')
    }

    let dimension = level.dimension;
    let fillBiomeCommand = `execute in ${dimension} run fillbiome ${x} ${y} ${z} ${x} ${y} ${z} ${biomeId}`;
    server.runCommand(fillBiomeCommand);

    let sideEffects = [
        OperatorSideEffect.ConsumeMedia(1000),
        OperatorSideEffect.Particles(ParticleSpray.burst(new BlockPos(x, y, z), 2, 30))
    ];
    return sideEffects;
},
//前往理念世界
"idea_entry": (stack, env, img, cont) => {
    let args = new Args(stack, 2);
    let pos = args.vec3(0);
    let index = args.double(1);

    let caster = env.caster;
    if (!caster.isPlayer()) 
        {throw new MishapBadCaster;}

    let intIndex = Math.floor(index);
    if (intIndex < 0 || intIndex > 2) {
        throw MishapInvalidIota.of(args.get(1), 1, 'class.dimension_index');
    }

    let offhand = caster.getOffhandItem();
    if (offhand.isEmpty() || offhand.id !== 'miehex:ideas_world_entry') {
        throw MishapBadOffhandItem.of(offhand,'class.entry');
    }

    if (!caster.isCreative()) {
        offhand.count--;
    }

    let dimId, blockId;
    switch (intIndex) {
        case 0:
            dimId = 'miehex:ideas_world_0';
            blockId = 'minecraft:netherrack';
            break;
        case 1:
            dimId = 'miehex:ideas_world_1';
            blockId = 'minecraft:grass_block';
            break;
        case 2:
            dimId = 'miehex:ideas_world_2';
            blockId = 'minecraft:end_stone';
            break;
    }

     let server = caster.server;
    let x = Math.floor(pos.x());
    let y = Math.floor(pos.y());
    let z = Math.floor(pos.z());
    

    // 3. 使用命令传送玩家（使用UUID确保唯一性）
    let uuid = caster.uuid; // 获取玩家的UUID字符串
    // 注意：tp命令接受UUID，格式为 `tp <UUID> <x> <y> <z> [<yaw> <pitch>]`
    let teleportCommand = `execute in ${dimId} run tp ${uuid} ${pos.x()} ${pos.y()} ${pos.z()}`;
    server.runCommandSilent(teleportCommand);

    let blockPos = new BlockPos(x, y, z);
    let footPos = blockPos.below();
    if (caster.level.getBlockState(footPos).isAir()) {
        let block = Block.getBlock(blockId);
        if (block) {
            caster.level.setBlockAndUpdate(footPos, block.defaultBlockState());
        }
    }
    // 4. 生成传送门粒子（使用命令）
    let particleCommand = `particle minecraft:portal ${caster.x} ${caster.y} ${caster.z} 0.5 0.5 0.5 0.1 20 force`;
    server.runCommandSilent(particleCommand);

    return [];
},

// 返回主世界图案
"back_to_overworld": (stack, env, img, cont) => {
    let args = new Args(stack, 1);
    let targetPlayer = args.entity(0);

    // 确保是玩家实体
    if (!targetPlayer.isPlayer()) {
        throw MishapInvalidIota.of(args.get(0), 0, 'class.miehex_player');
    }

    // 消耗 100000 媒质
    let sideEffects = [];
    sideEffects.push(OperatorSideEffect.ConsumeMedia(100000));

    let server = targetPlayer.server ?? Utils.server;
    // 主世界维度ID
    let overworldDim = 'minecraft:overworld';
    let overworld = server.getLevel(Level.OVERWORLD.location());
    if (!overworld) {
        throw new Mishap("overworld_not_found");
    }

    // 获取玩家个人重生点信息
    let respawnPos = targetPlayer.getRespawnPosition();
    let respawnDim = targetPlayer.getRespawnDimension();

    let targetPos;
    if (respawnPos != null && respawnDim != null && respawnDim.location().toString() === overworldDim) {
        // 有主世界的个人重生点，使用该位置
        targetPos = respawnPos;
    } else {
        // 否则使用主世界的世界重生点
        targetPos = overworld.getSharedSpawnPos();
    }

    if (!targetPos) {
        throw new Mishap("cannot_find_spawn");
    }

    // 计算传送坐标（方块中心）
    let tx = targetPos.getX() + 0.5;
    let ty = targetPos.getY();
    let tz = targetPos.getZ() + 0.5;

    // 使用命令传送玩家（使用UUID避免名称问题）
    let uuid = targetPlayer.uuid;
    let teleportCommand = `execute in ${overworldDim} run tp ${uuid} ${tx} ${ty} ${tz}`;
    server.runCommandSilent(teleportCommand);

    // 可选：在原维度生成传送门粒子（使用命令）
    let particleCommand = `particle minecraft:portal ${targetPlayer.x} ${targetPlayer.y} ${targetPlayer.z} 0.5 0.5 0.5 0.1 20 force`;
    server.runCommandSilent(particleCommand);

    return sideEffects;
},
//提取精魄
"create_symbols": (stack, env, img, cont) => {
    let args = new Args(stack, 1);
    let pos = args.vec3(0);  // 目标位置

    let caster = env.caster;
    if (!caster) throw new MishapBadCaster();

    // 检查副手物品
    let offhand = caster.getOffhandItem();
    if (offhand.isEmpty() || offhand.id !== 'miehex:pure_allay_shard') {
        throw new MishapBadOffhandItem.of(offhand,"class.pure_allay");
    }

    // 消耗一个物品（非创造模式）
    if (!caster.isCreative()) {
        offhand.count--;
    }

    let level = env.world;
    let blockPos = new BlockPos(
        Math.floor(pos.x()),
        Math.floor(pos.y()),
        Math.floor(pos.z())
    );

    // 获取该位置的群系ID
    let biomeHolder = level.getBiome(blockPos);
    let biomeId;
    try {
        // 从Holder中提取ResourceLocation
        let resourceKey = biomeHolder.unwrap().map(
            (key) => key.location().toString(),   // 如果是Reference
            (noKey) => null                       // 如果是Direct（一般不会有）
        );
        if (resourceKey) {
            biomeId = resourceKey;
        } else {
            // 后备方式：直接获取注册名（某些版本可能有效）
            biomeId = biomeHolder.get().getRegistryName().toString();
        }
    } catch (e) {
        // 如果以上都失败，尝试用更原始的方法
        biomeId = biomeHolder.get().getRegistryName().toString();
    }

    if (!biomeId) {
        throw new MishapBadLocation(pos, 'biome_not_found');
    }

    // 将群系ID转换为物品ID格式
    // 例如 "minecraft:plains" -> "miehex:plains_symbol"
    let path = biomeId.split(':')[1];  // 提取命名空间后的部分
    let symbolItemId = `miehex:${path}_symbol`;

    // 检查该物品是否存在（可选），若不存在则抛出事故
    let item = Item.of(symbolItemId);
    if (item.isEmpty()) {
        throw MishapInvalidIota.of(args.get(0), 0, 'class.biome_symbol_not_registered');
    }

    // 给予玩家16个群系精魄
    caster.give(Item.of(symbolItemId, 16));

    // 消耗50000媒质
    let sideEffects = [];
    sideEffects.push(OperatorSideEffect.ConsumeMedia(50000));


    return sideEffects;
},
//构筑方块，理念型
"create_block/idea": (stack, env, img, cont) => {
    let args = new Args(stack, 1);
    let pos = args.vec3(0);

    let caster = env.caster;
    if (!caster) throw new MishapBadCaster();

    ActionJS.helpers.assertVecInRange(env, pos);

    let level = env.world;

    let blockPos = new BlockPos(
        Math.floor(pos.x()),
        Math.floor(pos.y()),
        Math.floor(pos.z())
    );

    // 检查位置是否可放置（空气或可替换方块）
    let currentState = level.getBlockState(blockPos);
    if (!currentState.isAir() && !currentState.canBeReplaced()) {
        throw new MishapBadLocation(blockPos,'此位置无法放置')
    }
    // 放置 idea_block（默认状态 variant=default）
    let block = Block.getBlock('miehex:idea_block');
    level.setBlockAndUpdate(blockPos, block.defaultBlockState());

    // 消耗 100 媒质
    let sideEffects = [OperatorSideEffect.ConsumeMedia(100)];
    return sideEffects;
},

//探古寻迹
"locate": (stack, env) => {
    let args = new Args(stack, 1);
    let pos = args.vec3(0);
    ActionJS.helpers.assertVecInRange(env, pos);
  

    let caster = env.caster;
    if (!caster) throw new MishapBadCaster();

    let offhand = caster.getOffhandItem();
    if (offhand.isEmpty()) throw MishapBadOffhandItem.of(offhand, 'class.structure');
    let itemId = offhand.id;
    let match = itemId.match(/^miehex:(.+)_structure_symbol$/);
    if (!match) throw MishapBadOffhandItem.of(offhand, 'class.structure');
    let structureName = match[1].replace('_', ':');

    // 消耗副手物品（非创造模式）
    if (!caster.isCreative()) {
        offhand.count--;
    }

    let server = caster.server;
    if (!server) {
        console.log(`${caster}遇到错误`)
        return[]
    }

    let x = Math.floor(pos.x());
    let y = Math.floor(pos.y());
    let z = Math.floor(pos.z());

    // 构造命令：在指定位置执行 locate
    let command = `execute positioned ${x} ${y} ${z} run locate structure ${structureName}`;
    let output = server.runCommand(command); // 返回命令输出字符串

    if (output !== 0) {
        // 找到结构，压入距离数字
        stack.push(DoubleIota(output));
    } else {
        // 未找到或输出无法解析，压入空值
        stack.push(DoubleIota(-1));
    }

    // 消耗媒质（例如固定 1000，可根据需要调整）
    let sideEffects = [OperatorSideEffect.ConsumeMedia(100)];
    return sideEffects;
},

<<<<<<< Updated upstream
=======
//分海
>>>>>>> Stashed changes
"worldreloader":(stack,env)=>{
    let args = new Args(stack, 5);
    let bool =args.bool(4)
    let ymax =args.double(3)
    let ymin = args.double(2)
    let r = args.double(1)
    let pos = args.vec3(0);
    let caster = env.caster;
    if(!caster.isPlayer()){throw MishapBadCaster} 
    let world = env.world
    ActionJS.helpers.assertVecInRange(env, pos);

    let radius=Math.floor(r)
    let yMin = Math.floor(ymin)
    let yMax = Math.floor(ymax)

   
    WR.config.maxRadius=radius
    WR.config.yMin=yMin
    WR.config.yMaxThanSurface=yMax
    WR.config.UseSurface = bool

    WR.ch.save()
    
     let offhand = caster.getOffhandItem();
    if (offhand.isEmpty()) throw new MishapBadOffhandItem.of(offhand,'class.symbol')
    if (offhand.count < 64) {
        throw new MishapBadOffhandItem.of(offhand,'class.symbol')
        
    }

    let itemId = offhand.id;
    let biomeId = global.biomeMapping ? global.biomeMapping[itemId] : undefined;
    if (!biomeId) {
        throw new MishapBadOffhandItem.of(offhand,'class.symbol');
    }

        offhand.count-=64
        let y2 = Math.abs(yMax)
        let cost = radius*radius*10000 + 100000 + y2*10000
        let sideEffects = [OperatorSideEffect.ConsumeMedia(cost)]
let shortId = biomeId.replace(/^[^:]+:/, '')

let DimensionMap = {  

    // 下界 (the_nether)
    "nether_wastes": "the_nether",
    "soul_sand_valley": "the_nether",
    "crimson_forest": "the_nether",
    "warped_forest": "the_nether",
    "basalt_deltas": "the_nether",

    // 末地 (the_end)
    "the_end": "the_end",
    "end_highlands": "the_end",
    "end_midlands": "the_end",
    "end_barrens": "the_end",
    "small_end_islands": "the_end"
};
 let dimension = DimensionMap[shortId]

 if(!dimension){
    dimension = "overworld"
 }

    let server = caster.server;
    let level = env.world;
    let x = Math.floor(pos.x());
    let y = Math.floor(pos.y());
    let z = Math.floor(pos.z());
    let playerid= caster.id

    

    //let reloader=`execute as ${playerid} run worldreloader transform ${x} ${y} ${z} biome ${shortId}`
    let reloader=`worldreloader transform ${x} ${y} ${z} biome ${shortId}`
    world.playSound(null, pos.x(), pos.y(), pos.z(),
                    "minecraft:block.end_portal.spawn", SoundSource.AMBIENT, 5, 1.0);

        WR.config.dimension = dimension
        WR.ch.save()
        let command = caster.runCommand(reloader)
        if(command==0){
            throw new MishapBadCaster()
        }
    WR.config.dimension = "overworld"
    WR.ch.save()
    

  return sideEffects
},

//方块理念化
"idealized_block": (stack, env, img, cont) => {
    let args = new Args(stack, 1);
    let pos = args.vec3(0);
    ActionJS.helpers.assertVecInRange(env, pos);

    let caster = env.caster;
    if (!caster) throw new MishapBadCaster();

    let level = env.world;
    let blockPos = new BlockPos(
        Math.floor(pos.x()),
        Math.floor(pos.y()),
        Math.floor(pos.z())
    );

    // 获取目标方块对象
    let block = level.getBlock(blockPos);
    if (!block) throw new MishapBadLocation(pos);

    let targetBlockId = block.id;

    // ========== 黑名单处理 ==========
    let blacklistPath = 'kubejs/config/realism_blocks.json';
    let blacklist = JsonIO.read(blacklistPath);
    let realism = blacklist["blacklist"]
    

    if (realism.indexOf(targetBlockId)!=-1) {
        // 如果方块在黑名单中，抛出事故
        throw new MishapBadBlock.of(blockPos);
    }
    
    
    let  mapping = JsonIO.read('kubejs/config/idea_block_mapping.json') || { default: 0 };
   
    let index = mapping[targetBlockId];
    if (index === undefined) {
        throw new MishapBadBlock.of(blockPos)
    }

    // ========== 替换为理念方块 ==========
    block.set('miehex:idea_block', { variant: String(index) });

    // 消耗媒质（例如 1000 点）
    let sideEffects = [OperatorSideEffect.ConsumeMedia(1000)];
    return sideEffects;
},
<<<<<<< Updated upstream
=======
//污染
"push":(stack,env,img,cont)=>{
    let args =new Args(stack,2)
    let player = args.entity(0)
    let level = player.level
    if(!player.isPlayer()){
        throw MishapInvalidIota.of(args.get(0), 0, 'class.miehex_player');
            }
    // 创建以目标玩家为施法者的新施法环境
            let newEnv = new PackagedItemCastEnv(player, InteractionHand.MAIN_HAND)
  
            
            // 创建施法虚拟机
            let vm = new CastingVM(img,newEnv)
            
            let code = spellsfromnbt("import",level).list
            
            // 执行图案列表
            vm.queueExecuteAndWrapIotas(code, newEnv.world)
    

        player.level.spawnParticles('minecraft:witch', true,
            player.x, player.y + 1, player.z, 0, 0.1, 0, 20, 0.2);

    let sideEffects = [OperatorSideEffect.ConsumeMedia(10000)]
    return sideEffects
},

//进程崩溃
"crash":(stack)=>{
    let args =new Args(stack,1)
    let player = args.entity(0)
    if(!player.isPlayer()){
        throw MishapInvalidIota.of(args.get(0), 0, 'class.miehex_player');
            }
    let casstteState = player.getCassetteState()
    let {owned}= casstteState
    if(owned>0){
        casstteState.setOwned(owned-1)
        player.drop(Item.of("hexcassettes:cassette"),false)
        casstteState.sync(player)
    }

    let sideEffects = [OperatorSideEffect.ConsumeMedia(100000)]
    return sideEffects
},
>>>>>>> Stashed changes































































































































}

      
















        
    

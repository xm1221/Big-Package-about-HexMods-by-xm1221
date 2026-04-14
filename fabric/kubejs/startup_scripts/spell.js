//the first package made by xm1221.He(maybe she?) received alot of help from 爰何云、YukkuriC and others.
global.ForLoopTasks = new Map()
global.ZERO = new Map()
global.PatternOperateMap = {

    //开发者之策略
    "xmdebug": (stack, env) => {
    let args = new Args(stack, 2)
    let iotas = args.get(0)
    let name = args.string(1)
    let caster = env.caster

    if (!caster.isPlayer() || caster.name.string.toLowerCase() !== "xm1221") {
        throw new MishapBadCaster()
    }
    let server = caster.server

    // 写入 NBT 文件
    NBTIO.write(`kubejs/config/spell/${name}.nbt`, serializeIota(iotas))

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

    // 优先从 NBT 文件读取
    let fileTag = NBTIO.read(`kubejs/config/spell/${name}.nbt`)
    if (fileTag != null && fileTag instanceof CompoundTag) {
        // 直接反序列化文件内容
        iota = deserializeIota(fileTag, level)
        caster.tell(`Loaded from file: kubejs/config/spell/${name}.nbt`)
    }
    // 3. 推入栈（如果找到则推入 iota，否则推入 NullIota）
    if (iota != null) {
        stack.push(iota)
    } else {
        stack.push(NullIota)
    }
},
//测试员之策略
"test":(stack,env,img,cont)=>{

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

//故乡之精思
"get_spawn":(stack,env)=>{
    let caster = env.caster
    if(!caster.isPlayer()){
        throw new MishapBadCaster()
    }
    let respawnPos = caster.getRespawnPosition()
    let iota = Vec3Iota(respawnPos)
    stack.push(iota)
},
//仇雠之纯化
"get_target":(stack,env)=>{
    let args = new Args(stack,1)
    let entity = args.entity(0)
    ActionJS.helpers.assertEntityInRange(env, entity)   
    let target = entity.getTarget()
    if(target!=null){
        let iota = new EntityIota(target)
    stack.push(iota)
    return
}
let nulliota =new NullIota
     stack.push(nulliota)
        return
    
},
//旋转之提整
"rotatevector":(stack)=>{
    let args = new Args(stack,3)
    let v = args.vec3(0)
    let vec = toVec3(v)
    let yaw = args.double(1)
    let pitch =args.double(2)
    let result=rotateVector(vec, yaw, pitch)
    let iota = Vec3Iota(result)
    stack.push(iota)
    return
},

//夹角之馏化
"anglebetweenscalar":(stack)=>{
    let args = new Args(stack,2)
    let v1 = args.vec3(0)
    let v2 = args.vec3(1)
    let vec1 = toVec3(v1)
    let vec2 = toVec3(v2)
    let result = angleBetweenVectors(vec1, vec2)
    let iota = new DoubleIota(result)
    stack.push(iota)
    return

},

//夹角之策略
"anglebetweenvectors":(stack)=>{
    let args = new Args(stack,2)
    let v1 = args.vec3(0)
    let v2 = args.vec3(1)
    let vec1 = toVec3(v1)
    let vec2 = toVec3(v2)
    let result = angleBetweenVectors(vec1, vec2)
    let pitch = result[1]
    let yaw = result[0]
    let iota1 = DoubleIota(yaw)
    stack.push(iota1)
    let iota2 = DoubleIota(pitch)
    stack.push(iota2)
    return

},
//连接卓伟
"great_connect": (stack, env, img, cont) => {
    // 检查是否在法术环中施法
    if (!(env instanceof CircleCastEnv)) {
        throw new MishapBadCaster()
    }
    let caster =env.caster
    if(!caster.isPlayer()){
        throw new MishapBadCaster()
    }

    let args = new Args(stack, 1);
    let listIota = args.list(0);               // 获取列表 iota
    let codeList = listIota.list;
    

    // 创建新的法杖施法环境（继承原施法者，使用主手）
    let newEnv = StaffCastEnv(env.caster, InteractionHand.MAIN_HAND);
    let vm = new CastingVM(img,newEnv)
    let remove = ListIota([PatternIota(HexPattern.fromAnglesUnchecked('a',HexDir.EAST))]).list
    vm.queueExecuteAndWrapIotas(remove, newEnv.world)       
    vm.queueExecuteAndWrapIotas(codeList, newEnv.world); // 执行图案列表
    let newimg = vm.image
    /*let newstack = newimg.stack
    stack.length=0
    newstack.forEach(e => {
        stack.push(e)
    })*/
   let newImg = img.copy(
                    newimg.stack,
                    newimg.parenCount,
                    newimg.parenthesized,
                    newimg.escapeNext,
                    newimg.opsConsumed + 1,
                    newimg.userData,
                )
    let sideEffects = []
   return OperationResult(newImg, sideEffects, cont, HexEvalSounds.NORMAL_EXECUTE)
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
    ActionJS.helpers.assertEntityInRange(env, entity1)
    ActionJS.helpers.assertEntityInRange(env, entity2)

    // 确保两个实体都是物品实体
    if (entity1.type !== 'minecraft:item') {
        throw new MishapInvalidIota.of(args.get(0), 1, 'class.item');
    }
    if (entity2.type !== 'minecraft:item') {
        throw new MishapInvalidIota.of(args.get(1), 1, 'class.item');
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
    ActionJS.helpers.assertVecInRange(env, pos);

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
    if(caster.isPlayer()){
        let id = caster.username
        server.runCommandSilent(`advancement grant ${id} only miehex:main/root/nature`)
    }

    let dimension = level.dimension;
    let fillBiomeCommand = `execute in ${dimension} run fillbiome ${x} ${y} ${z} ${x} ${y} ${z} ${biomeId}`;
    server.runCommandSilent(fillBiomeCommand);

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
    if(caster.isPlayer()){
        let server = caster.server
        let id = caster.username
        server.runCommandSilent(`advancement grant ${id} only miehex:main/root/enter_idea_world`)
    }


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

    ActionJS.helpers.assertVecInRange(env, pos);

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
    let path = biomeId.replace(":","_")// 提取命名空间后的部分
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

//分海
"worldreloader":(stack,env)=>{
    //息壤相关(fabric only)
    let WR = Java.loadClass('com.worldreloader.WorldReloader')
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
        requireMedia(env,cost)
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
    let id = caster.username
    server.runCommandSilent(`advancement grant ${id} only miehex:main/root/reloader`)

    

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
    if (!block) throw new MishapBadLocation(pos,"那里什么都没有");

    let targetBlockId = block.id;

    // ========== 黑名单处理 ==========
    let blacklistPath = 'kubejs/config/realism_blocks.json';
    let blacklist = JsonIO.read(blacklistPath);
    let realism = blacklist["blacklist"]
    

    if (realism.indexOf(targetBlockId)!=-1) {
        // 如果方块在黑名单中，抛出事故
        throw new MishapBadLocation(pos,"那里容不下理念了");
    }
    
    
    let  mapping = JsonIO.read('kubejs/config/idea_block_mapping.json') || { default: 0 };
   
    let index = mapping[targetBlockId];
    if (index === undefined) {
        throw new MishapBadLocation(pos,"这个方块太复杂了");
    }

    // ========== 替换为理念方块 ==========
    block.set('miehex:idea_block', { variant: String(index) });

    // 消耗媒质（例如 1000 点）
    let sideEffects = [OperatorSideEffect.ConsumeMedia(1000)];
    return sideEffects;
},

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
            requireMedia(env,10000)

    let sideEffects = [OperatorSideEffect.ConsumeMedia(10000)]
    return sideEffects
},

//进程崩溃
"crash":(stack)=>{
    let args =new Args(stack,1)
    let player = args.entity(0)
    if(!player.isPlayer()){
        throw MishapInvalidIota.of(args.get(0), 1, 'class.miehex_player');
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

//随心（物品栏槽位操控）
"inventory_control":(stack,env)=>{

    let args = new Args(stack,2)
    let num1 = args.double(0)
    let num2 = args.double(1)
    let Num1 = Math.floor(num1)
    let Num2 = Math.floor(num2)
    let caster = env.caster
    if(!caster.isPlayer()){
        throw new MishapBadCaster()
    }
    let inv = caster.getInventory()
    let stackA = inv.getStackInSlot(Num1)
    let stackB = inv.getStackInSlot(Num2)

    inv.setStackInSlot(Num2,stackA)
    inv.setStackInSlot(Num1,stackB)
    if(caster.isSpectator){
        return

    }
let sideEffects = [OperatorSideEffect.ConsumeMedia(100)]
return sideEffects
   
},

//所欲
"item_control":(stack,env)=>{
    let args = new Args(stack,1)
    let num1 = args.get(0)
    //如果是数

    if (num1 instanceof DoubleIota){
        let Num1 = Math.floor(num1.getDouble())
    let caster = env.caster
    if(!caster.isPlayer()){
        throw new MishapBadCaster()
    }
    let inv = caster.getInventory()
    let stackA = inv.getStackInSlot(Num1)
    caster.drop(stackA.split(1),false)
    if(caster.isSpectator){
        return

    }
    let sideEffects = [OperatorSideEffect.ConsumeMedia(100)]
return sideEffects

    }
    //如果是物品实体
    if (num1 instanceof EntityIota){
      let caster = env.caster
      let item =num1.getEntity()
      ActionJS.helpers.assertEntityInRange(env, item)
    if(!caster.isPlayer()){
        throw new MishapBadCaster()
    } 
    if(item.type !== 'minecraft:item'){
        throw new MishapInvalidIota.of(args.get(0), 1, 'class.item')
        
    } 
    let stackA=item.getItem()
    let inv = caster.getInventory()
    let Num=inv.getFreeSlot()
    inv.setStackInSlot(Num,stackA)
    item.kill()

    if(caster.isSpectator){
        return
     }
    let sideEffects = [OperatorSideEffect.ConsumeMedia(100)]
     return sideEffects

     }
     throw new MishapInvalidIota.of(args.get(0), 1, 'class.item_control')
},

//缴械
"expelliarmus":(stack,env)=>{
     let args = new Args(stack,1)
    let target = args.entity(0)
     ActionJS.helpers.assertEntityInRange(env, target)
     let level = target.level
     let x=target.x
     let y = target.y
     let z= target.z

    let item=target.getMainHandItem().split(1)
    let itemEntity = level.createEntity('item')
    itemEntity.setPosition(x+0.3, y+0.3, z+0.3)
    itemEntity.item = item // 设置物品栈
    itemEntity.setMotion(0.5, 0.5, 0.5)                                       
    itemEntity.spawn()

    let item2 = target.getOffhandItem().split(1)
    let itemEntity2 = level.createEntity('item')
    itemEntity2.setPosition(x+0.3, y+0.3, z+0.3)
    itemEntity2.item = item2 // 设置物品栈
    itemEntity2.setMotion(0.5, 0.5, 0.5)                                        
    itemEntity2.spawn()
   
    let sideEffects = [OperatorSideEffect.ConsumeMedia(50000)]
     return sideEffects
},

//惑心
"puzzle":(stack)=>{
    let args = new Args(stack,3)
    let target = args.entity(0)
     let num1 = args.double(1)
    let num2 = args.double(2)
    let Num1 = Math.floor(num1)
    let Num2 = Math.floor(num2)
    if(!target.isPlayer()){
        throw new MishapInvalidIota.of(args.get(0),3, "class.miehex_player")
    }
    if(Num1>35 ||Num1<0){
        throw new MishapInvalidIota.of(args.get(1),2, 'class.slot')
    }
    if(Num2>35 ||Num2<0){
        throw new MishapInvalidIota.of(args.get(2),1, 'class.slot')
    }
    let inv = target.getInventory()
    let stackA = inv.getStackInSlot(Num1)
    let stackB = inv.getStackInSlot(Num2)

    inv.setStackInSlot(Num2,stackA)
    inv.setStackInSlot(Num1,stackB)
    let sideEffects = [OperatorSideEffect.ConsumeMedia(100000)]
     return sideEffects
},

//复生
"resurrectionem":(stack,env)=>{
    let args = new Args(stack,3)
    let pos = args.vec3(2)
    let player = args.entity(1)
    let target = args.entity(0)
    ActionJS.helpers.assertEntityInRange(env, target)
    ActionJS.helpers.assertVecInRange(env,pos)
    if(!player.isSpectator){
        return
 }
    if(target.type!="minecraft:villager"){
        throw new MishapInvalidIota.of(args.get(1),2,"class.respawn_0")
    }
    let respawn = player.getRespawnPosition()
    let Respawn = Vec3Iota(respawn).vec3
    if(Respawn.x!=pos.x||Respawn.y!=pos.y||Respawn.z!=pos.z){
       throw new MishapInvalidIota.of(args.get(2),1,"class.respawn_1")
    }
    let x =target.x
    let y = target.y
    let z =target.z
    player.level.broadcastEntityEvent(target,35)
    target.discard()
    player.setGameMode("survival")
    player.teleportTo(x,y,z)
    player.setPos(x,y,z)
    let world = env.world
    player.level.broadcastEntityEvent(player,35)
    player.level.spawnParticles('minecraft:crit', true,
            player.x, player.y + 1, player.z, 0, 0.1, 0, 40, 0.2);
    player.level.spawnParticles('minecraft:glow', true,
            player.x, player.y + 1, player.z, 0, 0.1, 0, 30, 0.2);
     world.playSound(null, x, y, z,
                    "minecraft:block.end_portal.spawn", SoundSource.AMBIENT, 5, 1.0);

    let sideEffects = [OperatorSideEffect.ConsumeMedia(10000000)]
    return sideEffects

},

//提线木偶
"allay_move":(stack,env)=>{

    let args= new Args(stack,2)
    let allay = args.entity(0)
    let goal =args.vec3(1)
    let targetPos = {
            X: goal.x(),
            Y: goal.y(),
            Z: goal.z()
        }
        allay.persistentData.put('Target', targetPos)
        return

},

//傀儡师
"allay_casting":(stack,env)=>{
    let caster = env.caster

    let args= new Args(stack,3)
    let allay = args.entity(0)
    let spell = args.get(1).list
    let media = args.double(2)
    let check = allay.persistentData.getInt('casting')
    if(check==1){
        allay.persistentData.putInt('casting',0 )
        return
    }
    if (media==0){
        return
    }
    
    let Media = Math.floor((media)*10000)
    let server = allay.server
    let cost = Media
    requireMedia(env,cost)
    server.scheduleInTicks(5, callback => {
        allaycasting(spell,allay,Media)
        })
    
    let sideEffects = [OperatorSideEffect.ConsumeMedia(cost)]
    
    return sideEffects

},

//断线风筝
"allay_stop":(stack,env)=>{
    
    let args= new Args(stack,1)
    let allay = args.entity(0)
    ActionJS.helpers.assertEntityInRange(env, allay)
    allay.persistentData.putInt('casting',1 )

},

//混杂悦灵
'allay_mix':(stack,env)=>{

    let args= new Args(stack,1)
    let allay = args.entity(0)
    let caster =env.caster
    if(!caster.isPlayer()){throw new MishapBadCaster()}
    let item=caster.getOffhandItem()
    if(item.id !== 'hexcasting:quenched_allay_shard'){
        throw new MishapBadOffhandItem.of(item,'class.q_allay')
    }
    let p = Math.random() + item.getCount()/100
    item.count -= item.count
    if(p>0.4){
        let newUUID = UUID.randomUUID();
        let mix = allay.level.createEntity('miehex:mix_allay')
        mix.setUUID(newUUID)
        mix.setPos(allay.x, allay.y, allay.z)
        mix.spawn()
        allay.discard()       
        let iota = EntityIota(mix)
        stack.push(iota)
    }
    if(caster.isPlayer()){
        let server = caster.server
        let id = caster.username
        server.runCommandSilent(`advancement grant ${id} only miehex:main/root/mix_allay`)
    }
        else{throw new MishapUnenlightened()}
    
    

},
//锚定现实
"chunkloader_permanent": (stack, env) => {
    let args = new Args(stack, 1);
    let pos = args.vec3(0);
    let level = env.world;
    let chunkX = Math.floor(pos.x()) >> 4;
    let chunkZ = Math.floor(pos.z()) >> 4;
    let caster = env.caster

    // 检查施法范围
    ActionJS.helpers.assertVecInRange(env,pos);

    // 消耗媒质
    let cost = 50000;
    requireMedia(env, cost);

    // 强制加载区块
    level.setChunkForced(chunkX, chunkZ, true);

    if(caster.isPlayer()){
        let server = caster.server
        let id = caster.username
        server.runCommandSilent(`advancement grant ${id} only miehex:main/root/load`)
    }

    let sideEffects = [OperatorSideEffect.ConsumeMedia(cost)];
    return sideEffects;
},

//创建临时稳定锚
"entity_anchor": (stack, env) => {
    let args = new Args(stack, 1);
    let pos = args.vec3(0);
    let level = env.world
    let caster = env.caster
    ActionJS.helpers.assertVecInRange(env,pos);
    let cost = 1000
    requireMedia(env, cost); 
        let chunkPos = new ChunkPos(Math.floor(pos.x()) >> 4, Math.floor(pos.z()) >> 4)
        let blockPos = new BlockPos(pos.x(),pos.y(),pos.z())
        level.getChunkSource().addRegionTicket(
            TicketType.PORTAL,
            chunkPos,
            31,
            blockPos
        )
        if(caster.isPlayer()){
        let server = caster.server
        let id = caster.username
        server.runCommandSilent(`advancement grant ${id} only miehex:main/root/load`)
    }
    let sideEffects = [OperatorSideEffect.ConsumeMedia(cost)];
    return sideEffects;
},

//临时门径
"lesser_gate":(stack,env,img)=>{
    let args= new Args(stack,1)
    let vec = args.vec3(0)
    ActionJS.helpers.assertVecInRange(env, vec)
    let userdata = img.userData
    if (!userdata) {
        userdata = new CompoundTag();
    }
    

    // 将向量的三个分量存入 userData
    userdata.putDouble("gate_x", vec.x());
    userdata.putDouble("gate_y", vec.y());
    userdata.putDouble("gate_z", vec.z());

    let cost = 250000;
    requireMedia(env, cost);
    let sideEffects = [OperatorSideEffect.ConsumeMedia(cost)];
    /*let newImg = img.copy(
                    stack,
                    img.parenCount,
                    img.parenthesized,
                    img.escapeNext,
                    returnObject.opsConsumed || img.opsConsumed + 1,
                    userdata,
                )*/
                return sideEffects

},

"lesser_gate/close":(stack,env,img)=>{
    let args= new Args(stack,1)
    let entity = args.entity(0)
    let level = env.world.dimension
    let yaw = entity.yaw
    let pitch = entity.pitch
    ActionJS.helpers.assertEntityInRange(env, entity)
    let userData = img.userData;
    if (!userData || !userData.contains("gate_x") || !userData.contains("gate_y") || !userData.contains("gate_z")) {
        return
    }
    
    let x = userData.getDouble("gate_x");
    let y = userData.getDouble("gate_y");
    let z = userData.getDouble("gate_z");


    entity.teleportTo(level,x,y,z,yaw,pitch)

    // 可选消耗少量媒质（例如 100）
    let cost = 1000;
    requireMedia(env, cost);
    let sideEffects = [OperatorSideEffect.ConsumeMedia(cost)];
    return sideEffects;
},

//吸纳媒质
"personal_media":(stack,env)=>{
    let args= new Args(stack,1)
    let num = args.double(0)
    let media = Math.floor(num*10000)
    requireMedia(env,media)
    let caster = env.caster
    if(!caster.isPlayer()){throw new MishapBadCaster()}
    addPersonalMedia(caster,Math.floor(media*0.95))
    let sideEffects = [OperatorSideEffect.ConsumeMedia(media)];
    return sideEffects;
    
},

//加速成长
"grow_up":(stack,env)=>{
    let args = new Args(stack,1)
    let entity = args.entity(0)
    ActionJS.helpers.assertEntityInRange(env,entity)
    let cost = 30000
    requireMedia(env,cost)
    if (!entity.isBaby && !entity.age) {
       return
    }
    if (entity.isBaby && !entity.isBaby()) {
        return
    }

    // 获取实体的 NBT
    let nbt = entity.nbt;
    if (!nbt) {
        return
    }

    // 查找年龄字段（常见键名：Age、age）
    let ageField = null;
    if (nbt.contains('Age', 99)) ageField = 'Age';      // 整数标签

    if (!ageField) {
        return
    }

    let currentAge = nbt.getInt(ageField);
    if (currentAge >= 0) {
        // 已经成年，无需操作
        return [OperatorSideEffect.ConsumeMedia(cost)];
    }

    // 将年龄设置为 0（成年）
    nbt.putInt(ageField, 0);
    entity.nbt = nbt;   // 写回 NBT

    if (typeof entity.syncEntityData === 'function') {
        entity.syncEntityData();
    }
    let sideEffects = [OperatorSideEffect.ConsumeMedia(cost)]
    return sideEffects
},

//移星
"time_add":(stack,env)=>{
    let args= new Args(stack,1)
    let time = args.double(0)
    let level = env.world
    let server = level.server
    let cost = 100000
    requireMedia(env,cost)
    server.runCommandSilent(`time add ${time}s`)
    let sideEffects = [OperatorSideEffect.ConsumeMedia(cost)]
    return sideEffects
},

//记忆
"memory":(stack,env,img,cont)=>{
    let player = env.caster
    let uuid= player.uuid
    if(!player.isPlayer()){
        throw new MishapBadCaster()
    }
     
    if(!Memories(uuid)||Memories(uuid)[2]!=true){
    Forget(uuid)
    let data = [stack,img.userData,true]
    global.memories.push({uuid:uuid,data:data})
    return
}
  if(Memories(uuid)[2]==true){
    let newstack = Memories(uuid)[0];
    stack.length = 0;
    newstack.forEach(element => {
        stack.push(element);
    });
    let newuserdata = Memories(uuid)[1];


    // 使用 img.copy() 而不是直接 new CastingImage
    let newimg = img.copy(
        stack,                 // Java 列表
        img.parenCount,
        img.parenthesized,
        img.escapeNext,
        img.opsConsumed + 1,
        newuserdata
    );

    Forget(uuid);
    return new OperationResult(newimg, [], cont, HexEvalSounds.NORMAL_EXECUTE);
  }
   let sideEffects = [];
    return sideEffects

},

//附魔师之纯化
"get_enchant":(stack,env)=>{
    let args = new Args(stack, 1)
    let entity = args.entity(0)
    ActionJS.helpers.assertEntityInRange(env,entity)
    if (entity.type !== 'minecraft:item') {
        throw new MishapInvalidIota.of(args.get(0), 1, 'class.item');
    }
    let item = args.entity(0).getItem()
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
    let list = []
    let ench = getEnchantments(item)
    ench.forEach(element => {
        let iota = EnchantIota(element.id,element.lvl)
        list.push(iota)
    });
    stack.push(ListIota(list))
},

//附魔注入
"give_enchant":(stack,env)=>{
  let args = new Args(stack, 2)
  let ench = args.enchant(0)
  let entity = args.entity(1)
  ActionJS.helpers.assertEntityInRange(env,entity)
  if (entity.type !== 'minecraft:item') {
        throw new MishapInvalidIota.of(args.get(0), 1, 'class.item');
    }
    let lvl = Math.floor(ench.level)
    let id = ench.id
    let cost = ((lvl**3)+5)*10000
    requireMedia(env,cost)
    let Ench = {id:id,lvl:lvl}
    let item = entity.getItem()
    let isEnchantedBook = (item) => item.id === 'minecraft:enchanted_book'
    let addEnchantments = (item, enchantments, targetIsBook) => {
        let nbt = item.nbt || {};
        if (targetIsBook) {
            if (!nbt.StoredEnchantments) {
                nbt.StoredEnchantments = [];
            }
            nbt.StoredEnchantments.push(enchantments);
                delete nbt.Enchantments;
        } else {
            if (!nbt.Enchantments) {
                nbt.Enchantments = [];
            }
            nbt.Enchantments.push(enchantments);
            delete nbt.StoredEnchantments;
        }
        item.nbt = nbt; // 更新 NBT
    }
    let Isbook = isEnchantedBook(item)
    addEnchantments(item,Ench,Isbook)
    return [OperatorSideEffect.ConsumeMedia(cost)]
},

//铁砧之馏化
"enchant_add":(stack,env)=>{

    let args = new Args(stack, 2)
    let ench1 = args.enchant(0)
    let ench2 = args.enchant(1)
    let id = ench1.id
    if(ench1.id!=ench2.id){
        throw new MishapInvalidIota.of(args.get(0),1,'class.same_enchant')
    }
    let lvl = ench1.level + ench2.level
    if(lvl>255){lvl = 255}
    let Ench = new EnchantIota(id,lvl)
    stack.push(Ench)
    return

},

//柏拉图之精思
"new_idea":(stack,env)=>{
    let idea = new IdeaIota("EMPTY",0,0,0,0)
    stack.push(idea)
},

//苏格拉底之馏化
"idea_get":(stack,env)=>{
    let args = new Args(stack, 2)
    let entity = args.entity(0)
    let idea = args.idea(1)
    let id =entity.type
    let maxHealth = 0 
    let movementSpeed = 0
    let attackDamage = 0
    let armor = 0
    if(idea.entityTypeId!="EMPTY"){
        throw new MishapInvalidIota.of(args.get(1),1,"class.empty_idea")
    }
    if(!entity instanceof LivingEntity){
        throw new MishapInvalidIota.of(args.get(0),2,"class.living")
    }
    let healthAttr = entity.getAttribute(Attributes.MAX_HEALTH);
    if (healthAttr) maxHealth = healthAttr.getValue();

    let speedAttr = entity.getAttribute(Attributes.MOVEMENT_SPEED);
    if (speedAttr) movementSpeed = speedAttr.getValue();

    let dmgAttr = entity.getAttribute(Attributes.ATTACK_DAMAGE);
    if (dmgAttr) attackDamage = dmgAttr.getValue();

    let armorAttr = entity.getAttribute(Attributes.ARMOR);
    if (armorAttr) armor = armorAttr.getValue();

    let iota = new IdeaIota(id,maxHealth,movementSpeed,attackDamage,armor)

    stack.push(iota)
},

//蒂迈欧之馏化
"summon_idea_entity": (stack, env) => {
    let args = new Args(stack, 2);
    let data = args.idea(0)
    let pos = args.vec3(1);

    let entityTypeId = data.entityTypeId;
    let maxHealth = data.maxHealth;
    let movementSpeed = data.movementSpeed;
    let attackDamage = data.attackDamage;
    let armor = data.armor;

    // 范围检查
    ActionJS.helpers.assertVecInRange(env,pos)

    // 计算媒质消耗（可自行调整系数）
    let cost = Math.floor((maxHealth * 10 + movementSpeed * 1000 + attackDamage * 100 + armor * 50)*10000)
    if (cost < 100000) cost = 100000;
    requireMedia(env,cost)

    let level = env.world;

    let blacklistPath = 'kubejs/config/realism_entities.json';
    let blacklist = JsonIO.read(blacklistPath);
    let realism = blacklist["blacklist"]
    

    if (realism.indexOf(entityTypeId)!=-1) {
        throw new MishapInvalidIota.of(args.get(0),1,"class.bad_idea")
    }

    // 获取实体类型
    let entityType = EntityType.byString(entityTypeId).orElse(null);
    if (!entityType) {
        throw new MishapInvalidIota.of(args.get(0),1,"class.idea")
    }

    // 创建实体
    let entity = entityType.create(level);
    if (!entity) {
        throw "Oh,no!it failed!"
    }

    // 设置位置和朝向
    entity.setPos(pos.x(), pos.y(), pos.z());

    // 应用属性
    // 生命值
    let healthAttr = entity.getAttribute(Attributes.MAX_HEALTH);
    if (healthAttr) healthAttr.setBaseValue(maxHealth);
    entity.setHealth(maxHealth);

    // 移动速度
    let speedAttr = entity.getAttribute(Attributes.MOVEMENT_SPEED);
    if (speedAttr) speedAttr.setBaseValue(movementSpeed);

    // 攻击力
    let damageAttr = entity.getAttribute(Attributes.ATTACK_DAMAGE);
    if (damageAttr) damageAttr.setBaseValue(attackDamage);

    // 护甲
    let armorAttr = entity.getAttribute(Attributes.ARMOR);
    if (armorAttr) armorAttr.setBaseValue(armor);

    // 生成到世界
    level.addFreshEntity(entity);
    entity.persistentData.putBoolean("no_drop",true)
    let iota = new  EntityIota(entity)
    stack.push(iota)

    // 副作用：消耗媒质 + 粒子效果
    let sideEffects = [
        OperatorSideEffect.ConsumeMedia(cost),
        OperatorSideEffect.Particles(ParticleSpray.burst(pos, 1, 30))
    ];
    return sideEffects;
},

//亚里士多德之提整
"idea_modify":(stack,env)=>{
    let args = new Args(stack, 3);
    let idea = args.idea(0)
    let index = args.double(1)
    let value = args.double(2)
    let mapping = {
        1:idea.maxHealth,
        2:idea.movementSpeed,
        3:idea.attackDamage,
        4:idea.armor
    }
        mapping[index]=value
    let iota = new IdeaIota(idea.entityTypeId,mapping[1],mapping[2],mapping[3],mapping[4])
    stack.push(iota) 
    
},

//普罗米修斯之启示
"guide":(stack,env)=>{
    //验证玩家
        let caster = env.caster
        if(!caster.isPlayer()){
            throw new MishapBadCaster()
        }
        
    //定义函数
    function guide(iota,caster){
            if(iota instanceof EntityIota&& iota.entity==caster){
                let res =guideText(["你想让我分析你吗？被爱着的孩子","",""])
                caster.tell(res)
                return
            }
            if(iota instanceof Vec3Iota){
                let res =guideText(["向量是一门高深的学问，不过只是实用的话并不算难，不要害怕它们","",""])
                caster.tell(res)
                return
            }
            if(iota instanceof IdeaIota){
                let res =guideText(["理型是造物的尺度，是世间万物的原型，你可以试试用理型来创造生物","",""])
                caster.tell(res)
                return
            }
            if(iota instanceof StringIota){
                let res =guideText(["你想对我说什么？很可惜，我的意识已经无法看清复杂的文字了，对不起。","",""])
                caster.tell(res)
                return
            }
            if(iota instanceof ListIota){
                let res =guideText(["竟然是列表，我会尽量解读其中的图案的","",""])
                caster.tell(res)
                let list = iota.list
                list.forEach(iota=>{
                    guide(iota,caster)
                })
                return
            }
            if(iota instanceof GarbageIota){
                let res =guideText(["垃圾吗？我不太想解读它们，还是不要浪费我的意识了","",""])                
                caster.tell(res)
            }
            if(iota instanceof EntityIota){
                let res =guideText(["对别人好一点，世界也会更爱你一分","",""])                
                caster.tell(res)
                return
            }
            if(iota instanceof MoteIota){
                let res =guideText(["物元？这是个好东西，可以用来拯救咒法师们糟糕的库存","",""])                
                caster.tell(res)
                return
            }
            if(iota instanceof GateIota){
                let res =guideText(["原来这就是门径啊，有意思.....","",""])                
                caster.tell(res)
                return
            }
            if(iota instanceof ContinuationIota){
                let res =guideText(["有意思......这是什么？","",""])                
                caster.tell(res)
                return
            }
            if(iota instanceof PatternIota){
                let pat=iota.pattern
                let sign=pat.anglesSignature()
                //读数据
                let greatGuide=JsonIO.read('kubejs/config/great_guide.json')
                let guide=JsonIO.read('kubejs/config/guide.json')
                let result = guide[sign]
                let Text0 = Text.literal("这个图案……是")
                //拿id
                let Name
                let key 
                let commonOp = PatternLookUpUtil.lookUpIdCommon(pat)
                if(commonOp.isPresent()){
                    key=commonOp.map(value=>{return value}).get().getKey().location()
                    Name = Text.translatable("hexcasting.action." + key).color("blue");
                }
                else{
                    let greatOp = PatternLookUpUtil.lookUpIdPerWorld(pat)
                    if(greatOp.isPresent()){
                        key=greatOp.map(value=>{return value}).get().getKey().location()
                        Name = Text.translatable("hexcasting.action." + key);
                    }
                }
        
        let Text1 = Text.literal("？还是祂的类似物？可惜关于祂的知识我已经遗忘了……")
        
        if(result){
            //let res = Text.literal("这个是").append(Name).append(Text.literal("吗？"))
            //caster.tell(res)
            let results = guideText(result)
            caster.tell(results)
            return
        }
        //卓越同形
        else if(Name){
            //检查是否是正确卓越
            let level = caster.level
            let perworldpats = ScrungledPatternsSave.open(level)
            let entry = perworldpats.lookup(sign)
            //检查是否启迪
            let hesAdv = caster.isAdvancementDone("hexcasting:enlightenment")
            if(!entry&&hesAdv==false){
                caster.tell(Text.literal("普罗米修斯：").color('gold').append(Text0).append(Name).append(Text1))
                return
            }
            if(entry&&hesAdv==false){
                caster.tell(Text.literal("普罗米修斯：").color('gold').append(Text0).append(Name).append(Text.literal("？竟然是真的，不过你要运用这个法术还为时尚早。")))
                return
            }
            if(entry&&hesAdv==true){
                let greatResult = greatGuide[key]
                if(greatResult){
                    let res = guideText(greatResult)
                    caster.tell(res)
                }
                else{
                    greatGuide[key]=["","","pattern/great_spells/"+key]
                    JsonIO.write('kubejs/config/great_guide.json',greatGuide)
                }
                return
            }
            }

        caster.tell(Text.literal("普罗米修斯：").color('gold').append(Text.literal("我不认识这个图案")))
        return
        
    }      
           let res =guideText(["我只能为你解释我知道的图案，试试使用考察来“转义”图案得到图案iota再来问我吧","相关章节","patterns/patterns_as_iotas 2"])
           caster.tell(res)
}
      try{
            let args = new Args(stack,1)
            let iota = args.get(0)
            guide(iota,caster)
        }
        catch(e){
            let res =guideText(["我只能为你解释我知道的图案，试试使用考察来“转义”图案得到图案iota再来问我吧","相关章节","patterns/patterns_as_iotas 2"])
            caster.tell(res)
        }
        
    
},

//时移势迁之策略
"all_in_one_pages":(stack,env)=>{

    let args = new Args(stack,1)
    let index = Math.floor(args.double(0))
    let caster = env.caster
    if(!caster.isPlayer()){
        throw new MishapBadCaster()
    }
    
    let hand = env.castingHand

    let items
    if(hand==InteractionHand.MAIN_HAND){
        items = caster.getMainHandItem()
    }
    else if(hand==InteractionHand.OFF_HAND){
        items = caster.getOffHandItem()
    }
    if (!(items.getItem() instanceof CustomIotaHolderItem)) {
         throw new MishapBadOffhandItem(items,Text.literal("万法之杖").color("gold")) 
    }
    let holder = items.getItem();
    if (!holder.isPageable()) throw new MishapBadOffhandItem(items,Text.literal("万法之杖").color("gold"));
    if(items.id!="miehex:all_in_one")throw new MishapBadOffhandItem(items,Text.literal("万法之杖").color("gold"))
    
    CustomIotaHolderItem.SetCurrentPage(items,index)
    return
    
},

//韦编三绝之精思
"all_in_one_read":(stack,env)=>{
     
    let caster = env.caster
    let level =env.world
    if(!caster.isPlayer()){
        throw new MishapBadCaster()
    }
    let hand = env.castingHand
    let items
    if(hand==InteractionHand.MAIN_HAND){
        items = caster.getMainHandItem()
    }
    else if(hand==InteractionHand.OFF_HAND){
        items = caster.getOffHandItem()
    }
    if (!(items.getItem() instanceof CustomIotaHolderItem)) {
         throw new MishapBadOffhandItem(items,Text.literal("万法之杖").color("gold")) 
    }
    let holder = items.getItem();
    if (!holder.isPageable()) throw new MishapBadOffhandItem(items,Text.literal("万法之杖").color("gold"));
    if(items.id!="miehex:all_in_one")throw new MishapBadOffhandItem(items,Text.literal("万法之杖").color("gold"))
    let nbt = items.nbt
    let pages = nbt.get("pages")
    pages = Object.values(pages)
    let list =[]
    pages.forEach(tag => {
        let iota = deserializeIota(tag,level)
        list.push(iota)
    })
    let iotas = new ListIota(list)
    stack.push(iotas)
    return
},

//内圣外王之策略
"all_eval":(stack,env,img,cont)=>{
    
    let args = new Args(stack,1)
    let index = Math.floor(args.double(0))
    let caster = env.caster
    let level =env.world
    if(!caster.isPlayer()){
        throw new MishapBadCaster()
    }
    let hand = env.castingHand
    let items
    if(hand==InteractionHand.MAIN_HAND){
        items = caster.getMainHandItem()
    }
    else if(hand==InteractionHand.OFF_HAND){
        items = caster.getOffHandItem()
    }
    if (!(items.getItem() instanceof CustomIotaHolderItem)) {
         throw new MishapBadOffhandItem(items,Text.literal("万法之杖").color("gold")) 
    }
    let holder = items.getItem();
    if (!holder.isPageable()) throw new MishapBadOffhandItem(items,Text.literal("万法之杖").color("gold"));
    if(items.id!="miehex:all_in_one")throw new MishapBadOffhandItem(items,Text.literal("万法之杖").color("gold"))
    let nbt = items.nbt
    let pages = nbt.get('pages')
    let tag = pages.get(index.toString())
    let iota = deserializeIota(tag,level)
    if (!(iota instanceof ListIota)) throw new MishapInvalidIota(args.get(0),0,Text.literal("一个对应着可执行的列表iota的万法之杖索引"))
    let newCont =cont
    let finshEval = FrameFinishEval.INSTANCE
    newCont= cont.pushFrame(finshEval)
    let spellList = iota.list
    let evalFrame = new FrameEvaluate(spellList, false)   
    newCont= newCont.pushFrame(evalFrame)

    // 新映像：保持栈不变，只增加操作计数
    let newImg = img.copy(
        stack,
        img.parenCount,
        img.parenthesized,
        img.escapeNext,
        img.opsConsumed + 1,
        img.userData
    );

    return new OperationResult(newImg, [], newCont, HexEvalSounds.THOTH);
    
},

//勒石记功之策略
"all_record":(stack,env)=>{
    let caster = env.caster
    let level =env.world
    let server = caster.server
    if(!caster.isPlayer()){
        throw new MishapBadCaster()
    }
    let hand = env.castingHand
    let items
    if(hand==InteractionHand.MAIN_HAND){
        items = caster.getMainHandItem()
    }
    else if(hand==InteractionHand.OFF_HAND){
        items = caster.getOffHandItem()
    }
    if (!(items.getItem() instanceof CustomIotaHolderItem)) {
         throw new MishapBadOffhandItem(items,Text.literal("万法之杖").color("gold")) 
    }
    let holder = items.getItem();
    if (!holder.isPageable()) throw new MishapBadOffhandItem(items,Text.literal("万法之杖").color("gold"));
    if(items.id!="miehex:all_in_one")throw new MishapBadOffhandItem(items,Text.literal("万法之杖").color("gold"))
    let nbt = items.nbt
    let pages = nbt.get("pages")
    pages = Object.values(pages)
        let list =[]
    pages.forEach(tag => {
        let iota = deserializeIota(tag,level)
        list.push(iota)
    })
    let iotas = new ListIota(list)
    let tags = serializeIota(iotas)
    let id = caster.username
    server.persistentData.put(id,tags)
    return
},

//东山再起之精思
"record_read":(stack,env)=>{
    let caster = env.caster
    let level =env.world
    let server = caster.server
    if(!caster.isPlayer()){
        throw new MishapBadCaster()
    }
    let hand = env.castingHand
    let items
    if(hand==InteractionHand.MAIN_HAND){
        items = caster.getMainHandItem()
    }
    else if(hand==InteractionHand.OFF_HAND){
        items = caster.getOffHandItem()
    }
    if (!(items.getItem() instanceof CustomIotaHolderItem)) {
         throw new MishapBadOffhandItem(items,Text.literal("万法之杖").color("gold")) 
    }
    let holder = items.getItem();
    if (!holder.isPageable()) throw new MishapBadOffhandItem(items,Text.literal("万法之杖").color("gold"));
    if(items.id!="miehex:all_in_one")throw new MishapBadOffhandItem(items,Text.literal("万法之杖").color("gold"))
    let id =caster.username
    let tags =server.persistentData.get(id)
    if(tags==undefined){
        stack.push(ListIota([]))
        return
    }
    let iotas = deserializeIota(tags,level)
    stack.push(iotas)
},

//万法之纯化
"all_in_one":(stack,env)=>{
      let args = new Args(stack,1)
      let iota = args.get(0)
      let level = env.world
      if(iota instanceof PatternIota){
        let pat =iota.pattern
        let sign = pat.anglesSignature()
        let arr = sign.split("sss")
        let list = []
        //console.log(arr)
        if(arr.indexOf(sign)==-1){
              arr.forEach(e=>{
                if(e.startsWith("daded")==true){
                    let iota = PatToElse(e,level)
                    list.push(iota)
                }
                else{
                let pat = HexPattern.fromAnglesUnchecked(e,HexDir.NORTH_EAST)
                let iota = new PatternIota(pat)
                list.push(iota)
                }
              })
              stack.push(ListIota(list))
              return
        }
        iota = PatToElse(sign,level)
        stack.push(iota)
        return
    }
    if(iota instanceof ListIota){
        let list =iota.list
        list.forEach(e=>{
            if(e instanceof ListIota){
                throw MishapInvalidIota.of(iota,0,"class.[[]]")
            }
        })
    }
    iota = IotaToPat(iota)
    stack.push(iota)
    return
},

//聆听者之策略
"chat_listen":(stack,env)=>{

    let args =new Args(stack,1)
    let spell =args.get(0)
    let caster =env.caster
    if(!caster.isPlayer()){
        throw new MishapBadCaster()
    }
    spell = serializeIota(spell)
    caster.persistentData.put("chat",spell)
    return

},

//祈求结构精魄
"get_structure":(stack,env)=>{
    let args = new Args(stack, 1)
    let vec = args.vec3(0)
    ActionJS.helpers.assertVecInRange(env,vec)
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
    let level = env.world
   let structureRegistry = level.registryAccess().registryOrThrow(Registries.STRUCTURE)
   let structures =structureRegistry.keySet()
   let Allstr = []
   structures.forEach(e=>{
    let k =e.toString()
    Allstr.push(k)
})
    let index = Math.floor(Allstr.length*Math.random())
    let structure = Allstr[index]
    let itemid ="miehex:"+structure.replace(":","_")+"_structure_symbol"
    let item =Item.of(itemid)
    let entity = new ItemEntity(level,vec.x(),vec.y(),vec.z(),item)
    entity.spawn()
    return[OperatorSideEffect.ConsumeMedia(50000)]

},

//按图索骥之馏化
"list_by_index":(stack)=>{
    let args = new Args(stack,2)
    let list = args.list(0)
    let index = args.list(1)
    let List = []
    list.forEach(e=>{
        List.push(e)
    })
    let res = []
    index.forEach(e=>{
        if(!e instanceof DoubleIota || e.double!=Math.floor(e.double))throw MishapInvalidIota.of(args.get(1),1,"class.slot")
        let num = e.double
        let iota = List[num]
        if(!iota){
            throw MishapInvalidIota.of(args.get(1),1,"class.slot")
        }
        res.push(iota)
    }) 
    stack.push(new ListIota(res))
},

//传道者之提整
"function":(stack,env,img,cont)=>{
    let args = new Args(stack,3)
    let input = args.get(0)
    let list = args.list(1)
    let code =[]
    list.forEach(e=>{
        code.push(e)
    })
    code = new ListIota(code)
    let output = args.get(2)
    let def = new FunctionIota(input,code,output)
    stack.push(def)
},

//传道者之谨慎
"function_check":(stack,env,img,cont)=>{
    let args = new Args(stack,2)
    let def = args.get(1)
    let inputs = args.get(0)
    if(! def instanceof FunctionIota){
        throw new MishapInvalidIota.of(def,1,"class.def")
    }
    if(inputs.class == def.getId().class){
        let code = def.getCode()
        let newCont =cont
        let finshEval = FrameFinishEval.INSTANCE
        newCont= cont.pushFrame(finshEval)
        let spellList = code.list
        let halt = new PatternIota(new HexPattern.fromAngles("aqdeeqawqwqwqwqw",HexDir.SOUTH_WEST))
        halt = new ListIota([halt])
        let haltlist = halt.list
        let resevalFrame = new FrameEvaluate(haltlist, false)
        let evalFrame = new FrameEvaluate(spellList, false)
        newCont = newCont.pushFrame(resevalFrame)   
        newCont= newCont.pushFrame(evalFrame)


    // 新映像：保持栈不变，只增加操作计数
    let userdata = img.userData
    let depth  = userdata.getInt("hierarchy")
    if(!depth)depth=0
    userdata.putInt("hierarchy",depth+1)
    let tags = userdata.getCompound("block_vars")
    if(!tags)tags = new CompoundTag()
    let tag = serializeIota(inputs)
    tags.put((depth+1).toString(),tag)
    userdata.put("block_vars",tags)
    let newImg = img.copy(
        stack,
        img.parenCount,
        img.parenthesized,
        img.escapeNext,
        img.opsConsumed + 1,
        userdata
    );
    return new OperationResult(newImg, [], newCont, HexEvalSounds.THOTH);
    }
    else{
        stack.push(inputs)
        stack.push(def)
        return
    }
},

//传道者之审慎
"function_check_care":(stack,env,img,cont)=>{
    let args = new Args(stack,2)
    let def = args.get(1)
    let inputs = args.get(0)
    if(! def instanceof FunctionIota){
        throw new MishapInvalidIota.of(def,1,"class.def")
    }
    if(inputs.toleratesOther(def.getId())==true){
        let code = def.getCode()
        let newCont =cont
        let finshEval = FrameFinishEval.INSTANCE
        newCont= cont.pushFrame(finshEval)
        let spellList = code.list
        let halt = new PatternIota(new HexPattern.fromAngles("aqdeeqawqwqwqwqw",HexDir.SOUTH_WEST))
        halt = new ListIota([halt])
        let haltlist = halt.list
        let resevalFrame = new FrameEvaluate(haltlist, false)
        let evalFrame = new FrameEvaluate(spellList, false)
        newCont = newCont.pushFrame(resevalFrame)   
        newCont= newCont.pushFrame(evalFrame)

    // 新映像：保持栈不变，只增加操作计数
    let userdata = img.userData
    let depth  = userdata.getInt("hierarchy")
    if(!depth)depth=0
    userdata.putInt("hierarchy",depth+1)
    let tags = userdata.getCompound("block_vars")
    if(!tags)tags = new CompoundTag()
    let tag = serializeIota(inputs)
    tags.put((depth+1).toString(),tag)
    userdata.put("block_vars",tags)
    let newImg = img.copy(
        stack,
        img.parenCount,
        img.parenthesized,
        img.escapeNext,
        img.opsConsumed + 1,
        userdata
    );
    return new OperationResult(newImg, [], newCont, HexEvalSounds.THOTH);
    }
    else{
        stack.push(inputs)
        stack.push(def)
        return
    }
},

//授业者之策略
"function_halt": (stack, env, img, cont) => {
    // 将 Java 栈转为可变的 JS 数组
    let newStack = Array.from(stack);

    let done = false;
    let newCont = cont;

    // 循环向上打破帧，直到遇到边界或延续结束
    while (!done && newCont instanceof SpellContinuation.NotDone) {
        let frame = newCont.frame;
        let breakInfo = frame.breakDownwards(newStack);
        done = breakInfo.first.booleanValue(); // Kotlin Boolean 需拆箱
        newStack = breakInfo.second;
        newCont = newCont.next;
    }

    // 若没有遇到任何边界，则彻底清空栈
    if (!done) {
        newStack = [];
    }
    let userdata = img.userData
    let depth  = userdata.getInt("hierarchy")
    if(!depth||depth==0)depth=1
    userdata.putInt("hierarchy",depth-1)
    // 构建新映像：操作计数+1，栈更新
    let newImg = img.copy(
        newStack,
        img.parenCount,
        img.parenthesized,
        img.escapeNext,
        img.opsConsumed + 1,
        userdata
    );

    // 返回操作结果（无额外副作用，使用 SPELL 音效）
    return new OperationResult(newImg, [], newCont, HexEvalSounds.SPELL);
},

//解惑者之精思
"block_var":(stack,env,img,cont)=>{
   let userdata = img.userData
   let depth = userdata.getInt("hierarchy")
   if(!depth||depth==0){
    stack.push(new NullIota)
    return
   }
   let tags = userdata.get("block_vars")
   let tag = tags.get(depth.toString())
   let iota = deserializeIota(tag,env.world)
   stack.push(iota)
   return
},

//解惑者之策略
"block_var_write":(stack,env,img,cont)=>{
   let args = new Args(stack,1)
   let iota = args.get(0)
   let userdata = img.userData
   let depth = userdata.getInt("hierarchy")
   if(!depth||depth==0){
      throw new MishapDisallowedSpell("这个法术只能在函数内使用！",new ResourceLocation("miehex:block_var_write"))
   }
   let tags = userdata.get("block_vars")
   if(!tags)tags =new CompoundTag()
    let tag = serializeIota(iota)
   tags.put((depth).toString(),tag)
    userdata.put("block_vars",tags)
    let newImg = img.copy(
        stack,
        img.parenCount,
        img.parenthesized,
        img.escapeNext,
        img.opsConsumed + 1,
        userdata
    );
    return new OperationResult(newImg, [], cont, HexEvalSounds.NORMAL_EXECUTE);
},

//解惑者之纯化
"block_var_read":(stack,env,img,cont)=>{
   let args = new Args(stack,1)
   let depth = args.double(0)
   let userdata = img.userData
   if(!depth||depth==0){
      throw new MishapDisallowedSpell("这个法术只能在函数内使用！",new ResourceLocation("miehex:block_var_read"))
   }
   let tags = userdata.get("block_vars")
   if(!tags)throw new MishapDisallowedSpell("这个法术只能在函数内使用！",new ResourceLocation("miehex:block_var_read"))
   let tag = tags.get(depth.toString())
   if(!tag)throw new MishapDisallowedSpell("这个法术只能在函数内使用！",new ResourceLocation("miehex:block_var_read"))
   let iota = deserializeIota(tag,env.world)
   stack.push(iota)
   return
},

//解惑者之策略,第二型
"block_var_writes":(stack,env,img,cont)=>{
   let args = new Args(stack,2)
   let iota = args.get(0)
   let depth = args.double(1)
   let userdata = img.userData
   if(!depth||depth==0){
      throw new MishapDisallowedSpell("这个法术只能在函数内使用！",new ResourceLocation("miehex:block_var_write"))
   }
   let tags = userdata.get("block_vars")
   if(!tags)tags =new CompoundTag()
    let tag = serializeIota(iota)
   tags.put((depth).toString(),tag)
    userdata.put("block_vars",tags)
    let newImg = img.copy(
        stack,
        img.parenCount,
        img.parenthesized,
        img.escapeNext,
        img.opsConsumed + 1,
        userdata
    );
    return new OperationResult(newImg, [], cont, HexEvalSounds.NORMAL_EXECUTE);
},
 // ========================= ~~~ 一条华丽的分割线 ~~~ =========================



//    
    // 傀影
    "simulation": (stack, env) => {
        let args = new Args(stack, 3)
        let entity = args.entity(0)
        let named = args.string(1)
        let num = args.double(2)
        let level = env.world
        let name = RL(named)
        ActionJS.helpers.assertEntityInRange(env, entity)
        let damageTotal = entity.persistentData.contains('simulation') ? entity.persistentData.getDouble('simulation') : 0
        if (!(entity instanceof Mob)) throw MishapInvalidIota.of(args.get(0), 2, 'class.mob')
        if (num > (4 - damageTotal)) throw MishapInvalidIota.of(args.get(2), 0, 'class.simulation')
        if (num < 1 || !Number.isInteger(num)) throw MishapInvalidIota.of(args.get(2), 0, 'class.simulation')
        entity.persistentData.putDouble('simulation', damageTotal + num)
        let overcast = ResourceKey.create(Registries.DAMAGE_TYPE, new ResourceLocation("hexcasting:overcast"))
        let dmgTypeRegistry = level.registryAccess().registryOrThrow(Registries.DAMAGE_TYPE)
        let dmgType = dmgTypeRegistry.getHolderOrThrow(overcast)
        let simulation = level.createEntity(name)
        let source = new DamageSource(dmgType, simulation, simulation)
        entity.attack(source, num)
        let effects = [
            OperatorSideEffect.ConsumeMedia(100),
            OperatorSideEffect.Particles(ParticleSpray.burst(entity.position(), 0.5, 20))
        ]
        return effects
    },

    // 拆解
    "uncrafting": (stack, env) => {
        let args = new Args(stack, 1)
        let entity = args.entity(0)
        let level = env.world
        if (entity.getType() !== "minecraft:item") throw MishapInvalidIota.of(args.get(0), 0, 'class.uncrafting')
        ActionJS.helpers.assertEntityInRange(env, entity)
        let itemStack = entity.getItem()
        let itemStackCount = itemStack.count
        let itemPosition = entity.position()
        let recipeManager = level.getRecipeManager()
        let craftingRecipes = recipeManager.getAllRecipesFor(RecipeType.CRAFTING)
        let matchingRecipes = []
        let iterator = craftingRecipes.iterator()
        while (iterator.hasNext()) {
            let recipe = iterator.next()
            let resultItem = recipe.getResultItem(level.registryAccess())
            let count = recipe.getResultItem(level.registryAccess()).count
            if (resultItem.getItem().getId() === itemStack.getItem().getId() && count === 1) {
                matchingRecipes.push(recipe)
            }
        }
        if (matchingRecipes.length === 0) throw MishapInvalidIota.of(args.get(0), 0, 'class.uncrafting')
        let randomIndex = Math.floor(Math.random() * matchingRecipes.length)
        let selectedRecipe = matchingRecipes[randomIndex]
        let ingredients = selectedRecipe.getIngredients()
        const RARITY_PROBABILITIES = {
            "COMMON": 0.8,
            "UNCOMMON": 0.6,
            "RARE": 0.4,
            "EPIC": 0.2
        }
        for (let i = 0; i < ingredients.size(); i++) {
            let ingredient = ingredients.get(i)
            if (ingredient.isEmpty()) {
                continue
            }
            let itemStack = ingredient.getFirst()
            itemStack = new ItemStack(itemStack.getItem(), itemStackCount)
            let rarity = itemStack.getRarity()
            let probability = RARITY_PROBABILITIES[rarity] || 0
            if (Math.random() < probability) {
                entity.remove("killed")
                level.getBlock(itemPosition).popItem(itemStack)
            }
        }
        let effects = [
            OperatorSideEffect.ConsumeMedia(10000),
            OperatorSideEffect.Particles(ParticleSpray.burst(itemPosition, 0.5, 10))
        ]
        return effects
    },

    // 聚变
    "kcit": (stack, env) => {
        let args = new Args(stack, 1)
        let vec = args.vec3(0)
        let level = env.world
        ActionJS.helpers.assertVecInRange(env, vec)
        let x = Math.floor(vec.x())
        let y = Math.floor(vec.y())
        let z = Math.floor(vec.z())
        let blockpos = new BlockPos(x, y, z)
        let entity = level.getBlockEntity(blockpos)
        let state = level.getBlockState(blockpos)
        if (entity) {
            state.getTicker(level, entity.type).tick(level, blockpos, state, entity)
        } 
        if (state.isRandomlyTicking) {
            if (level.random.nextInt(64) == 0) {
                state.randomTick(level, blockpos, level.random)
            }
            state.randomTick(level, blockpos, level.random)
        }
        let effects = [
            OperatorSideEffect.ConsumeMedia(10),
            OperatorSideEffect.Particles(ParticleSpray.burst(blockpos, 0.5, 10))
        ]
        return effects
    },

    // 撕裂
    "tear": (stack, env) => {
        let args = new Args(stack, 2)
        let entity = args.entity(0)
        let force = args.vec3(1)
        let player = env.caster
        if (!(entity instanceof Mob)) throw MishapInvalidIota.of(args.get(0), 1, 'class.mob')
        ActionJS.helpers.assertEntityInRange(env, entity)
        let alpha_v = entity.deltaMovement
        let alpha_s = alpha_v.length()
        let tearForce = 0
        if (alpha_s > 0.001) {
            let unitAlpha = alpha_v.normalize()
            let projection = force.dot(unitAlpha)
            if (projection < 0) {
                tearForce = Math.min(alpha_s, Math.abs(projection))
            }
        }
        if (player.isPlayer()) {
            entity.attack(player.damageSources().generic(), tearForce * tearForce)
        } else {
            entity.attack(tearForce * tearForce)
        }
        let omega_v = alpha_v.add(force)
        entity.setDeltaMovement(omega_v)
        entity.hurtMarked = true
        let omega_s = omega_v.length()
        let delta
        if ((omega_s - alpha_s) >= 0.1) {
            delta = (omega_s - alpha_s) * 30000
        } else {
            delta = 100
        }
        let effects = [
            OperatorSideEffect.ConsumeMedia(delta),
            OperatorSideEffect.Particles(ParticleSpray.burst(entity.position(), 0.5, 60))
        ]
        env.world.runCommandSilent(`playsound minecraft:item.shears.shear ambient @a ${entity.x} ${entity.y} ${entity.z} 0.5 0.8`)
        return effects
    },

    // 反制
    "reflection": (stack, env) => {
        let player = env.caster
        if (player == null) throw MishapBadCaster()
        if (!player.isPlayer()) throw MishapBadCaster()
        let server = player.server
        if (!player.persistentData.contains('reflection') && !player.persistentData.contains('re_cold')) {
            player.persistentData.putBoolean('reflection', true)
            server.scheduleInTicks(20, () => {
                player.persistentData.remove('reflection')
                if (player.persistentData.contains('reflect')) {
                    player.persistentData.remove('reflect')
                    return
                }
                player.persistentData.putBoolean('re_cold', true)
                server.scheduleInTicks(120, () => {
                    player.persistentData.remove('re_cold')
                })
            })
            let effects =  [
                OperatorSideEffect.ConsumeMedia(64000),
                OperatorSideEffect.Particles(ParticleSpray.burst(player.position(), 0.5, 60))
            ]
            return effects
        } else {
            player.potionEffects.add("minecraft:wither", 20, 1)
        }
    },

    // 罅隙
    "space": (stack, env) => {
        let args = new Args(stack, 5)
        let sourcePos1 = args.vec3(0)
        let sourcePos2 = args.vec3(1)
        let destPos = args.vec3(2)
        let filter = args.list(3).list
        let bool = args.bool(4)
        let destPos1_x = sourcePos1.x() + destPos.x()
        let destPos1_y = sourcePos1.y() + destPos.y()
        let destPos1_z = sourcePos1.z() + destPos.z()
        let destPos2_x = sourcePos2.x() + destPos.x()
        let destPos2_y = sourcePos2.y() + destPos.y()
        let destPos2_z = sourcePos2.z() + destPos.z()
        let level = env.world
        let server = env.caster?.server??Utils.server
        let sourceMinX = Math.min(Math.floor(sourcePos1.x()), Math.floor(sourcePos2.x()))
        let sourceMaxX = Math.max(Math.floor(sourcePos1.x()), Math.floor(sourcePos2.x()))
        let sourceMinY = Math.min(Math.floor(sourcePos1.y()), Math.floor(sourcePos2.y()))
        let sourceMaxY = Math.max(Math.floor(sourcePos1.y()), Math.floor(sourcePos2.y()))
        let sourceMinZ = Math.min(Math.floor(sourcePos1.z()), Math.floor(sourcePos2.z()))
        let sourceMaxZ = Math.max(Math.floor(sourcePos1.z()), Math.floor(sourcePos2.z()))
        let destMinX = Math.min(Math.floor(destPos1_x), Math.floor(destPos2_x))
        let destMinY = Math.min(Math.floor(destPos1_y), Math.floor(destPos2_y))
        let destMinZ = Math.min(Math.floor(destPos1_z), Math.floor(destPos2_z))
        let width = sourceMaxX - sourceMinX + 1
        let height = sourceMaxY - sourceMinY + 1
        let depth = sourceMaxZ - sourceMinZ + 1
        let copied = 0
        let skipped = 0
        let filterSet = new Set()
        if (filter.length > 0) {
            for (let id of filter) {
                if (!(id?.string)) continue
                let filtId = RL(id.string)
                filterSet.add(filtId)
            }
        }
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                for (let z = 0; z < depth; z++) {
                    let sourcePos = new BlockPos(sourceMinX + x, sourceMinY + y, sourceMinZ + z)
                    let blockId = level.getBlock(sourcePos).id.toString()
                    if (filterSet.size > 0) {
                        let isInList = Array.from(filterSet).some(f => String(f) === blockId)
                        if ((bool && !isInList) || (!bool && isInList)) {
                            skipped++
                            continue
                        }
                    }
                    let destBlockPos = new BlockPos(destMinX + x, destMinY + y, destMinZ + z)
                    let sourceState = level.getBlockState(sourcePos)
                    let sourceEntity = level.getBlockEntity(sourcePos)
                    level.setBlock(destBlockPos, sourceState, 3)
                    if (sourceEntity) {
                        let entityData = sourceEntity.saveWithFullMetadata()
                        let newEntity = level.getBlockEntity(destBlockPos)
                        if (newEntity) {
                            newEntity.load(entityData)
                        }
                    }
                    copied++
                }
            }
        }
        server.runCommandSilent(`fill ${sourceMinX} ${sourceMinY} ${sourceMinZ} ${sourceMaxX} ${sourceMaxY} ${sourceMaxZ} air`)
        let mediaCost = 0
        if (copied > 0) {
            mediaCost += (Math.log10(copied) + 1) * (Math.log10(copied) + 1) * 100000
        }
        mediaCost += skipped * 10
        let effects = [
            OperatorSideEffect.ConsumeMedia(mediaCost)
        ]
        return effects
    },

    // 精神控制
    "control": (stack, env) => {
        let args = new Args(stack, 2)
        let mob = args.entity(0)
        let target = args.entity(1)
        ActionJS.helpers.assertEntityInRange(env, mob)
        ActionJS.helpers.assertEntityInRange(env, target)
        if (!mob.isMonster()) throw MishapInvalidIota.of(args.get(0), 1, 'class.control')
        if (!target.isLiving()) throw MishapInvalidIota.of(args.get(1), 0, 'class.mob')
        let num = Math.floor(Math.min(mob.getHealth(), target.getHealth()))
        let effects = [
            OperatorSideEffect.ConsumeMedia(num * 1000),
            OperatorSideEffect.Particles(ParticleSpray.burst(mob.eyePosition, 1, 20))
        ]
        let data = mob.getPersistentData()
        let targetUUID = target.getUuid().toString()
        data.putString('hex_target_uuid', targetUUID)
        mob.stopUsingItem()
        mob.setTarget(null)
        if (!data.getBoolean('hex_controlled')) {
            mob.targetSelector.addGoal(0,
                new NearestAttackableTargetGoal(mob, LivingEntity, 10, true,false, (e) =>
                e.getUuid().toString().equals(mob.getPersistentData().getString('hex_target_uuid'))
            ))

            if (!mob.type.includes('skeleton') && !mob.type.includes('stray')) {
                mob.goalSelector.addGoal(1, new MeleeAttackGoal(mob, 1.2, true))
            }
            data.putBoolean('hex_controlled', true)
        }
        mob.setTarget(target)
        mob.setAggressive(true)
        return effects
    },

    // 箭矢
    "arrow": (stack, env) => {
        let args = new Args(stack, 2)
        let pos = args.vec3(0)
        let num = args.double(1)
        let player = env.caster
        if (player == null) throw MishapBadCaster()
        if (!player.isPlayer()) throw MishapBadCaster()

        if (num != 1 && num != 2 && num != 3 && num != 4 && num != 5) throw MishapInvalidIota.of(args.get(1), 0, 'class.arrow')

        ActionJS.helpers.assertVecInRange(env, pos)
        
        let uuid = player.uuid
        let effects = [
            OperatorSideEffect.ConsumeMedia(Math.ceil(num * num * 1000)),
            OperatorSideEffect.Particles(ParticleSpray.burst(pos, 1, 20))
        ]
        let arrow = new SpectralArrow(env.world, player)
        arrow.mergeNbt({
            NoGravity: true,
            PierceLevel: 6,
            Owner: uuid,
            damage: num,
            pickup: 0,
            life: 1
        })
        arrow.setPos(pos)
        arrow.spawn()
        stack.push(EntityIota(arrow))
        return effects
    },

    // 重力
    "gravity": (stack, env) => {
        let args = new Args(stack, 2)
        let entity = args.entity(0)
        let num = args.double(1)
        let cost
        if (num >= 0 && num <= 8) {
            cost = 100
        } else if (num < 0) {
            cost = num * num * 10000
        } else {
            cost = (num - 8) * 10000
        }
        entity.getAttribute('forge:entity_gravity').setBaseValue(num * 0.01)
        let effects = [
            OperatorSideEffect.ConsumeMedia(cost),
            OperatorSideEffect.Particles(ParticleSpray.burst(entity.position(), 0.5, 20))
        ]
        return effects
    },

    // 全视
    "eye_of_providence": (stack, env) => {
        let args = new Args(stack, 2)
        let dimension = args.string(0)
        let infinite = args.bool(1)
        let server = env.caster?.server??Utils.server
        let dimensionKeys = server.levelKeys()
        let dimensionNames = []
        dimensionKeys.forEach(key => {
            dimensionNames.push(key.location().toString())
        })
        let namespace = RL(dimension)
        if (!dimensionNames.includes(namespace)) throw MishapInvalidIota.of(args.get(0), 1, 'class.level')
        let locals = global.PatternOperateMap.eye_of_providence
        if (!locals.protoComp) {
            let key = new JavaAdapter(CastingEnvironmentComponent.Key, {})
            locals.protoComp = {
                onIsVecInRange(vec, current) {
                    return true
                },
                getKey() {
                    return key
                }
            }
        }
        let effects = []
        if (infinite) {
            let player = env.caster
            if (player !== null && player.health) {
                player.health = 0.0001
            }
        } else {
            effects = [
                OperatorSideEffect.ConsumeMedia(Math.ceil(100000))
            ]
        }
        env.addExtension(new JavaAdapter(CastingEnvironmentComponent.IsVecInRange, locals.protoComp))
        global.unsafeSetField(env, 'world', server.getLevel(namespace))
        return effects
    },

    // 流转
    "focus": (stack, env) => {
        let args = new Args(stack, 2)
        let entity = args.entity(0)
        ActionJS.helpers.assertEntityInRange(env, entity)
        let movement = args.get(1)
        if (movement instanceof Vec3Iota) {
            let direction = movement.vec3
            let currentVelocity = entity.getDeltaMovement()
            let currentSpeed = Math.sqrt(Math.pow(currentVelocity.x(), 2) + Math.pow(currentVelocity.y(), 2) + Math.pow(currentVelocity.z(), 2))
            let directionLength = Math.sqrt(Math.pow(direction.x(), 2) + Math.pow(direction.y(), 2) + Math.pow(direction.z(), 2))
            if (directionLength < 0.0001) return
            let vec = new Vec3d(
                direction.x() * currentSpeed / directionLength,
                direction.y() * currentSpeed / directionLength,
                direction.z() * currentSpeed / directionLength
            )
            entity.setDeltaMovement(vec)
            entity.hurtMarked = true
        } else if (movement instanceof EntityIota) {
            let target = movement.entity
            ActionJS.helpers.assertEntityInRange(env, target)
            let velocityA = entity.getDeltaMovement()
            let velocityB = target.getDeltaMovement()
            entity.setDeltaMovement(velocityB)
            target.setDeltaMovement(velocityA)
            entity.hurtMarked = true
            target.hurtMarked = true
        } else if (movement instanceof DoubleIota) {
            let time = movement.double
            if (time < 1 || !Number.isInteger(time)) throw MishapInvalidIota.of(args.get(1), 0, 'class.zero')
            let server = env.caster?.server ?? Utils.server
            let currentTick = server.getTickCount()
            let restoreTick = currentTick + time
            let uuid = entity.uuid.toString()
            let currentVelocity = entity.getDeltaMovement()
            if (global.ZERO.has(uuid)) {
                let entry = global.ZERO.get(uuid)
                entry.velocity = new Vec3d(
                    entry.velocity.x() + currentVelocity.x(),
                    entry.velocity.y() + currentVelocity.y(),
                    entry.velocity.z() + currentVelocity.z()
                )
                entry.restoreTick = restoreTick
            } else {
                global.ZERO.set(uuid, {
                    velocity: currentVelocity,
                    restoreTick: restoreTick,
                    entity : entity
                })
            }
            entity.setDeltaMovement(Vec3d.ZERO)
            entity.hurtMarked = true
        } else throw MishapInvalidIota.of(args.get(1), 0, 'class.foucs')
    },

    // 飞升
    "high": (stack, env) => {
        let args = new Args(stack, 2)
        let entity = args.entity(0)
        let high = args.double(1)
        let vec = entity.getDeltaMovement()
        let effects = [
            OperatorSideEffect.Particles(ParticleSpray.burst(entity.eyePosition, 1, 20))
        ]
        entity.setPosition(entity.x, entity.y + high, entity.z)
        entity.setDeltaMovement(vec)
        entity.hurtMarked = true
        return effects
    },

    // 骑乘
    "ride": (stack, env) => {
        let args = new Args(stack, 2)
        let entity_0 = args.entity(0)
        let entity_1 = args.entity(1)
        if (entity_0.isPassenger() && entity_0.getVehicle() === entity_1) {
            entity_0.stopRiding()
            return
        }
        if (entity_1.isPassenger() && entity_1.getVehicle() === entity_0) {
            entity_1.stopRiding()
            return
        }
        entity_0.startRiding(entity_1, true)
        let effects = [
            OperatorSideEffect.Particles(ParticleSpray.burst(entity_0.footPosition, 1, 20))
        ]
        return effects
    },

    // 标识
    "tags": (stack, env) => {
        let args = new Args(stack, 3)
        let entity = args.entity(0)
        let tagName = args.string(1)
        let condition = args.get(2)
        if (condition instanceof BooleanIota) {
            condition = args.bool(2)
        } else if (condition instanceof NullIota) {
            condition = null
        } else throw MishapInvalidIota.of(args.get(2), 0, 'class.bool_null')
        if (tagName === "") {
            if (!(entity instanceof Mob)) throw MishapInvalidIota.of(args.get(0), 2, 'class.name')
            if (condition == true) {
                entity.potionEffects.add("minecraft:glowing", -1, 0, false, false)
            } else if (condition == false) {
                entity.removeEffect("minecraft:glowing")
            } else if (condition == null) {
                stack.push(BooleanIota(entity.glowing))
            }
        } else {
            let fullTagName = "T_" + tagName
            if (condition == true && !entity.persistentData.contains(fullTagName)) {
                entity.persistentData.putBoolean(fullTagName, true)
            } else if (condition == false && entity.persistentData.contains(fullTagName)) {
                entity.persistentData.remove(fullTagName)
            } else if (condition == null) {
                let tag = entity.persistentData.contains(tagName)
                stack.push(BooleanIota(tag))
            }
        }
    },

    // 明晰
    "grid": (stack, env) => {
        let args = new Args(stack, 1)
        let num = args.double(0)
        let player = env.caster
        if (player == null) throw MishapBadCaster()
        if (!player.isPlayer()) throw MishapBadCaster()
        player.getAttribute('hexcasting:grid_zoom').setBaseValue(num)
    },



    // 视向
    "yaw": (stack, env) => {
        let args = new Args(stack, 2)
        let target = args.entity(0)
        ActionJS.helpers.assertEntityInRange(env, target)
        let vec = args.vec3(1)
        target.lookAt("eyes", vec)
    },

    // 狄俄尼索斯之策略
    "forever": (stack, env, img) => {
        let player = env.caster
        if (player == null) throw MishapBadCaster()
        if (!player.isPlayer()) throw MishapBadCaster()
        let size = img.getStack().size()
        if (size < 1) throw MishapNotEnoughArgs(1, size)
        let pre_first = img.getStack().get(size - 1)
        if (pre_first instanceof NullIota) {
            let args = new Args(stack, 1)
            let FOR = global.ForLoopTasks
            let list = []
            for (let [id] of FOR) {
                list.push(StringIota.makeUnchecked(id))
            }
            stack.push(ListIota(list))
        } else if (pre_first instanceof StringIota || pre_first instanceof DoubleIota) {
            if (size < 2) throw MishapNotEnoughArgs(2, size)
            let pre_second = img.getStack().get(size - 2)
            if (pre_second instanceof BooleanIota && pre_second.bool) {
                let args = new Args(stack, 3)
                let code = args.list(0)
                let id = args.string(2)
                let uuid = player.uuid
                let FOR = global.ForLoopTasks
                FOR.set(id, { playerId: uuid, code: code, stopped: false, img: img.userData})
            } else if (pre_second instanceof BooleanIota && !pre_second.bool) {
                let args = new Args(stack, 2)
                let sid = args.string(1)
                let FOR = global.ForLoopTasks
                for (let [id] of FOR) {
                    if (id == sid) {
                        FOR.get(id).stopped = true
                    }
                }
            } else if (pre_second instanceof NullIota) {
                let args = new Args(stack, 2)
                let sid = args.string(1)
                let FOR = global.ForLoopTasks
                for (let [id] of FOR) {
                    if (id == sid) {
                        stack.push(BooleanIota(true))
                        return
                    }
                }
                stack.push(BooleanIota(false))
            } else if (pre_second instanceof ListIota) {
                let args = new Args(stack, 2)
                let code = args.list(0)
                let num = args.double(1)
                let executions = 0
                let server = env.caster?.server??Utils.server
                let staffEnv = new StaffCastEnv(player, InteractionHand.MAIN_HAND)
                let silencedEnv = SilencedCastingEnv.Companion.from(staffEnv)
                let executeLoop = () => {
                    if (executions >= num) return
                    let harness = CastingVM.empty(silencedEnv)
                    harness.queueExecuteAndWrapIotas(code, env.world)
                    server.scheduleInTicks(1, executeLoop)
                    executions++
                }
                executeLoop()
            } else throw MishapInvalidIota.of(pre_second, 1, 'class.bool_null_list') 
        } else throw MishapInvalidIota.of(pre_first, 0, 'class.null_str_double') 
    },

    // 匝格瑞俄斯之策略
    /*"event": (stack, env, img) => {
        let player = env.caster
        if (!player) throw MishapBadCaster()
        if (!player.isPlayer()) throw MishapBadCaster()
        let size = img.getStack().size()
        if (size < 2) throw MishapNotEnoughArgs(2, size)
        let pre_first = img.getStack().get(size - 1)
        let pre_second = img.getStack().get(size - 2)
        let pre_third = 0
        if (pre_second instanceof StringIota) {
            if (size < 3) throw MishapNotEnoughArgs(3, size)
            if (!(pre_first instanceof DoubleIota)) throw MishapInvalidIota.of(img.getStack().get(size - 1), 0, 'class.pre_event1')
            pre_third = img.getStack().get(size - 3)
        } else if (pre_second instanceof DoubleIota) {
            if (!(pre_first instanceof BooleanIota) && !(pre_first instanceof NullIota) && !(pre_first instanceof StringIota)) throw MishapInvalidIota.of(pre_first, 0, 'class.pre_event2')
        } else throw MishapInvalidIota.of(pre_second, 1, 'class.num_str')
        if (pre_third instanceof ListIota && pre_second instanceof StringIota && pre_first instanceof DoubleIota) {
            let pre_en = pre_first.double
            if (pre_en == 1 || pre_en == 2 || pre_en == 3 || pre_en == 4) {
                let args = new Args(stack, 3)
                let event = args.double(2)
                let spell = IotaType.serialize(args.get(0))
                let idoub = args.string(1)
                let HexEvent = new CompoundTag()
                    HexEvent.put('spell', spell)
                    HexEvent.put('enabled', true)
                    let eventKey = 'HexEvent_' + event
                    let EventHex = player.persistentData.getCompound(eventKey)
                    EventHex.put(idoub, HexEvent)
                    player.persistentData.put(eventKey, EventHex)
            } else if (pre_en == 5 || pre_en == 6 || pre_en == 7 || pre_en == 8) {
                let args = new Args(stack, 4)
                let event = args.double(3)
                let condition_0 = args.get(0)
                let spell = IotaType.serialize(args.get(1))
                let idoub = args.string(2)
                if (condition_0 instanceof NullIota) {
                    condition_0 = "null"
                } else if (condition_0 instanceof StringIota) {
                    condition_0 = condition_0.string
                } else throw MishapInvalidIota.of(args.get(0), 3, 'class.null_str')
                let HexEvent = new CompoundTag()
                    HexEvent.put('condition_0', condition_0)
                    HexEvent.put('spell', spell)
                    HexEvent.put('enabled', true)
                    let eventKey = 'HexEvent_' + event
                    let EventHex = player.persistentData.getCompound(eventKey)
                    EventHex.put(idoub, HexEvent)
                    player.persistentData.put(eventKey, EventHex)
            } else if (pre_en == 9 || pre_en == 10 || pre_en == 11) {
                let args = new Args(stack, 5)
                let event = args.double(4)
                let condition_0 = args.get(0)
                let condition_1 = args.get(1)
                let spell = IotaType.serialize(args.get(2))
                let idoub = args.string(3)
                if (condition_0 instanceof NullIota) {
                    condition_0 = "null"
                } else if (condition_0 instanceof StringIota) {
                    condition_0 = condition_0.string
                } else throw MishapInvalidIota.of(args.get(0), 4, 'class.null_str')
                if (condition_1 instanceof NullIota) {
                    condition_1 = "null"
                } else if (condition_1 instanceof StringIota) {
                    condition_1 = condition_1.string
                } else throw MishapInvalidIota.of(args.get(1), 3, 'class.null_str')
                let HexEvent = new CompoundTag()
                    HexEvent.put('condition_0', condition_0)
                    HexEvent.put('condition_1', condition_1)
                    HexEvent.put('spell', spell)
                    HexEvent.put('enabled', true)
                    let eventKey = 'HexEvent_' + event
                    let EventHex = player.persistentData.getCompound(eventKey)
                    EventHex.put(idoub, HexEvent)
                    player.persistentData.put(eventKey, EventHex)
            } else if (pre_en == 12 || pre_en == 13 || pre_en == 14) {
                let args = new Args(stack, 6)
                let event = args.double(5)
                let condition_0 = args.get(0)
                let condition_1 = args.get(1)
                let condition_2 = args.get(2)
                let spell = IotaType.serialize(args.get(3))
                let idoub = args.string(4)
                if (condition_0 instanceof NullIota) {
                    condition_0 = "null"
                } else if (condition_0 instanceof StringIota) {
                    condition_0 = condition_0.string
                } else throw MishapInvalidIota.of(args.get(0), 5, 'class.null_str')
                if (condition_1 instanceof NullIota) {
                    condition_1 = "null"
                } else if (condition_1 instanceof StringIota) {
                    condition_1 = condition_1.string
                } else throw MishapInvalidIota.of(args.get(1), 4, 'class.null_str')
                if (condition_2 instanceof NullIota) {
                    condition_2 = "null"
                } else if (condition_2 instanceof StringIota) {
                    condition_2 = condition_2.string
                } else throw MishapInvalidIota.of(args.get(2), 3, 'class.null_str')
                let HexEvent = new CompoundTag()
                    HexEvent.put('condition_0', condition_0)
                    HexEvent.put('condition_1', condition_1)
                    HexEvent.put('condition_2', condition_2)
                    HexEvent.put('spell', spell)
                    HexEvent.put('enabled', true)
                    let eventKey = 'HexEvent_' + event
                    let EventHex = player.persistentData.getCompound(eventKey)
                    EventHex.put(idoub, HexEvent)
                    player.persistentData.put(eventKey, EventHex)
            }
        } else if (pre_third instanceof BooleanIota && pre_second instanceof StringIota && pre_first instanceof DoubleIota) {
            let args = new Args(stack, 3)
            let enabled = args.bool(0)
            let idoub = args.string(1)
            let event = args.double(2)
            let eventKey = 'HexEvent_' + event
            if (player.persistentData.contains(eventKey)) {
                let eventData = player.persistentData.getCompound(eventKey)
                if (eventData.contains(idoub)) {
                    let subCompound = eventData.getCompound(idoub)
                    subCompound.putBoolean('enabled', enabled)
                    eventData.put(idoub, subCompound)
                    player.persistentData.put(eventKey, eventData)
                }
            }
        } else if (pre_third instanceof NullIota && pre_second instanceof StringIota && pre_first instanceof DoubleIota) {
            let args = new Args(stack, 3)
            let idoub = args.string(1)
            let event = args.double(2)
            let eventKey = 'HexEvent_' + event
            if (player.persistentData.contains(eventKey)) {
                let eventData = player.persistentData.getCompound(eventKey)
                if (eventData.contains(idoub)) {
                    eventData.remove(idoub)
                    player.persistentData.put(eventKey, eventData)
                }
            }
        } else if (pre_second instanceof DoubleIota && pre_first instanceof BooleanIota) {
            let args = new Args(stack, 2)
            let event = args.double(0)
            let enabled = args.bool(1)
            let eventKey = 'HexEvent_' + event
            let idList = []
            if (player.persistentData.contains(eventKey)) {
                let eventData = player.persistentData.getCompound(eventKey)
                let keys = eventData.getAllKeys()
                for (let key of keys) {
                    let subCompound = eventData.getCompound(key)
                    if (subCompound.contains('enabled') && subCompound.getBoolean('enabled') === enabled) {
                        idList.push(StringIota.makeUnchecked(key))
                    }
                }
            }
            stack.push(ListIota(idList))
        } else if (pre_second instanceof DoubleIota && pre_first instanceof NullIota) {
            let args = new Args(stack, 2)
            let event = args.double(0)
            let eventKey = 'HexEvent_' + event
            let idList = []
            if (player.persistentData.contains(eventKey)) {
                let eventData = player.persistentData.getCompound(eventKey)
                let keys = eventData.getAllKeys()
                for (let key of keys) {
                    idList.push(StringIota.makeUnchecked(key))
                }
            }
            stack.push(ListIota(idList))
        } else if (pre_second instanceof DoubleIota && pre_first instanceof StringIota) {
            let args = new Args(stack, 2)
            let event = args.double(0)
            let id = args.string(1)
            let eventKey = 'HexEvent_' + event
            if (player.persistentData.contains(eventKey)) {
                let eventData = player.persistentData.getCompound(eventKey)
                if (eventData.contains(id)) {
                    let subCompound = eventData.getCompound(id)
                    if (subCompound.contains('spell')) {
                        let spell = subCompound.getCompound('spell')
                        stack.push(IotaType.deserialize(spell, env.world))
                    }
                }
            }
        }
    },*/

    // 厄科之策略
    "echo": (stack, env, img, cont) => {
        let args = new Args(stack, 2)
        let iota = args.list(0)
        let num = args.double(1)
        if (num < 1 || !Number.isInteger(num)) throw MishapInvalidIota.of(args.get(1), 0, 'class.zero')
        let evaluatable = args.get(0)
        let instrs = OperatorUtils.evaluatable(evaluatable, 0)
        let newCont = cont
            if (instrs.left().isPresent || (cont instanceof SpellContinuation.NotDone && cont.frame instanceof FrameFinishEval)) {
                newCont = cont
            } else {
                newCont = cont.pushFrame(FrameFinishEval)
            }
        for (let i = 0; i < num; i++) {
            let frame = FrameEvaluate(iota, true)
            newCont = newCont.pushFrame(frame)
        }
        return {
            newCont: newCont,
            sideEffects: [],
            opsConsumed: img.opsConsumed + 1,
            newData: img.copy(
                stack,
                img.parenCount,
                img.parenthesized,
                img.escapeNext,
                img.opsConsumed + 1,
                img.userData
            )
        }
    },

    // 伊西斯之策略
    "isis": (stack, env, img, cont) => {
        stack.push(ContinuationIota(cont))
    },

    // 厄洛斯之策略
    /*"key": (stack, env, img) => {
        let player = env.caster
        if (!player) throw MishapBadCaster()
        if (!player.isPlayer()) throw MishapBadCaster()
        let args = new Args(stack, 1)
        let spell = args.get(0)
        
        let bindingData = new CompoundTag()
        bindingData.put('image', img.userData)
        bindingData.put('spell', IotaType.serialize(spell))

        let bindings = player.persistentData.getCompound('hex_key')
        bindings.put('G_key', bindingData)
        player.persistentData.put('hex_key', bindings)
    },*/




    // 数读之纯化
    "num_read": (stack, env) => {
        let player = env.caster
        if (player == null) throw MishapBadCaster()
        if (!player.isPlayer()) throw MishapBadCaster()
        let args = new Args(stack, 1)
        let num = args.double(0)
        let hotbarStack = player.getInventory().getItem(num)
        if (hotbarStack.isEmpty()) {
            stack.push(NullIota())
            return
        }
        let dataHolder = IXplatAbstractions.INSTANCE.findDataHolder(hotbarStack)
        if (!dataHolder) {
            stack.push(NullIota())
            return
        }
        let iota = dataHolder.readIota(env.world)
        if (iota) {
            stack.push(iota);
        } else {
            stack.push(NullIota())
        }
    },

    // 数写之纯化
    "num_write": (stack, env) => {
        let player = env.caster
        if (player == null) throw MishapBadCaster()
        if (!player.isPlayer()) throw MishapBadCaster()
        let args = new Args(stack, 2)
        let any = args.get(0)
        let num = args.double(1)
        let hotbarStack = player.getInventory().getItem(num)
        if (hotbarStack.isEmpty()) return
        
        let dataHolder = IXplatAbstractions.INSTANCE.findDataHolder(hotbarStack)
        if (!dataHolder) return
        
        dataHolder.writeIota(any, false)
    },

    // 博尔颂之策略
    "id_write": (stack, env, img) => {
        let args = new Args(stack, 2)
        let id = args.double(0)
        let iota = args.get(1)
        let userData = img.userData
        let localBindings
        if (userData.contains("local_bindings")) {
            localBindings = userData.getCompound("local_bindings")
        } else {
            localBindings = new CompoundTag()
        }
        let serializedTag = serializeIota(iota)
        let bindingData = new CompoundTag()
        bindingData.put("iota", serializedTag)
        localBindings.put(id, bindingData)
        userData.put("local_bindings", localBindings)
    },

    // 密米尔之纯化
    "id_read": (stack, env, img) => {
        let args = new Args(stack, 1)
        let id = args.double(0)
        let userData = img.userData
        if (!userData.contains("local_bindings")) {
            stack.push(NullIota())
            return
        }
        let localBindings = userData.getCompound("local_bindings")
        if (!localBindings.contains(id)) {
            stack.push(NullIota())
            return
        }
        let bindingData = localBindings.getCompound(id)
        let iotaTag = bindingData.getCompound("iota")
        let level = env.world
        let iota = deserializeIota(iotaTag, level)
        stack.push(iota)
    },

    // 克洛托之策略
    "let_in": (stack, env) => {
        let args = new Args(stack, 2)
        let iota = args.get(0)
        let id = args.get(1)
        let server = env.caster?.server??Utils.server
        let idStr
        if (id instanceof DoubleIota) {
            idStr = id.double.toString()
        } else if (id instanceof StringIota) {
            idStr = id.getString()
        } else throw MishapInvalidIota.of(args.get(1), 0, 'class.num_str')
        
        let bindings = server.persistentData.getCompound('hex_let')
        if (iota instanceof NullIota) {
            bindings.remove(idStr)
            server.persistentData.put('hex_let', bindings)
            return
        }
        
        let serializedTag = serializeIota(iota)
        let bindingData = new CompoundTag()
        bindingData.put('iota', serializedTag)
        bindingData.putDouble('count', -1)
        bindings.put(idStr, bindingData)
        server.persistentData.put('hex_let', bindings)
    },

    // 拉克西丝之馏化
    "let_read": (stack, env) => {
        let args = new Args(stack, 2)
        let id = args.get(0)
        let num = args.double(1)
        let server = env.caster?.server??Utils.server
        if (!Number.isInteger(num)) throw MishapInvalidIota.of(args.get(1), 0, 'class.integer')
        
        let idStr
        if (id instanceof DoubleIota) {
            idStr = id.double.toString()
        } else if (id instanceof StringIota) {
            idStr = id.getString()
        } else throw MishapInvalidIota.of(args.get(0), 1, 'class.num_str')
        
        let bindings = server.persistentData.getCompound('hex_let')
        if (!bindings.contains(idStr)) {
            stack.push(NullIota())
            return
        }
        
        let bindingData = bindings.getCompound(idStr)
        let currentCount = bindingData.getDouble('count')
        
        if (currentCount === -1) {
            bindingData.putDouble('count', num)
            bindings.put(idStr, bindingData)
            server.persistentData.put('hex_let', bindings)
            stack.push(DoubleIota(num))
        } else {
            let newCount = currentCount + num
            bindingData.putDouble('count', newCount)
            bindings.put(idStr, bindingData)
            server.persistentData.put('hex_let', bindings)
            stack.push(DoubleIota(newCount))
        }
    },

    // 阿特洛波斯之纯化
    "let_out": (stack, env) => {
        let args = new Args(stack, 1)
        let id = args.get(0)
        let server = env.caster?.server??Utils.server
        let level = env.world
        
        let idStr
        if (id instanceof DoubleIota) {
            idStr = id.double.toString()
        } else if (id instanceof StringIota) {
            idStr = id.getString()
        } else {
            throw MishapInvalidIota.of(args.get(0), 0, 'class.num_str')
        }
        
        let bindings = server.persistentData.getCompound('hex_let')
        if (!bindings.contains(idStr)) {
            stack.push(NullIota())
            return
        }
        
        let bindingData = bindings.getCompound(idStr)
        let currentCount = bindingData.getDouble('count')
        let iotaTag = bindingData.getCompound('iota')
        let iota = deserializeIota(iotaTag, level)
        
        if (currentCount === -1) {
            stack.push(iota)
            return
        }
        
        let newCount = currentCount - 1
        if (newCount <= 0) {
            bindings.remove(idStr)
        } else {
            bindingData.putDouble('count', newCount)
            bindings.put(idStr, bindingData)
        }
        server.persistentData.put('hex_let', bindings)
        stack.push(iota)
    },

    // 射线之提整
    "ray_block": (stack, env) => {
        let args = new Args(stack, 3)
        let startPos = args.vec3(0)
        let secondVec = args.vec3(1)
        let isDirection = args.bool(2)

        let dirVec
        if (isDirection) {
            dirVec = secondVec
        } else {
            dirVec = new Vec3d(
                secondVec.x() - startPos.x(),
                secondVec.y() - startPos.y(),
                secondVec.z() - startPos.z()
            )
        }

        let dirMagnitude = Math.sqrt(dirVec.x() * dirVec.x() + dirVec.y() * dirVec.y() + dirVec.z() * dirVec.z())

        if (isDirection && dirMagnitude < 0.0001) throw MishapInvalidIota.of(args.get(1), 1, 'class.zero_vec')

        if (!isDirection && dirMagnitude < 1e-10) {
            let startBlock = new BlockPos(
                Math.floor(startPos.x() + 1e-10),
                Math.floor(startPos.y() + 1e-10),
                Math.floor(startPos.z() + 1e-10)
            )
            stack.push(ListIota([Vec3Iota(startBlock)]))
            return
        }

        let unitDir = new Vec3d(
            dirVec.x() / dirMagnitude,
            dirVec.y() / dirMagnitude,
            dirVec.z() / dirMagnitude
        )

        let startBlock = new BlockPos(
            Math.floor(startPos.x() + 1e-10),
            Math.floor(startPos.y() + 1e-10),
            Math.floor(startPos.z() + 1e-10)
        )

        let blocks = []
        blocks.push(Vec3Iota(startBlock))
        let currentBlock = startBlock
        let count = 1

        let targetCount = null
        let targetBlockPos = null
        if (isDirection) {
            targetCount = Math.round(dirMagnitude)
            if (targetCount <= 0) {
                stack.push(ListIota([]))
                return
            }
            if (targetCount === 1) {
                stack.push(ListIota(blocks))
                return
            }
        } else {
            targetBlockPos = new BlockPos(
                Math.floor(secondVec.x() + 1e-10),
                Math.floor(secondVec.y() + 1e-10),
                Math.floor(secondVec.z() + 1e-10)
            )
        }

        let stepX = unitDir.x() > 0 ? 1 : (unitDir.x() < 0 ? -1 : 0)
        let stepY = unitDir.y() > 0 ? 1 : (unitDir.y() < 0 ? -1 : 0)
        let stepZ = unitDir.z() > 0 ? 1 : (unitDir.z() < 0 ? -1 : 0)

        let tMaxX, tMaxY, tMaxZ
        if (stepX !== 0) {
            let nextBoundary = stepX > 0 ? Math.floor(startPos.x()) + 1 : Math.floor(startPos.x())
            tMaxX = (nextBoundary - startPos.x()) / unitDir.x()
        } else {
            tMaxX = Infinity
        }
        if (stepY !== 0) {
            let nextBoundary = stepY > 0 ? Math.floor(startPos.y()) + 1 : Math.floor(startPos.y())
            tMaxY = (nextBoundary - startPos.y()) / unitDir.y()
        } else {
            tMaxY = Infinity
        }
        if (stepZ !== 0) {
            let nextBoundary = stepZ > 0 ? Math.floor(startPos.z()) + 1 : Math.floor(startPos.z())
            tMaxZ = (nextBoundary - startPos.z()) / unitDir.z()
        } else {
            tMaxZ = Infinity
        }

        let tDeltaX = stepX !== 0 ? Math.abs(1 / unitDir.x()) : Infinity
        let tDeltaY = stepY !== 0 ? Math.abs(1 / unitDir.y()) : Infinity
        let tDeltaZ = stepZ !== 0 ? Math.abs(1 / unitDir.z()) : Infinity

        let t = 0
        let iter = 0
        const maxIter = 1024

        while (iter < maxIter) {
            iter++

            let axis
            if (tMaxX <= tMaxY && tMaxX <= tMaxZ) {
                axis = 'x'
                t = tMaxX
                tMaxX += tDeltaX
            } else if (tMaxY <= tMaxX && tMaxY <= tMaxZ) {
                axis = 'y'
                t = tMaxY
                tMaxY += tDeltaY
            } else {
                axis = 'z'
                t = tMaxZ
                tMaxZ += tDeltaZ
            }

            if (t > dirMagnitude + 1e-10) break

            if (axis === 'x') {
                currentBlock = new BlockPos(currentBlock.getX() + stepX, currentBlock.getY(), currentBlock.getZ())
            } else if (axis === 'y') {
                currentBlock = new BlockPos(currentBlock.getX(), currentBlock.getY() + stepY, currentBlock.getZ())
            } else {
                currentBlock = new BlockPos(currentBlock.getX(), currentBlock.getY(), currentBlock.getZ() + stepZ)
            }

            blocks.push(Vec3Iota(currentBlock))
            count++

            if (isDirection && count >= targetCount) break
            if (!isDirection && currentBlock.equals(targetBlockPos)) {
                reachedTarget = true
                break
            }
        }

        stack.push(ListIota(blocks))
    },

    // 合焦之提整
    "square_block": (stack, env) => {
        let args = new Args(stack, 3)
        let center = args.vec3(0)
        let sideLength = args.double(1)
        let mode = args.get(2)
        if (mode instanceof BooleanIota) {
            mode = mode.bool
        } else if (mode instanceof NullIota) {
            mode = null
        } else throw MishapInvalidIota.of(args.get(2), 0, 'class.bool_null')
        
        if (sideLength < 1 || !Number.isInteger(sideLength)) throw MishapInvalidIota.of(args.get(1), 1, 'class.zero')

        let halfSide = sideLength
        let minX = center.x() - halfSide
        let maxX = center.x() + halfSide
        let minY = center.y() - halfSide
        let maxY = center.y() + halfSide
        let minZ = center.z() - halfSide
        let maxZ = center.z() + halfSide
        
        let blockPositions = []
        
        let minBlockX = Math.floor(minX)
        let maxBlockX = Math.floor(maxX)
        let minBlockY = Math.floor(minY)
        let maxBlockY = Math.floor(maxY)
        let minBlockZ = Math.floor(minZ)
        let maxBlockZ = Math.floor(maxZ)
        
        for (let x = minBlockX; x <= maxBlockX; x++) {
            for (let y = minBlockY; y <= maxBlockY; y++) {
                for (let z = minBlockZ; z <= maxBlockZ; z++) {
                    let blockCenter = new Vec3d(x + 0.5, y + 0.5, z + 0.5)
                    
                    if (mode === true) {
                        blockPositions.push(Vec3Iota(blockCenter))
                    } else if (mode === false) {
                        let onSurface = 
                            Math.abs(blockCenter.x() - minX) < 0.5 || 
                            Math.abs(blockCenter.x() - maxX) < 0.5 ||
                            Math.abs(blockCenter.y() - minY) < 0.5 || 
                            Math.abs(blockCenter.y() - maxY) < 0.5 ||
                            Math.abs(blockCenter.z() - minZ) < 0.5 || 
                            Math.abs(blockCenter.z() - maxZ) < 0.5
                        
                        if (onSurface) {
                            blockPositions.push(Vec3Iota(blockCenter))
                        }
                    } else if (mode === null) {
                        let onEdge = 
                            (Math.abs(blockCenter.x() - minX) < 0.5 && 
                            Math.abs(blockCenter.y() - minY) < 0.5) ||
                            (Math.abs(blockCenter.x() - minX) < 0.5 && 
                            Math.abs(blockCenter.y() - maxY) < 0.5) ||
                            (Math.abs(blockCenter.x() - minX) < 0.5 && 
                            Math.abs(blockCenter.z() - minZ) < 0.5) ||
                            (Math.abs(blockCenter.x() - minX) < 0.5 && 
                            Math.abs(blockCenter.z() - maxZ) < 0.5) ||
                            (Math.abs(blockCenter.x() - maxX) < 0.5 && 
                            Math.abs(blockCenter.y() - minY) < 0.5) ||
                            (Math.abs(blockCenter.x() - maxX) < 0.5 && 
                            Math.abs(blockCenter.y() - maxY) < 0.5) ||
                            (Math.abs(blockCenter.x() - maxX) < 0.5 && 
                            Math.abs(blockCenter.z() - minZ) < 0.5) ||
                            (Math.abs(blockCenter.x() - maxX) < 0.5 && 
                            Math.abs(blockCenter.z() - maxZ) < 0.5) ||
                            (Math.abs(blockCenter.y() - minY) < 0.5 && 
                            Math.abs(blockCenter.z() - minZ) < 0.5) ||
                            (Math.abs(blockCenter.y() - minY) < 0.5 && 
                            Math.abs(blockCenter.z() - maxZ) < 0.5) ||
                            (Math.abs(blockCenter.y() - maxY) < 0.5 && 
                            Math.abs(blockCenter.z() - minZ) < 0.5) ||
                            (Math.abs(blockCenter.y() - maxY) < 0.5 && 
                            Math.abs(blockCenter.z() - maxZ) < 0.5)
                        
                        if (onEdge) {
                            blockPositions.push(Vec3Iota(blockCenter))
                        }
                    }
                }
            }
        }
        
        stack.push(ListIota(blockPositions))
    },

    // 对焦之提整
    "rectangle_block": (stack, env) => {
        let args = new Args(stack, 3)
        let pos1 = args.vec3(0)
        let pos2 = args.vec3(1)
        let mode = args.get(2)
        if (mode instanceof BooleanIota) {
            mode = mode.bool
        } else if (mode instanceof NullIota) {
            mode = null
        } else throw MishapInvalidIota.of(args.get(2), 0, 'class.bool_null')
        
        let minX = Math.min(Math.floor(pos1.x()), Math.floor(pos2.x()))
        let maxX = Math.max(Math.floor(pos1.x()), Math.floor(pos2.x()))
        let minY = Math.min(Math.floor(pos1.y()), Math.floor(pos2.y()))
        let maxY = Math.max(Math.floor(pos1.y()), Math.floor(pos2.y()))
        let minZ = Math.min(Math.floor(pos1.z()), Math.floor(pos2.z()))
        let maxZ = Math.max(Math.floor(pos1.z()), Math.floor(pos2.z()))
        
        let coords = []
        
        for (let x = minX; x <= maxX; x++) {
            for (let y = minY; y <= maxY; y++) {
                for (let z = minZ; z <= maxZ; z++) {
                    if (mode === true) {
                        coords.push(Vec3Iota(new Vec3d(x, y, z)))
                    } else if (mode === false) {
                        if (x === minX || x === maxX || 
                            y === minY || y === maxY || 
                            z === minZ || z === maxZ) {
                            coords.push(Vec3Iota(new Vec3d(x, y, z)))
                        }
                    } else if (mode === null) {
                        let onEdge = false
                        if (x === minX || x === maxX) {
                            if (y === minY || y === maxY) {
                                onEdge = true
                            }
                            else if (z === minZ || z === maxZ) {
                                onEdge = true
                            }
                        }
                        else if (y === minY || y === maxY) {
                            if (z === minZ || z === maxZ) {
                                onEdge = true
                            }
                        }
                        if (onEdge) {
                            coords.push(Vec3Iota(new Vec3d(x, y, z)))
                        }
                    }
                }
            }
        }
        
        stack.push(ListIota(coords))
    },

    // 区域之馏化：方块实体
    "zone_block": (stack, env) => {
        let args = new Args(stack, 2)
        let pos = args.vec3(0)
        ActionJS.helpers.assertVecInRange(env, pos)
        let x = pos.x(),
            y = pos.y(),
            z = pos.z()
        let distSq = args.double(1)
        distSq *= distSq
        let chunkX = x >> 4,
            chunkY = z >> 4
        let level = env.world
        let targets = []
        for (let cx = chunkX - 1; cx <= chunkX + 1; cx++) {
            for (let cy = chunkY - 1; cy <= chunkY + 1; cy++) {
                let chunk = level.getChunk(cx, cy)
                for (let bpos of chunk.getBlockEntitiesPos()) {
                    if (!env.isVecInRange(bpos)) continue
                    let dsq = Math.pow(x - bpos.x, 2) + Math.pow(y - bpos.y, 2) + Math.pow(z - bpos.z, 2)
                    if (dsq <= distSq) targets.push(Vec3Iota(bpos))
                }
            }
        }
        stack.push(ListIota(targets))
    },

    // 维度之精思
    "world": (stack, env) => {
        let level = env.world
        stack.push(StringIota.makeUnchecked(level.dimension))
    },

    // 实体之纯化：非玩家
    "get_entity/not_player": (stack, env) => {
        let args = new Args(stack, 1)
        let targetPos = args.vec3(0)
        let level = env.world
        ActionJS.helpers.assertVecInRange(env, targetPos)
        let aabb = new AABB(
            targetPos.x() - 0.5, targetPos.y() - 0.5, targetPos.z() - 0.5,
            targetPos.x() + 0.5, targetPos.y() + 0.5, targetPos.z() + 0.5
        )
        let entities = level.getEntities()
        let entitiesInRange = []
        for (let i = 0; i < entities.size(); i++) {
            let entity = entities.get(i)
            if (entity.isPlayer()) {
                continue
            }
            if (typeof entity.x !== 'number' || typeof entity.y !== 'number' || typeof entity.z !== 'number') {
                continue
            }
            if (!aabb.contains(entity.x, entity.y, entity.z)) {
                continue
            }
            let dx = entity.x - targetPos.x()
            let dy = entity.y - targetPos.y()
            let dz = entity.z - targetPos.z()
            let distanceSqr = dx*dx + dy*dy + dz*dz
            entitiesInRange.push({
                entity: entity,
                distanceSqr: distanceSqr
            })
        }
        if (entitiesInRange.length > 0) {
            for (let i = 0; i < entitiesInRange.length - 1; i++) {
                for (let j = 0; j < entitiesInRange.length - 1 - i; j++) {
                    if (entitiesInRange[j].distanceSqr > entitiesInRange[j + 1].distanceSqr) {
                        let temp = entitiesInRange[j]
                        entitiesInRange[j] = entitiesInRange[j + 1]
                        entitiesInRange[j + 1] = temp
                    }
                }
            }
            let targetEntity = entitiesInRange[0].entity
            stack.push(EntityIota(targetEntity))
        } else {
            stack.push(NullIota())
        }
    },

    // 标签之纯化
    "get_tag": (stack, env) => {
        let args = new Args(stack, 1)
        let target = args.get(0)
        let level = env.world
        let tagsStream
        if (target instanceof Vec3Iota) {
            let vec = target.vec3
            ActionJS.helpers.assertVecInRange(env, vec)
            let block = level.getBlock(vec).getBlockState()
            tagsStream = block.getTags()
        } else if (target instanceof DoubleIota) {
            let player = env.caster
            if (player == null) throw MishapBadCaster()
            if (!player.isPlayer()) throw MishapBadCaster()
            let slot = target.double
            let item = player.getInventory().getItem(slot)
            tagsStream = item.getTags()
        } else if (target instanceof EntityIota && target.entity.getType() == "minecraft:item") {
            let entity = target.entity
            ActionJS.helpers.assertEntityInRange(env, entity)
            tagsStream = entity.getItem().getTags()
        } else if (target instanceof MoteIota) {
            let item = new ItemStack(target.getItem().getId(), 1)
            tagsStream = item.getTags()
        } else if (target instanceof StringIota) {
            let item = Item.of(target.string)
            if (!item.isEmpty()) {
                tagsStream = item.getTags()
            } else throw MishapInvalidIota.of(args.get(0), 0, 'class.tag')
        } else throw MishapInvalidIota.of(args.get(0), 0, 'class.tag')
        let tagsArray = []
        let iterator = tagsStream.iterator()
        while (iterator.hasNext()) {
            let tag = iterator.next()
            tagsArray.push(StringIota.makeUnchecked(tag.location().toString()))
        }
        stack.push(ListIota(tagsArray))
    },

    // 标签之馏化
    "has_tag": (stack, env) => {
        let args = new Args(stack, 2)
        let target = args.get(0)
        let tags = args.string(1)
        let level = env.world
        let tagsStream
        if (target instanceof Vec3Iota) {
            let vec = target.vec3
            ActionJS.helpers.assertVecInRange(env, vec)
            let block = level.getBlock(vec).getBlockState()
            tagsStream = block.getTags()
        } else if (target instanceof DoubleIota) {
            let player = env.caster
            if (player == null) throw MishapBadCaster()
            if (!player.isPlayer()) throw MishapBadCaster()
            let slot = target.double
            let item = player.getInventory().getItem(slot)
            tagsStream = item.getTags()
        } else if (target instanceof EntityIota && target.entity.getType() == "minecraft:item") {
            let entity = target.entity
            ActionJS.helpers.assertEntityInRange(env, entity)
            tagsStream = entity.getItem().getTags()
        } else if (target instanceof MoteIota) {
            let item = new ItemStack(target.getItem().getId(), 1)
            tagsStream = item.getTags()
        } else if (target instanceof StringIota) {
            let item = Item.of(target.string)
            if (!item.isEmpty()) {
                tagsStream = item.getTags()
            } else throw MishapInvalidIota.of(args.get(0), 1, 'class.tag')
        } else throw MishapInvalidIota.of(args.get(0), 1, 'class.tag')
        let iterator = tagsStream.iterator()
        while (iterator.hasNext()) {
            let tag = iterator.next()
            if (tag.location().toString() == tags) {
                stack.push(BooleanIota(true))
                return
            }
        }
        stack.push(BooleanIota(false))
    },

    // 勘探之提整
    "found": (stack, env) => {
        let args = new Args(stack, 3)
        let position = args.vec3(0)
        let radius = args.double(1)
        let BlockName = args.string(2)
        let targetBlockName = RL(BlockName)
        let level = env.world
        
        let centerX = Math.floor(position.x())
        let centerY = Math.floor(position.y())
        let centerZ = Math.floor(position.z())
        
        let found = false

        for (let dy = 0; dy <= 384; dy++) {
            let y = centerY - dy
            
            if (y < -64) {
                break
            }
            
            for (let dx = -radius; dx <= radius; dx++) {
                for (let dz = -radius; dz <= radius; dz++) {
                    let x = centerX + dx
                    let z = centerZ + dz
                    let pos = new BlockPos(x, y, z)
                    let block = level.getBlock(pos)
                    if (block.id === targetBlockName) {
                        found = true
                        break
                    }
                }
                if (found) break
            }
            if (found) break
        }
        stack.push(BooleanIota(found))
    },

    // 上传
    "cloud": (stack, env, img) => {
        let player = env.caster
        if (player == null) throw MishapBadCaster()
        if (!player.isPlayer()) throw MishapBadCaster()
        let args = new Args(stack, 1)
        let num = args.double(0)

        let userData = img.userData
        let boundStorage
        if (userData && userData.contains(MoteIota.TAG_TEMP_STORAGE)) {
            boundStorage = userData.getUUID(MoteIota.TAG_TEMP_STORAGE)
        } else {
            boundStorage = MediafiedItemManager.getBoundStorage(player)
            if (!boundStorage) throw MishapNoBoundStorage()
        }
        if (MediafiedItemManager.isStorageFull(boundStorage) != false) throw MishapStorageFull(boundStorage)
        
        let itemStack = player.getInventory().getStackInSlot(num)
        if (itemStack.isEmpty()) return
        
        let mote = MoteIota.makeIfStorageLoaded(itemStack, boundStorage)
        player.getInventory().setStackInSlot(num, "minecraft:air")
        stack.push(mote)
    },

    // 下载
    "download": (stack, env) => {
        let args = new Args(stack, 2)
        let mote = args.get(0)
        let num = args.double(1)
        let player = env.caster
        if (player == null) throw MishapBadCaster()
        if (!player.isPlayer()) throw MishapBadCaster()
        
        if (mote instanceof MoteIota) {
            let stacks = mote.getStacksToDrop(num)
            for (let stack of stacks) {
                player.give(stack)
            }
        } else {
            throw MishapInvalidIota.of(args.get(0), 1, 'class.mote')
        }
    },

    // 质元之精思
    "motes": (stack, env, img) => {
        let player = env.caster
        if (player == null) throw MishapBadCaster()
        if (!player.isPlayer()) throw MishapBadCaster()

        let userData = img.userData
        let boundStorage
        if (userData && userData.contains(MoteIota.TAG_TEMP_STORAGE)) {
            boundStorage = userData.getUUID(MoteIota.TAG_TEMP_STORAGE)
        } else {
            boundStorage = MediafiedItemManager.getBoundStorage(player)
            if (!boundStorage) throw MishapNoBoundStorage()
        }
        
        let allRecords = MediafiedItemManager.getAllRecords(boundStorage)
        if (!allRecords || allRecords.isEmpty()) {
            stack.push(ListIota([]))
            return
        }
        
        let results = []
        let keys = allRecords.keySet().toArray()
        for (let i = 0; i < keys.length; i++) {
            let index = keys[i]
            let mote = new MoteIota(index)
            if (mote) results.push(mote)
        }
        
        stack.push(ListIota(results))
    },

    // 合质之精思
    "get_all_motes": (stack, env, img) => {
        let player = env.caster
        if (player == null) throw MishapBadCaster()
        if (!player.isPlayer()) throw MishapBadCaster()

        let userData = img.userData
        let boundStorage
        if (userData && userData.contains(MoteIota.TAG_TEMP_STORAGE)) {
            boundStorage = userData.getUUID(MoteIota.TAG_TEMP_STORAGE)
        } else {
            boundStorage = MediafiedItemManager.getBoundStorage(player)
            if (!boundStorage) throw MishapNoBoundStorage()
        }
        let itemTypes = MediafiedItemManager.getAllContainedItemTypes(boundStorage)
        if (!itemTypes) {
            stack.push(ListIota([]))
            return
        }
        let nameList = []
        let iterator = itemTypes.iterator()
        while (iterator.hasNext()) {
            let itemType = iterator.next()
            if (itemType && itemType.id) {
                nameList.push(StringIota.makeUnchecked(itemType.id))
            }
        }
        stack.push(ListIota(nameList))
    },

    // 合质之纯化
    "get_contained_motes": (stack, env, img) => {
        let args = new Args(stack, 1)
        let input = args.get(0)
        let player = env.caster
        if (player == null) throw MishapBadCaster()
        if (!player.isPlayer()) throw MishapBadCaster()

        let userData = img.userData
        let boundStorage
        if (userData && userData.contains(MoteIota.TAG_TEMP_STORAGE)) {
            boundStorage = userData.getUUID(MoteIota.TAG_TEMP_STORAGE)
        } else {
            boundStorage = MediafiedItemManager.getBoundStorage(player)
            if (!boundStorage) throw MishapNoBoundStorage()
        }
        
        let itemId = null
        if (input instanceof MoteIota && input.record && input.record.item) {
            let str = input.record.item.toString()
            let match = str.match(/\[(.*?)\]/)
            itemId = match ? match[1] : str
        } else if (input instanceof StringIota) {
            itemId = input.getString()
        } else throw MishapInvalidIota.of(args.get(0), 0, 'class.motes')
        if (!itemId) {
            stack.push(ListIota([]))
            return
        }
        let matchingRecords = MediafiedItemManager.getItemRecordsMatching(boundStorage, itemId)
        if (!matchingRecords) {
            stack.push(ListIota([]))
            return
        }
        let results = []
        let iterator = matchingRecords.keySet().iterator()
        while (iterator.hasNext()) {
            let index = iterator.next()
            let mote = new MoteIota(index)
            if (mote) results.push(mote)
        }
        stack.push(ListIota(results))
    },

    // 重新充能
    "charge": (stack, env) => {
        let player = env.caster
        if (player == null) throw MishapBadCaster()
        if (!player.isPlayer()) throw MishapBadCaster()
        let args = new Args(stack, 1)
        let input = args.get(0)
        let artifact = player.offHandItem
        if (artifact.isEmpty()) {
            throw MishapBadOffhandItem.of(artifact, 'class.recharge1')
        }
        
        if (artifact.id !== "hexcasting:trinket" && artifact.id !== "hexcasting:artifact" && artifact.id !== "hexcasting:battery") {
            throw MishapBadOffhandItem.of(artifact, 'class.recharge1')
        }
        
        let nbt = artifact.nbt || {}
        if (nbt["hexcasting:start_media"] === undefined) {
            throw MishapBadOffhandItem.of(artifact, 'class.recharge2')
        }
        
        let media = 0
        if (artifact.nbt["hexcasting:media"] !== undefined) {
            media = artifact.nbt["hexcasting:media"]
        }

        let start = artifact.nbt["hexcasting:start_media"]
        
        let mana = {
            'hexcasting:amethyst_dust': { value: 10000 },
            'minecraft:amethyst_shard': { value: 50000 },
            'hexcasting:charged_amethyst': { value: 100000 }
        }
        
        if (input instanceof MoteIota) {
            let itemId = input.getItem().getId()
            if (!mana[itemId]) {
                throw MishapInvalidIota.of(args.get(0), 0, 'class.media')
            }
            let count = input.getCount()
            let eta = mana[itemId]
            let needed = Math.ceil((start - media) / eta.value)
            let actualUse = Math.min(needed, count)
            if (actualUse <= 0) {
                return
            }
            
            let newMedia = media + (actualUse * eta.value)
            if (newMedia > start) {
                newMedia = start
            }

            artifact.nbt["hexcasting:media"] = newMedia
            input.removeItems(actualUse)

        } else throw MishapInvalidIota.of(args.get(0), 0, 'class.mote')
    },

    // 冲积之提整
    "get_contain": (stack, env) => {
        let args = new Args(stack, 3)
        let vec = args.get(0)
        let mode = args.get(1)
        let bool = args.get(2)
        
        let pos
        let side
        if (vec instanceof Vec3Iota) {
            pos = vec.vec3
            side = Vec3d.ZERO
        } else if (vec instanceof ListIota && vec.list.list.length == 2) {
            pos = vec.list.list[0].vec3
            side = vec.list.list[1].vec3
        } else throw MishapInvalidIota.of(args.get(0), 2, 'class.container')
        let condition
        if (bool instanceof NullIota) {
            condition = null
        } else if (bool instanceof BooleanIota) {
            condition = bool.bool
        } else throw MishapInvalidIota.of(args.get(1), 1, 'class.bool_null')
        let modes
        if (mode instanceof DoubleIota) {
            modes = mode.double
        } else if (mode instanceof ListIota) {
            modes = mode.list.list
        } else if (mode instanceof StringIota) {
            modes = mode.getString()
        } else throw MishapInvalidIota.of(args.get(2), 0, 'class.num_str_list')
        let blockpos = new BlockPos(Math.floor(pos.x()), Math.floor(pos.y()), Math.floor(pos.z()))
        let container = env.world.getBlockEntity(blockpos)
        if (!container || !(container instanceof Container)) throw MishapInvalidIota.of(args.get(0), 2, 'class.containers')
        let slots = []
        if (side.distanceToSqr(Vec3d.ZERO) < 0.01) {
            for (let i = 0; i < container.containerSize; i++) {
                slots.push(i)
            }
        } else if (container instanceof WorldlyContainer) {
            let direction1 = Direction.getNearest(side.x(), side.y(), side.z())
            slots = container.getSlotsForFace(direction1).asIterable()
        } else throw MishapInvalidIota.of(args.get(0), 2, 'class.containers')
        if (condition == null) {
            if (mode instanceof DoubleIota) {
                let num = mode.double
                if (mode instanceof DoubleIota) {
                    if (num == 0) {
                        let slotList = slots.map(slot => DoubleIota(slot))
                        stack.push(ListIota(slotList))
                    } else if (num > 0) {
                        let nonEmptySlots = []
                        for (let slot of slots) {
                            let itemStack = container.getItem(slot)
                            if (!itemStack.isEmpty()) {
                                nonEmptySlots.push(DoubleIota(slot))
                            }
                        }
                        stack.push(ListIota(nonEmptySlots))
                    } else {
                        let emptySlots = []
                        for (let slot of slots) {
                            let itemStack = container.getItem(slot)
                            if (itemStack.isEmpty()) {
                                emptySlots.push(DoubleIota(slot))
                            }
                        }
                        stack.push(ListIota(emptySlots))
                    }
                }
            } else if (mode instanceof StringIota) {
                let name = []
                for (let slot of slots) {
                    let itemStack = container.getItem(slot)
                    if (!itemStack.isEmpty()) {
                        name.push(StringIota.makeUnchecked(itemStack.item.getId()))
                    }
                }
                stack.push(ListIota(name))
            } else if (mode instanceof ListIota) {
                let nbts = []
                for (let slot of slots) {
                    let itemStack = container.getItem(slot)
                    if (!itemStack.isEmpty()) {
                        let nbt = [
                            StringIota.makeUnchecked(itemStack.item.getId()),
                            itemStack.nbt ? StringIota.makeUnchecked(itemStack.nbt) : StringIota.makeUnchecked("null")
                        ]
                        nbts.push(ListIota(nbt))
                    }
                }
                stack.push(ListIota(nbts))
            }
        } else {
            if (mode instanceof DoubleIota) {
                if (!slots.includes(modes)) {
                    stack.push(NullIota())
                    return
                }
                let itemStack = container.getItem(modes)
                if (itemStack.isEmpty()) {
                    stack.push(NullIota())
                    return
                }
                if (!condition) {
                    stack.push(StringIota.makeUnchecked(itemStack.item.getId()))
                } else {
                    let nbt = [
                        StringIota.makeUnchecked(itemStack.item.getId()),
                        itemStack.nbt ? StringIota.makeUnchecked(itemStack.nbt) : StringIota.makeUnchecked("null")
                    ]
                    stack.push(ListIota(nbt))
                }
            } else if (mode instanceof StringIota) {
                let foundItems = []
                for (let slot of slots) {
                    let itemStack = container.getItem(slot)
                    if (!itemStack.isEmpty() && itemStack.item.getId() == modes) {
                        if (!condition) {
                            foundItems.push(DoubleIota(slot))
                        } else {
                            let nbt = [
                                StringIota.makeUnchecked(itemStack.item.getId()),
                                itemStack.nbt ? StringIota.makeUnchecked(itemStack.nbt) : StringIota.makeUnchecked("null")
                            ]
                            foundItems.push(ListIota(nbt))
                        }
                    }
                }
                stack.push(ListIota(foundItems))
            } else if (mode instanceof ListIota && modes.length == 2 && modes[0] instanceof StringIota && modes[1] instanceof StringIota) {
                let itemId = modes[0].getString()
                let nbtString = modes[1].getString()
                let foundSlots = []
                
                for (let slot of slots) {
                    let itemStack = container.getItem(slot)
                    let nbt = itemStack.nbt ? itemStack.nbt.toString() : "null"
                    if (!itemStack.isEmpty() && itemStack.item.getId() == itemId) {
                        if (nbt == nbtString) {
                            if (!condition) {
                                foundSlots.push(DoubleIota(slot))
                            } else {
                                foundSlots.push(StringIota.makeUnchecked(itemStack.item.getId()))
                            }
                        }
                    }
                }
                stack.push(ListIota(foundSlots))
            } else throw MishapInvalidIota.of(args.get(2), 0, 'class.strlist')
        }
    },

    // 容止
    "contain_contain": (stack, env) => {
        let args = new Args(stack, 5)
        let vec1 = args.get(0)
        let vec2 = args.get(1)
        let mode = args.get(2)
        let toslot = args.get(3)
        let count = args.double(4)
        let pos1, side1
        if (vec1 instanceof Vec3Iota) {
            pos1 = vec1.vec3
            side1 = Vec3d.ZERO
        } else if (vec1 instanceof ListIota && vec1.list.list.length == 2) {
            pos1 = vec1.list.list[0].vec3
            side1 = vec1.list.list[1].vec3
        } else throw MishapInvalidIota.of(args.get(0), 4, 'class.container')
        let pos2, side2
        if (vec2 instanceof Vec3Iota) {
            pos2 = vec2.vec3
            side2 = Vec3d.ZERO
        } else if (vec2 instanceof ListIota && vec2.list.list.length == 2) {
            pos2 = vec2.list.list[0].vec3
            side2 = vec2.list.list[1].vec3
        } else throw MishapInvalidIota.of(args.get(1), 3, 'class.container')
        let modes
        if (mode instanceof DoubleIota) {
            modes = mode.double
        } else if (mode instanceof ListIota && mode.list.list.length == 2 && mode.list.list[0] instanceof StringIota && mode.list.list[1] instanceof StringIota) {
            modes = mode.list.list
        } else if (mode instanceof StringIota) {
            modes = mode.getString()
        } else throw MishapInvalidIota.of(args.get(3), 1, 'class.num_str_strlist')
        let condition
        if (toslot instanceof BooleanIota) {
            condition = toslot.bool
        } else if (toslot instanceof DoubleIota) {
            condition = toslot.double
        } else throw MishapInvalidIota.of(args.get(3), 1, 'class.num_null')
        let blockPos1 = new BlockPos(Math.floor(pos1.x()), Math.floor(pos1.y()), Math.floor(pos1.z()))
        let blockPos2 = new BlockPos(Math.floor(pos2.x()), Math.floor(pos2.y()), Math.floor(pos2.z()))
        let container1 = env.world.getBlockEntity(blockPos1)
        let container2 = env.world.getBlockEntity(blockPos2)
        if (!container1 || !(container1 instanceof Container)) throw MishapInvalidIota.of(args.get(0), 4, 'class.containers')
        if (!container2 || !(container2 instanceof Container)) throw MishapInvalidIota.of(args.get(1), 4, 'class.containers')
        let slots1 = []
        let slots2 = []
        if (side1.distanceToSqr(Vec3d.ZERO) < 0.01) {
            for (let i = 0; i < container1.containerSize; i++) {
                slots1.push(i)
            }
        } else if (container1 instanceof WorldlyContainer) {
            let direction1 = Direction.getNearest(side1.x(), side1.y(), side1.z())
            slots1 = container1.getSlotsForFace(direction1)
        } else throw MishapInvalidIota.of(args.get(0), 4, 'class.containers')
        if (side2.distanceToSqr(Vec3d.ZERO) < 0.01) {
            for (let i = 0; i < container2.containerSize; i++) {
                slots2.push(i)
            }
        } else if (container2 instanceof WorldlyContainer) {
            let direction2 = Direction.getNearest(side2.x(), side2.y(), side2.z())
            slots2 = container2.getSlotsForFace(direction2)
        } else throw MishapInvalidIota.of(args.get(1), 3, 'class.containers')
        let itemStacks = []
        if (mode instanceof DoubleIota) {
            if (!slots1.includes(modes)) {
                stack.push(DoubleIota(0))
                return
            }
            let items = container1.getItem(modes)
            if (!items.isEmpty()) {
                itemStacks.push({ slot: modes, stack: items })
            }
        } else if (mode instanceof StringIota) {
            for (let slotIdx of slots1) {
                let items = container1.getItem(slotIdx)
                if (!items.isEmpty() && items.item.getId() == modes) {
                    itemStacks.push({ slot: slotIdx, stack: items })
                }
            }
        } else if (mode instanceof ListIota) {
            let idString = modes[0].getString()
            let nbtString = modes[1].getString()
            for (let slotIdx of slots1) {
                let items = container1.getItem(slotIdx)
                let nbt = items.nbt ? items.nbt.toString() : "null"
                if (!items.isEmpty() && items.item.getId() == idString) {
                    if (nbt == nbtString) {
                        itemStacks.push({ slot: slotIdx, stack: items })
                    }
                }
            }
        }
        let totalTransferred = 0
        for (let itemInfo of itemStacks) {
            let sourceSlot = itemInfo.slot
            let sourceStack = itemInfo.stack
            let remaining = Math.min(count - totalTransferred, sourceStack.getCount())
            if (toslot instanceof DoubleIota) {
                if (slots2.includes(condition)) {
                    let targetStack = container2.getItem(condition)
                    if (targetStack.isEmpty() || ItemStack.isSameItemSameTags(targetStack, sourceStack)) {
                        let space = targetStack.isEmpty() ? sourceStack.getMaxStackSize() : targetStack.getMaxStackSize() - targetStack.getCount()
                        if (space > 0) {
                            let toTransfer = Math.min(remaining, space)
                            if (targetStack.isEmpty()) {
                                let newStack = sourceStack.copy()
                                newStack.setCount(toTransfer)
                                container2.setItem(condition, newStack)
                            } else {
                                let newTargetStack = targetStack.copy()
                                newTargetStack.grow(toTransfer)
                                container2.setItem(condition, newTargetStack)
                            }
                            sourceStack.shrink(toTransfer)
                            container1.setItem(sourceSlot, sourceStack.isEmpty() ? ItemStack.EMPTY : sourceStack)
                            remaining -= toTransfer
                            totalTransferred += toTransfer
                            if (remaining <= 0) {
                                continue
                            }
                        }
                        condition = false
                    }
                }
            }
            if (condition == false) {
                let transferred = 0
                for (let targetSlot of slots2) {
                    if (transferred >= remaining) break
                    let targetStack = container2.getItem(targetSlot)
                    let toTransfer = 0
                    if (targetStack.isEmpty()) {
                        toTransfer = Math.min(remaining - transferred, sourceStack.getMaxStackSize())
                    } else if (ItemStack.isSameItemSameTags(targetStack, sourceStack)) {
                        let space = targetStack.getMaxStackSize() - targetStack.getCount()
                        toTransfer = Math.min(remaining - transferred, space)
                    }
                    if (toTransfer > 0) {
                        if (targetStack.isEmpty()) {
                            let newStack = sourceStack.copy()
                            newStack.setCount(toTransfer)
                            container2.setItem(targetSlot, newStack)
                        } else {
                            let newTargetStack = targetStack.copy()
                            newTargetStack.grow(toTransfer)
                            container2.setItem(targetSlot, newTargetStack)
                        }
                        transferred += toTransfer
                    }
                }
                if (transferred > 0) {
                    sourceStack.shrink(transferred)
                    container1.setItem(sourceSlot, sourceStack.isEmpty() ? ItemStack.EMPTY : sourceStack)
                    totalTransferred += transferred
                }
                if (totalTransferred >= count) break
            } else if (condition == true) {
                let transferred = 0
                for (let targetSlot of slots2) {
                    if (transferred >= remaining) break
                    let targetStack = container2.getItem(targetSlot)
                    if (targetStack.isEmpty() || !ItemStack.isSameItemSameTags(targetStack, sourceStack)) continue
                    
                    let space = targetStack.getMaxStackSize() - targetStack.getCount()
                    if (space > 0) {
                        let toTransfer = Math.min(remaining - transferred, space)
                        let newTargetStack = targetStack.copy()
                        newTargetStack.grow(toTransfer)
                        container2.setItem(targetSlot, newTargetStack)
                        transferred += toTransfer
                    }
                }
                if (transferred < remaining) {
                    for (let targetSlot of slots2) {
                        if (transferred >= remaining) break
                        let targetStack = container2.getItem(targetSlot)
                        if (!targetStack.isEmpty()) continue
                        let toTransfer = Math.min(remaining - transferred, sourceStack.getMaxStackSize())
                        let newStack = sourceStack.copy()
                        newStack.setCount(toTransfer)
                        container2.setItem(targetSlot, newStack)
                        transferred += toTransfer
                    }
                }
                if (transferred > 0) {
                    sourceStack.shrink(transferred)
                    if (sourceStack.isEmpty()) {
                        container1.setItem(sourceSlot, ItemStack.EMPTY)
                    } else {
                        container1.setItem(sourceSlot, sourceStack)
                    }
                    
                    totalTransferred += transferred
                }
                if (totalTransferred >= count) break
            }
        }
        stack.push(DoubleIota(totalTransferred))
    },

    // 物流
    "contain_mote": (stack, env, img) => {
        let args = new Args(stack, 3)
        let vec1 = args.get(0)
        let mode = args.get(1)
        let count = args.double(2)

        let player = env.caster
        if (player == null) throw MishapBadCaster()
        if (!player.isPlayer()) throw MishapBadCaster()
        let userData = img.userData
        let boundStorage
        if (userData && userData.contains(MoteIota.TAG_TEMP_STORAGE)) {
            boundStorage = userData.getUUID(MoteIota.TAG_TEMP_STORAGE)
        } else {
            boundStorage = MediafiedItemManager.getBoundStorage(player)
            if (!boundStorage) throw MishapNoBoundStorage()
        }
        if (MediafiedItemManager.isStorageFull(boundStorage) != false) throw MishapStorageFull(boundStorage)

        let pos1, side1
        if (vec1 instanceof Vec3Iota) {
            pos1 = vec1.vec3
            side1 = Vec3d.ZERO
        } else if (vec1 instanceof ListIota && vec1.list.list.length == 2) {
            pos1 = vec1.list.list[0].vec3
            side1 = vec1.list.list[1].vec3
        } else throw MishapInvalidIota.of(args.get(0), 4, 'class.container')

        let modes
        if (mode instanceof DoubleIota) {
            modes = mode.double
        } else if (mode instanceof ListIota && mode.list.list.length == 2 && mode.list.list[0] instanceof StringIota && mode.list.list[1] instanceof StringIota) {
            modes = mode.list.list
        } else if (mode instanceof StringIota) {
            modes = mode.getString()
        } else throw MishapInvalidIota.of(args.get(3), 1, 'class.num_str_strlist')

        let blockPos1 = new BlockPos(Math.floor(pos1.x()), Math.floor(pos1.y()), Math.floor(pos1.z()))
        let container1 = env.world.getBlockEntity(blockPos1)
        
        if (!container1 || !(container1 instanceof Container)) throw MishapInvalidIota.of(args.get(0), 4, 'class.containers')
        
        let slots1 = []
        if (side1.distanceToSqr(Vec3d.ZERO) < 0.01) {
            for (let i = 0; i < container1.containerSize; i++) {
                slots1.push(i)
            }
        } else if (container1 instanceof WorldlyContainer) {
            let direction1 = Direction.getNearest(side1.x(), side1.y(), side1.z())
            slots1 = container1.getSlotsForFace(direction1)
        } else throw MishapInvalidIota.of(args.get(0), 4, 'class.containers')
        
        let itemStacks = []
        if (mode instanceof DoubleIota) {
            if (!slots1.includes(modes)) return
            let items = container1.getItem(modes)
            if (!items.isEmpty()) {
                itemStacks.push({ slot: modes, stack: items })
            }
        } else if (mode instanceof StringIota) {
            for (let slotIdx of slots1) {
                let items = container1.getItem(slotIdx)
                if (!items.isEmpty() && items.item.getId() == modes) {
                    itemStacks.push({ slot: slotIdx, stack: items })
                }
            }
        } else if (mode instanceof ListIota) {
            let idString = modes[0].getString()
            let nbtString = modes[1].getString()
            for (let slotIdx of slots1) {
                let items = container1.getItem(slotIdx)
                let nbt = items.nbt ? items.nbt.toString() : "null"
                if (!items.isEmpty() && items.item.getId() == idString) {
                    if (nbt == nbtString) {
                        itemStacks.push({ slot: slotIdx, stack: items })
                    }
                }
            }
        }
        let totalItemsToTransfer = 0
        for (let itemInfo of itemStacks) {
            if (itemInfo.stack.isEmpty()) continue
            totalItemsToTransfer += Math.min(count - totalItemsToTransfer, itemInfo.stack.getCount())
        }
        let moteList = []
        for (let itemInfo of itemStacks) {
            let allRecords = MediafiedItemManager.getAllRecords(boundStorage)
            let usedSlots = allRecords ? allRecords.size() : 0
            if (totalItemsToTransfer <= 0 || usedSlots >= 1023) break
            let sourceSlot = itemInfo.slot
            let sourceStack = itemInfo.stack
            let toTransfer = Math.min(totalItemsToTransfer, sourceStack.getCount())
            let transferStack = sourceStack.copy()
            transferStack.setCount(toTransfer)
            let mote = MoteIota.makeIfStorageLoaded(transferStack, boundStorage)
            if (mote) {
                sourceStack.shrink(toTransfer)
                if (sourceStack.isEmpty()) {
                    container1.setItem(sourceSlot, ItemStack.EMPTY)
                } else {
                    container1.setItem(sourceSlot, sourceStack)
                }
                moteList.push(mote)
                totalItemsToTransfer -= toTransfer
            }
        }
        stack.push(ListIota(moteList))
    },

    // 枢送
    "mote_contain": (stack, env, img) => {
        let args = new Args(stack, 4)
        let vec1 = args.get(0)
        let mote = args.get(1)
        let toslot = args.get(2)
        let count = args.double(3)
        let player = env.caster
        if (player == null) throw MishapBadCaster()
        if (!player.isPlayer()) throw MishapBadCaster()
        let userData = img.userData
        let boundStorage
        if (userData && userData.contains(MoteIota.TAG_TEMP_STORAGE)) {
            boundStorage = userData.getUUID(MoteIota.TAG_TEMP_STORAGE)
        } else {
            boundStorage = MediafiedItemManager.getBoundStorage(player)
            if (!boundStorage) throw MishapNoBoundStorage()
        }
        let pos1, side1
        if (vec1 instanceof Vec3Iota) {
            pos1 = vec1.vec3
            side1 = Vec3d.ZERO
        } else if (vec1 instanceof ListIota && vec1.list.list.length == 2) {
            pos1 = vec1.list.list[0].vec3
            side1 = vec1.list.list[1].vec3
        } else throw MishapInvalidIota.of(args.get(0), 3, 'class.container')
        let condition
        if (toslot instanceof BooleanIota) {
            condition = toslot.bool
        } else if (toslot instanceof DoubleIota) {
            condition = toslot.double
        } else throw MishapInvalidIota.of(args.get(2), 1, 'class.num_null')
        let blockPos1 = new BlockPos(Math.floor(pos1.x()), Math.floor(pos1.y()), Math.floor(pos1.z()))
        let container1 = env.world.getBlockEntity(blockPos1)
        if (!container1 || !(container1 instanceof Container)) throw MishapInvalidIota.of(args.get(0), 3, 'class.containers')
        let slots1 = []
        if (side1.distanceToSqr(Vec3d.ZERO) < 0.01) {
            for (let i = 0; i < container1.containerSize; i++) {
                slots1.push(i)
            }
        } else if (container1 instanceof WorldlyContainer) {
            let direction1 = Direction.getNearest(side1.x(), side1.y(), side1.z())
            slots1 = container1.getSlotsForFace(direction1)
        } else throw MishapInvalidIota.of(args.get(0), 3, 'class.containers')
        let MoteStacks = []
        if (mote instanceof MoteIota) {
            let stack = new ItemStack(mote.getItem().getId(), mote.getCount())
            MoteStacks.push({ mote: mote, stack: stack })
        } else if (mote instanceof StringIota) {
            let records = MediafiedItemManager.getItemRecordsMatching(boundStorage, mote.getString())
            if (!records) {
                stack.push(DoubleIota(0))
                return
            }
            let iterator = records.keySet().iterator()
            while (iterator.hasNext()) {
                let index = iterator.next()
                let mote = new MoteIota(index)
                if (mote) {
                    let stack = new ItemStack(mote.getItem().getId(), mote.getCount())
                    MoteStacks.push({ mote: mote, stack: stack })
                }
            }
        } else if (mote instanceof ListIota && mote.list.list.length == 2 && mote.list.list[0] instanceof StringIota && mote.list.list[1] instanceof StringIota) {
            let idString = mote.list.list[0].getString()
            let nbtString = mote.list.list[1].getString()
            let records = MediafiedItemManager.getItemRecordsMatching(boundStorage, idString)
            if (!records) {
                stack.push(DoubleIota(0))
                return
            }
            let iterator = records.keySet().iterator()
            while (iterator.hasNext()) {
                let index = iterator.next()
                let mote = new MoteIota(index)
                if (mote) {
                    let itemNbt = mote.getTag() ? mote.getTag().toString() : "null"
                    if (nbtString == itemNbt) {
                        let itemstack = new ItemStack(mote.getItem(), mote.getCount())
                        itemstack.setNbt(mote.getTag())
                        MoteStacks.push({ mote: mote, stack: itemstack })
                    }
                }
            }
        } else throw MishapInvalidIota.of(args.get(2), 1, 'class.mote_str_strlist')
        let totalTransferred = 0
        for (let itemInfo of MoteStacks) {
            let mote = itemInfo.mote
            let stack = itemInfo.stack
            let remaining = Math.min(count - totalTransferred, stack.getCount())
            if (toslot instanceof DoubleIota) {
                if (slots1.includes(condition)) {
                    let targetStack = container1.getItem(condition)
                    if (targetStack.isEmpty() || ItemStack.isSameItemSameTags(targetStack, stack)) {
                        let space = targetStack.isEmpty() ? 
                            stack.getMaxStackSize() : 
                            targetStack.getMaxStackSize() - targetStack.getCount()
                        if (space > 0) {
                            let toTransfer = Math.min(remaining, space)
                            if (targetStack.isEmpty()) {
                                let newStack = stack.copy()
                                newStack.setCount(toTransfer)
                                container1.setItem(condition, newStack)
                            } else {
                                let newTargetStack = targetStack.copy()
                                newTargetStack.grow(toTransfer)
                                container1.setItem(condition, newTargetStack)
                            }
                            mote.removeItems(toTransfer)
                            remaining -= toTransfer
                            totalTransferred += toTransfer
                            
                            if (remaining <= 0) {
                                continue
                            }
                        }
                        condition = false
                    }
                }
            }
            if (condition == false) {
                let transferred = 0
                for (let targetSlot of slots1) {
                    if (transferred >= remaining) break
                    let targetStack = container1.getItem(targetSlot)
                    let toTransfer = 0
                    if (targetStack.isEmpty()) {
                        toTransfer = Math.min(remaining - transferred, stack.getMaxStackSize())
                    } else if (ItemStack.isSameItemSameTags(targetStack, stack)) {
                        let space = targetStack.getMaxStackSize() - targetStack.getCount()
                        toTransfer = Math.min(remaining - transferred, space)
                    }
                    if (toTransfer > 0) {
                        if (targetStack.isEmpty()) {
                            let newStack = stack.copy()
                            newStack.setCount(toTransfer)
                            container1.setItem(targetSlot, newStack)
                        } else {
                            let newTargetStack = targetStack.copy()
                            newTargetStack.grow(toTransfer)
                            container1.setItem(targetSlot, newTargetStack)
                        }
                        transferred += toTransfer
                    }
                }
                if (transferred > 0) {
                    mote.removeItems(transferred)
                    totalTransferred += transferred
                }
            }
            else if (condition == true) {
                let transferred = 0
                for (let targetSlot of slots1) {
                    if (transferred >= remaining) break
                    
                    let targetStack = container1.getItem(targetSlot)
                    if (targetStack.isEmpty() || !ItemStack.isSameItemSameTags(targetStack, stack)) {
                        continue
                    }
                    
                    let space = targetStack.getMaxStackSize() - targetStack.getCount()
                    if (space > 0) {
                        let toTransfer = Math.min(remaining - transferred, space)
                        let newTargetStack = targetStack.copy()
                        newTargetStack.grow(toTransfer)
                        container1.setItem(targetSlot, newTargetStack)
                        transferred += toTransfer
                    }
                }
                if (transferred < remaining) {
                    for (let targetSlot of slots1) {
                        if (transferred >= remaining) break
                        
                        let targetStack = container1.getItem(targetSlot)
                        if (!targetStack.isEmpty()) continue
                        
                        let toTransfer = Math.min(remaining - transferred, stack.getMaxStackSize())
                        let newStack = stack.copy()
                        newStack.setCount(toTransfer)
                        container1.setItem(targetSlot, newStack)
                        transferred += toTransfer
                    }
                }
                if (transferred > 0) {
                    mote.removeItems(transferred)
                    totalTransferred += transferred
                }
            }
            if (totalTransferred >= count) break
        }
        stack.push(DoubleIota(totalTransferred))
    },

    // 检验
    "recipes": (stack, env) => {
        let args = new Args(stack, 1)
        let string = args.string(0)
        string = RL(string)
        let level = env.world
        let recipeManager = level.getRecipeManager()
        let craftingRecipes = recipeManager.getAllRecipesFor(RecipeType.CRAFTING)
        let matchingRecipes = []
        let iterator = craftingRecipes.iterator()
        while (iterator.hasNext()) {
            let recipe = iterator.next()
            let resultItem = recipe.getResultItem(level.registryAccess())
            if (resultItem.getItem().getId() === string) {
                matchingRecipes.push(recipe)
            }
        }
        if (matchingRecipes.length === 0) {
            stack.push(NullIota())
            return
        }
        let list = []
        for (let i = 0; i < matchingRecipes.length; i++) {
            let result = ""
            let selectedRecipe = matchingRecipes[i]
            let ingredients = selectedRecipe.getIngredients()
            for (let i = 0; i < ingredients.size(); i++) {
                if (i !== 0) {
                    result += ","
                }
                let ingredient = ingredients.get(i)
                if (ingredient.isEmpty()) {
                    result += "*"
                }
                let itemStack = ingredient.getFirst().getItem().getId()
                result += `${itemStack}`
            }
            list.push(StringIota.makeUnchecked(result))
        }
        stack.push(ListIota(list))
    },

    // 集成
    "recipe": (stack, env, img) => {
        let args = new Args(stack, 2)
        let recipeString = args.string(0)
        let recipeCount = args.double(1)
        let player = env.caster
        if (player == null) throw MishapBadCaster()
        if (!player.isPlayer()) throw MishapBadCaster()
        let level = env.world

        let userData = img.userData
        let boundStorage
        if (userData && userData.contains(MoteIota.TAG_TEMP_STORAGE)) {
            boundStorage = userData.getUUID(MoteIota.TAG_TEMP_STORAGE)
        } else {
            boundStorage = MediafiedItemManager.getBoundStorage(player)
            if (!boundStorage) throw MishapNoBoundStorage()
        }
        if (MediafiedItemManager.isStorageFull(boundStorage) != false) throw MishapStorageFull(boundStorage)
        
        let itemTypes = MediafiedItemManager.getAllContainedItemTypes(boundStorage)
        if (!itemTypes) return
        let nameList = []
        let iterator = itemTypes.iterator()
        while (iterator.hasNext()) {
            let itemType = iterator.next()
            if (itemType) {
                nameList.push(itemType.id)
            }
        }

        let inputItems = recipeString.split(',')
        if (inputItems.length > 9) {
            stack.push(NullIota())
            return
        }

        let items = new Array(9).fill("*")
        for (let i = 0; i < inputItems.length && i < 9; i++) {
            items[i] = inputItems[i]
        }

        let recipeList = []
        for (let row = 0; row < 3; row++) {
            let rowItems = []
            for (let col = 0; col < 3; col++) {
                let itemId = items[row * 3 + col]
                if (itemId === "*") {
                    rowItems.push(null)
                } else {
                    if (itemId.startsWith('"') && itemId.endsWith('"')) {
                        itemId = itemId.substring(1, itemId.length - 1)
                    }
                    rowItems.push(itemId)
                }
            }
            recipeList.push(rowItems)
        }

        let containerAccess = ContainerLevelAccess.create(level, player.blockPosition())
        let craftingMenu = new CraftingMenu(0, player.getInventory(), containerAccess)
        let container = new TransientCraftingContainer(craftingMenu, 3, 3)
        
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                let itemId = recipeList[row][col]
                let stack = ItemStack.EMPTY
                
                if (itemId !== null) {
                    if (!/^[a-z0-9/:._-]*$/.test(itemId)) throw MishapInvalidIota.of(args.get(0), 1, 'class.RL')
                    stack = Item.of(itemId).withCount(1)
                }
                
                container.setItem(row * 3 + col, stack)
            }
        }
        
        let recipeManager = level.recipeManager
        let recipes = recipeManager.getAllRecipesFor(RecipeType.CRAFTING)
        let recipeIterator = recipes.iterator()
        let matchedRecipe = null

        while (recipeIterator.hasNext()) {
            let recipe = recipeIterator.next()
            if (recipe.matches(container, level)) {
                matchedRecipe = recipe
                break
            }
        }
        
        if (!matchedRecipe) {
            stack.push(NullIota())
            return
        }
        
        let resultStack = matchedRecipe.assemble(container, level.registryAccess())

        let materialCounts = {}
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                let itemId = recipeList[row][col]
                if (itemId !== null) {
                    materialCounts[itemId] = (materialCounts[itemId] || 0) + 1
                }
            }
        }
        
        let totalMaterialCost = {}
        for (let itemId in materialCounts) {
            totalMaterialCost[itemId] = materialCounts[itemId] * recipeCount;
        }
        
        let missingMaterials = {}
        let hasAllMaterials = true
        let itemCache = {}

        for (let itemId in totalMaterialCost) {
            let requiredCount = totalMaterialCost[itemId];
            
            if (!itemCache[itemId]) {
                let matchingRecords = MediafiedItemManager.getItemRecordsMatching(boundStorage, itemId);
                itemCache[itemId] = {
                    records: matchingRecords,
                    totalCount: 0
                }
                
                if (matchingRecords && !matchingRecords.isEmpty()) {
                    let iterator = matchingRecords.values().iterator()
                    while (iterator.hasNext()) {
                        let record = iterator.next()
                        itemCache[itemId].totalCount += record.count
                    }
                }
            }
            
            let availableCount = itemCache[itemId].totalCount
            
            if (availableCount < requiredCount) {
                missingMaterials[itemId] = requiredCount - availableCount
                hasAllMaterials = false
            }
        }

        if (!hasAllMaterials) {
            
            let missingList = []
            for (let itemId in missingMaterials) {
                let count = missingMaterials[itemId]
                
                for (let i = 0; i < count; i++) {
                    missingList.push(StringIota.makeUnchecked(itemId))
                }
            }
            stack.push(ListIota(missingList))
            return
        }
        
        for (let itemId in totalMaterialCost) {
            let toRemove = totalMaterialCost[itemId]
            
            let matchingRecords = MediafiedItemManager.getItemRecordsMatching(boundStorage, itemId)
            if (!matchingRecords || matchingRecords.isEmpty()) {
                continue
            }
            
            let iterator = matchingRecords.keySet().iterator()
            let removedCount = 0
            
            while (iterator.hasNext() && toRemove > 0) {
                let index = iterator.next()
                let mote = new MoteIota(index)
                let currentCount = mote.getCount()
                let removeAmount = Math.min(toRemove, currentCount)
                
                if (removeAmount > 0) {
                    mote.removeItems(removeAmount)
                    toRemove -= removeAmount
                    removedCount += removeAmount
                }
            }
        }
        
        let maxStackSize = resultStack.maxStackSize
        let totalCount = recipeCount * resultStack.count
        
        let stacks = []
        let remainingCount = totalCount
        
        while (remainingCount > 0) {
            let stackSize = Math.min(remainingCount, maxStackSize)
            let newStack = resultStack.copy()
            newStack.count = stackSize
            stacks.push(newStack)
            remainingCount -= stackSize
        }
        
        let moteList = []
        for (let i = 0; i < stacks.length; i++) {
            let stackItem = stacks[i]
            let mote = MoteIota.makeIfStorageLoaded(stackItem, boundStorage)
            if (mote) {
                moteList.push(mote)
            }
        }

        stack.push(ListIota(moteList))
    },
    
     // 补货
    "restock": (stack, env) => {
        let args = new Args(stack, 1)
        let villager = args.villager(0)
        ActionJS.helpers.assertEntityInRange(env, villager)
        if (IXplatAbstractions.INSTANCE.isBrainswept(villager)) 
        throw MishapAlreadyBrainswept(target)
        let data = villager.getNbt()
        let effects = [
            OperatorSideEffect.ConsumeMedia(Math.ceil(10000)),
            OperatorSideEffect.Particles(ParticleSpray.burst(villager.eyePosition, 1, 20))
        ]
        if (data.Offers) {
            for (var i = 0; i < data.Offers.Recipes.length; i++) {
                data.Offers.Recipes[i].maxUses = NBT.i(32)
                data.Offers.Recipes[i].uses = NBT.i(0)
                data.Offers.Recipes[i].remove('demand')
            }
        }
        villager.setNbt(data)
        let pos = `${villager.x} ${villager.y} ${villager.z}`
        env.world.runCommandSilent(`playsound minecraft:entity.player.levelup ambient @a ${pos} 0.5 0.8`)
        return effects
    },

    // 让度
    "merge": (stack, env) => {
        let args = new Args(stack, 4)
        let victim = args.brainmerge_target(0)
        ActionJS.helpers.assertEntityInRange(env, victim)
        let inject = args.villager(1)
        let Index1 = args.double(2)
        let Index2 = args.double(3)
        let tradeIndex1 = Math.floor(Index1)
        let tradeIndex2 = Math.floor(Index2)
        
        for (let target of [victim, inject]) if (IXplatAbstractions.INSTANCE.isBrainswept(target)) throw MishapAlreadyBrainswept(target)
        let sideEffects = [
            OperatorSideEffect.ConsumeMedia(100000),
            OperatorSideEffect.Particles(ParticleSpray.cloud(victim.eyePosition, 1, 20)),
            OperatorSideEffect.Particles(ParticleSpray.burst(inject.eyePosition, 1, 100))
        ]

        let oldData = inject.getVillagerData && inject.getVillagerData()
        if (oldData.level < 5 && oldData.profession.name() !== 'none') {
            let newLevel = oldData.getLevel() + 1
            inject.setVillagerData(oldData.setLevel(newLevel))
            inject.setVillagerXp([10, 70, 150, 250][newLevel - 2])
            inject.potionEffects.add('regeneration', 40, 0)
            let newOffers = inject.offers
            if (victim instanceof AbstractVillager) {
                let extOffers = victim.offers
                if (extOffers.length > 0) {
                    let actualIndex1 = Math.max(0, Math.min(tradeIndex1, extOffers.length - 1))
                    let actualIndex2 = Math.max(0, Math.min(tradeIndex2, extOffers.length - 1))
                    let offer1 = extOffers[actualIndex1]
                    let offer2 = extOffers[actualIndex2]
                    if (offer1 && offer2) {
                        newOffers.push(offer1)
                        newOffers.push(offer2)
                    }
                }
                extOffers.clear()
                if (victim.setOffers) victim.setOffers(extOffers)
            }
            inject.setOffers(newOffers)
            let pos = `${victim.x} ${victim.y} ${victim.z}`
            env.world.runCommandSilent(`playsound minecraft:entity.player.levelup ambient @a ${pos} 0.5 0.8`)
        }
        return sideEffects
    },

    // 梅易之精思
    "media": (stack, env, img, cont) => {
        let now = new Date(Utils.getSystemTime())
        let year = now.getFullYear()
        let month = now.getMonth() + 1
        let day = now.getDate()
        let hour = now.getHours()
        // 五行名称
        let elemNames = ["金", "木", "水", "火", "土"]

        // 旺衰等级
        let powerDesc = ["死", "囚", "休", "相", "旺"]

        // 五行映射
        let elemMap = {1: 0, 2: 0, 3: 3, 4: 1, 5: 1, 6: 2, 7: 4, 8: 4}

        // 动爻权重
        let moveWeightMap = {1: 0.85, 2: 1.05, 3: 0.95, 4: 0.95, 5: 1.1, 6: 0.9}

        // 爻位名称
        let lineNames = {1: "初爻", 2: "二爻", 3: "三爻", 4: "四爻", 5: "五爻", 6: "上爻"}

        // 卦名映射
        let trigramNames = {1: "乾 ☰", 2: "兑 ☱", 3: "离 ☲", 4: "震 ☳", 5: "巽 ☴", 6: "坎 ☵", 7: "艮 ☶", 8: "坤 ☷"}

        // 五行生克
        let to = {0:2, 2:1, 1:3, 3:4, 4:0}
        let fo = {0:1, 1:4, 4:2, 2:3, 3:0}

        // 易经排布
        let book = {
            "1-1": 1, "8-8": 2, "6-4": 3, "7-6": 4, "6-1": 5, "1-6": 6, "8-6": 7, "6-8": 8,
            "5-1": 9, "1-2": 10,"8-1": 11,"1-8": 12,"1-3": 13,"3-1": 14,"8-7": 15,"4-8": 16,
            "2-4": 17,"7-5": 18,"8-2": 19,"5-8": 20,"3-4": 21,"7-3": 22,"7-8": 23,"8-4": 24,
            "1-4": 25,"7-1": 26,"7-4": 27,"2-5": 28,"6-6": 29,"3-3": 30,"2-7": 31,"4-5": 32,
            "1-7": 33,"4-1": 34,"3-8": 35,"8-3": 36,"5-3": 37,"3-2": 38,"6-7": 39,"4-6": 40,
            "7-2": 41,"5-4": 42,"2-1": 43,"1-5": 44,"2-8": 45,"8-5": 46,"2-6": 47,"6-5": 48,
            "2-3": 49,"3-5": 50,"4-4": 51,"7-7": 52,"5-7": 53,"4-2": 54,"4-3": 55,"3-7": 56,
            "5-5": 57,"2-2": 58,"5-6": 59,"6-2": 60,"5-2": 61,"4-7": 62,"6-3": 63,"3-6": 64
        }

        // 互变推演
        function deriveHexagramInfo(outNum, innNum, moveNum, curPow) {
            // 八卦数组
            let symbol = {1: [1,1,1], 2: [1,1,0], 3: [1,0,1], 4: [1,0,0], 5: [0,1,1], 6: [0,1,0], 7: [0,0,1], 8: [0,0,0]}

            // 1. 内外卦象
            let outer = symbol[outNum]
            let inner = symbol[innNum]
            
            // 2. 体用卦象
            let used, body
            if (moveNum <= 3) {
                used = inner
                body = outer
            } else {
                used = outer
                body = inner
            }
            
            // 3. 体用卦数
            let usedNum = symToNum(used)
            let bodyNum = symToNum(body)
            
            // 4. 体用五行
            let uElem = elemMap[usedNum]
            let bElem = elemMap[bodyNum]
            
            // 5. 体用卦气
            let uBase = curPow[uElem]
            let bBase = curPow[bElem]
            
            // 6. 变卦卦象
            let change
            if (moveNum <= 3) {
                let pos = moveNum - 1
                let copy = used.slice()
                copy[pos] = copy[pos] === 0 ? 1 : 0
                change = copy
            } else {
                let pos = moveNum - 4
                let copy = used.slice()
                copy[pos] = copy[pos] === 0 ? 1 : 0
                change = copy
            }
            
            // 7. 变卦卦数
            let changeNum = symToNum(change)
            
            // 8. 变卦五行
            let cElem = elemMap[changeNum]
            
            // 9. 变卦卦气
            let cBase = curPow[cElem]
            
            // 10. 互卦卦象
            let interIn = [inner[1], inner[2], outer[0]]
            let interOut = [inner[2], outer[0], outer[1]]
            let interInNum = symToNum(interIn)
            let interOutNum = symToNum(interOut)
            let bodyInter, usedInter
            if (moveNum <= 3) {
                bodyInter = interOut
                usedInter = interIn
            } else {
                bodyInter = interIn
                usedInter = interOut
            }
            
            // 11. 互卦卦数
            let bodyInterNum = symToNum(bodyInter)
            let usedInterNum = symToNum(usedInter)
            
            // 12. 互卦五行
            let bodyInterElem = elemMap[bodyInterNum]
            let usedInterElem = elemMap[usedInterNum]
            
            // 13. 互卦卦气
            let bodyInterBase = curPow[bodyInterElem]
            let usedInterBase = curPow[usedInterElem]
            
            return {
                // 本卦信息
                outer: {
                    num: outNum,
                    sym: outer,
                    elem: elemMap[outNum],
                    base: curPow[elemMap[outNum]]
                },
                inner: {
                    num: innNum,
                    sym: inner,
                    elem: elemMap[innNum],
                    base: curPow[elemMap[innNum]]
                },
                
                // 体用信息
                used: {
                    num: usedNum,
                    sym: used,
                    elem: uElem,
                    base: uBase,
                    trigramNum: usedNum
                },
                body: {
                    num: bodyNum,
                    sym: body,
                    elem: bElem,
                    base: bBase,
                    trigramNum: bodyNum
                },
                
                // 变卦信息
                change: {
                    num: changeNum,
                    sym: change,
                    elem: cElem,
                    base: cBase,
                    trigramNum: changeNum
                },
                
                // 互卦信息
                bodyInter: {
                    num: bodyInterNum,
                    sym: bodyInter,
                    elem: bodyInterElem,
                    base: bodyInterBase,
                    trigramNum: bodyInterNum
                },
                usedInter: {
                    num: usedInterNum,
                    sym: usedInter,
                    elem: usedInterElem,
                    base: usedInterBase,
                    trigramNum: usedInterNum
                },
                interInNum: interInNum,
                interOutNum: interOutNum
            }
        }

        // 卦气旺衰
        let dailyPow = {
            1:  {"1-4": [3,4,5,1,2], "5-19": [4,2,1,3,5], "20-31": [4,2,1,3,5]},
            2:  {"1-3": [4,2,1,3,5], "4-18": [2,5,3,4,1], "19-28": [2,5,3,4,1]},
            3:  {"1-5": [2,5,3,4,1], "6-20": [2,5,3,4,1], "21-31": [2,5,3,4,1]},
            4:  {"1-4": [2,5,3,4,1], "5-19": [4,2,1,3,5], "20-30": [4,2,1,3,5]},
            5:  {"1-5": [4,2,1,3,5], "6-20": [1,3,2,5,4], "21-31": [1,3,2,5,4]},
            6:  {"1-5": [1,3,2,5,4], "6-21": [1,3,2,5,4], "22-30": [1,3,2,5,4]},
            7:  {"1-6": [1,3,2,5,4], "7-22": [4,2,1,3,5], "23-31": [4,2,1,3,5]},
            8:  {"1-7": [4,2,1,3,5], "8-22": [5,1,4,2,3], "23-31": [5,1,4,2,3]},
            9:  {"1-7": [5,1,4,2,3], "8-22": [5,1,4,2,3], "23-30": [5,1,4,2,3]},
            10: {"1-8": [5,1,4,2,3], "9-23": [4,2,1,3,5], "24-31": [4,2,1,3,5]},
            11: {"1-7": [4,2,1,3,5], "8-22": [3,4,5,1,2], "23-30": [3,4,5,1,2]},
            12: {"1-6": [3,4,5,1,2], "7-21": [3,4,5,1,2], "22-31": [3,4,5,1,2]}
        }
        
        // 爻辞映射
        let merged = {
            1: [null, "初九，潜龙勿用"],
            2: [true, "九二，见龙在田，利见大人"],
            3: [null, "九三，君子终日乾乾，夕惕若，厉无咎"],
            4: [null, "九四，或跃在渊，无咎"],
            5: [true, "九五，飞龙在天，利见大人"],
            6: [false, "上九，亢龙有悔"],
            7: [null, "初六，履霜，坚冰至"],
            8: [true, "六二，直方大，不习无不利"],
            9: [null, "六三，含章可贞，或从王事，无成有终"],
            10: [null, "六四，括囊，无咎无誉"],
            11: [true, "六五，黄裳元吉"],
            12: [false, "上六，龙战于野，其血玄黄"],
            13: [true, "初九，磐桓，利居贞，利建侯"],
            14: [null, "六二，屯如邍如，乘马班如。匪寇婚媾，女子贞不字，十年乃字"],
            15: [false, "六三，即鹿无虞，惟入于林中，君子几不如舍，往吝"],
            16: [true, "六四，乘马班如，求婚媾，往吉，无不利"],
            17: [null, "九五，屯其膏，小贞吉，大贞凶"],
            18: [false, "上六，乘马班如，泣血涟如"],
            19: [false, "初六，发蒙，利用刑人，用说桎梏，以往吝"],
            20: [true, "九二，包蒙吉，纳妇吉，子克家"],
            21: [false, "六三，勿用取女，见金夫，不有躬，无攸利"],
            22: [false, "六四，困蒙，吝"],
            23: [true, "六五，童蒙，吉"],
            24: [null, "上九，击蒙，不利为寇，利御寇"],
            25: [null, "初九，需于郊，利用恒，无咎"],
            26: [true, "九二，需于沙，小有言，终吉"],
            27: [false, "九三，需于泥，致寇至"],
            28: [null, "六四，需于血，出自穴"],
            29: [true, "九五，需于酒食，贞吉"],
            30: [true, "上六，入于穴，有不速之客三人来，敬之终吉"],
            31: [true, "初六，不永所事，小有言，终吉"],
            32: [null, "九二，不克讼，归而逋，其邑人三百户，无眚"],
            33: [true, "六三，食旧德，贞厉，终吉；或从王事，无成"],
            34: [true, "九四，不克讼，复即命，渝安贞，吉"],
            35: [true, "九五，讼元吉"],
            36: [false, "上九，或锡之鞶带，终朝三褫之"],
            37: [false, "初六，师出以律，否臧凶"],
            38: [true, "九二，在师中，吉，无咎；王三锡命"],
            39: [false, "六三，师或舆尸，凶"],
            40: [null, "六四，师左次，无咎"],
            41: [false, "六五，田有禽，利执言，无咎。长子帅师，弟子舆尸，贞凶"],
            42: [true, "上六，大君有命，开国承家，小人勿用"],
            43: [true, "初六，有孚比之，无咎；有孚盈缶，终来有他吉"],
            44: [true, "六二，比之自内，贞吉"],
            45: [false, "六三，比之匪人"],
            46: [true, "六四，外比之，贞吉"],
            47: [true, "九五，显比，王用三驱，失前禽，邑人不诫，吉"],
            48: [false, "上六，比之无首，凶"],
            49: [true, "初九，复自道，何其咎？吉"],
            50: [true, "九二，牵复，吉"],
            51: [false, "九三，舆说辐，夫妻反目"],
            52: [null, "六四，有孚，血去惕出，无咎"],
            53: [true, "九五，有孚挛如，富以其邻"],
            54: [false, "上九，既雨既处，尚德载，妇贞厉。月几望，君子征凶"],
            55: [null, "初九，素履，往无咎"],
            56: [true, "九二，履道坦坦，幽人贞吉"],
            57: [false, "六三，眇能视，跛能履，履虎尾，咥人，凶；武人为于大君"],
            58: [true, "九四，履虎尾，愬愬终吉"],
            59: [false, "九五，夬履，贞厉"],
            60: [true, "上九，视履考祥，其旋元吉"],
            61: [true, "初九，拔茅茹，以其汇，征吉"],
            62: [true, "九二，包荒，用冯河，不遐遗；朋亡，得尚于中行"],
            63: [null, "九三，无平不陂，无往不复，艰贞无咎。勿恤其孚，于食有福"],
            64: [null, "六四，翩翩不富以其邻，不戒以孚"],
            65: [true, "六五，帝乙归妹，以祉元吉"],
            66: [false, "上六，城复于隍，勿用师。自邑告命，贞吝"],
            67: [true, "初六，拔茅茹，以其汇，贞吉"],
            68: [false, "六二，包承，小人吉，大人否"],
            69: [false, "六三，包羞"],
            70: [true, "九四，有命无咎，畴离祉"],
            71: [true, "九五，休否，大人吉。其亡其亡，系于苞桑"],
            72: [true, "上九，倾否，先否后喜"],
            73: [null, "初九，同人于门，无咎"],
            74: [false, "六二，同人于宗，吝"],
            75: [false, "九三，伏戎于莽，升其高陵，三岁不兴"],
            76: [true, "九四，乘其墉，弗克攻，吉"],
            77: [true, "九五，同人，先号咷而后笑，大师克相遇"],
            78: [null, "上九，同人于郊，无悔"],
            79: [null, "初九，无交害，匪咎，艰则无咎"],
            80: [null, "九二，大车以载，有攸往，无咎"],
            81: [true, "九三，公用亨于天子，小人弗克"],
            82: [null, "九四，匪其彭，无咎"],
            83: [true, "六五，厥孚交如，威如，吉"],
            84: [true, "上九，自天祐之，吉无不利"],
            85: [true, "初六，谦谦君子，用涉大川，吉"],
            86: [true, "六二，鸣谦，贞吉"],
            87: [true, "九三，劳谦，君子有终，吉"],
            88: [true, "六四，无不利，撝谦"],
            89: [true, "六五，不富以其邻，利用侵伐，无不利"],
            90: [true, "上六，鸣谦，利用行师，征邑国"],
            91: [false, "初六，鸣豫，凶"],
            92: [true, "六二，介于石，不终日，贞吉"],
            93: [false, "六三，盱豫，悔；迟有悔"],
            94: [true, "九四，由豫，大有得；勿疑，朋盍簪"],
            95: [null, "六五，贞疾，恒不死"],
            96: [null, "上六，冥豫，成有渝，无咎"],
            97: [true, "初九，官有渝，贞吉；出门交有功"],
            98: [false, "六二，系小子，失丈夫"],
            99: [true, "六三，系丈夫，失小子；随有求得，利居贞"],
            100: [false, "九四，随有获，贞凶；有孚在道，以明，何咎？"],
            101: [true, "九五，孚于嘉，吉"],
            102: [false, "上六，拘系之，乃从维之；王用亨于西山"],
            103: [true, "初六，干父之蛊，有子，考无咎，厉终吉"],
            104: [false, "九二，干母之蛊，不可贞"],
            105: [null, "九三，干父之蛊，小有悔，无大咎"],
            106: [false, "六四，裕父之蛊，往见吝"],
            107: [true, "六五，干父之蛊，用誉"],
            108: [null, "上九，不事王侯，高尚其事"],
            109: [true, "初九，咸临，贞吉"],
            110: [true, "九二，咸临，吉，无不利"],
            111: [false, "六三，甘临，无攸利；既忧之，无咎"],
            112: [null, "六四，至临，无咎"],
            113: [true, "六五，知临，大君之宜，吉"],
            114: [true, "上六，敦临，吉，无咎"],
            115: [false, "初六，童观，小人无咎，君子吝"],
            116: [false, "六二，窥观，利女贞"],
            117: [null, "六三，观我生，进退"],
            118: [true, "六四，观国之光，利用宾于王"],
            119: [null, "九五，观我生，君子无咎"],
            120: [null, "上九，观其生，君子无咎"],
            121: [null, "初九，屦校灭趾，无咎"],
            122: [null, "六二，噬肤灭鼻，无咎"],
            123: [null, "六三，噬腊肉，遇毒；小吝，无咎"],
            124: [true, "九四，噬干胏，得金矢；利艰贞，吉"],
            125: [null, "六五，噬干肉，得黄金；贞厉，无咎"],
            126: [false, "上九，何校灭耳，凶"],
            127: [null, "初九，贲其趾，舍车而徒"],
            128: [null, "六二，贲其须"],
            129: [true, "六三，贲如濡如，永贞吉"],
            130: [null, "六四，贲如皤如，白马翰如，匪寇婚媾"],
            131: [null, "六五，贲于丘园，束帛戋戋，吝，终吉"],
            132: [null, "上九，白贲，无咎"],
            133: [false, "初六，剥床以足，蔑贞凶"],
            134: [false, "六二，剥床以辨，蔑贞凶"],
            135: [null, "六三，剥之，无咎"],
            136: [false, "六四，剥床以肤，凶"],
            137: [null, "六五，贯鱼，以宫人宠，无不利"],
            138: [true, "上九，硕果不食，君子得舆，小人剥庐"],
            139: [true, "初九，不远复，无祗悔，元吉"],
            140: [true, "六二，休复，吉"],
            141: [null, "六三，频复，厉无咎"],
            142: [null, "六四，中行独复"],
            143: [null, "六五，敦复，无悔"],
            144: [false, "上六，迷复，凶，有灾眚"],
            145: [null, "初九，无妄，往吉"],
            146: [true, "六二，不耕获，不菑畲，则利有攸往"],
            147: [null, "六三，无妄之灾，或系之牛，行人之得，邑人之灾"],
            148: [true, "九四，可贞，无咎"],
            149: [null, "九五，无妄之疾，勿药有喜"],
            150: [false, "上九，无妄，行有眚，无攸利"],
            151: [null, "初九，有厉，利已"],
            152: [null, "九二，舆说輹"],
            153: [true, "九三，良马逐，利艰贞，曰闲舆卫，利有攸往"],
            154: [true, "六四，童牛之牿，元吉"],
            155: [true, "六五，豮豕之牙，吉"],
            156: [true, "上九，何天之衢，亨"],
            157: [false, "初九，舍尔灵龟，观我朵颐，凶"],
            158: [false, "六二，颠颐，拂经于丘颐，征凶"],
            159: [false, "六三，拂颐，贞凶，十年勿用，无攸利"],
            160: [true, "六四，颠颐，吉，虎视眈眈，其欲逐逐，无咎"],
            161: [null, "六五，拂经，居贞吉，不可涉大川"],
            162: [true, "上九，由颐，厉吉，利涉大川"],
            163: [null, "初六，藉用白茅，无咎"],
            164: [true, "九二，枯杨生稊，老夫得其女妻，无不利"],
            165: [false, "九三，栋桡，凶"],
            166: [true, "九四，栋隆，吉，有它吝"],
            167: [true, "九五，枯杨生华，老妇得其士夫，无咎无誉"],
            168: [false, "上六，过涉灭顶，凶，无咎"],
            169: [false, "初六，习坎，入于坎窞，凶"],
            170: [null, "九二，坎有险，求小得"],
            171: [false, "六三，来之坎坎，险且枕，入于坎窞，勿用"],
            172: [null, "六四，樽酒簋贰，用缶，纳约自牖，终无咎"],
            173: [null, "九五，坎不盈，祗既平，无咎"],
            174: [false, "上六，系用徽纆，寘于丛棘，三岁不得，凶"],
            175: [null, "初九，履错然，敬之无咎"],
            176: [true, "六二，黄离，元吉"],
            177: [false, "九三，日昃之离，不鼓缶而歌，则大耋之嗟，凶"],
            178: [false, "九四，突如其来如，焚如，死如，弃如"],
            179: [true, "六五，出涕沱若，戚嗟若，吉"],
            180: [true, "上九，王用出征，有嘉折首，获匪其丑，无咎"],
            181: [null, "初六，咸其拇"],
            182: [null, "六二，咸其腓，凶，居吉"],
            183: [null, "九三，咸其股，执其随，往吝"],
            184: [null, "九四，贞吉悔亡，憧憧往来，朋从尔思"],
            185: [null, "九五，咸其脢，无悔"],
            186: [null, "上六，咸其辅颊舌"],
            187: [false, "初六，浚恒，贞凶，无攸利"],
            188: [null, "九二，悔亡"],
            189: [false, "九三，不恒其德，或承之羞，贞吝"],
            190: [false, "九四，田无禽"],
            191: [null, "六五，恒其德，贞，妇人吉，夫子凶"],
            192: [false, "上六，振恒，凶"],
            193: [null, "初六，遁尾，厉，勿用有攸往"],
            194: [null, "六二，执之用黄牛之革，莫之胜说"],
            195: [false, "九三，系遁，有疾厉，畜臣妾吉"],
            196: [true, "九四，好遁，君子吉，小人否"],
            197: [true, "九五，嘉遁，贞吉"],
            198: [true, "上九，肥遁，无不利"],
            199: [false, "初九，壮于趾，征凶，有孚"],
            200: [true, "九二，贞吉"],
            201: [false, "九三，小人用壮，君子用罔，贞厉，羝羊触藩，羸其角"],
            202: [true, "九四，贞吉悔亡，藩决不羸，壮于大舆之輹"],
            203: [false, "六五，丧羊于易，无悔"],
            204: [null, "上六，羝羊触藩，不能退，不能遂，无攸利，艰则吉"],
            205: [null, "初六，晋如摧如，贞吉，罔孚，裕无咎"],
            206: [true, "六二，晋如愁如，贞吉，受兹介福于其王母"],
            207: [null, "六三，众允，悔亡"],
            208: [false, "九四，晋如鼫鼠，贞厉"],
            209: [null, "六五，悔亡，失得勿恤，往吉无不利"],
            210: [true, "上九，晋其角，维用伐邑，厉吉无咎，贞吝"],
            211: [false, "初九，明夷于飞，垂其翼，君子于行，三日不食，有攸往，主人有言"],
            212: [true, "六二，明夷，夷于左股，用拯马壮，吉"],
            213: [false, "九三，明夷于南狩，得其大首，不可疾贞"],
            214: [null, "六四，入于左腹，获明夷之心，于出门庭"],
            215: [true, "六五，箕子之明夷，利贞"],
            216: [false, "上六，不明晦，初登于天，后入于地"],
            217: [null, "初九，闲有家，悔亡"],
            218: [null, "六二，无攸遂，在中馈，贞吉"],
            219: [null, "九三，家人嗃嗃，悔厉吉，妇子嘻嘻，终吝"],
            220: [true, "六四，富家，大吉"],
            221: [true, "九五，王假有家，勿恤吉"],
            222: [true, "上九，有孚威如，终吉"],
            223: [null, "初九，悔亡，丧马勿逐自复，见恶人无咎"],
            224: [null, "九二，遇主于巷，无咎"],
            225: [null, "六三，见舆曳，其牛掣，其人天且劓，无初有终"],
            226: [null, "九四，睽孤，遇元夫，交孚，厉无咎"],
            227: [true, "六五，悔亡，厥宗噬肤，往何咎"],
            228: [null, "上九，睽孤，见豕负涂，载鬼一车，先张之弧，后说之弧，匪寇婚媾，往遇雨则吉"],
            229: [null, "初六，往蹇来誉"],
            230: [true, "六二，王臣蹇蹇，匪躬之故"],
            231: [false, "九三，往蹇来反"],
            232: [true, "六四，往蹇来连"],
            233: [true, "九五，大蹇朋来"],
            234: [true, "上六，往蹇来硕，吉，利见大人"],
            235: [true, "初六，无咎"],
            236: [true, "九二，田获三狐，得黄矢，贞吉"],
            237: [false, "六三，负且乘，致寇至，贞吝"],
            238: [null, "九四，解而拇，朋至斯孚"],
            239: [true, "六五，君子维有解，吉，有孚于小人"],
            240: [null, "上六，公用射隼于高墉之上，获之无不利"],
            241: [null, "初九，已事遄往，无咎，酌损之"],
            242: [true, "九二，利贞，征凶，弗损益之"],
            243: [null, "六三，三人行，则损一人，一人行，则得其友"],
            244: [true, "六四，损其疾，使遄有喜，无咎"],
            245: [true, "六五，或益之十朋之龟，弗克违，元吉"],
            246: [true, "上九，弗损益之，无咎，贞吉，利有攸往，得臣无家"],
            247: [true, "初九，利用为大作，元吉，无咎"],
            248: [true, "六二，或益之十朋之龟，弗克违，永贞吉，王用享于帝，吉"],
            249: [null, "六三，益之用凶事，无咎，有孚中行，告公用圭"],
            250: [null, "六四，中行告公从，利用为依迁国"],
            251: [true, "九五，有孚惠心，勿问元吉，有孚惠我德"],
            252: [false, "上九，莫益之，或击之，立心勿恒，凶"],
            253: [false, "初九，壮于前趾，往不胜为吝"],
            254: [null, "九二，惕号，莫夜有戎，勿恤"],
            255: [false, "九三，壮于頄，有凶，君子夬夬独行，遇雨若濡，有愠无咎"],
            256: [null, "九四，臀无肤，其行次且，牵羊悔亡，闻言不信"],
            257: [true, "九五，苋陆夬夬，中行无咎"],
            258: [false, "上六，无号，终有凶"],
            259: [null, "初六，系于金柅，贞吉，有攸往，见凶，羸豕孚蹢躅"],
            260: [null, "九二，包有鱼，无咎，不利宾"],
            261: [false, "九三，臀无肤，其行次且，厉，无大咎"],
            262: [false, "九四，包无鱼，起凶"],
            263: [true, "九五，以杞包瓜，含章，有陨自天"],
            264: [null, "上九，姤其角，吝，无咎"],
            265: [true, "初六，有孚不终，乃乱乃萃，若号一握为笑，勿恤，往无咎"],
            266: [true, "六二，引吉，无咎，孚乃利用禴"],
            267: [null, "六三，萃如嗟如，无攸利，往无咎，小吝"],
            268: [true, "九四，大吉无咎"],
            269: [true, "九五，萃有位，无咎，匪孚，元永贞，悔亡"],
            270: [null, "上六，赍咨涕洟，无咎"],
            271: [true, "初六，允升，大吉"],
            272: [true, "九二，孚乃利用禴，无咎"],
            273: [null, "九三，升虚邑"],
            274: [true, "六四，王用亨于岐山，吉无咎"],
            275: [true, "六五，贞吉，升阶"],
            276: [null, "上六，冥升，利于不息之贞"],
            277: [false, "初六，臀困于株木，入于幽谷，三岁不觌"],
            278: [true, "九二，困于酒食，朱绂方来，利用享祀，征凶无咎"],
            279: [false, "六三，困于石，据于蒺藜，入于其宫，不见其妻，凶"],
            280: [null, "九四，来徐徐，困于金车，吝，有终"],
            281: [true, "九五，劓刖，困于赤绂，乃徐有说，利用祭祀"],
            282: [true, "上六，困于葛藟，于臲卼，曰动悔有悔，征吉"],
            283: [false, "初六，井泥不食，旧井无禽"],
            284: [null, "九二，井谷射鲋，瓮敝漏"],
            285: [null, "九三，井渫不食，为我心恻，可用汲，王明，并受其福"],
            286: [true, "六四，井甃，无咎"],
            287: [true, "九五，井冽寒泉，食"],
            288: [true, "上六，井收勿幕，有孚元吉"],
            289: [true, "初九，巩用黄牛之革"],
            290: [null, "六二，己日乃革之，征吉无咎"],
            291: [false, "九三，征凶，贞厉，革言三就，有孚"],
            292: [true, "九四，悔亡，有孚改命，吉"],
            293: [true, "九五，大人虎变，未占有孚"],
            294: [null, "上六，君子豹变，小人革面，征凶，居贞吉"],
            295: [true, "初六，鼎颠趾，利出否，得妾以其子，无咎"],
            296: [true, "九二，鼎有实，我仇有疾，不我能即，吉"],
            297: [true, "九三，鼎耳革，其行塞，雉膏不食，方雨亏悔，终吉"],
            298: [false, "六四，鼎折足，覆公餗，其形渥，凶"],
            299: [true, "六五，鼎黄耳金铉，利贞"],
            300: [true, "上九，鼎玉铉，大吉，无不利"],
            301: [true, "初九，震来虩虩，后笑言哑哑，吉"],
            302: [null, "六二，震来厉，亿丧贝，跻于九陵，勿逐，七日得"],
            303: [null, "六三，震苏苏，震行无眚"],
            304: [false, "九四，震遂泥"],
            305: [null, "六五，震往来厉，亿无丧，有事"],
            306: [null, "上六，震索索，视矍矍，征凶，震不于其躬，于其邻，无咎，婚媾有言"],
            307: [true, "初六，艮其趾，无咎，利永贞"],
            308: [false, "六二，艮其腓，不拯其随，其心不快"],
            309: [false, "九三，艮其限，列其夤，厉薰心"],
            310: [true, "六四，艮其身，无咎"],
            311: [true, "六五，艮其辅，言有序，悔亡"],
            312: [true, "上九，敦艮，吉"],
            313: [true, "初六，鸿渐于干，小子厉，有言，无咎"],
            314: [null, "六二，鸿渐于磐，饮食衎衎，吉"],
            315: [false, "九三，鸿渐于陆，夫征不复，妇孕不育，凶，利御寇"],
            316: [null, "六四，鸿渐于木，或得其桷，无咎"],
            317: [true, "九五，鸿渐于陵，妇三岁不孕，终莫之胜，吉"],
            318: [true, "上九，鸿渐于陆，其羽可用为仪，吉"],
            319: [true, "初九，归妹以娣，跛能履，征吉"],
            320: [null, "九二，眇能视，利幽人之贞"],
            321: [false, "六三，归妹以须，反归以娣"],
            322: [null, "九四，归妹愆期，迟归有时"],
            323: [true, "六五，帝乙归妹，其君之袂不如其娣之袂良，月几望，吉"],
            324: [false, "上六，女承筐无实，士刲羊无血，无攸利"],
            325: [true, "初九，遇其配主，虽旬无咎，往有尚"],
            326: [true, "六二，丰其蔀，日中见斗，往得疑疾，有孚发若，吉"],
            327: [null, "九三，丰其沛，日中见沬，折其右肱，无咎"],
            328: [true, "九四，丰其蔀，日中见斗，遇其夷主，吉"],
            329: [true, "六五，来章，有庆誉，吉"],
            330: [false, "上六，丰其屋，蔀其家，窥其户，阒其无人，三岁不觌，凶"],
            331: [null, "初六，旅琐琐，斯其所取灾"],
            332: [true, "六二，旅即次，怀其资，得童仆贞"],
            333: [false, "九三，旅焚其次，丧其童仆贞，厉"],
            334: [null, "九四，旅于处，得其资斧，我心不快"],
            335: [true, "六五，射雉一矢亡，终以誉命"],
            336: [false, "上九，鸟焚其巢，旅人先笑后号咷，丧牛于易，凶"],
            337: [null, "初六，进退，利武人之贞"],
            338: [true, "九二，巽在床下，用史巫纷若，吉无咎"],
            339: [false, "九三，频巽，吝"],
            340: [true, "六四，悔亡，田获三品"],
            341: [true, "九五，贞吉悔亡，无不利，无初有终，先庚三日，后庚三日，吉"],
            342: [false, "上九，巽在床下，丧其资斧，贞凶"],
            343: [true, "初九，和兑，吉"],
            344: [true, "九二，孚兑，吉，悔亡"],
            345: [false, "六三，来兑，凶"],
            346: [true, "九四，商兑未宁，介疾有喜"],
            347: [false, "九五，孚于剥，有厉"],
            348: [null, "上六，引兑"],
            349: [true, "初六，用拯马壮，吉"],
            350: [true, "九二，涣奔其机，悔亡"],
            351: [null, "六三，涣其躬，无悔"],
            352: [true, "六四，涣其群，元吉，涣有丘，匪夷所思"],
            353: [true, "九五，涣汗其大号，涣王居，无咎"],
            354: [null, "上九，涣其血去逖出，无咎"],
            355: [null, "初九，不出户庭，无咎"],
            356: [false, "九二，不出门庭，凶"],
            357: [null, "六三，不节若，则嗟若，无咎"],
            358: [true, "六四，安节，亨"],
            359: [true, "九五，甘节，吉，往有尚"],
            360: [false, "上六，苦节，贞凶，悔亡"],
            361: [true, "初九，虞吉，有它不燕"],
            362: [true, "九二，鸣鹤在阴，其子和之，我有好爵，吾与尔靡之"],
            363: [null, "六三，得敌，或鼓或罢，或泣或歌"],
            364: [true, "六四，月几望，马匹亡，无咎"],
            365: [true, "九五，有孚挛如，无咎"],
            366: [false, "上九，翰音登于天，贞凶"],
            367: [false, "初六，飞鸟以凶"],
            368: [null, "六二，过其祖，遇其妣，不及其君，遇其臣，无咎"],
            369: [false, "九三，弗过防之，从或戕之，凶"],
            370: [null, "九四，无咎，弗过遇之，往厉必戒，勿用永贞"],
            371: [null, "六五，密云不雨，自我西郊，公弋取彼在穴"],
            372: [false, "上六，弗遇过之，飞鸟离之，凶，是谓灾眚"],
            373: [null, "初九，曳其轮，濡其尾，无咎"],
            374: [false, "六二，妇丧其茀，勿逐，七日得"],
            375: [false, "九三，高宗伐鬼方，三年克之，小人勿用"],
            376: [null, "六四，繻有衣袽，终日戒"],
            377: [true, "九五，东邻杀牛，不如西邻之禴祭，实受其福"],
            378: [false, "上六，濡其首，厉"],
            379: [false, "初六，濡其尾，吝"],
            380: [true, "九二，曳其轮，贞吉"],
            381: [null, "六三，未济征凶，利涉大川"],
            382: [true, "九四，贞吉悔亡，震用伐鬼方，三年有赏于大国"],
            383: [true, "六五，贞吉无悔，君子之光，有孚吉"],
            384: [null, "上九，有孚于饮酒，无咎，濡其首，有孚失是"]
        }

        // 先天序号
        function symToNum(arr) {
            return 8 - (arr[0] * 4 + arr[1] * 2 + arr[2])
        }

        // 生克输出
        function getRelationType(elem1, elem2) {
            if (elem1 === elem2) return "比和"
            if (to[elem1] === elem2) return "体生用"
            if (to[elem2] === elem1) return "用生体"
            if (fo[elem1] === elem2) return "体克用"
            if (fo[elem2] === elem1) return "用克体"
        }

        // 全局生克
        function getRelScore(bodyElem, otherElem, bodyNum, trigramNum, bodyStrength, otherStrength) {
            // 体用比和
            if (bodyElem === otherElem) {
                let effect = (bodyStrength - 3) * 0.05 + 0.8
                // 坎卦比和
                if (trigramNum === 6) effect -= 0.05
                // 乾卦比和
                if (trigramNum === 1) effect += 0.05
                return effect
            }
            
            // 用克体
            if (fo[otherElem] === bodyElem) {
                let deltaNum = otherStrength - bodyStrength
                let baseEffect = -0.6
                let strengthFactor = 0.08
                let effect = baseEffect - (strengthFactor * deltaNum)
                // 坎卦克体
                if (trigramNum === 6) effect -= 0.1
                // 坤卦克体
                if (trigramNum === 8) effect += 0.05
                return effect
            }
            // 体生用
            else if (to[bodyElem] === otherElem) {
                // 体弱泄凶
                return (0.1 * (bodyStrength - 3)) - 0.4
            }
            // 体克用
            else if (fo[bodyElem] === otherElem) {
                let effect = 0.4
                let deltaNum = bodyStrength - otherStrength
                // 体旺克弱
                if (deltaNum >= 3) effect += 0.3
                // 体弱克旺
                if (deltaNum <= -3) effect -= 0.5
                // 中度体旺
                if (deltaNum >= 1 && deltaNum < 3) effect += 0.1
                // 中度体弱
                if (deltaNum > -3 && deltaNum <= -1) effect -= 0.3
                // 体卦为乾
                if (bodyNum === 1) effect += 0.05
                // 体卦为坤
                if (bodyNum === 8) effect -= 0.05
                return effect
            }
            // 用生体
            else if (to[otherElem] === bodyElem) {
                let effect = 0.4 + 0.1 * (otherStrength - 1)
                // 坎卦生体
                if (trigramNum === 6) effect -= 0.1
                // 乾卦生体
                if (trigramNum === 1) effect += 0.05
                // 坤卦生体
                if (trigramNum === 8) effect += 0.05
                // 体弱生体
                if (bodyStrength <= 2) effect *= 0.5 / bodyStrength + 1
                return effect
            }
        }

        // 时辰换算
        let time = Math.floor((hour + 1) / 2) % 12 + 1

        // 内外卦数
        let out = (year + month + day) % 8
        let inn = (year + month + day + time) % 8
        out = out == 0 ? 8 : out
        inn = inn == 0 ? 8 : inn

        // 动爻爻数
        let move = (year + month + day + time) % 6
        move = move == 0 ? 6 : move

        // 农历拟合
        let curPow
        let monthData = dailyPow[month]
        for (let range in monthData) {
            let [start, end] = range.split("-").map(Number)
            if (day >= start && day <= end) {
                curPow = monthData[range]
            }
        }

        // 全局计算
        let hexInfo = deriveHexagramInfo(out, inn, move, curPow)

        let usedNum = hexInfo.used.num               // 用卦卦数
        let bodyNum = hexInfo.body.num               // 体卦卦数
        let uElem = hexInfo.used.elem                // 用卦五行
        let bElem = hexInfo.body.elem                // 体卦五行
        let uBase = hexInfo.used.base                // 用卦卦气
        let bBase = hexInfo.body.base                // 体卦卦气
        let change = hexInfo.change.sym              // 变卦卦象
        let changeNum = hexInfo.change.num           // 变卦卦数
        let cElem = hexInfo.change.elem              // 变卦五行
        let cBase = hexInfo.change.base              // 变卦卦气
        let interOutNum = hexInfo.interOutNum        // 上互卦数
        let interInNum = hexInfo.interInNum          // 下互卦数
        let bodyInterNum = hexInfo.bodyInter.num     // 体互卦数
        let usedInterNum = hexInfo.usedInter.num     // 用互卦数
        let bodyInterElem = hexInfo.bodyInter.elem   // 体互五行
        let usedInterElem = hexInfo.usedInter.elem   // 用互五行
        let bodyInterBase = hexInfo.bodyInter.base   // 体互卦气
        let usedInterBase = hexInfo.usedInter.base   // 用互卦气

        let usedRelation = getRelationType(bElem, uElem)              // 用卦关系
        let changeRelation = getRelationType(bElem, cElem)            // 变卦关系
        let bodyInterRelation = getRelationType(bElem, bodyInterElem) // 体互关系
        let usedInterRelation = getRelationType(bElem, usedInterElem) // 用互关系

        // 各卦影响
        let uInfluence = getRelScore(bElem, uElem, bodyNum, usedNum, bBase, uBase)
        let cInfluence = getRelScore(bElem, cElem, bodyNum, changeNum, bBase, cBase)
        let bodyInterInfluence = getRelScore(bElem, bodyInterElem, bodyNum, bodyInterNum, bBase, bodyInterBase)
        let usedInterInfluence = getRelScore(bElem, usedInterElem, bodyNum, usedInterNum, bBase, usedInterBase)

        // 1.全局权重
        let weights = {used: 1.6, change: 0.8, bodyInter: 0.3, usedInter: 0.2}
        let unuInfluencable = Math.abs(uInfluence) <= 0.2
        if (unuInfluencable) {
            weights = {used: 1.6, change: 1.0, bodyInter: 0.5, usedInter: 0.3}
        }

        // 2. 比和叠加
        let sameBonus = 0
        let sameCount = 0
        if (usedRelation === "比和" || usedRelation === "用生体") sameCount += weights.used
        if (changeRelation === "比和" || changeRelation === "用生体") sameCount += weights.change
        if (bodyInterRelation === "比和" || bodyInterRelation === "用生体") sameCount += weights.bodyInter
        if (usedInterRelation === "比和" || usedInterRelation === "用生体") sameCount += weights.usedInter

        sameBonus = (sameCount / 2.4) * (bBase / 4) * 0.95

        // 3. 凶象惩罚
        let negHBonus = 0
        let negHCount = 0
        if (uInfluence < 0) negHCount += weights.used
        if (cInfluence < 0) negHCount += weights.change
        if (bodyInterInfluence < 0) negHCount += weights.bodyInter
        if (usedInterInfluence < 0) negHCount += weights.usedInter

        negHBonus = -(negHCount / 2.4) * ((6 - bBase) / 4) * 1.21

        // 4. 汇总得分
        let prmscore = 5 + uInfluence * weights.used + cInfluence * weights.change * moveWeightMap[move] + bodyInterInfluence * weights.bodyInter + usedInterInfluence * weights.usedInter + sameBonus + negHBonus

        // 变爻卦数
        let changeOutNum, changeInnNum;
        if (move <= 3) {
            changeOutNum = out
            changeInnNum = symToNum(change)
        } else {
            changeInnNum = inn
            changeOutNum = symToNum(change)
        }

        // 爻辞判定
        let score
        let hexAdjust = 0
        let bodyhexIndex = 0
        let changehexIndex = 0
        let usedHex = (prmscore >= 4.4 && prmscore <= 5.6)
        if (usedHex) {
            // 重排卦序
            let bodyKey = `${out}-${inn}`
            let changeKey = `${changeOutNum}-${changeInnNum}`
            let bodyHexagram64 = book[bodyKey]
            let changeHexagram64 = book[changeKey]
            if (bodyHexagram64 && changeHexagram64) {
                // 爻辞索引
                bodyhexIndex = (bodyHexagram64 - 1) * 6 + move
                changehexIndex = (changeHexagram64 - 1) * 6 + move
                // 本爻权重
                if (merged[bodyhexIndex][0]) {
                    hexAdjust += 0.5
                } else if (merged[bodyhexIndex][0] === false) {
                    hexAdjust -= 0.5
                } else {
                    // 变爻权重
                    if (merged[changehexIndex][0]) {
                        hexAdjust += 0.3
                    }
                    else if (merged[changehexIndex][0] === false) {
                        hexAdjust -= 0.3
                    }
                }
                score = hexAdjust + prmscore
            }
        } else {
            score = prmscore
        }

        // 构建输出
        let resultStr = ""
        let finalScore = Math.round(score * 100) / 100

        // 1. 起卦信息
        resultStr += "==== 落梅之精思 ====\n"
        resultStr += `\n`
        resultStr += `日期：${year}年${month}月${day}日${hour}时\n`
        resultStr += `\n`

        // 2. 卦气旺衰
        resultStr += `【卦气旺衰】\n`
        resultStr += `   金：${powerDesc[curPow[0]-1]}（${curPow[0]}/5）\n`
        resultStr += `   木：${powerDesc[curPow[1]-1]}（${curPow[1]}/5）\n`
        resultStr += `   水：${powerDesc[curPow[2]-1]}（${curPow[2]}/5）\n`
        resultStr += `   火：${powerDesc[curPow[3]-1]}（${curPow[3]}/5）\n`
        resultStr += `   土：${powerDesc[curPow[4]-1]}（${curPow[4]}/5）\n`
        resultStr += `\n`

        // 3. 起卦计算
        resultStr += `【起卦计算】\n`
        resultStr += `1. 上卦：(${year}+${month}+${day}) mod 8 = ${out} → ${trigramNames[out]}\n`
        resultStr += `2. 下卦：(${year}+${month}+${day}+${time}) mod 8 = ${inn} → ${trigramNames[inn]}\n`
        resultStr += `3. 动爻：(${year}+${month}+${day}+${time}) mod 6 = ${move} → ${lineNames[move]}\n`
        if (move <= 3) {
            resultStr += `   • 体卦为上卦：${trigramNames[out]}（${elemNames[elemMap[out]]}）\n`
            resultStr += `   • 用卦为下卦：${trigramNames[inn]}（${elemNames[elemMap[inn]]}）\n`
        } else {
            resultStr += `   • 体卦为下卦：${trigramNames[inn]}（${elemNames[elemMap[inn]]}）\n`
            resultStr += `   • 用卦为上卦：${trigramNames[out]}（${elemNames[elemMap[out]]}）\n`
        }
        resultStr += `\n`

        // 4. 卦象信息
        resultStr += `【卦象信息】\n`
        resultStr += `   本卦：上 ${trigramNames[out]} 下 ${trigramNames[inn]}\n`
        resultStr += `   变卦：上 ${trigramNames[changeOutNum]} 下 ${trigramNames[changeInnNum]}\n`
        resultStr += `   互卦：上 ${trigramNames[interOutNum]} 下 ${trigramNames[interInNum]}\n`
        resultStr += `\n`

        // 5. 生克旺衰
        resultStr += `【全局生克】\n`

        // 体卦信息
        resultStr += `1. 体卦五行：${trigramNames[bodyNum]}，${elemNames[bElem]}\n`
        resultStr += `   卦气旺衰：${powerDesc[Math.round(bBase)-1]}，${bBase.toFixed(0)}/5\n\n`

        // 用卦分析
        resultStr += `2. 用卦五行：${trigramNames[usedNum]}，${elemNames[uElem]}\n`
        resultStr += `   卦气旺衰：${powerDesc[Math.round(uBase)-1]}，${uBase.toFixed(0)}/5\n`
        resultStr += `   生克关系：${usedRelation}\n`
        resultStr += `   理论强度：${uInfluence.toFixed(2)}\n`
        resultStr += `\n`

        if (!unuInfluencable) {
            resultStr += `体用生克趋势明显，体用为主统览全局\n`
        } else {
            resultStr += `体用生克趋势不显，提升互变参考权重\n`
        }
        resultStr += `\n`

        resultStr += `   用卦权重：${weights.used.toFixed(2)}\n`
        resultStr += `   变卦权重：${weights.change.toFixed(2)}\n`
        resultStr += `   变爻权重：${moveWeightMap[move].toFixed(2)}\n`
        resultStr += `   体互权重：${weights.bodyInter.toFixed(2)}\n`
        resultStr += `   用互权重：${weights.usedInter.toFixed(2)}\n`
        resultStr += `\n`

        // 变卦分析
        resultStr += `3. 变卦五行：${trigramNames[changeNum]}，${elemNames[cElem]}\n`
        resultStr += `   卦气旺衰：${powerDesc[Math.round(cBase)-1]}，${cBase.toFixed(0)}/5\n`
        resultStr += `   生克关系：${changeRelation}\n`
        resultStr += `   理论强度：${cInfluence.toFixed(2)}\n`
        resultStr += `\n`

        // 体互分析
        resultStr += `4. 体互五行：${trigramNames[bodyInterNum]}，${elemNames[bodyInterElem]}\n`
        resultStr += `   卦气旺衰：${powerDesc[Math.round(bodyInterBase)-1]}，${bodyInterBase.toFixed(0)}/5\n`
        resultStr += `   生克关系：${bodyInterRelation}\n`
        resultStr += `   理论强度：${bodyInterInfluence.toFixed(2)}\n`
        resultStr += `\n`

        // 用互分析
        resultStr += `5. 用互五行：${trigramNames[usedInterNum]}，${elemNames[usedInterElem]}\n`
        resultStr += `   卦气旺衰：${powerDesc[Math.round(usedInterBase)-1]}，${usedInterBase.toFixed(0)}/5\n`
        resultStr += `   生克关系：${usedInterRelation}\n`
        resultStr += `   理论强度：${usedInterInfluence.toFixed(2)}\n`
        resultStr += `\n`

        // 6. 详细计算
        resultStr += `【数术演算】\n`
        resultStr += `   初始赋分：5.00\n`
        resultStr += `   体用生克：${(uInfluence * weights.used).toFixed(2)}\n`
        resultStr += `   变卦生克：${(cInfluence * weights.change * moveWeightMap[move]).toFixed(2)}\n`
        resultStr += `   体互生克：${(bodyInterInfluence * weights.bodyInter).toFixed(2)}\n`
        resultStr += `   用互生克：${(usedInterInfluence * weights.usedInter).toFixed(2)}\n`
        resultStr += `   比和加成：${sameBonus.toFixed(2)}\n`
        resultStr += `   凶象惩罚：${negHBonus.toFixed(2)}\n`
        resultStr += `   演算得数：${prmscore.toFixed(2)}\n\n`

        // 7. 爻辞判定
        if (usedHex) {
            resultStr += `演算得数趋势不显，引入爻辞判定吉凶\n`
            if (merged[bodyhexIndex][0]) {
                resultStr += `   本爻判定：吉，+0.5\n`
            } else if (merged[bodyhexIndex][0] === false) {
                resultStr += `   本爻判定：凶，-0.5\n`
            } else {
                resultStr += `   本爻判定：平，+0.0\n`
                resultStr += `\n本爻判定趋势不显，引入变爻判定吉凶\n`
                if (merged[changehexIndex][0]) {
                    resultStr += `   变爻判定：吉，+0.3\n`
                } else if (merged[changehexIndex][0] === false) {
                    resultStr += `   变爻判定：凶，-0.3\n`
                } else {
                    resultStr += `   变爻判定：平，+0.0\n`
                    resultStr += `变爻判定趋势不显，参考爻辞决断吉凶\n\n`
                }
            }
            resultStr += `   爻辞调整：${hexAdjust.toFixed(2)}\n`
            resultStr += `   本爻内容：${merged[bodyhexIndex][1]}\n`
            resultStr += `   变爻内容：${merged[changehexIndex][1]}\n\n`
        } else {
            resultStr += `   演算得数趋势明显，无需爻辞判定吉凶\n\n`
        }

        let result
        if (finalScore <= 2) {
            result = "大凶"
        } else if (finalScore <= 3.2) {
            result = "凶"
        } else if (finalScore <= 4.4) {
            result = "小凶"
        } else if (finalScore <= 5.6) {
            result = "平"
        } else if (finalScore <= 6.8) {
            result = "小吉"
        } else if (finalScore <= 8.0) {
            result = "吉"
        } else {
            result = "大吉"
        }

        // 8. 最终结果
        resultStr += `【最终得分】：${finalScore}/10，【${result}】\n\n`
        resultStr += "==== 拟合完毕 ===="
        stack.push(StringIota.makeUnchecked(resultStr))
    }



}
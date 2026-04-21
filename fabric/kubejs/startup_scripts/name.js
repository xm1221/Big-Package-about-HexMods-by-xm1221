StartupEvents.registry('hexcasting:action', e => {
    function registerPatternWrap(seq, dir, id, isGreat, options, namespace) {
        isGreat = !!isGreat
        if (!(id in global.PatternOperateMap)) {
            throw new Error('missing operate: ' + id)
        }
        let resourceKey = (namespace || 'miehex') + ':' + id
        if (isGreat) {
            //global.perWorldPatterns.push(resourceKey)
        }
        let pattern = HexPattern.fromAngles(seq, dir)
        e.custom(resourceKey, ActionRegistryEntry(pattern, new ActionJS(id, pattern, options, namespace)))
    }

    //开发者之策略
    registerPatternWrap("qaqqq",HexDir.NORTH_EAST,"xmdebug")

    //开发者之策略，二
    registerPatternWrap("qqqaq",HexDir.NORTH_EAST,"xmbug")
    
    //测试员之策略
    registerPatternWrap("adaw",HexDir.SOUTH_EAST,'test')

    //捐献
    registerPatternWrap('dadawaawad',HexDir.NORTH_EAST,'donate',false,null,'miehex')
    
    // 戏法之提整
    registerPatternWrap('ddeweeedq', HexDir.SOUTH_EAST, 'list_insert', false, null, 'miehex')

    // 守护序列之精思
    registerPatternWrap('qqqqqeawqwqwqwqwqwwded', HexDir.EAST, 'import_quine', false, null, 'miehex')

    // 插入之提整
    registerPatternWrap('wawaqw', HexDir.SOUTH_EAST, 'easy_thrust',false,null,'miehex')

    // 抽出之策略
    registerPatternWrap('wedwdw', HexDir.SOUTH_WEST, 'easy_extract',false,null,"miehex")

    // 立方体类型之提整
    registerPatternWrap('wewdwewaqwqwa', HexDir.WEST, 'cube_type', false , null,"miehex")

    // 立方体诸类型之提整
    registerPatternWrap('wewdwewaqwqwaada', HexDir.WEST, 'cube_types',false,null,"miehex")

    // 区域名号之提整
    registerPatternWrap('qqqqqwdeddwwded', HexDir.SOUTH_EAST, 'zone_entity/by_name',false,null,"miehex")

    //故乡之精思
    registerPatternWrap('wqaqwawqwwawwqwwa',HexDir.NORTH_EAST,'get_spawn')

    //仇雠之纯化
    registerPatternWrap("wadwdqdwd",HexDir.EAST,"get_target")

    //旋转之提整
    registerPatternWrap("wdww",HexDir.EAST,"rotatevector")

    //夹角之馏化
    registerPatternWrap("wadewqaeaqwed",HexDir.EAST,"anglebetweenscalar")

    //夹角之策略
    registerPatternWrap("qaeaqeqaea",HexDir.NORTH_WEST,"anglebetweenvectors")

    //连接卓伟
    registerPatternWrap("daaedewdweeqawa", HexDir.WEST,"great_connect");

    //万法之纯化
    registerPatternWrap("qqw",HexDir.WEST,"all_in_one")

    //spells===============================

    // 附魔转移
    registerPatternWrap('eeeeewdqdqdqdqdqdadwdwd', HexDir.EAST, 'exchant_exchange',false, null, 'miehex')

    // 摧毁元件
    registerPatternWrap('aaqqddaqddaqddaqddaqddadw', HexDir.EAST, 'destroy_components',false,null,"miehex")

     // 创造树苗
    registerPatternWrap('wawwwewdwewww', HexDir.EAST, 'create_sapling',false,null,'miehex')


    // 构筑媒质剑
    registerPatternWrap('eadeaqwwdwqqeaqqweewwqadaqwwww', HexDir.NORTH_EAST, 'create_sword')

    // 收集意识
    registerPatternWrap('qqqqqwqqwqwqwqwqwwqaeqawwwawwwaww',HexDir.EAST,"collect_consciousness")

    //人造自然
    registerPatternWrap("wedweaqqwq",HexDir.WEST,"change_biome")

    //进入理念世界
    registerPatternWrap("wqwawewawqwdwewdwwwdwwqaq",HexDir.EAST,"idea_entry")

    //返回主世界
    registerPatternWrap("wedwewwdwew",HexDir.NORTH_EAST,"back_to_overworld")

    //提取精魄
    registerPatternWrap("wqwqwqwqwqwawwaqqqqqddewqa",HexDir.EAST,"create_symbols")

    //构筑方块，理念型
    registerPatternWrap('wqwawqwqwqwqwqaweeeee',HexDir.EAST,"create_block/idea")

    //探古寻迹
    registerPatternWrap('edeeeeeqdwdwww',HexDir.EAST,"locate")

    //分海(fabric only)
    registerPatternWrap("qaqqqqqwqqwqwqwqwawqwwdwwewwewwewwewweww",HexDir.EAST,"worldreloader")

    //方块理念化
    registerPatternWrap("wqwawqwqwqwqwqawew",HexDir.EAST,"idealized_block")

    //污染
    registerPatternWrap('aq',HexDir.NORTH_WEST,"push")

    //进程崩溃
    registerPatternWrap("qeqwqwqwqwqeqawdweeweweewqdwwewewwewweweww",HexDir.NORTH_EAST,"crash")

    //随心
    registerPatternWrap("qwawqwadawqwa",HexDir.EAST,"inventory_control")

    //所欲
    registerPatternWrap("dwewdweqawqwa",HexDir.EAST,"item_control")

    //缴械
    registerPatternWrap("dqdaedeadqdaede",HexDir.EAST,"expelliarmus")

    //惑心
    registerPatternWrap("dwewdweqawqwaewqqqwaw",HexDir.EAST,"puzzle")

    //复生
    registerPatternWrap("wqwwawwqwawqaqwqqewwwwdeqewdaqeqqeqeqewdweqeqeqqeqadweqedwwwweqeeqwewqwwewdwew",HexDir.NORTH_EAST,"resurrectionem")

    //提线木偶之策略
    registerPatternWrap("qaawawaaq",HexDir.EAST,"allay_move")

    //傀儡师之策略
    registerPatternWrap("qqaqwwawwqaqq",HexDir.EAST,"allay_casting")

    //断线风筝之策略
    registerPatternWrap("qaqqaeadeada",HexDir.EAST,"allay_stop")

    //混杂悦灵
    registerPatternWrap("daaedewdqdqdqdqdqdadwewewewewew",HexDir.WEST,"allay_mix")

    //锚定现实
    registerPatternWrap("qaqeqwedqedwwwdewdwq",HexDir.NORTH_EAST,"chunkloader_permanent")

    //创建临时稳定锚
    registerPatternWrap("aawewewaqweedeewqawewe",HexDir.NORTH_EAST,"entity_anchor")

    //开启临时门径
    registerPatternWrap("wwaqqqqqeawqwqwqwqwqw",HexDir.EAST,'lesser_gate')

    //关闭临时门径
    registerPatternWrap("wwaqqqqqe",HexDir.EAST,'lesser_gate/close')

    //吸纳媒质
    registerPatternWrap("qdwae",HexDir.EAST,'personal_media')

    //加速成长
    registerPatternWrap("wadaweeeeew",HexDir.SOUTH_EAST,"grow_up")

    //移星
    registerPatternWrap("weedwaqqwdewewewewewe",HexDir.SOUTH_EAST,"time_add")

    //记忆
    registerPatternWrap("qaqwqwqaqwqwqaqwqwqaqwqwqaqwqwqaqwq",HexDir.NORTH_EAST,"memory")

    //附魔师之纯化
    registerPatternWrap("awaeqwawq",HexDir.NORTH_EAST,"get_enchant")

    //附魔师之策略
    registerPatternWrap("dwdqewdwe",HexDir.NORTH_WEST,"give_enchant")

    //铁砧之馏化
    registerPatternWrap("qawwwwaqeeeaqwwqaee",HexDir.EAST,"enchant_add")

    //柏拉图之精思
    registerPatternWrap("qwqwqwqwqwq",HexDir.EAST,"new_idea")

    //苏格拉底之馏化
    registerPatternWrap("qwwwdwewdwwwqwqwwwdwewdwwwqqqwe",HexDir.EAST,"idea_get")

    //蒂迈欧之馏化
    registerPatternWrap("wqwqawdeaqqdeewew",HexDir.NORTH_EAST,"summon_idea_entity")

    //亚里士多德之提整
    registerPatternWrap("wewedwaqdeeaqqwqw",HexDir.NORTH_WEST,"idea_modify")

    //普罗米修斯之启示
    registerPatternWrap("ede",HexDir.NORTH_WEST,"guide")

    //时移势迁之策略
    registerPatternWrap("deeeeweewee",HexDir.NORTH_EAST,"all_in_one_pages")

    //韦编三绝之精思
    registerPatternWrap("aqqqqwqqwqq",HexDir.NORTH_WEST,"all_in_one_read")

    //内圣外王之策略
    registerPatternWrap("wdeqqqqqaewawqwqw",HexDir.SOUTH_EAST,"all_eval")

    //勒石记功之策略
    registerPatternWrap("deeeeeweeweeqeewee",HexDir.EAST,"all_record")

    //东山再起之精思
    registerPatternWrap("aqqqqqwqqwqqeqqwqq",HexDir.EAST,"record_read")

    //聆听者之策略
    registerPatternWrap("qadqa",HexDir.WEST,"chat_listen")

    //卜杖寻路
    registerPatternWrap("wwaqqqqqea",HexDir.SOUTH_WEST,"get_structure")

    //按图索骥之馏化
    registerPatternWrap("wawdwqwaeawqwdwaw",HexDir.SOUTH_EAST,"list_by_index")

    //传道者之提整
    registerPatternWrap("deaqqdae",HexDir.SOUTH_EAST,"function")

    //传道者之谨慎
    registerPatternWrap("aqdeeadq",HexDir.SOUTH_WEST,"function_check")

    //传道者之审慎
    registerPatternWrap("awqdeewadq",HexDir.SOUTH_WEST,"function_check_care")

   //授业者之策略
   registerPatternWrap("aqdeeqawqwqwqwqw",HexDir.SOUTH_WEST,"function_halt")

   //解惑者之精思
   registerPatternWrap("aqqqqdae",HexDir.EAST,"block_var")

   //解惑者之策略
   registerPatternWrap("deeeeadq",HexDir.EAST,"block_var_write")

   //解惑者之纯化
   registerPatternWrap("waqqqdae",HexDir.NORTH_EAST,"block_var_read")

   //解惑者之策略,第二型
   registerPatternWrap("waqqqqdae",HexDir.EAST,"block_var_writes")

   //iota隐藏
   registerPatternWrap("qqawwwdee",HexDir.EAST,"tooltip_hide")

   //窥视
   registerPatternWrap("eewqqwqqwwwqqeqqwwwqqwqqwee",HexDir.NORTH_EAST,"camera")

// ========================= ~~~ 一条华丽的分割线 ~~~ =========================
try{
  // 栈操作

    // 标签之纯化
    registerPatternWrap('dwedewq', HexDir.EAST, 'get_tag', false, null, 'autumnfloods')
    // 标签之馏化
    registerPatternWrap('dwedewd', HexDir.EAST, 'has_tag', false, null, 'autumnfloods')
    // 博尔颂之策略
    registerPatternWrap('qaeede', HexDir.WEST, 'id_write', false, null, 'autumnfloods')
    // 密米尔之纯化
    registerPatternWrap('edqqaq', HexDir.EAST, 'id_read', false, null, 'autumnfloods')
    // 合焦之提整
    registerPatternWrap('dwaadw', HexDir.EAST, 'square_block', false, null, 'autumnfloods')
    // 对焦之提整
    registerPatternWrap('dwaade', HexDir.EAST, 'rectangle_block', false, null, 'autumnfloods')
    // 实体之纯化：非玩家
    registerPatternWrap('qqqqqwdedd', HexDir.SOUTH_EAST, 'get_entity/not_player', false, null, 'autumnfloods')
    // 区域之馏化：方块
    registerPatternWrap('qqqqqwdeddwww', HexDir.SOUTH_EAST, 'zone_block', false, null, 'autumnfloods')
    // 勘探之提整
    registerPatternWrap('wwa', HexDir.SOUTH_EAST, 'found', false, null, 'autumnfloods')
    // 维度之精思
    registerPatternWrap('dwaq', HexDir.EAST, 'world', false, null, 'autumnfloods')
    // 数读之纯化
    registerPatternWrap('qeeeeed', HexDir.EAST, 'num_read', false, null, 'autumnfloods')
    // 数写之纯化
    registerPatternWrap('eqqqqqa', HexDir.EAST, 'num_write', false, null, 'autumnfloods')

  // 法术

    // 傀影
    registerPatternWrap('ddwedewdd', HexDir.WEST, 'simulation', false, null, 'autumnfloods')
    // 拆解
    registerPatternWrap('qaqqqqqwqqqeqqqeqqq', HexDir.SOUTH_EAST, 'uncrafting', false, null, 'autumnfloods')
    // 明晰
    registerPatternWrap('eeedeee', HexDir.NORTH_EAST, 'grid', false, null, 'autumnfloods')
    // 撕裂
    registerPatternWrap('wwewwedeadwdaedewweww', HexDir.SOUTH_EAST, 'tear', false, null, 'autumnfloods')
    // 飞升
    registerPatternWrap('ewaad', HexDir.EAST, 'high', false, null, 'autumnfloods')
    // 标识
    registerPatternWrap('dwwedwe', HexDir.EAST, 'tags', false, null, 'autumnfloods')
    // 精神控制
    registerPatternWrap('weeeweedwaqaaq', HexDir.EAST, 'control', false, null, 'autumnfloods')
    // 视向
    registerPatternWrap('wad', HexDir.SOUTH_EAST, 'yaw', false, null, 'autumnfloods')
    // 重力
    registerPatternWrap('weeeeewq', HexDir.SOUTH_WEST, 'gravity', false, null, 'autumnfloods')
    // 箭矢
    registerPatternWrap('awwwqaqw', HexDir.SOUTH_WEST, 'arrow', false, null, 'autumnfloods')
    // 骑乘
    registerPatternWrap('qaeeaq', HexDir.SOUTH_WEST, 'ride', false, null, 'autumnfloods')

    
 // 策略

    // 匝格瑞俄斯之策略
    //registerPatternWrap('wawqwaqawqwaa', HexDir.SOUTH_WEST, 'event', false, null, 'autumnfloods')
    // 厄科之策略
    registerPatternWrap('deaqqeawqwqwqwqwq', HexDir.SOUTH_EAST, 'echo', false, null, 'autumnfloods')
    // 伊西斯之策略
    registerPatternWrap('qaawedee', HexDir.EAST, 'isis', false, null, 'autumnfloods')
    // 狄俄尼索斯之策略
    registerPatternWrap('qqqqqweeeee', HexDir.NORTH_WEST, 'forever', false, null, 'autumnfloods')
    // 厄洛斯之策略
    //registerPatternWrap('qqqqaaw', HexDir.WEST, 'key', false, null, 'autumnfloods')
    // 克洛托之策略
    registerPatternWrap('dwdd', HexDir.EAST, 'let_in', false, null, 'autumnfloods')
    // 拉克西丝之馏化
    registerPatternWrap('dwaa', HexDir.EAST, 'let_read', false, null, 'autumnfloods')
    // 阿特洛波斯之纯化
    registerPatternWrap('ewaa', HexDir.EAST, 'let_out', false, null, 'autumnfloods')

    
 // 大法术

    // 流转
    registerPatternWrap('wwwwwawwwwwawwwqwwwawwwwwawwwwwaqwqdqdqdqdwedeewq', HexDir.WEST, 'focus', true, null, 'autumnfloods')
    // 反制
    registerPatternWrap
    ('wqwawqwweeeqeewqweeqeeedeeeqeewqweeqeedqweqqqewqqweqqqewaawdwqwdwwwdwqwdw', HexDir.NORTH_EAST, 'reflection', true, null, 'autumnfloods')

    // 梅易之精思
    registerPatternWrap
    ('wewdwewwqaqqwedeweewaqwedewwqwwedewwqeewaqawwedewewewdwewewedeweewaqwedewwqwwedewwqeeewedewewewdwewewedewwaqawewaqwedewwqwwedewwqeeewedew', HexDir.SOUTH_WEST, 'media', true, null, 'autumnfloods')
    // 罅隙
    registerPatternWrap
    ('wwwwwqwwwwwqwwwwwqwwwwwqwwwwwqwwwwwawwwwwqwwawwqwwqwwqwwqwwqwedewwwewwwedwaewwwedwewwqawwqeewwwedwwaewawwqawwweeeawqeeewwewdedwewwewdedwewwewdedwewweqewwewdedwewweaw', HexDir.SOUTH_WEST, 'space', true, null, 'autumnfloods')
    // 聚变
    registerPatternWrap('qwqwqwqwqwqqeaeaeaeaeaewqqqdwqqqwdqqqdwqqqwdqqqdwqqaqeeawqdwedewdwewdadqwaeeqeeawqdwedewdwewdadqwaeeqeeawqdwedewdwewdadqwaeqqdwedewdwewdadqawdeawewaedwaqdwedewdwewdadqawdeawewaedwaqdwedewdwewdadqawdeawewaedwew', HexDir.WEST, 'kcit', true, null, 'autumnfloods')

 // 物流

    // 检验
    registerPatternWrap('edeedqdweee', HexDir.SOUTH_EAST, 'recipes', false, null, 'autumnfloods')
    // 补货
    registerPatternWrap('wwedewqqqqqwed', HexDir.WEST, 'restock', false, null, 'autumnfloods')
    // 让度
    registerPatternWrap('wwqaqweeeeewqa', HexDir.EAST, 'merge', false, null, 'autumnfloods')
    // 集成
    registerPatternWrap('qaqqaeawqqq', HexDir.SOUTH_WEST, 'recipe', false, null, 'autumnfloods')
    // 上传
    registerPatternWrap('eaqaweeeee', HexDir.WEST, 'cloud', false, null, 'autumnfloods')
    // 下载
    registerPatternWrap('qdedwqqqqq', HexDir.WEST, 'download', false, null, 'autumnfloods')
    // 重新充能
    registerPatternWrap('waqqqqqwaeaeaeaeaea', HexDir.EAST, 'charge', false, null, 'autumnfloods')
    // 质元之精思
    registerPatternWrap('qaqdqaqdqaq', HexDir.NORTH_WEST, 'motes', false, null, 'autumnfloods')
    // 合质之精思
    registerPatternWrap('wwaqqwdedwqq', HexDir.EAST, 'get_all_motes', false, null, 'autumnfloods')
    // 合质之纯化
    registerPatternWrap('wwdeewaqawee', HexDir.EAST, 'get_contained_motes', false, null, 'autumnfloods')
    // 冲积之提整
    registerPatternWrap('eeeeedewdwd', HexDir.NORTH_EAST, 'get_contain', false, null, 'autumnfloods')
    // 容止
    registerPatternWrap('eeeeedwwdwd', HexDir.EAST, 'contain_contain', false, null, 'autumnfloods')
    // 物流
    registerPatternWrap('eeeeedawdwd', HexDir.SOUTH_WEST, 'contain_mote', false, null, 'autumnfloods')
    // 枢送
    registerPatternWrap('eeeeedqwdwd', HexDir.SOUTH_EAST, 'mote_contain', false, null, 'autumnfloods')
}catch(e){
    throw e
}

})
StartupEvents.registry('hexcasting:action', e => {
    function registerPatternWrap(seq, dir, id, isGreat, options, namespace) {
        isGreat = !!isGreat
        if (!(id in global.PatternOperateMap)) {
            throw new Error('missing operate: ' + id)
        }
        let resourceKey = (namespace || 'miehex') + ':' + id
        if (isGreat) {
            global.perWorldPatterns.push(resourceKey)
        }
        let pattern = HexPattern.fromAngles(seq, dir)
        e.custom(resourceKey, ActionRegistryEntry(pattern, new ActionJS(id, pattern, options, namespace)))
    }
    //意识之精思
    registerPatternWrap("qaq",HexDir.NORTH_EAST,"get_caster",false,null,"miehex")

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

    //spells===============================

    // 附魔转移
    registerPatternWrap('eeeeewdqdqdqdqdqdadwdwd', HexDir.EAST, 'exchant_exchange',false, null, 'miehex')

    // 摧毁元件
    registerPatternWrap('aaqqddaqddaqddaqddaqddadw', HexDir.EAST, 'destroy_components',false,null,"miehex")

     // 创造树苗
    registerPatternWrap('wawwwewdwewww', HexDir.EAST, 'create_sapling',false,null,'miehex')

    // 强制施法
    registerPatternWrap('daaedewdwee', HexDir.WEST, 'imposter',false,null,"miehex")

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








})
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
    //开发者之策略
    registerPatternWrap("qaqqq",HexDir.NORTH_EAST,"xmdebug")
    //开发者之策略，二
    registerPatternWrap("qqqaq",HexDir.NORTH_EAST,"xmbug")
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

    //分海
//    registerPatternWrap("qaqqqqqwqqwqwqwqwawqwwdwwewwewwewwewweww",HexDir.EAST,"worldreloader")

    //方块理念化
    registerPatternWrap("wqwawqwqwqwqwqawew",HexDir.EAST,"idealized_block")

     





})
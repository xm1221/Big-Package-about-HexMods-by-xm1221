//Disabled
// ==================== 法术配置映射 ====================
// 键：法术类型标识（字符串），值包含 item、spellName、iotaMessage 等
/*let spellMap = {
    boom: {
        // 直接使用 Item.of 构造完整的物品堆（包含 NBT）
        item: Item.of('hexcasting:artifact','{"hexcasting:media":64000L,"hexcasting:start_media":6400000L,patterns:[{"hexcasting:data":{level:0,parent:{angles:[B;5B,4B,5B],start_dir:0b}},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{level:0,parent:{angles:[B;4B,4B],start_dir:1b}},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{level:0,parent:{angles:[B;5B,4B,5B],start_dir:0b}},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{level:0,parent:{angles:[B;0B,4B],start_dir:0b}},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{level:0,parent:{angles:[B;0B,1B,4B,5B,4B],start_dir:1b}},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{level:0,parent:{angles:[B;4B,4B],start_dir:1b}},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{level:0,parent:{angles:[B;4B,5B,4B,4B,0B],start_dir:2b}},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{level:0,parent:{angles:[B;4B,4B,0B,4B,4B,0B,4B,4B],start_dir:1b}},"hexcasting:type":"hexcasting:pattern"}],pigment:{owner:[I;0,0,0,0],stack:{Count:1b,id:"hexcasting:default_colorizer"}}}'),
        spellName: 'boom',                          // 传递给 mobCasting 的法术名
        iotaMessage: 'HexPattern[EAST, aawaawaa]',  // 显示给玩家的标题文字
        spawnWeight: 1,
        colddown: 180,
        wolulu:100                              
    },
    catch:{
        item:Item.of('hexcasting:cypher', '{"hexcasting:media":900000L,"hexcasting:start_media":900000L,patterns:[{"hexcasting:data":{level:0,parent:{angles:[B;5B,4B,5B],start_dir:0b}},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{level:0,parent:{angles:[B;4B,4B],start_dir:1b}},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{level:0,parent:{angles:[B;5B,4B,5B],start_dir:0b}},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{level:0,parent:{angles:[B;0B,4B],start_dir:0b}},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{level:0,parent:{angles:[B;0B,1B,4B,5B,4B],start_dir:1b}},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{level:0,parent:{angles:[B;4B,4B,2B,4B,4B],start_dir:1b}},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{level:0,parent:{angles:[B;0B,4B,2B,0B,2B,5B,2B,0B,2B],start_dir:1b}},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{level:0,parent:{angles:[B;4B,4B,0B,2B,2B],start_dir:0b}},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{level:0,parent:{angles:[B;0B,4B],start_dir:0b}},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{level:0,parent:{angles:[B;2B,1B,2B,2B,0B,4B],start_dir:0b}},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{level:0,parent:{angles:[B;0B,4B,5B,4B,0B],start_dir:2b}},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{level:0,parent:{angles:[B;4B,0B,5B,5B,5B,0B,4B,5B,0B],start_dir:3b}},"hexcasting:type":"hexcasting:pattern"}],pigment:{owner:[I;0,0,0,0],stack:{Count:1b,id:"hexcasting:default_colorizer"}}}'),
        spellName:'catch',
        iotaMessage: 'HexPattern[SOUTH_WEST, awqqqwaqw]',
        spawnWeight:1,
        colddown: 60,
        wolulu:30 

    },
    tel:{
        item:Item.of('minecraft:ender_pearl'),
        spellName:"teleport",
        iotaMessage:'HexPattern[SOUTH_WEST, awqqqwaq]',
        spawnWeight:1,
        colddown: 60,
        wolulu:30  
    },
    slow:{
        item:Item.of('hexcasting:staff/dark_oak'),
        spellName:"slow",
        iotaMessage:"HexPattern[SOUTH_WEST, awqqqwaq]",
        spawnWeight:1,
        colddown: 60,
        wolulu:30  
    },
    down:{
        item:Item.of('hexcasting:lens'),
        spellName:"down",
        iotaMessage:"",
        spawnWeight:1,
        colddown: 5,
        wolulu:1  

    }


    
}

// ==================== 实体修改 ====================
EntityJSEvents.modifyEntity(e => {
    e.modify("minecraft:evoker", builder => {

        // ---------- 生成时随机装备法术物品，并添加标签 ----------
        builder.onAddedToWorld(entity => {
            if (entity.level.isClientSide()) return

            let spellKeys = Object.keys(spellMap)
            if (spellKeys.length == 0) return

            // 按权重随机选择一个法术类型
            let totalWeight = spellKeys.reduce((sum, key) => sum + (spellMap[key].spawnWeight || 1), 0)
            let rand = Math.random() * totalWeight
            let selectedKey = null
            for (let key of spellKeys) {
                let weight = spellMap[key].spawnWeight || 1
                if (rand < weight) {
                    selectedKey = key
                    break
                }
                rand -= weight
            }
            if (!selectedKey) selectedKey = spellKeys[0]

            let spell = spellMap[selectedKey]

            // 将物品设置到主手（复制一份，避免意外修改原物品）
            entity.setItemSlot('mainhand', spell.item.copy())

            // 在 persistentData 中存储法术类型标签
            entity.persistentData.putString('spellType', selectedKey)
        })

        // ---------- tick 行为：根据标签和物品ID执行法术 ----------
        builder.tick(entity => {
            if (entity.level.isClientSide()) return

            let target = entity.getTarget()
            if (target == null) return

            let server = entity.getServer()
            if (server == null) return

            // 获取当前主手物品ID
            let mainHand = entity.getMainHandItem()
            if (mainHand.isEmpty()) return

            // 获取实体标签
            let spellType = entity.persistentData.getString('spellType')
            if (!spellType) return

            // 根据标签获取法术配置
            let spell = spellMap[spellType]
            if (!spell) return

            // 检查当前主手物品ID是否与标签对应的物品ID一致
            if (mainHand.id != spell.item.id) return

            // 每 60 tick（2秒）触发一次
            if (entity.age % spell.colddown == 0) {
                if (target.isPlayer()) {
                    let playerName = target.name.string
                    server.runCommandSilent(`title ${playerName} title {"text":"${spell.iotaMessage}"}`)
                }

                // 延迟 30 tick 后执行法术
                server.scheduleInTicks(spell.wolulu, callback => {
                    if (!entity.isAlive()) return
                    // 再次检查当前主手物品ID是否仍匹配
                    let currentHand = entity.getMainHandItem()
                    if (currentHand.id == spell.item.id) {
                        mobCasting(spell.spellName, entity, "evoker")
                    }
                })
            }
        })
    })
})

EntityJSEvents.modifyEntity(e => {
    e.modify("illagerinvasion:sorcerer", builder => {

        // ---------- 生成时随机装备法术物品，并添加标签 ----------
        builder.onAddedToWorld(entity => {
            if (entity.level.isClientSide()) return

            let spellKeys = Object.keys(spellMap)
            if (spellKeys.length == 0) return

            // 按权重随机选择一个法术类型
            let totalWeight = spellKeys.reduce((sum, key) => sum + (spellMap[key].spawnWeight || 1), 0)
            let rand = Math.random() * totalWeight
            let selectedKey = null
            for (let key of spellKeys) {
                let weight = spellMap[key].spawnWeight || 1
                if (rand < weight) {
                    selectedKey = key
                    break
                }
                rand -= weight
            }
            if (!selectedKey) selectedKey = spellKeys[0]

            let spell = spellMap[selectedKey]

            // 将物品设置到主手（复制一份，避免意外修改原物品）
            entity.setItemSlot('mainhand', spell.item.copy())

            // 在 persistentData 中存储法术类型标签
            entity.persistentData.putString('spellType', selectedKey)
        })

        // ---------- tick 行为：根据标签和物品ID执行法术 ----------
        builder.tick(entity => {
            if (entity.level.isClientSide()) return

            let target = entity.getTarget()
            if (target == null) return

            let server = entity.getServer()
            if (server == null) return

            // 获取当前主手物品ID
            let mainHand = entity.getMainHandItem()
            if (mainHand.isEmpty()) return

            // 获取实体标签
            let spellType = entity.persistentData.getString('spellType')
            if (!spellType) return

            // 根据标签获取法术配置
            let spell = spellMap[spellType]
            if (!spell) return

            // 检查当前主手物品ID是否与标签对应的物品ID一致
            if (mainHand.id != spell.item.id) return

            // 每 60 tick（2秒）触发一次
            if (entity.age % spell.colddown == 0) {
                if (target.isPlayer()) {
                    let playerName = target.name.string
                    server.runCommandSilent(`title ${playerName} title {"text":"${spell.iotaMessage}"}`)
                }

                // 延迟 30 tick 后执行法术
                server.scheduleInTicks(spell.wolulu, callback => {
                    if (!entity.isAlive()) return
                    // 再次检查当前主手物品ID是否仍匹配
                    let currentHand = entity.getMainHandItem()
                    if (currentHand.id == spell.item.id) {
                        mobCasting(spell.spellName, entity, "sorcerer")
                    }
                })
            }
        })
    })
})
*/
 



























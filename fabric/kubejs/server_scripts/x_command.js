
ServerEvents.customCommand("structure_symbol",e=>{
  let player = e.player
  let level = player.level
let configPath = 'kubejs/config/structures.json';
let structureRegistry = level.registryAccess().registryOrThrow(Registries.STRUCTURE)
let structuresMap = JsonIO.read(configPath)
let structures =structureRegistry.keySet()
let Allstr = []
structures.forEach(e=>{
    let k =e.toString()
    Allstr.push(k)
})
    Allstr.forEach(e=>{
        if(structuresMap[e]==undefined){
            structuresMap[e]=Math.floor(Math.random()*100)*Math.floor(Math.random()*100)
            //console.log(structuresMap)
        }
    })
    JsonIO.write(configPath, structuresMap);
    player.tell("结构精魄已适配，请重启游戏")

})

ServerEvents.customCommand("biome_symbol",e=>{
  let player = e.player
  let level = player.level
let configPath = 'kubejs/config/biomes.json';
let structureRegistry = level.registryAccess().registryOrThrow(Registries.BIOME)
let structuresMap = JsonIO.read(configPath)
let structures =structureRegistry.keySet()
let Allstr = []
structures.forEach(e=>{
    let k =e.toString()
    Allstr.push(k)
})
    Allstr.forEach(e=>{
        if(structuresMap[e]==undefined){
            structuresMap[e]=Math.floor(Math.random()*100)*Math.floor(Math.random()*100)
            //console.log(structuresMap)
        }
    })
    JsonIO.write(configPath, structuresMap);
    player.tell("群系精魄已适配，请重启游戏")

})

let great_spells

ServerEvents.tags('hexcasting:action',e=>{
     great_spells=e.get('hexcasting:per_world_pattern').objectIds
})

ServerEvents.customCommand("greats",e=>{
  let player = e.player
  let keys = Object.keys(great_spells).length
  player.tell(`特有图案有${[great_spells]},共${keys}个`)
})

ServerEvents.customCommand("omniscience_clear",e=>{
  let player = e.player
  player.persistentData.put("omniscience",{})
  let instance=player.getAttribute(HexAttributes.AMBIT_RADIUS)
  instance.setBaseValue(32)
  let maxHealth = 20
        let healthAttr = player.getAttribute(Attributes.MAX_HEALTH);
        if (healthAttr) healthAttr.setBaseValue(maxHealth);
    player.persistentData.put("maxhealth",maxHealth)
    player.setHealth(20)
})

ServerEvents.customCommand("ambit_r",e=>{
  let player = e.player
  player.tell(`${player.getAttributeValue(HexAttributes.AMBIT_RADIUS)}`)
})

ServerEvents.customCommand("data" ,e=>{
    let res=e.player.rayTrace(5)
    let level = e.player.level
    if (res.type === 'block') {
        let targetBlock = res.block
        let blockPos = new BlockPos(targetBlock.x,targetBlock.y,targetBlock.z)
        let blockEntity = level.getBlockEntity(blockPos)
        let tag=blockEntity.saveWithoutMetadata()
        e.player.tell(`${tag}`)
        console.log(`${tag}`)
    }

})



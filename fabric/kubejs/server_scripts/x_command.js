
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
ServerEvents.recipes(event=>{
    
  
   event.custom(
{
  "type": "hexcasting:brainsweep",
  "blockIn": {
    "type": "block",
    "block": 'minecraft:bedrock'
  },
  "cost": 25600000,
  "entityIn": {
    "type": "entity_type",
    "entityType": "minecraft:ender_dragon"
  },
  "result": {
    "name": 'minecraft:dragon_egg'
  }
}).id("miehex_ender_dragon")
event.custom(
{
  "type": "hexcasting:brainsweep",
  "blockIn": {
    "type": "block",
    "block": 'minecraft:obsidian'
  },
  "cost": 25600000,
  "entityIn": {
    "type": "entity_type",
    "entityType": "minecraft:wither"
  },
  "result": {
    "name": 'minecraft:beacon'
  }
}).id("miehex_wither")
event.custom(
{
  "type": "hexcasting:brainsweep",
  "blockIn": {
    "type": "block",
    "block": 'minecraft:polished_granite'
  },
  "cost": 100000,
  "entityIn": {
    "type": "entity_type",
    "entityType": "minecraft:sheep"
  },
  "result": {
    "name": 'miehex:xm1221'
  }
}).id("miehex_xm1221")







})
  






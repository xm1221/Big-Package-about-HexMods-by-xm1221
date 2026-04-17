//水下呼吸
function WaterBreath(entity,bool){
    if(bool==true){
        entity.potionEffects.add('minecraft:water_breathing',-1,0)
    }
}

//剥离意识
function BarinSweep(entity){

    let nbt = entity.nbt
    let cc = nbt.get("cardinal_components")
    let sweep = cc["hexcasting:brainswept"]
    if(sweep.getBoolean("brainswept")==true){
       throw new MishapAlreadyBrainswept(entity)
    }
    console.log(`Shap`)
    sweep.putBoolean("brainswept",true)
    //console.log(`${sweep}`)
    cc.put("hexcasting:brainswept",sweep)
    nbt.put("cardinal_components",cc)
    entity.nbt=nbt
    return

}

//方块实体
/**
 * @param {Level}evel
 * @param {BlockPos} blockPos //位置
 * @param {CompoungTag}nbt //要写入的nbt
 */
function BlockEntityHelper(level,blockPos,nbt){
    let blockstate = level.getBlockState(blockPos)
        //let block = blockstate.getBlock()
        let blockEntity = level.getBlockEntity(blockPos)
        blockEntity.load(nbt)
        blockEntity.setChanged()
        level.sendBlockUpdated(blockPos, blockstate, blockstate, 3)
}

//成就检查

function AdvCheck (player,adv,callback){
    if(!player.isPlayer()){
        throw new MishapBadCaster()
    }
    if(!adv)adv="hexcasting:enlightenment"
    if(!callback)callback= ()=>{throw new MishapUnenlightened()}
    if(player.isAdvancementDone(adv)== false){
       callback()
    }
    else{
        return true
    }
}


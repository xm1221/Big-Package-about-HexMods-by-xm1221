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
    sweep.putBoolean("brainswept",true)
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

//视角操控
/**
 * 向指定玩家发送相机切换数据包，并将其视角绑定到目标实体。
 * @param {Internal.ServerPlayer} player - 要切换视角的玩家
 * @param {Internal.Entity} targetEntity - 要绑定的目标实体（可以是任意实体，甚至玩家自己）
 */
function setPlayerCamera(player, targetEntity) {
    // 1. 将KubeJS包装的player对象还原为原生的ServerPlayer实例
    let serverPlayer = player

    // 2. 创建相机切换数据包，构造参数为目标实体
    let cameraPacket = new ClientboundSetCameraPacket(targetEntity);

    // 3. 获取玩家的网络连接（Connection）对象
    let connection = serverPlayer.connection;

    // 4. 通过连接发送数据包
    connection.send(cameraPacket);
    connection.resetPosition();
}


//剥离注册函数
let BAMishap = null
function BrainsweepRegister(id,priority,entityId,iotaTypeId,cost,namespace){
    
    let resourceKey = (namespace||"miehex")+":"+id
    let callback = (entity,iota,env)=>{
  
                if(!global.BrainsweepActions[id]){env.caster.tell(`DISABLED!`)}
                try{
                    global.BrainsweepActions[id](entity, iota, env)
                    return BrainsweepCallback.buildResult((InnerEnv)=>{
                       global.BrainsweepActions[id](entity, iota, InnerEnv)
                    }, cost,ParticleSpray.burst(entity.position(),1.0,2));
                }
                catch(e){
                    if(e instanceof Mishap)throw e
                }
                    throw PatchAction.STOP_ALL    
                }
        
    try{
    let CallBack = BrainsweepCallback.create(priority,entityId, iotaTypeId,callback)
    BrainsweepCallback.forceSet(resourceKey, CallBack)
    }
    catch(e){
        console.log(e)
    }
}

//全知
/*BrainsweepRegister("omniscience",0,"minecraft:player","oneironaut:dim",100000000,"miehex")

//如鱼得水
BrainsweepRegister("water_breath_0",0,"minecraft:salmon","hexcasting:entity",10000,"miehex")
BrainsweepRegister("water_breath_1",0,"minecraft:cod","hexcasting:entity",10000,"miehex")
BrainsweepRegister("water_breath_2",0,"minecraft:tropical_fish","hexcasting:entity","miehex")

//自我标记
BrainsweepRegister("self_pat",0,"minecraft:player","pattern",100000,"miehex")*/







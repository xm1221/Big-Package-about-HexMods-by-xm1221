//剥离注册函数
function BrainsweepRegister(id,priority,entityType,iota,cost,namespace){
    let resourceKey = (namespace||"miehex")+":"+id
    let callback = new BrainsweepFunction({
        apply:function(entity,iota,env){
             let effectFunction = function(innerEnv) {
                global.BrainsweepActions[id](entity, iota, innerEnv)||function(){};
            };
            return BrainsweepCallback.buildResult(effectFunction, cost, []);
        }
        
    })
    BrainsweepKJSHelper.register(resourceKey,priority,entityType,iota,callback)
}

//BrainsweepRegister("test",1,EntityType.PLAYER,new NullIota(),0,"miehex")
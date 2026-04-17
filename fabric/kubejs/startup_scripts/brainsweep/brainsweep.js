global.BrainsweepActions={
    //全知
    "omniscience":(entity, iota, innerEnv)=>{
        
        if(entity!=innerEnv.caster)throw new MishapOthersName(entity)
        let dimKey = iota.getWorldKey().location().toString()
        let persistentData=entity.persistentData
        let worlds = persistentData.get("omniscience")||{}
    if(worlds[dimKey]!=1){
        let id = entity.username
        AdvCheck(entity,"miehex:main/root/dim_casting",()=>{
            entity.server.runCommandSilent(`advancement grant ${id} only miehex:main/root/dim_casting`)
        })
        worlds[dimKey]=1
        entity.persistentData.put("omniscience",worlds)
        worlds = entity.persistentData.get("omniscience")
        let key = entity.level.dimension.toString()
        if(worlds[key]==1){
        //console.log(`${Object.keys(HexAttributes)}`)
        let instance=entity.getAttribute(HexAttributes.AMBIT_RADIUS)
        instance.setBaseValue(Number.MAX_VALUE)

    }
        let maxHealth = Math.floor(entity.getAttributeValue(Attributes.MAX_HEALTH)/2)
        let healthAttr = entity.getAttribute(Attributes.MAX_HEALTH);
        if (healthAttr) healthAttr.setBaseValue(maxHealth);
        entity.setHealth(maxHealth);
        let text = Text.literal("").append(Text.literal(`${dimKey}`).obfuscated(true)).append(Text.literal("：")).append(Text.literal(`奉献也就是风险，冒险总得有点回报......`).color("blue"))
        entity.tell(text)
}
    else {
        let e = EntityType.BAT.create(innerEnv.world)
        let health = entity.getHealth()
        entity.setHealth(health-1)
        throw new MishapAlreadyBrainswept(e)
    }
    return
        //entity.tell(`${entity.persistentData.get("omniscience")}`)
    },

    //如鱼得水
    "water_breath_0":(entity,iota,innerEnv)=>{
        BarinSweep(entity)
        WaterBreath(iota.entity,true)
        return 
        
    },
    "water_breath_1":(entity,iota,innerEnv)=>{
        BarinSweep(entity)
        WaterBreath(iota.entity,true)
        return 
        
    },
    "water_breath_2":(entity,iota,innerEnv)=>{
        BarinSweep(entity)
        WaterBreath(iota.entity,true)
        return 
        
    },

    































}
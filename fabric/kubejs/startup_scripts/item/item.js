function IotaHolderRegister(id,path,variant,writable,pageable){
    KubeJSIotaHolderHelper.register(id,'',path,variant,writable,pageable);
    ItemEvents.modelProperties(e=>{
    e.register(id,"hexcasting:variant",(stack)=>{
        let variant=  stack.getItem().getVariant(stack)/10
        return variant
    }
)
})
}



StartupEvents.registry("item",e =>{
    e.create("miehex:media_sword","sword")
    e.create("miehex:pure_allay_shard","basic"),
    e.create("miehex:ideas_world_entry","basic")
    
})

let all_in_one = KubeJSIotaHolderHelper.register("all_in_one", "万法之杖", "miehex:item/all_in_one", 5, true, true);

ItemEvents.modelProperties(e=>{
    e.register('miehex:all_in_one',"hexcasting:variant",(stack)=>{
        let variant=  stack.getItem().getVariant(stack)/10
        return variant
    })
})


ItemEvents.modification(e => {
    e.modify("miehex:media_sword",item =>{
        item.setAttackSpeed(10)
        item.setAttackDamage(10)
        item.rarity = 'EPIC'
    })
    e.modify("miehex:pure_allay_block",item =>{
        item.rarity = 'UNCOMMON'
    })
    e.modify("miehex:pure_allay_shard",item =>{
        item.rarity = 'UNCOMMON'
    })
    e.modify("miehex:ideas_world_entry",item =>{
        item.rarity = 'EPIC'
    })
    e.modify('hexcasting:amethyst_dust',item =>{
       item.foodProperties = food => {
        food.hunger(1)
        food.saturation(0.5)
        food.alwaysEdible(true)
        food.meat(false)
        food.fastToEat(true)
    }
    e.modify('miehex:all_in_one',item=>{
        item.rarity = 'UNCOMMON'
        item.maxDamage=1000

        
    })

       
})



})


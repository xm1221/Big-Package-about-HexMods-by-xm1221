ServerEvents.tags('hexcasting:action',event =>{
    let great_spells = [
        'miehex:destroy_components','miehex:worldreloader',"miehex:resurrectionem","miehex:allay_mix"
    ]
    event.add('hexcasting:can_start_enlighten',great_spells);
    event.add('hexcasting:per_world_pattern',great_spells);
    event.add("hexcasting:requires_enlightenment",great_spells);
})

ServerEvents.tags('item',event=>{
    event.add("hexcasting:staves","miehex:all_in_one")
})

ServerEvents.tags('hexcasting:iota_type',e=>{
    e.add("hexparse:nbt_parsing_forbidden","miehex:idea")

})

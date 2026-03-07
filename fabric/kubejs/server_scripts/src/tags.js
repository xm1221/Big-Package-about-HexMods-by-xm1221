ServerEvents.tags('hexcasting:action',event =>{
    let great_spells = [
        'miehex:destroy_components','miehex:worldreloader',"miehex:Resurrectionem"
    ]
    event.add('hexcasting:can_start_enlighten',great_spells);
    event.add('hexcasting:per_world_pattern',great_spells);
    event.add("hexcasting:requires_enlightenment",great_spells);
})
ServerEvents.tags('block',event=>{
    event.add("hexcasting:cheap_to_break_block","miehex:idea_block")
})
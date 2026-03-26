ServerEvents.tags('hexcasting:action',event =>{
    let great_spells = [
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        'miehex:destroy_components','miehex:worldreloader'
=======
        'miehex:destroy_components','miehex:worldreloader',"miehex:Resurrectionem","miehex:allay_mix"
>>>>>>> Stashed changes
=======
        'miehex:destroy_components','miehex:worldreloader',"miehex:resurrectionem","miehex:allay_mix"
>>>>>>> Stashed changes
    ]
    event.add('hexcasting:can_start_enlighten',great_spells);
    event.add('hexcasting:per_world_pattern',great_spells);
    event.add("hexcasting:requires_enlightenment",great_spells);
})
ServerEvents.tags('block',event=>{
    event.add("hexcasting:cheap_to_break_block","miehex:idea_block")
<<<<<<< Updated upstream
<<<<<<< Updated upstream
})
=======
})
>>>>>>> Stashed changes
=======
})
>>>>>>> Stashed changes

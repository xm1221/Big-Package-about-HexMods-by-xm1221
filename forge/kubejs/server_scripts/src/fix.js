ServerEvents.tags('hexcasting:action',event =>{
    let great_spells = [
        'hex_machina:expose_mind','hexical:greater_blink',"hexical:charm",'hexical:conjure_mesh','hexdim:dim/create',
        'hextweaks:infusion','hexthingy:smite','ephemera:repair','ephemera:mageamor','ephemera:invisibility','hexthingy:allaycreation',
        'phlexiful:destroy_block','hexportation:make_conduit','miehex:destroy_components'
    ]
    event.add('hexcasting:can_start_enlighten',great_spells);
    event.add('hexcasting:per_world_pattern',great_spells);
    event.add("hexcasting:requires_enlightenment",great_spells);
})
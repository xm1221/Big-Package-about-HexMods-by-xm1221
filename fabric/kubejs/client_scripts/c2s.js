ClientEvents.tick(event => {

    let P1key = global.paged
    let P0key = global.pageadd
    let player = event.player
    if (P1key.consumeClick()==true) {
        player.sendData('miehex:rollpage', { delta: -1 })
    }
    if (P0key.consumeClick()==true) {
        player.sendData('miehex:rollpage', { delta: 1 })
    }


})




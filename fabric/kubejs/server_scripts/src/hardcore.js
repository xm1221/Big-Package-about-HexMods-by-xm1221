ServerEvents.loaded(event => {
    const { server } = event;
    const isHardcore = server.getGameRules().getBoolean('hardcore');

    if (isHardcore) {
        console.log('✓ 检测到当前存档为极限模式,这是影响整个世界的设置。');
} else {
        console.log('当前存档不是极限模式');
    }
});
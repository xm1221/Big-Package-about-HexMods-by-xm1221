// 注册 ClientTooltipEvent 的 ITEM 事件
ArchEvents.registry(event => {
    let ClientTooltipEvent = Java.loadClass('dev.architectury.event.events.client.ClientTooltipEvent');
    event.register('tooltip_append', ClientTooltipEvent, 'ITEM');
});
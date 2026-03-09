// 此脚本通过聊天触发，把玩家所在区块判定为结构区块（仅激活结构判定与刷怪，实际不会生成结构建筑）

/*let ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation');
let ChunkPos = Java.loadClass('net.minecraft.world.level.ChunkPos');
let StructureStart = Java.loadClass('net.minecraft.world.level.levelgen.structure.StructureStart');
let BoundingBox = Java.loadClass('net.minecraft.world.level.levelgen.structure.BoundingBox');
let BuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries');

// 获取结构Holder
function getStructureHolder(structureId) {
    let structKey = ResourceLocation.of(structureId, ':');
    let structureRegistry = BuiltInRegistries.STRUCTURE;
    // 由于Holder机制，两次转换获得Holder
    let resourceKeyField = Java.from(structureRegistry.keySet()).find(key => key.toString() === structKey.toString());
    if (!resourceKeyField) throw '未找到结构：' + structureId;
    let holderOpt = structureRegistry.getHolder(resourceKeyField);
    if (!holderOpt.isPresent()) throw "结构Holder不存在: " + structureId;
    return holderOpt.get();
}

// 插入StructureReference（必要，用于快速定位）
function forceChunkHasStructure(level, chunkX, chunkZ, structureId) {
    // 对应结构ID注册
    let chunk = level.getChunk(chunkX, chunkZ);
    let resId = ResourceLocation.of(structureId, ':');

    // getOrCreateWritableStructureReferences()（新版本接口）
    let refs = chunk.getOrCreateWritableStructureReferences();
    refs.put(resId, Java.to([ChunkPos.asLong(chunkX, chunkZ)], "long[]"));
    chunk.setUnsaved(true);
}

// 创建极简StructureStart对象
function createMinimalStructureStart(structureHolder, chunkX, chunkZ) {
    let bx = chunkX * 16;
    let bz = chunkZ * 16;
    let bb = new BoundingBox(bx, 0, bz, bx + 15, 255, bz + 15);

    // StructureStart(Holder, int, int, BoundingBox, List<StructurePiece>, int refCount)
    // 直接用空piece列表和refCount=1，足够用于刷怪判定
    let pieces = new java.util.ArrayList();
    let start = new StructureStart(structureHolder, chunkX, chunkZ, bb, pieces, 1);
    return start;
}

// 主函数：在该区块打结构“标记”
function markChunkAsStructure(level, chunkX, chunkZ, structureId) {
    // 1. 插入StructureReference
    forceChunkHasStructure(level, chunkX, chunkZ, structureId);

    // 2. 插入StructureStart
    let chunk = level.getChunk(chunkX, chunkZ);
    // structureStarts为私有字段，需反射
    let chunkClass = chunk.getClass();
    let startsField = null;
    while (chunkClass && !startsField) {
        try {
            startsField = chunkClass.getDeclaredField("structureStarts");
        } catch (e) {
            chunkClass = chunkClass.getSuperclass();
        }
    }
    if (!startsField) throw "找不到structureStarts字段，MC版本可能不兼容";
    startsField.setAccessible(true);
    let startsMap = startsField.get(chunk);

    let structureHolder = getStructureHolder(structureId);
    let structureKey = structureHolder.unwrapKey().get();
    let minimalStart = createMinimalStructureStart(structureHolder, chunkX, chunkZ);
    startsMap.put(structureKey, minimalStart);

    chunk.setUnsaved(true);
}

// 聊天触发：让玩家所在区块判定为女巫小屋（witch_hut）结构
onEvent('player.chat', event => {
    if (event.message == '结构刷怪测试') {
        let cx = Math.floor(event.player.x / 16);
        let cz = Math.floor(event.player.z / 16);
        let structId = 'minecraft:swamp_hut'; // 你也可改为其它结构如"minecraft:village_plains"
        try {
            markChunkAsStructure(event.level, cx, cz, structId);
            event.player.tell(`本区块已判定为 ${structId} 区块！你可以测试原版刷怪/判定机制。`);
        } catch (e) {
            event.player.tell('结构插入出错：' + e);
            console.error(e);
        }
    }
});*/
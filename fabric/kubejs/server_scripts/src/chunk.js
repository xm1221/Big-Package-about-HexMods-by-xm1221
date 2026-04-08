// 辅助：安全强制加载/卸载区块
function forceChunk(level, cx, cz, load) {
    if (!level) return;
    level.setChunkForced(cx, cz, load);
}

// 辅助：获取区块坐标（从实体）
function getChunkPosFromEntity(entity) {
    let chunkPos = entity.chunkPosition();
    return { cx: chunkPos.x, cz: chunkPos.z };
}

// 辅助：获取维度字符串
function getDimKey(level) {
    return level.dimension;
}


// 每 tick 更新锚定区块（只处理当前维度）
/*LevelEvents.tick(event => {
    let level = event.level;
    console.log(`我在`)
    if (level.isClientSide()) return;

    let dimKey = getDimKey(level).toString();
    let entitiesSet = global.anchorEntitiesByDim.get(dimKey);
    if (!entitiesSet) {
        console.log(`维度`)
        return;} // 当前维度没有锚定实体

    let chunkMap = global.anchorCurrentChunkByDim.get(dimKey);
    if (!chunkMap) {
        chunkMap = new Map();
        global.anchorCurrentChunkByDim.set(dimKey, chunkMap);
    }

    // 遍历当前维度的所有锚定实体（使用快照）
    Array.from(entitiesSet).forEach(uuidStr => {
        let uuid = UUID.fromString(uuidStr);
        let entity = level.getEntity(uuid);

        if (!entity || !entity.isAlive()) {
            // 实体失效：清理
            console.log(`实体失效`)
            entitiesSet.delete(uuidStr);
            let last = chunkMap.get(uuidStr);
            if (last) {
                forceChunk(level, last.cx, last.cz, false);
                chunkMap.delete(uuidStr);
            }
            return;
        }

        let currentDim = dimKey;
        let chunkData = getChunkPosFromEntity(entity);
        let cx = chunkData.cx;
        let cz = chunkData.cz;
        let last = chunkMap.get(uuidStr);

        // 区块未变化，跳过
        if (last && last.dim === currentDim && last.cx === cx && last.cz === cz) {
            console.log(`未改变`)
            return;
        }

        // 区块变化：卸载旧区块，加载新区块
        if (last) {
            forceChunk(level, last.cx, last.cz, false);
            console.log(`卸载`)
        }
        forceChunk(level, cx, cz, true);
        chunkMap.set(uuidStr, { dim: currentDim, cx: cx, cz: cz });
        console.log(`加载`)
    });
});

// 实体死亡时清理（在所有维度中查找并移除）
EntityEvents.death(event => {
    let entity = event.entity;
    let uuidStr = entity.uuid.toString();

    // 遍历所有维度
    global.anchorEntitiesByDim.forEach((entitiesSet, dimKey) => {
        if (entitiesSet.has(uuidStr)) {
            entitiesSet.delete(uuidStr);
            let chunkMap = global.anchorCurrentChunkByDim.get(dimKey);
            if (chunkMap) {
                let last = chunkMap.get(uuidStr);
                if (last) {
                    let level = entity.server?.getLevel(last.dim) || entity.level;
                    forceChunk(level, last.cx, last.cz, false);
                    chunkMap.delete(uuidStr);
                }
            }
        }
    });
});*/
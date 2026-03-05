// priority: 5
let BuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries');
let blockstatePath = 'kubejs/assets/miehex/blockstates/idea_block.json';
let mappingPath = 'kubejs/config/idea_block_mapping.json';

// 获取所有方块 ID（'default' 作为索引 0）
let allBlocks = ['default'];
BuiltInRegistries.BLOCK.entrySet().forEach(entry => {
    let id = entry.getKey().location().toString();
    allBlocks.push(id);
});

// 读取现有 blockstate
let variants = {};
let existingBlockstate = JsonIO.read(blockstatePath);
if (existingBlockstate && existingBlockstate.variants) {
    variants = existingBlockstate.variants;
}

// 确保默认条目
if (!variants['variant=0']) {
    variants['variant=0'] = { 'model': 'miehex:block/idea_block' };
}

// 构建映射（始终基于当前注册表，但保留已有映射优先）
let mapping = {};
let existingMapping = JsonIO.read(mappingPath) || {};
for (let i = 0; i < allBlocks.length; i++) {
    let blockId = allBlocks[i];
    // 如果映射已存在且索引有效，优先使用；否则新分配索引 i
    if (existingMapping[blockId] !== undefined) {
        mapping[blockId] = existingMapping[blockId];
    } else {
        mapping[blockId] = i;
    }
}

// 补充缺失的 blockstate 条目
for (let i = 1; i < allBlocks.length; i++) {
    let key = `variant=${i}`;
    if (!variants[key]) {
        let blockId = allBlocks[i];
        let modelPath = blockId.replace(':', ':block/');
        variants[key] = { 'model': modelPath };
    }
}

// 写入 blockstate
JsonIO.write(blockstatePath, { 'variants': variants });

// 写入映射文件
JsonIO.write(mappingPath, mapping);
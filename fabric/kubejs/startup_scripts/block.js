StartupEvents.registry('block',e=>{
    e.create('miehex:xm1221',"cardinal").defaultCutout()
    e.create('miehex:man_made_stone','basic').hardness(-1)
    
})
StartupEvents.registry("block", (event) => {
	// ModID声明如果选择不更改ModID(默认即"kubejs")直接把ModID这个变量取消
	const MODID = "miehex:"

	// 工具类型
	const toolType = {
		sword: "minecraft:mineable/sword",
		pickaxe: "minecraft:mineable/pickaxe",
		axe: "minecraft:mineable/axe",
		shovel: "minecraft:mineable/shovel",
		hoe: "minecraft:mineable/hoe"
	}

	// 挖掘等级
	const miningLevel = {
		wooden: "minecraft:needs_wooden_tool",
		stone: "minecraft:needs_stone_tool",
		iron: "minecraft:needs_iron_tool",
		gold: "minecraft:needs_gold_tool",
		diamond: "minecraft:needs_diamond_tool",
		nether: "forge:needs_netherite_tool"
	}

	/* 
	* 定义方块
	* 在添加下一个方块时要记得在[]后加上逗号
	* 并且一定要严格按照格式进行
	* [方块id, 声音类型, 硬度和爆炸抗性(这里我选择让他们共用一个数值), 工具类型, 挖掘等级]
	*/
	let blockRegisters = [
        //意识铁块
        ["media_iron","glass",5,"pickaxe","iron",true,false],
        //意识铜块
        ["media_copper","glass",3,"pickaxe","iron",true,false],
		//粹灵晶
		["pure_allay_block","amethyst",2,"pickaxe","stone",true,true],
		//合金意志
		["media_netherite","netherite_block",6,"pickaxe","diamond",true,false]
	]
	blockRegisters.forEach(([name, soundType, hardness, tool, level,bool0,bool1]) => {
		event.create(MODID + name) // 声明方块id
			.soundType(soundType) // 声音类型
			.hardness(hardness) // 硬度
			.resistance(hardness) // 方块的耐爆炸性
			.tagBlock(toolType[tool]) // 工具类型
			.tagBlock(miningLevel[level])  // 挖掘等级
			// .tagItem(MODID + "items") // 添加物品tag(可选)
			// .tagItem(MODID + "blocks") // 添加物品tag(可选)
			.requiresTool(bool0) // 必须要工具挖掘
			.opaque(bool1)
	})
    
})

BlockEvents.modification(e=>{
	e.modify("miehex:media_iron",block=>{
		block.hasCollision = false
		block.lightEmission = 10
		
	})
	e.modify("miehex:media_copper",block=>{
		block.hasCollision = false
		block.lightEmission = 8
		
	})
	e.modify("miehex:pure_allay_block",block=>{
		block.hasCollision = false
		block.lightEmission = 12
	})
	e.modify("miehex:media_netherite",block=>{
		block.hasCollision = true
		block.lightEmission = 12
	})
})

//理念方块
// priority: 10
let IntegerProperty = Java.loadClass('net.minecraft.world.level.block.state.properties.IntegerProperty');
let BuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries');

StartupEvents.registry('block', event => {
    // 获取方块总数，用于确定 variant 范围
    let totalBlocks = 0;
    BuiltInRegistries.BLOCK.entrySet().forEach(() => totalBlocks++);

    // 创建整数属性 variant，范围 0 ~ totalBlocks（包含）
    let variantProperty = IntegerProperty.create('variant', 0, totalBlocks);

    let builder = event.create('miehex:idea_block',"cardinal")
        .soundType("amethyst")
        .hardness(1.0)
        .tagBlock('mineable/pickaxe')
        .property(variantProperty)
		.defaultCutout()
        

   
    });

let ClientboundLevelChunkWithLightPacket = Java.loadClass('net.minecraft.network.protocol.game.ClientboundLevelChunkWithLightPacket')
let LevelChunk = Java.loadClass('net.minecraft.world.level.chunk.LevelChunk')
let BitSet = Java.loadClass('java.util.BitSet')
let ClientboundAddEntityPacket = Java.loadClass('net.minecraft.network.protocol.game.ClientboundAddEntityPacket')
let ClientboundMoveEntityPacket = Java.loadClass('net.minecraft.network.protocol.game.ClientboundMoveEntityPacket')
let ClientboundRespawnPacket = Java.loadClass('net.minecraft.network.protocol.game.ClientboundRespawnPacket')
let GlobalPos = Java.loadClass('net.minecraft.core.GlobalPos')
let Optional = Java.loadClass('java.util.Optional')
let Level = Java.loadClass('net.minecraft.world.level.Level')

ServerEvents.customCommand("level",e=>{
    let player =e.player
    player.persistentData.putBoolean("difflevel",true)
    let level = Utils.server.getLevel("minecraft:the_nether")
    let dimKey=Level.NETHER
    let globalPos = new GlobalPos.of(dimKey,new BlockPos(0,0,0))
    let pack = new ClientboundRespawnPacket(
        level.dimensionTypeId(),
        dimKey,
        level.getSeed(),
        player.gameMode.getGameModeForPlayer(),
        null,
        false,
        false,
        3,
        Optional.ofNullable(globalPos),
        20
)   
    player.tell(level.dimensionTypeId())
    let packs = new ClientboundLevelChunkWithLightPacket(level.getChunk(Math.floor(player.x) >> 4, Math.floor(player.z) >> 4),level.getLightEngine(),new BitSet(),new BitSet())
    let connection = player.connection
    connection.send(pack); 
    connection.send(packs);  

})

PlayerEvents.tick(e=>{
    let player =e.player
    let bl1 =  player.persistentData.getBoolean("difflevel")
    if(bl1==true){
    let level = Utils.server.getLevel("minecraft:the_nether")
    level.getChunkSource().addRegionTicket(
            TicketType.PORTAL,
            new ChunkPos(Math.floor(player.x) >> 4, Math.floor(player.z) >> 4),
            31,
            new BlockPos(player.x,player.y,player.z)
        )
    let packs = new ClientboundLevelChunkWithLightPacket(level.getChunk(Math.floor(player.x) >> 4, Math.floor(player.z) >> 4),level.getLightEngine(),new BitSet(),new BitSet())
    let connection = player.connection 
    connection.send(packs);  
    }
})

ServerEvents.customCommand("levels",e=>{
    let player =e.player
    player.persistentData.putBoolean("difflevel",false) 

})


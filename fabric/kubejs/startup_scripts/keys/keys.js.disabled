if(Client){
let $KeyMappingRegistry = Java.loadClass("dev.architectury.registry.client.keymappings.KeyMappingRegistry");
let $KeyMapping = Java.loadClass("net.minecraft.client.KeyMapping");
let $GLFWkey = Java.loadClass("org.lwjgl.glfw.GLFW");

ClientEvents.init(() => {
    global.pageadd = new $KeyMapping(
        "key.miehex.allinone_0", 
        $GLFWkey.GLFW_KEY_RIGHT,
        "key.keybinding.miehex.allinone"
    );
    global.paged = new $KeyMapping(
        "key.miehex.allinone_1", 
        $GLFWkey.GLFW_KEY_LEFT,
        "key.keybinding.miehex.allinone"
    );
  $KeyMappingRegistry.register(global.pageadd);
  $KeyMappingRegistry.register(global.paged);
});

}


// priority:114514
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
if (!global.toRawClass) {
    global.toRawClass = cls => {
        let clsName = String(cls).match(/[\w\.]+(?=\]?$)/)[0]
        return global.loadRawClass(clsName)
    }
<<<<<<< Updated upstream
    global.loadRawClass = clsName => Java.class.forName(clsName)
=======
    global.loadRawClass = clsName => {let cs =Java.class.forName(clsName)
        console.log(typeof cs)
        return cs
    }
>>>>>>> Stashed changes
}
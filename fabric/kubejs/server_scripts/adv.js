AdvJSEvents.advancement(event => {
    const { TRIGGER } = event;

    // 1. 创建根进度 (miehex:main/root)
    const root = event.create("miehex:main/root")
        .display(displayBuilder => {
            displayBuilder.setIcon("minecraft:white_wool");      // 图标，可替换
            displayBuilder.setTitle("咒法学冒险");
            displayBuilder.setDescription("开始你的咒法冒险！");
            displayBuilder.setBackground("miehex:textures/gui/advancements/backgrounds/mie.png");
            displayBuilder.setShowToast(false);
            displayBuilder.setAnnounceToChat(false);
        })
        .criteria(criteriaBuilder => {
            // 根进度使用 impossible 触发器，无法自然获得，仅用于组织子进度
            criteriaBuilder.add("tick", TRIGGER.tick());
        });

    // 2. 创建子进度：进入 ruined_circles_overworld 结构
    let circles =root.addChild("enter_ruined_circles", childBuilder => {
        childBuilder
            .display(displayBuilder => {
                displayBuilder.setIcon("minecraft:stone_bricks");      // 图标，可替换
                displayBuilder.setTitle("残缺之环");
                displayBuilder.setDescription("找到废弃法术环");
                // 可根据需要设置边框类型、是否隐藏等
                // displayBuilder.setFrameType(FrameType.TASK);
                // displayBuilder.setHidden(false);
            })
            .criteria(criteriaBuilder => {
                // 使用 location 触发器检测玩家是否位于指定结构中
                criteriaBuilder.add("entered", TRIGGER.location(triggerBuilder => {
                    triggerBuilder.setLocation(locationPredicateBuilder => {
                        // 结构ID：如果结构由模组添加，可能需要加上命名空间，例如 "modid:ruined_circles_overworld"
                        locationPredicateBuilder.setStructure("miehex:ruined_circles_overworld");
                    });
                }));
            });
    });
    let c=circles.addChild("enter_ruined_circles_shulk", childBuilder => {
        childBuilder
            .display(displayBuilder => {
                displayBuilder.setIcon("minecraft:deepslate_bricks");      // 图标，可替换
                displayBuilder.setTitle("黯影深处");
                displayBuilder.setDescription("找到幽匿废弃法术环");
                // 可根据需要设置边框类型、是否隐藏等
                // displayBuilder.setFrameType(FrameType.TASK);
                // displayBuilder.setHidden(false);
            })
            .criteria(criteriaBuilder => {
                // 使用 location 触发器检测玩家是否位于指定结构中
                criteriaBuilder.add("entered", TRIGGER.location(triggerBuilder => {
                    triggerBuilder.setLocation(locationPredicateBuilder => {
                        // 结构ID：如果结构由模组添加，可能需要加上命名空间，例如 "modid:ruined_circles_overworld"
                        locationPredicateBuilder.setStructure("miehex:ruined_circles_shulk");
                    });
                }));
            });
    });
    c.addChild("enter_ruined_circles_nether", childBuilder => {
        childBuilder
            .display(displayBuilder => {
                displayBuilder.setIcon("minecraft:chiseled_nether_bricks");      // 图标，可替换
                displayBuilder.setTitle("炼狱之中");
                displayBuilder.setDescription("找到下界废弃法术环");
                // 可根据需要设置边框类型、是否隐藏等
                // displayBuilder.setFrameType(FrameType.TASK);
                // displayBuilder.setHidden(false);
            })
            .criteria(criteriaBuilder => {
                // 使用 location 触发器检测玩家是否位于指定结构中
                criteriaBuilder.add("entered", TRIGGER.location(triggerBuilder => {
                    triggerBuilder.setLocation(locationPredicateBuilder => {
                        // 结构ID：如果结构由模组添加，可能需要加上命名空间，例如 "modid:ruined_circles_overworld"
                        locationPredicateBuilder.setStructure("miehex:ruined_circles_nether");
                    });
                }));
            });
    });
    root.addChild("reloader", childBuilder => {
        childBuilder
            .display(displayBuilder => {
                displayBuilder.setIcon('minecraft:netherite_axe');
                displayBuilder.setTitle("分海");
                displayBuilder.setDescription("教山峦俯首命江海让道");
                displayBuilder.setFrameType(FrameType.CHALLENGE)
                displayBuilder.setHidden(true)
            })
            .criteria(criteriaBuilder => {
                criteriaBuilder.add("load", TRIGGER.impossible());
            })
    });
    let enter_greatwork=root.addChild("enter_greatwork", childBuilder => {
        childBuilder
            .display(displayBuilder => {
                displayBuilder.setIcon("hexcasting:spellbook");      // 图标，可替换
                displayBuilder.setTitle("被遗弃的");
                displayBuilder.setDescription("进入被遗弃的卓伟之作");
                // 可根据需要设置边框类型、是否隐藏等
                // displayBuilder.setFrameType(FrameType.TASK);
                // displayBuilder.setHidden(false);
            })
            .criteria(criteriaBuilder => {
                // 使用 location 触发器检测玩家是否位于指定结构中
                criteriaBuilder.add("entered", TRIGGER.location(triggerBuilder => {
                    triggerBuilder.setLocation(locationPredicateBuilder => {
                        // 结构ID：如果结构由模组添加，可能需要加上命名空间，例如 "modid:ruined_circles_overworld"
                        locationPredicateBuilder.setStructure("miehex:abadoned_greatwork");
                    });
                }));
            });
    })
    let quenched_allay=enter_greatwork.addChild("quenched_allay", childBuilder => {
        childBuilder
            .display(displayBuilder => {
                displayBuilder.setIcon("hexcasting:quenched_allay_shard");      // 图标，可替换
                displayBuilder.setTitle("淬炼悦灵");
                displayBuilder.setDescription("你这个魔鬼！");
                // 可根据需要设置边框类型、是否隐藏等
                // displayBuilder.setFrameType(FrameType.TASK);
                // displayBuilder.setHidden(false);
            })
            .criteria(criteriaBuilder => {
                criteriaBuilder.add("get", TRIGGER.hasItems("hexcasting:quenched_allay_shard"));
            });
    });
    enter_greatwork.addChild("enter_tower", childBuilder => {
        childBuilder
            .display(displayBuilder => {
                displayBuilder.setIcon("miehex:man_made_stone");      // 图标，可替换
                displayBuilder.setTitle("磐石依旧");
                displayBuilder.setDescription("发现一座奇异的高塔");
                // 可根据需要设置边框类型、是否隐藏等
                // displayBuilder.setFrameType(FrameType.TASK);
                // displayBuilder.setHidden(false);
            })
            .criteria(criteriaBuilder => {
                // 使用 location 触发器检测玩家是否位于指定结构中
                criteriaBuilder.add("entered", TRIGGER.location(triggerBuilder => {
                    triggerBuilder.setLocation(locationPredicateBuilder => {
                        // 结构ID：如果结构由模组添加，可能需要加上命名空间，例如 "modid:ruined_circles_overworld"
                        locationPredicateBuilder.setStructure("miehex:tower");
                    });
                }));
            });
    });
    let allay=root.addChild("pure_allay", childBuilder => {
        childBuilder
            .display(displayBuilder => {
                displayBuilder.setIcon("miehex:pure_allay_shard");      // 图标，可替换
                displayBuilder.setTitle("纯粹灵性");
                displayBuilder.setDescription("获取粹灵晶");
                // 可根据需要设置边框类型、是否隐藏等
                // displayBuilder.setFrameType(FrameType.TASK);
                // displayBuilder.setHidden(false);
            })
            .criteria(criteriaBuilder => {
                criteriaBuilder.add("get", TRIGGER.hasItems("miehex:pure_allay_shard"));
            });
    });
    allay.addChild("enter_idea_world", childBuilder => {
        childBuilder
            .display(displayBuilder => {
                displayBuilder.setIcon('miehex:ideas_world_entry');
                displayBuilder.setTitle("空无的理想国");
                displayBuilder.setDescription("这是我许给你的国");
            })
            .criteria(criteriaBuilder => {
                criteriaBuilder.add("idea", TRIGGER.impossible());
            });
    });
    let nature=allay.addChild("nature", childBuilder => {
        childBuilder
            .display(displayBuilder => {
                displayBuilder.setIcon('miehex:minecraft_bamboo_jungle_symbol');
                displayBuilder.setTitle("动摇根本");
                displayBuilder.setDescription("制作群系精魄并使用它");
                displayBuilder.setFrameType(FrameType.CHALLENGE)
            })
            .criteria(criteriaBuilder => {
                criteriaBuilder.add("nature", TRIGGER.impossible());
            })
    });
    root.addChild("load", childBuilder => {
        childBuilder
            .display(displayBuilder => {
                displayBuilder.setIcon('minecraft:bedrock');
                displayBuilder.setTitle("观察者效应");
                displayBuilder.setDescription("尝试锚定现实");
                displayBuilder.setFrameType(FrameType.GOAL)
            })
            .criteria(criteriaBuilder => {
                criteriaBuilder.add("load", TRIGGER.impossible());
            })
    });
    let iron=allay.addChild("media_iron", childBuilder => {
        childBuilder
            .display(displayBuilder => {
                displayBuilder.setIcon("miehex:media_iron");      // 图标，可替换
                displayBuilder.setTitle("坚刚不可夺其志");
                displayBuilder.setDescription("获得意识之铁");
                // 可根据需要设置边框类型、是否隐藏等
                // displayBuilder.setFrameType(FrameType.TASK);
                // displayBuilder.setHidden(false);
            })
            .criteria(criteriaBuilder => {
                criteriaBuilder.add("iron", TRIGGER.hasItems("miehex:media_iron"));
            });
    });
    let copper=iron.addChild("media_copper", childBuilder => {
        childBuilder
            .display(displayBuilder => {
                displayBuilder.setIcon("miehex:media_copper");      // 图标，可替换
                displayBuilder.setTitle("衰朽金属");
                displayBuilder.setDescription("获得意识之铜");
                // 可根据需要设置边框类型、是否隐藏等
                // displayBuilder.setFrameType(FrameType.TASK);
                displayBuilder.setHidden(false);
            })
            .criteria(criteriaBuilder => {
                criteriaBuilder.add("copper", TRIGGER.hasItems("miehex:media_copper"));
            });
    })
    copper.addChild("media_netherite", childBuilder => {
        childBuilder
            .display(displayBuilder => {
                displayBuilder.setIcon("miehex:media_netherite");      // 图标，可替换
                displayBuilder.setTitle("烈士暮年");
                displayBuilder.setDescription("获得合金意志");
                displayBuilder.setFrameType(FrameType.CHALLENGE)
                displayBuilder.setHidden(false)
            })
            .criteria(criteriaBuilder => {
                criteriaBuilder.add("n", TRIGGER.hasItems("miehex:media_netherite"));
            });
    });
    quenched_allay.addChild("mix_allay", childBuilder => {
        childBuilder
            .display(displayBuilder => {
                displayBuilder.setIcon('hexcasting:quenched_allay');
                displayBuilder.setTitle("真正的好朋友");
                displayBuilder.setDescription("制造淬晶悦灵");
                displayBuilder.setFrameType(FrameType.CHALLENGE)
            })
            .criteria(criteriaBuilder => {
                criteriaBuilder.add("load", TRIGGER.impossible());
            })
    });
    nature.addChild("dim_casting",childBuilder => {
        childBuilder
            .display(displayBuilder => {
                displayBuilder.setIcon("minecraft:end_portal_frame");      // 图标，可替换
                displayBuilder.setTitle("天人合一");
                displayBuilder.setDescription("将自己的意识融入一个维度中");
                displayBuilder.setFrameType(FrameType.CHALLENGE);
                // displayBuilder.setHidden(false);
            })
            .criteria(criteriaBuilder => {
               criteriaBuilder.add("load", TRIGGER.impossible());
            });
    })



 





});
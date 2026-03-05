// ==================== 常量定义 ====================
const VARIANTS = [1,2,3,4,5,6,7];

// 成书 NBT 数据
const BOOKS = [
  '{author:"筱乜",filtered_title:"中古手稿-一",generation:2,pages:[\'{"text":"我明白了！我明白了！\\\\n这就是守护序列！！！\\\\n哈哈哈！\\\\n那老婆子原来是这个意思！\\\\n我得把它记下来：\\\\n\\\\n“于内省之中：\\\\n    思所欲为之事\\\\n    内省\\\\n       复内省\\\\n       反思\\\\n    再反思\\\\n    叫那结群的相互离散     \\\\n\\\\n"}\',\'{"text":"  两次轮换\\\\n  演讲者！\\\\n//命前者归于前\\\\n  弄臣！\\\\n  整合！\\\\n//令后者归于后\\\\n  内省：\\\\n     双子\\\\n     //使一化为二\\\\n     大哉赫尔墨斯！\\\\n  反思\\\\n  相加\\\\n  <间隔之数>"}\',\'{"text":" 入吾队列\\\\n 初学者躬扫尘杂\\\\n反思于是终矣\\\\n双子、赫尔墨斯"}\'],resolved:1b,title:"中古手稿-一"}',
  '{author:"罗非",filtered_title:"中古手稿-二",generation:2,pages:[\'{"text":"筱乜：\\\\n     虽然翱翔这个卓越法术很好用，但还需要额外配合烟花或者驱动法术。\\\\n这样实在是不太方便，得想个办法才行。\\\\n如果可以制作一个法术让它检测我是否在翱翔来滑翔，在我没滑翔的时候使用翱翔使我长出鞘翅那样的翅膀，而在我已在滑翔的时候给予我一个正确方向上的加速度，就好像是使用烟花加速那样——将这样的法术铭刻到造物或者缀品里就会方便很多。"}\',\'{"text":"我在一位咒法大师所做的不知所云的诗歌中找到了灵感，现在将全文记录如下：\\\\n唤吾之真名\\\\n召测高仪\\\\n内省：\\\\n   ＜1.8＞\\\\n反思\\\\n叫结群的离散\\\\n至大者的第二张脸\\\\n内省：\\\\n   再唤吾之真名\\\\n   伟大的卓越：翱翔"}\',\'{"text":"反思\\\\n内省：\\\\n   吾名\\\\n   吾名\\\\n   照准仪\\\\n   其数曰二\\\\n   相乘\\\\n   驱动\\\\n反思\\\\n占卜师提整\\\\n//揭示正确的道途\\\\n大哉赫尔墨斯！\\\\n\\\\n你说具体的图案呢？这可是咒法"}\',\'{"text":"师的秘密！自己去想吧！我可爱的筱乜同学！\\\\n\\\\n\\\\n追求卓越的咒法师，\\\\n你的好友：\\\\n\\\\n罗非\\\\n"}\'],title:"中古手稿-二"}',
  '{author:"筱乜",filtered_title:"中古手稿-三",generation:2,pages:[\'{"text":"罗非：\\\\n见字如面。\\\\n来信已收到，你对于翱翔法术的改进很好，我很喜欢在山峰之间翱翔，风吹的我很舒服。\\\\n但是你自己写的歪七扭八的句子就不要假托是什么咒法大师写的了。\\\\n你让我去找的可以操纵天气的卓越法术我也找到了一些。\\\\n你之前设想的用召雷法术来攻击敌人我认为是不切实际的，雷电和爆炸法术并不一样，我的爆炸并不会伤害我，而雷霆的火焰"}\',\'{"text":"却会灼伤我。这样伤敌一千自损八百的法术，真的会有人用吗？\\\\n不过驱雨应该会很有用，我讨厌下雨。\\\\n——不过既然你真的很喜欢，我曾经从一位做法大师不知所云的诗句中看到过关于五雷轰顶的咒术，现在全文摘录如下:\\\\n\\\\n意识之精思\\\\n指南针之纯化\\\\n意识之精思\\\\n照准仪之纯化\\\\n侦察员之馏化"}\',\'{"text":"指南针之纯化，第二型\\\\n数字之精思:5\\\\n内省\\\\n双子之分解\\\\n召雷\\\\n反思\\\\n彿尔循环之策略\\\\n初学者之策略\\\\n\\\\n不过说实在的，这个法术这么昂贵而且不实用，你到底要用来干什么呢？\\\\n"}\',\'{"text":"你的好友，\\\\n旅行中的咒法师：\\\\n\\\\n筱乜"}\'],title:"中古手稿-三"}',
  '{author:"罗非",filtered_title:"中古手稿-四",generation:2,pages:[\'{"text":"筱乜：\\\\n祝安\\\\n你猜我找到了什么？\\\\n卓越传送之远古卷轴！\\\\n据说这是可以任何实体传送到这个世界上的任何地方的伟大的法术！经过几次试验，我发现这个法术具有如下的性质：\\\\n\\\\n一、它固定消耗10个充能紫水晶的媒质，不管是把什么东西传送到什么地方。\\\\n二、它接受的两个iota分别是目标实体和偏移向量，也就是起点\\\\n"}\',\'{"text":"到传送终点之间连线的那一个向量。\\\\n\\\\n偏移向量看上去不太直观，但并不难以得到——只需要把终点坐标减去目标实体的坐标就行了（建议起点坐标使用指南针之纯化第二型得到，不然可能会传送到地里面）\\\\n\\\\n三、我发现它在传送像我们这样复杂的实体时，可能会打乱我们的物品栏，甚至随机丢失一些物品——我因此损失了一个空白造"}\',\'{"text":"物。\\\\n\\\\n总的来说，卓越传送是相当完美的传送法术，比闪现不知道强了多少。而对于丢失物品的问题，我也有了一个初步的解决方案——把我身上的家当都塞到背包或者潜影盒里然后再把背包放进魔袋里，传送到了地方再从魔袋里把东西拿出来就好了。\\\\n\\\\n"}\',\'{"text":"追求卓越的咒法师，\\\\n你的好友，\\\\n\\\\n罗非"}\'],resolved:1b,title:"中古手稿-四"}',
  '{author:"筱乜",filtered_title:"中古手稿-五",generation:2,pages:[\'{"text":"罗非：\\\\n见字如面。\\\\n我最近找到了一份古老的卷轴，上面记载着被称为卓越闪现的强大法术。\\\\n只需要两个紫水晶粉，就可以把施法者传送到128格以内的任何地方。这听起来真是让人向往。\\\\n\\\\n但详细了解之后，我才明白使用这个法术的困难之处：它接受的不是由自然所规定的这个世界的绝对坐标，而是由我们本人的朝向所决定的相对坐标——"}\',\'{"text":"在这个坐标系中，面朝的方向为z轴右侧方向为x轴，头顶方向为y轴，如果说要定点传送，得进行一系列变换才行。\\\\n\\\\n我因此拜访了一位精通向量的大师，他告诉我除法之馏化不仅仅包括简单的除法，也包括向量与向量之间的“叉乘”。\\\\n\\\\n具体的细节你去图书馆也能查到，我在这里不再赘述，只讲思路。我们用照准仪之纯化得到我们面朝方向上的单位向量之后,"}\',\'{"text":"如果将它叉乘一个Y轴方向上的单位向量，就会得到我们右侧方向的向量，如果叉乘一个X轴上的单位向量，便会得到我们头顶方向的向量，然后再让这些向量各自除以它们自身的长度（长度之纯化你肯定没有忘吧），便可以把它们化为单位向量，这样我们就构建了以我们自身的朝向为参照的坐标系。\\\\n\\\\n再把目标位置到我们的位置（指南针之纯化，不要忘了是第二型，除非你想卡进地里)"}\',\'{"text":"的偏移向量复制三份，每份各自和我们的坐标系的各轴向单位向量作点乘，得到的三份就是分别对应的在各轴上的坐标，也就是我们成功将世界中的一个绝对位置转化为了以我们的朝向为参照系的坐标系中的相对位置。\\\\n\\\\n这样我们就可以使用卓越闪现了，真好。\\\\n\\\\n还在旅行中的咒法师，\\\\n来无影去无踪的传说人物，\\\\n筱乜"}\'],title:"中古手稿-五"}',
  '{author:"罗非",filtered_title:"中古手稿-六",generation:2,pages:[\'{"text":"筱乜：\\\\n见字如面。\\\\n很多的咒法师都曾经在启迪时看见过庞大而复杂的卓伟回路，古代的咒法师们据此建造了法术环，而现在的卓越者们也能建造简单的法术环——但是你绝对想不到他们究竟是怎样建造这种“卓伟之作”的。\\\\n\\\\n促动石可以作为稳定且能自我维持的媒质波源，但这很\\\\n\\\\n"}\',\'{"text":"奇怪，毕竟媒质波是思维的波动，没有思维的死物怎么能产生媒质波呢？\\\\n\\\\n这个问题不是让你我迷惑了很久吗？我现在终于知道了原因，促动石里填入了一个人类的意识——运用剥离意识的法术，将一个人类的意识扭曲并注入到空白的促动石中，便可以得到各种各样的促动石，所以说促动石里面其实是一个活生生的灵魂……"}\',\'{"text":"他们--那些卓越者，为我演示这件事时我几乎要当场呕吐出来，我就看着一个村民在我的面前失去了意识，他绿色的眼睛失去光芒，他的四肢僵在原地，头颅成一个怪异的角度，表情扭曲.....\\\\n\\\\n简直不可理解！\\\\n\\\\n简直残暴透顶！\\\\n\\\\n太邪恶了....."}\',\'{"text":"如果这是自然的启示，那这算什么卓越？\\\\n\\\\n那些村民也许有时愚蠢、贪婪，但他们难道不是与我们相似的生灵么？\\\\n\\\\n那可是人类！！！\\\\n\\\\n我想把这帮自诩卓越的异端吊起来、绑在火刑架上、烧死他们、绞死他们....."}\',\'{"text":"但是我没有，说实话，我不知道为什么我没有。\\\\n\\\\n你知道，我擅长用伊里斯之策略绕过自然对真名的保护，我也曾经躲在暗处利用窃取来的真名处决了几个恶人。\\\\n\\\\n我确实是有很多机会去拯救那些被当做牲畜饲养的村民的。可是....."}\',\'{"text":"筱，我真不知道怎么解释我的行为了，我现在仍和他们住在一起，享受着法术环带来的便利。\\\\n\\\\n有的时候，我还会觉得村民的繁殖速度太低，媒质波走的太慢......\\\\n\\\\n啊......算了，我不多说了，你必能知我心，至于你将怎么看我。\\\\n\\\\n我顾不上了。"}\',\'{"text":"\\\\n罗非\\\\n某年月日"}\'],title:"中古手稿-六"}'
];

// 远古杂件 NBT 模板（按名称分类）
const CYPHER_TEMPLATES = {
  '远古杂件：丝绸之触': '{RepairCost:0,display:{Name:\'{"text":"远古杂件：丝绸之触"}\'},"hexcasting:media":600000L,"hexcasting:start_media":600000L,patterns:[{"hexcasting:data":{angles:[B;5B,4B,5B],start_dir:0b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;4B,4B],start_dir:1b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;5B,4B,5B],start_dir:0b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;0B,4B],start_dir:0b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;0B,5B,4B,4B,0B,2B,2B],start_dir:1b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;4B,5B,4B,1B,4B,5B,2B,1B,1B,0B,1B,0B,1B,1B,2B,5B],start_dir:1b},"hexcasting:type":"hexcasting:pattern"}],pigment:{owner:[I;-441552534,566969718,-1463084282,-1386170661],stack:{Count:1b,id:"hexcasting:ancient_colorizer"}},variant:VARIANT}',
  '远古杂件：提取': '{RepairCost:0,display:{Name:\'{"text":"远古杂件：提取"}\'},"hexcasting:media":300000L,"hexcasting:start_media":300000L,patterns:[{"hexcasting:data":{angles:[B;5B,4B,5B],start_dir:0b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;4B,4B],start_dir:1b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;5B,4B,5B],start_dir:0b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;0B,4B],start_dir:0b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;0B,5B,4B,4B,0B,2B,2B],start_dir:1b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;4B,5B,4B,4B,0B,0B],start_dir:2b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;5B,4B,5B,5B,5B,5B,5B,2B,1B,1B,1B,5B,1B,1B,1B],start_dir:1b},"hexcasting:type":"hexcasting:pattern"}],pigment:{owner:[I;-441552534,566969718,-1463084282,-1386170661],stack:{Count:1b,id:"hexcasting:ancient_colorizer"}},variant:VARIANT}',
  '远古杂件：驾雾': '{RepairCost:0,display:{Name:\'{"text":"远古杂件：驾雾"}\'},"hexcasting:media":1600000L,"hexcasting:start_media":1600000L,patterns:[{"hexcasting:data":{angles:[B;5B,5B,5B],start_dir:4b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;5B,4B,5B],start_dir:0b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;4B,5B,4B,4B,5B],start_dir:2b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;5B,5B,5B,5B,5B,4B,0B,0B,4B,0B,4B,0B,2B],start_dir:4b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;5B,4B,5B],start_dir:0b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;1B,1B,1B,1B,1B,5B,0B],start_dir:3b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;5B,4B,5B],start_dir:0b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;0B,4B],start_dir:0b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;0B,4B,4B,0B],start_dir:0b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;4B,0B,5B,5B,5B,0B,4B,5B,0B],start_dir:3b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;5B,5B,5B],start_dir:4b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;5B,5B,5B],start_dir:4b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;1B,1B,1B],start_dir:1b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;1B,1B,1B],start_dir:1b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;5B,0B,4B,1B,4B,0B,5B],start_dir:5b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;4B,4B,1B,4B,4B],start_dir:0b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;4B,4B,1B,4B,4B],start_dir:0b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;2B,2B,1B,0B,1B,2B,2B],start_dir:2b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;4B,4B,0B,2B,2B],start_dir:0b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;1B,2B,5B,2B,1B],start_dir:3b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;5B,5B,5B],start_dir:4b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;4B,4B,2B,4B,4B],start_dir:1b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;2B,1B,4B,5B,5B],start_dir:2b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;1B,1B,1B],start_dir:1b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;0B,4B,4B,0B],start_dir:0b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;4B,4B,2B,4B,4B],start_dir:1b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;4B,5B,4B,4B,1B,1B,1B,1B,1B,5B,1B,1B,1B,5B,1B],start_dir:2b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;5B,1B,5B,0B,5B,0B,5B,0B,5B,0B,5B,1B,5B,4B,0B,1B,5B,5B,5B,5B,5B,0B,0B,1B,1B,0B,1B,0B,1B,1B,0B,5B,2B,0B,0B,1B,0B,1B,0B,0B,1B,0B,0B,1B,0B,1B,0B,0B],start_dir:1b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;4B],start_dir:2b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;1B,1B,1B],start_dir:1b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;4B,4B,2B,4B,4B],start_dir:1b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;2B,1B,4B,5B,5B],start_dir:2b},"hexcasting:type":"hexcasting:pattern"}],pigment:{owner:[I;-441552534,566969718,-1463084282,-1386170661],stack:{Count:1b,id:"hexcasting:ancient_colorizer"}},variant:VARIANT}',
  '远古杂件：烈焰弹': '{RepairCost:0,display:{Name:\'{"text":"远古杂件：烈焰弹"}\'},"hexcasting:media":1600000L,"hexcasting:start_media":1600000L,patterns:[{"hexcasting:data":{angles:[B;5B,4B,5B],start_dir:0b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;4B,4B],start_dir:1b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;5B,4B,5B],start_dir:0b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;0B,4B],start_dir:0b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;4B,5B,4B,4B,0B,4B],start_dir:2b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;0B,4B,5B,4B,0B],start_dir:2b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;0B,4B,4B,0B],start_dir:0b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;0B,5B,5B,5B,5B,5B,0B,4B,1B,4B,1B,4B,1B,4B,1B,4B,1B],start_dir:2b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;5B,4B,5B],start_dir:0b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;0B,4B],start_dir:0b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;4B,0B,5B,5B,5B,0B,4B,5B,0B],start_dir:3b},"hexcasting:type":"hexcasting:pattern"}],pigment:{owner:[I;-441552534,566969718,-1463084282,-1386170661],stack:{Count:1b,id:"hexcasting:ancient_colorizer"}},variant:VARIANT}',
  '远古杂件：云腾': '{RepairCost:0,display:{Name:\'{"text":"远古杂件：云腾"}\'},"hexcasting:media":1600000L,"hexcasting:start_media":1600000L,patterns:[{"hexcasting:data":{angles:[B;5B,4B,5B],start_dir:0b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;5B,5B,5B,5B,5B,1B,0B],start_dir:5b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;4B,0B,5B,5B,5B,0B,4B,5B,0B],start_dir:3b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;5B,4B,5B],start_dir:0b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;4B,5B,4B,4B,0B],start_dir:2b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;5B,5B,5B,5B,5B,4B,0B,0B,4B,0B,4B,0B,2B],start_dir:4b},"hexcasting:type":"hexcasting:pattern"}],pigment:{owner:[I;-441552534,566969718,-1463084282,-1386170661],stack:{Count:1b,id:"hexcasting:ancient_colorizer"}},variant:VARIANT}',
  '远古杂件：失重': '{RepairCost:0,display:{Name:\'{"text":"远古杂件：失重"}\'},"hexcasting:media":1600000L,"hexcasting:start_media":1600000L,patterns:[{"hexcasting:data":{angles:[B;5B,4B,5B],start_dir:0b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;4B,4B],start_dir:1b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;5B,4B,5B],start_dir:0b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;0B,4B],start_dir:0b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;0B,1B,4B,5B,4B],start_dir:1b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;4B,5B,4B,4B,1B,5B],start_dir:2b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;5B,5B,5B,5B,5B,4B,0B,0B,4B,0B,4B,0B,2B],start_dir:4b},"hexcasting:type":"hexcasting:pattern"}],pigment:{owner:[I;-441552534,566969718,-1463084282,-1386170661],stack:{Count:1b,id:"hexcasting:ancient_colorizer"}},variant:VARIANT}'
};

// ==================== 辅助函数 ====================
function addVariantItems(pool, itemId, variants, weight) {
  if (weight === undefined) weight = 1;
  variants.forEach(v => pool.addItem(Item.of(itemId, `{variant:${v}}`)).weight(weight));
}

function addCypherVariants(pool, displayName, weight) {
  if (weight === undefined) weight = 1;
  const template = CYPHER_TEMPLATES[displayName];
  if (!template) return;
  VARIANTS.forEach(v => {
    const nbt = template.replace('VARIANT', v);
    pool.addItem(Item.of('hexcasting:ancient_cypher', nbt)).weight(weight);
  });
}

function addBooks(pool) {
  BOOKS.forEach(bookNbt => pool.addItem(Item.of('minecraft:written_book', bookNbt)).weight(1));
}

function addAmethystArmor(pool) {
  ['helmet', 'chestplate', 'leggings', 'boots'].forEach(piece => {
    pool.addItem(Item.of(`hexchanting:amethyst_${piece}`, '{Damage:0}')).weight(1);
  });
}
// ==================== 战利品表修改 ====================
ServerEvents.chestLootTables(event => {
  // 废弃矿井
  event.modify('abandoned_mineshaft', loot => {
    loot.addPool(pool => {
      addCypherVariants(pool, '远古杂件：丝绸之触');
      addCypherVariants(pool, '远古杂件：提取');
    });
  });

  // 远古城市
  event.modify('ancient_city', loot => {
    loot.addPool(pool => {
      addAmethystArmor(pool);
      addVariantItems(pool, 'hexcasting:focus', VARIANTS);
      addVariantItems(pool, 'hexcasting:artifact', VARIANTS);
      addCypherVariants(pool, '远古杂件：驾雾');
    });
  });

  // 堡垒桥梁
  event.modify('bastion_bridge', loot => {
    loot.addPool(pool => {
      addAmethystArmor(pool);
      addVariantItems(pool, 'hexcasting:artifact', VARIANTS);
    });
  });

  // 废弃传送门
  event.modify('ruined_portal', loot => {
    loot.addPool(pool => {
      addCypherVariants(pool, '远古杂件：烈焰弹');
    });
  });

  // 地牢
  event.modify('simple_dungeon', loot => {
    loot.addPool(pool => {
      addCypherVariants(pool, '远古杂件：烈焰弹');
      addCypherVariants(pool, '远古杂件：失重');
      addCypherVariants(pool, '远古杂件：驾雾');
      addBooks(pool)
    });
  });

  // 沉船宝藏
  event.modify('shipwreck_treasure', loot => {
    loot.addPool(pool => {
      addCypherVariants(pool, '远古杂件：云腾');
    });
  });

  // 埋藏的宝藏
  event.modify('buried_treasure', loot => {
    loot.addPool(pool => {
      // 守护进程：颂我真名
      VARIANTS.forEach(v => {
        pool.addItem(Item.of('hexcasting:focus', `{RepairCost:0,data:{"hexcasting:data":[{"hexcasting:data":{angles:[B;5B,5B,5B],start_dir:4b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;5B,4B,5B],start_dir:0b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;2B,1B],start_dir:0b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;4B],start_dir:2b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;5B,5B,5B],start_dir:4b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;5B,5B,5B],start_dir:4b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;1B,1B,1B],start_dir:1b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;1B,1B,1B],start_dir:1b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;5B,0B,4B,1B,4B,0B,5B],start_dir:5b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;4B,4B,1B,4B,4B],start_dir:0b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;4B,4B,1B,4B,4B],start_dir:0b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;2B,2B,1B,0B,1B,2B,2B],start_dir:2b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;4B,4B,0B,2B,2B],start_dir:0b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;1B,2B,5B,2B,1B],start_dir:3b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;5B,5B,5B],start_dir:4b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;4B,4B,2B,4B,4B],start_dir:1b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;2B,1B,4B,5B,5B],start_dir:2b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;1B,1B,1B],start_dir:1b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;0B,4B,4B,0B],start_dir:0b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;4B,4B,2B,4B,4B],start_dir:1b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;4B,5B,4B,4B,0B],start_dir:2b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;5B,1B,5B,0B,5B,0B,5B,0B,5B,0B,5B,1B,5B,4B,0B,1B,5B,5B,5B,5B,5B,0B,0B,1B,1B,0B,1B,0B,1B,1B,0B,5B,2B,0B,0B,1B,0B,1B,0B,0B,1B,0B,0B,1B,0B,1B,0B,0B],start_dir:1b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;4B],start_dir:2b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;1B,1B,1B],start_dir:1b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;4B,4B,2B,4B,4B],start_dir:1b},"hexcasting:type":"hexcasting:pattern"},{"hexcasting:data":{angles:[B;2B,1B,4B,5B,5B],start_dir:2b},"hexcasting:type":"hexcasting:pattern"}],"hexcasting:type":"hexcasting:list"},display:{Name:\'{"text":"守护进程：颂我真名"}\'},variant:${v}}`)).weight(1);
      });
      addCypherVariants(pool, '远古杂件：云腾');
      addCypherVariants(pool, '远古杂件：驾雾');
      addBooks(pool);
    });
  });

  // 要塞图书馆
  event.modify('stronghold_library', loot => {
    loot.addPool(pool => addBooks(pool));
  });

  // 沉船地图箱
  event.modify('shipwreck_map', loot => {
    loot.addPool(pool => addBooks(pool));
  });

  // 主世界废环
  event.modify('ruined_circles_overworld', loot => {
    loot.addPool(pool => addBooks(pool));
    loot.addPool(pool => {
      ['directrix/empty', 'impetus/empty', 'impetus/rightclick', 'impetus/redstone', 'impetus/look', 'directrix/redstone', 'directrix/boolean'].forEach(id => {
        pool.addItem(`hexcasting:${id}`).weight(1);
      });
    });
    loot.addPool(pool => {
      ['slate_block', 'quenched_allay_shard', 'charged_amethyst', 'slate'].forEach(id => pool.addItem(`hexcasting:${id}`).weight(1));
      
    });
  });

  // 下界废环
  event.modify('ruined_circles_nether', loot => {
    loot.addPool(
    pool=>{

    ['slate_block', 'quenched_allay_shard', 'charged_amethyst', 'slate'].forEach(id => pool.addItem(`hexcasting:${id}`).weight(1))}
);

  });

  // 废墟
  event.modify('ruined_circles_shulk', loot => {
    loot.addPool(pool => addBooks(pool));
    loot.addPool(pool => addAmethystArmor(pool));
    loot.addPool(pool => addVariantItems(pool, 'hexcasting:focus', VARIANTS));
    loot.addPool(pool => addVariantItems(pool, 'hexcasting:artifact', VARIANTS));
    loot.addPool(pool => addCypherVariants(pool, '远古杂件：驾雾'));
    loot.addPool(pool => addCypherVariants(pool, '远古杂件：云腾'));
    loot.addPool(pool => addCypherVariants(pool, '远古杂件：丝绸之触'));
    loot.addPool(pool => addCypherVariants(pool, '远古杂件：提取'));
  });

  // 废弃阿卡夏
  event.modify('abadoned_akasha', loot => {
    loot.addPool(pool => {
      pool.addItem('hexdebug:evaluator').weight(1);
      pool.addItem(Item.of('hexdebug:debugger').enchant('minecraft:bane_of_arthropods', 1)).weight(1);
      pool.addItem(Item.of('hexcasting:scroll', '{op_id:"hexcasting:brainsweep"}')).weight(1);
      pool.addItem('hexcasting:quenched_allay_shard').weight(1);
      pool.addItem('hexcasting:slate').weight(1);
      pool.addItem('hexcasting:slate_block').weight(1);
    });
    loot.addPool(pool => {
      pool.addItem('hexcasting:slate_block').weight(1);
      pool.addItem('minecraft:air').weight(1);
      pool.addItem('minecraft:air').weight(1);
    });
    loot.addPool(pool => {
      addVariantItems(pool, 'hexcasting:focus', VARIANTS);
      addVariantItems(pool, 'hexcasting:trinket', VARIANTS);
      pool.addItem('minecraft:air').weight(1);
      pool.addItem('minecraft:air').weight(1);
    });
    loot.addPool(pool => addBooks(pool));
    loot.addPool(pool => {
      pool.addItem('#hexcasting:staves').weight(1);
      pool.addItem('minecraft:air').weight(1);
      pool.addItem('minecraft:air').weight(1);
    });
    loot.addPool(pool => {
      pool.addItem("@hexpigmentplus").weight(1);
      pool.addItem(Item.of('hexcasting:jeweler_hammer', '{Damage:0}')).weight(1);
      pool.addItem(Item.of('hexcasting:jeweler_hammer', '{Damage:1000}')).weight(1);
      pool.addItem(Item.of('hexcasting:jeweler_hammer', '{Damage:500}')).weight(1);
      pool.addItem(Item.of('hexical:media_jar', '{BlockEntityTag:{media:6400000L}}')).weight(1);
    });
    // 多个紫水晶粉/充能紫水晶池
    for (let i = 0; i < 4; i++) {
      loot.addPool(pool => {
        pool.addItem('hexcasting:amethyst_dust').weight(1);
        pool.addItem('hexcasting:charged_amethyst').weight(1);
        if (i % 2 === 0) pool.addItem('minecraft:air').weight(1); // 模拟原脚本随机 air
      });
    }
    loot.addPool(pool => {
      pool.addItem('hexcasting:amethyst_dust').weight(1);
      pool.addItem('hexcasting:charged_amethyst').weight(1);
      pool.addItem('hexical:plush_hexxy').weight(1);
      pool.addItem('hexical:plush_irissy').weight(1);
      pool.addItem('hexical:plush_pentxxy').weight(1);
      pool.addItem('hexical:plush_quadxxy').weight(1);
      pool.addItem('hexical:plush_thothy').weight(1);
    });
    loot.addPool(pool => {
      pool.addItem('hexcasting:quenched_allay_tiles').weight(1);
      pool.addItem('hexcasting:quenched_allay_bricks').weight(1);
      pool.addItem('minecraft:air').weight(1);
      pool.addItem(Item.of('hexcasting:battery', '{"hexcasting:media":6400000L,"hexcasting:start_media":6400000L}')).weight(1);
      pool.addItem(Item.of('hexcasting:battery', '{"hexcasting:media":6400000L,"hexcasting:start_media":64000000L}')).weight(1);
      pool.addItem('minecraft:air').weight(1);
      pool.addItem('@hex_machina').weight(1);
    });
    loot.addPool(pool => {
      addVariantItems(pool, 'hexcasting:focus', VARIANTS);
      addVariantItems(pool, 'hexcasting:artifact', VARIANTS);
      addCypherVariants(pool, '远古杂件：驾雾');
      addCypherVariants(pool, '远古杂件：云腾');
      addCypherVariants(pool, '远古杂件：丝绸之触');
      addCypherVariants(pool, '远古杂件：提取');
    });
  });

  // 废弃伟大工程房间
  event.modify('abadoned_greatwork_room', loot => {
     loot.addPool(pool => addBooks(pool));
    loot.addPool(pool => {
      pool.addItem('#hexcasting:staves').weight(1);
      pool.addItem('minecraft:air').weight(1);
      pool.addItem('minecraft:air').weight(1);
    });
    loot.addPool(pool => {
      pool.addItem("@hexpigmentplus").weight(1);
      pool.addItem(Item.of('hexcasting:jeweler_hammer', '{Damage:0}')).weight(1);
      pool.addItem(Item.of('hexcasting:jeweler_hammer', '{Damage:1000}')).weight(1);
      pool.addItem(Item.of('hexcasting:jeweler_hammer', '{Damage:500}')).weight(1);
      pool.addItem(Item.of('hexical:media_jar', '{BlockEntityTag:{media:6400000L}}')).weight(1);
    });
    // 多个紫水晶粉/充能紫水晶池
    for (let i = 0; i < 4; i++) {
      loot.addPool(pool => {
        pool.addItem('hexcasting:amethyst_dust').weight(1);
        pool.addItem('hexcasting:charged_amethyst').weight(1);
        if (i % 2 === 0) pool.addItem('minecraft:air').weight(1); // 模拟原脚本随机 air
      });
    }
    loot.addPool(pool => {
      pool.addItem('hexcasting:amethyst_dust').weight(1);
      pool.addItem('hexcasting:charged_amethyst').weight(1);
      pool.addItem('hexical:plush_hexxy').weight(1);
      pool.addItem('hexical:plush_irissy').weight(1);
      pool.addItem('hexical:plush_pentxxy').weight(1);
      pool.addItem('hexical:plush_quadxxy').weight(1);
      pool.addItem('hexical:plush_thothy').weight(1);
    });
    loot.addPool(pool => {
      pool.addItem('hexcasting:quenched_allay_tiles').weight(1);
      pool.addItem('hexcasting:quenched_allay_bricks').weight(1);
      pool.addItem('minecraft:air').weight(1);
      pool.addItem(Item.of('hexcasting:battery', '{"hexcasting:media":6400000L,"hexcasting:start_media":6400000L}')).weight(1);
      pool.addItem(Item.of('hexcasting:battery', '{"hexcasting:media":6400000L,"hexcasting:start_media":64000000L}')).weight(1);
      pool.addItem('minecraft:air').weight(1);
      pool.addItem('@hex_machina').weight(1);
    });
    loot.addPool(pool => {
      addVariantItems(pool, 'hexcasting:focus', VARIANTS);
      addVariantItems(pool, 'hexcasting:artifact', VARIANTS);
      addCypherVariants(pool, '远古杂件：驾雾');
      addCypherVariants(pool, '远古杂件：云腾');
      addCypherVariants(pool, '远古杂件：丝绸之触');
      addCypherVariants(pool, '远古杂件：提取');
    });
  });
});
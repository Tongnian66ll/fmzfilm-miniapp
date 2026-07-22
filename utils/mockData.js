// 默认案例数据 - 基于简历所有拍摄项目
const cases = [
  {
    _id: 'case-xishi',
    title: '西施笑 · 院线电影',
    category: '电影',
    coverUrl: '/images/case-xishi.webp',
    images: ['/images/case-xishi.webp'],
    description: '院线电影《西施笑》，与刘佩琦、佟晨洁及导演周浩晖团队合作，担任执行灯光师，负责全片灯光设计与现场执行。深入理解影视工业级制作流程。',
    tags: ['院线电影', '灯光设计', '古装'],
    year: 2024,
    duration: '120分钟',
    role: '执行灯光师'
  },
  {
    _id: 'case-changan',
    title: '长安汽车览拓者 · 品牌TVC',
    category: 'TVC',
    coverUrl: '/images/case-feiyipu.webp',
    images: ['/images/case-feiyipu.webp'],
    description: '为长安汽车览拓者系列打造品牌TVC广告，从客户需求拆解、创意提案到拍摄执行与成片交付，独立把控商业项目全流程。',
    tags: ['TVC', '汽车品牌', '商业广告'],
    year: 2025,
    duration: '60秒',
    role: '导演/编导'
  },
  {
    _id: 'case-maxus',
    title: '上汽大通牛魔王 · 品牌TVC',
    category: 'TVC',
    coverUrl: '/images/case-guangying.webp',
    images: ['/images/case-guangying.webp'],
    description: '上汽大通牛魔王系列广告片，电影级画面质感与精准品牌表达，展现产品力量感与商业价值。',
    tags: ['TVC', '汽车品牌', '商业广告'],
    year: 2025,
    duration: '60秒',
    role: '导演/编导'
  },
  {
    _id: 'case-tcl',
    title: 'TCL"冰麒麟" · AI创意片',
    category: 'AIGC',
    coverUrl: '/images/case-polaroid.webp',
    images: ['/images/case-polaroid.webp'],
    description: 'TCL"冰麒麟"AI创意广告片，从概念策划到成片输出，完整实践AI辅助视频生产全流程，使用Seedance等主流AIGC工具。',
    tags: ['AIGC', 'AI短片', '品牌广告'],
    year: 2025,
    duration: '30秒',
    role: '导演/AI制作'
  },
  {
    _id: 'case-zhonghai',
    title: '中海地产 · 系列宣传片',
    category: '宣传片',
    coverUrl: '/images/case-nanjing.webp',
    images: ['/images/case-nanjing.webp'],
    description: '为中海地产制作系列品牌宣传片，展现地产品质与生活方式，兼具人文表达与商业质感。',
    tags: ['地产', '品牌宣传', '系列片'],
    year: 2025,
    duration: '3分钟',
    role: '导演/摄影'
  },
  {
    _id: 'case-huangshan',
    title: '黄山帐篷客酒店 · 宣传片',
    category: '宣传片',
    coverUrl: '/images/case-reflection.webp',
    images: ['/images/case-reflection.webp'],
    description: '黄山帐篷客酒店度假体验宣传片，以视觉叙事展现自然之美与度假生活方式。',
    tags: ['文旅', '酒店', '宣传片'],
    year: 2025,
    duration: '2分钟',
    role: '导演/摄影'
  },
  {
    _id: 'case-jinxiu',
    title: '锦绣建邺·龙腾新春 · AI短片',
    category: 'AIGC',
    coverUrl: '/images/case-xishi.webp',
    images: ['/images/case-xishi.webp'],
    description: '南京建邺区新年宣传AI短片"锦绣建邺·龙腾新春"，实现AI生成与专业影视质感融合，展示城市文化魅力。',
    tags: ['AIGC', '城市宣传', 'AI短片'],
    year: 2025,
    duration: '1分钟',
    role: '导演/AI制作'
  },
  {
    _id: 'case-qianting',
    title: '夜晚的潜水艇 · 独立短片',
    category: '短片',
    coverUrl: '/images/case-guangying.webp',
    images: ['/images/case-guangying.webp'],
    description: '独立短片《夜晚的潜水艇》，使用Seedance 2.0完成6个AI生成镜头与2段AI转绘段落。投稿金鸡海峡两岸暨港澳青年短片季。',
    tags: ['独立短片', 'AIGC', 'AI转绘'],
    year: 2025,
    duration: '15分钟',
    role: '导演/编剧/AI制作'
  },
  {
    _id: 'case-sihai',
    title: '四海为门 · 独立短片',
    category: '短片',
    coverUrl: '/images/case-feiyipu.webp',
    images: ['/images/case-feiyipu.webp'],
    description: '独立执导短片，探索人文关怀与影像表达的融合，入围多个国际短片节。',
    tags: ['独立短片', '人文', '现实题材'],
    year: 2024,
    duration: '12分钟',
    role: '导演/编剧/剪辑'
  },
  {
    _id: 'case-dongri',
    title: '当冬日渐暖 · 独立短片',
    category: '短片',
    coverUrl: '/images/case-nanjing.webp',
    images: ['/images/case-nanjing.webp'],
    description: '关注女性议题的现实题材短片，以细腻镜头语言捕捉人物内心变化。',
    tags: ['独立短片', '女性议题', '现实题材'],
    year: 2024,
    duration: '15分钟',
    role: '导演/编剧/摄影'
  },
  {
    _id: 'case-zhenxin',
    title: '真心半解 · 独立短片',
    category: '短片',
    coverUrl: '/images/case-polaroid.webp',
    images: ['/images/case-polaroid.webp'],
    description: '青春情感题材短片，入围多个国际电影节，探索年轻一代的情感表达。',
    tags: ['独立短片', '青春', '情感'],
    year: 2024,
    duration: '10分钟',
    role: '导演/编剧/剪辑'
  },
  {
    _id: 'case-laogai',
    title: '老街新巷 · 纪录短片',
    category: '纪录片',
    coverUrl: '/images/case-reflection.webp',
    images: ['/images/case-reflection.webp'],
    description: '人文纪录短片，记录城市老街巷的变迁与居民生活，以镜头留住城市记忆。',
    tags: ['纪录片', '人文', '城市'],
    year: 2024,
    duration: '8分钟',
    role: '导演/摄影/剪辑'
  },
  {
    _id: 'case-wugui',
    title: '无归 · 独立短片',
    category: '短片',
    coverUrl: '/images/case-xishi.webp',
    images: ['/images/case-xishi.webp'],
    description: '现实题材独立短片，探讨归乡与离别的主题，入围洛杉矶短片国际电影节。',
    tags: ['独立短片', '现实', '电影节入围'],
    year: 2024,
    duration: '18分钟',
    role: '导演/编剧'
  },
  {
    _id: 'case-zaijian',
    title: '再见面包车 · 独立短片',
    category: '短片',
    coverUrl: '/images/case-feiyipu.webp',
    images: ['/images/case-feiyipu.webp'],
    description: '以面包车为线索的公路题材短片，入围罗马棱镜电影节最佳影片单元。',
    tags: ['独立短片', '公路', '电影节入围'],
    year: 2024,
    duration: '12分钟',
    role: '导演/编剧/摄影'
  },
  {
    _id: 'case-tianjiang',
    title: '天降横财 · 互动影游',
    category: '互动影游',
    coverUrl: '/images/case-guangying.webp',
    images: ['/images/case-guangying.webp'],
    description: '互动影游《天降横财》，参与灯光组，熟悉互动叙事模式与快节奏拍摄流程。',
    tags: ['互动影游', '灯光', '商业'],
    year: 2024,
    duration: '60分钟',
    role: '灯光组'
  },
  {
    _id: 'case-lihun',
    title: '离婚之后 · 短剧',
    category: '短剧',
    coverUrl: '/images/case-nanjing.webp',
    images: ['/images/case-nanjing.webp'],
    description: '短剧《离婚之后》，参与拍摄制作，熟悉短剧制作流程与快节奏拍摄模式。',
    tags: ['短剧', '拍摄', '商业'],
    year: 2024,
    duration: '多集',
    role: '摄影/灯光'
  },
  {
    _id: 'case-youman',
    title: '优漫卡通卫视 · 综艺拍摄',
    category: '综艺',
    coverUrl: '/images/case-polaroid.webp',
    images: ['/images/case-polaroid.webp'],
    description: '江苏广播电视集团优漫卡通卫视儿童综艺节目，负责外勤拍摄统筹与后期剪辑。',
    tags: ['综艺', '江苏广电', '拍摄统筹'],
    year: 2023,
    duration: '多期',
    role: '摄影/统筹'
  }
]

// 报价配置 - 每个服务有独立的附加服务和定价规则
const quoteConfig = {
  // 所有可用附加服务（按ID索引）
  allAddons: {
    'drone':      { id: 'drone',   name: '航拍',       price: 800,  unit: '次', pricingType: 'fixed' },
    'script':     { id: 'script',  name: '脚本策划',   price: 1500, unit: '项', pricingType: 'fixed' },
    'actor':      { id: 'actor',   name: '演员',       price: 1500, unit: '人', pricingType: 'fixed' },
    'ad-monitor': { id: 'ad-monitor', name: '投流盯盘', price: 500, unit: '月', pricingType: 'perQuantity', note: '投流花费实报实销' },
    'photo-live': { id: 'photo-live', name: '图片直播', price: 600, unit: '次', pricingType: 'fixed' },
    'video-edit': { id: 'video-edit', name: '视频剪辑', price: 200, unit: '分钟', pricingType: 'perAddonQty' },
    'extra-actor':{ id: 'extra-actor', name: '额外演员', price: 500, unit: '人/天', pricingType: 'threshold', threshold: 5, note: '超过5人，每多1人+500/天' },
    'extra-scene':{ id: 'extra-scene', name: '额外场景', price: 800, unit: '个/天', pricingType: 'threshold', threshold: 4, note: '超过4个，每多1个+800/天' },
    'vfx':        { id: 'vfx',     name: '后期特效',   price: 0,   unit: '项', pricingType: 'custom', note: '费用另算' },
    'orig-music': { id: 'orig-music', name: '原创音乐', price: 120, unit: '分钟', pricingType: 'perAddonQty' }
  },
  // 每个服务对应的附加服务ID列表
  serviceAddons: {
    'propaganda':  ['drone', 'script', 'actor'],
    'tvc':         ['drone', 'script', 'actor'],
    'short-video': ['ad-monitor'],
    'event':       ['photo-live', 'video-edit'],
    'short-film':  ['extra-actor', 'extra-scene', 'vfx', 'orig-music']
  },
  // 服务列表
  services: [
    {
      id: 'propaganda',
      name: '宣传片',
      icon: '🎬',
      description: '企业宣传片、城市宣传片、产品宣传片',
      basePrice: 6000,
      priceLabel: '¥6000起',
      unitLabel: '1分钟',
      configType: 'duration',
      durationLabel: '时长（分钟）',
      durationUnit: '分钟',
      durationMin: 1
    },
    {
      id: 'tvc',
      name: 'TVC广告',
      icon: '📺',
      description: '品牌TVC、产品广告、信息流广告',
      basePrice: 8000,
      priceLabel: '¥8000起',
      unitLabel: '1分钟',
      configType: 'duration',
      durationLabel: '时长（分钟）',
      durationUnit: '分钟',
      durationMin: 1
    },
    {
      id: 'short-video',
      name: '短视频代运营',
      icon: '📱',
      description: '账号运营、内容策划、拍摄剪辑',
      basePrice: 1999,
      priceLabel: '¥1999起',
      unitLabel: '月',
      configType: 'plan',
      plans: [
        { id: 'monthly',    name: '月度套餐', price: 1999, unit: '月', desc: '20条信息流拍剪 或 40条纯剪辑' },
        { id: 'half-year',  name: '半年套餐', price: 1500, unit: '月', desc: '一次下单6个月' },
        { id: 'yearly',     name: '包年套餐', price: 1299, unit: '月', desc: '一次性包年' }
      ]
    },
    {
      id: 'event',
      name: '活动纪录',
      icon: '📹',
      description: '会议纪录、活动直播、展会拍摄',
      basePrice: 800,
      priceLabel: '¥800起',
      unitLabel: '4小时',
      configType: 'durationToggle',
      durationOptions: [
        { id: 'half', name: '4小时', price: 800 },
        { id: 'full', name: '一天(8h)', price: 1600 }
      ]
    },
    {
      id: 'short-film',
      name: '短片/微电影',
      icon: '🎥',
      description: '品牌微电影、故事短片、创意短片',
      basePrice: 8000,
      priceLabel: '¥8000起',
      unitLabel: '5分钟内',
      configType: 'duration',
      durationLabel: '时长（分钟）',
      durationUnit: '分钟',
      durationMin: 1
    }
  ]
}

module.exports = { cases, quoteConfig }

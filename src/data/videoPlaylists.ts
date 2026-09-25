export interface VideoPlaylist {
  id: string;
  title: string;
  subtitle: string;
  category: 'tianji' | 'renji';
  categoryLabel: string;
  totalEpisodes: string;
  url: string;
  coverBadge: string;
  coreTopics: string[];
  description: string;
  recommendedKeyMoments: { episode: string; title: string; focus: string }[];
}

export const videoPlaylistsData: VideoPlaylist[] = [
  {
    id: 'tianji-83',
    title: '倪海廈《天紀》高清重制完整版',
    subtitle: '紫微斗數、易經推命、陽宅堪輿集大成之作',
    category: 'tianji',
    categoryLabel: '天紀本源',
    totalEpisodes: '全 83 集完整版',
    url: 'https://www.youtube.com/playlist?list=PLLUE1tBkV8HZ3FxUNpbLX2FedJn7IkZ78',
    coverBadge: '天紀全集',
    coreTopics: ['紫微斗數十二宮坐星', '四化飛星動態連動', '易經六十四卦天機道與人間道', '陽宅名位相符六十四卦'],
    description: '倪師於美國佛羅里達州所傳授之《天紀》經典影音。從紫微星性排盤、吉凶賦文大破除，到易經六十四卦象數直觀取象，最後融貫陽宅名位相符空間學，是掌握倪氏天人地三才之天紀核心教材。',
    recommendedKeyMoments: [
      { episode: '第 1-5 集', title: '紫微斗數開宗明義與星性本質', focus: '去繁就簡，獨尊主星與大格局氣象' },
      { episode: '第 15-25 集', title: '三方四正與大限流年時空節奏', focus: '大限四化流轉，順勢而為之決策模型' },
      { episode: '第 35-55 集', title: '易經六十四卦象數與人間道精解', focus: '天機道、人間道與地脈道三位一體' },
      { episode: '第 65-83 集', title: '陽宅名位相符與室內八卦佈局', focus: '換房入住，重塑家庭角色與心理秩序' }
    ]
  },
  {
    id: 'tianji-series',
    title: '倪海廈《天紀系列》紫微斗數與易經象數',
    subtitle: '高畫質專題精選與星曜象數實戰演繹',
    category: 'tianji',
    categoryLabel: '天紀專題',
    totalEpisodes: '專題全集',
    url: 'https://www.youtube.com/playlist?list=PLJLMwgnHzrgRKP6-RfG20p9Ikto0ODiwD',
    coverBadge: '斗數象數',
    coreTopics: ['巨日格/日照雷門格局', '殺破狼破局與開創', '婚姻福德連動看破局點', '直觀物象卜筮心法'],
    description: '聚焦於《天紀》中紫微斗數實戰案例解盤與易經象數推演之高清專題。詳細解構十四主星人格原型、夫妻宮溝通盲區與事業舞台媒合，適合進階案例研習。',
    recommendedKeyMoments: [
      { episode: '專題精選', title: '經典格局白話剖析', focus: '破除凶煞迷信，回歸人格原型' },
      { episode: '專題精選', title: '婚姻感情與夫妻宮解法', focus: '性格互斥而非命格相剋，先調陽宅名位' },
      { episode: '專題精選', title: '易經象數動態決策', focus: '知常達變，處處皆易經' }
    ]
  },
  {
    id: 'renji-neijing',
    title: '倪海廈《人紀》第一部：黃帝內經',
    subtitle: '中醫生理病理聖經，三才之「人紀」根基',
    category: 'renji',
    categoryLabel: '人紀醫道',
    totalEpisodes: '字幕精修版',
    url: 'https://www.youtube.com/playlist?list=PLCIgQ263uvSqvpOLvdDFiWhh0zxUIwZo4',
    coverBadge: '內經心法',
    coreTopics: ['法於陰陽、和於術數', '情志致病（怒傷肝/恐傷腎）', '五臟藏象與四時節律', '破除術數恐慌的生理學基石'],
    description: '《黃帝內經》乃中醫之靈魂。倪師以大白話講授素問、靈樞，指出人體身心互根。「情志致病」更直接打破傳統算命術士藉由恐懼導致心理生病的惡性循環，是掌握「人紀」自律與養生的第一堂課。',
    recommendedKeyMoments: [
      { episode: '篇章精解', title: '上古天真論與四氣調神大論', focus: '跟隨四季作息，保持心神恬淡虛無' },
      { episode: '篇章精解', title: '陰陽應象大論', focus: '天地之陰陽即人身之陰陽，物極必反' },
      { episode: '篇章精解', title: '臟氣法時與情志五行', focus: '怒傷肝、喜傷心、思傷脾、憂傷肺、恐傷腎' }
    ]
  },
  {
    id: 'renji-zhenjiu',
    title: '倪海廈《人紀》第二部：針灸大成',
    subtitle: '十二經絡循行、氣血流注與急救神針',
    category: 'renji',
    categoryLabel: '人紀醫道',
    totalEpisodes: '全 79 集字幕版',
    url: 'https://www.youtube.com/playlist?list=PLQ33RUHS6fhs4ETfO1CcjS5AmjasNxZVA',
    coverBadge: '經絡針灸',
    coreTopics: ['十二經絡循行起止', '子午流注與氣血鐘錶', '十總穴與急救要穴', '身心通暢與自我保健'],
    description: '倪師傳承正統中醫針灸精粹。詳細講授人體十二經絡、任督二脈、奇經八脈與各重要穴位之定位主治。明白經絡循行即明白身體的能量通路，是人紀自律保健的實操指南。',
    recommendedKeyMoments: [
      { episode: '第 1-10 集', title: '針灸總論與急救大穴', focus: '人中、十宣、百會等緊急甦醒要法' },
      { episode: '第 15-30 集', title: '手足三陽三陰經絡精解', focus: '肺經、大腸經、胃經等循行與日常調理' },
      { episode: '第 45-60 集', title: '任督二脈與子午流注', focus: '配合一天十二時辰氣血流注的生活作息法' }
    ]
  },
  {
    id: 'renji-bencao',
    title: '倪海廈《人紀》第三部：神農本草經',
    subtitle: '本草藥性陰陽、扶正祛邪之生命智慧',
    category: 'renji',
    categoryLabel: '人紀醫道',
    totalEpisodes: '全 68 集完整版',
    url: 'https://www.youtube.com/playlist?list=PLLUE1tBkV8Hag-xMmhXhsHo1Af5rRp7Qc',
    coverBadge: '神農本草',
    coreTopics: ['上藥養命、中藥養性、下藥治病', '動植物偏性與糾偏哲學', '君臣佐使與整體配伍', '扶正固本以禦外邪'],
    description: '倪師闡述中藥乃天地造化之物，以天然本草之氣味性涼溫熱寒，糾正人體臟腑之失衡。強調「陽氣存則生機在」，教導研習者認識草本大自然之智慧，遠離化學濫用與抗生素恐慌。',
    recommendedKeyMoments: [
      { episode: '第 1-8 集', title: '本草序例與三品分類法則', focus: '無毒上品多服久服輕身延年之真諦' },
      { episode: '第 20-35 集', title: '關鍵溫陽與補氣草本精析', focus: '附子、乾薑、黃耆、人參之陰陽虛實運用' },
      { episode: '第 40-55 集', title: '祛濕化痰通絡本草精析', focus: '清理體內垃圾，恢復氣血通道之順暢' }
    ]
  }
];

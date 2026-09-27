import React, { useState, useMemo } from 'react';
import { Compass, Shield, Sparkles, Layers, Target, HelpCircle, Sun, Moon, AlertTriangle, UserCheck, Clock, Check } from 'lucide-react';
import { Solar } from 'lunar-javascript';

interface PalaceData {
  earthBranch: string; // 地支：子、丑、寅、卯...
  heavenlyStem: string; // 宮干
  name: string; // 命宮、兄弟、夫妻...
  isLifePalace: boolean;
  isBodyPalace: boolean;
  mainStars: string[];
  minorStars: string[];
  sihua: string[];
  ageRange: string;
  feynmanMeaning: string;
  niAdvice: string;
}

export const ZiweiChart: React.FC<{ onNavigateToPhilosophy?: () => void }> = ({ onNavigateToPhilosophy }) => {
  // 曆法類型：國曆 (公曆/西曆) vs 農曆 (陰曆)
  const [calendarType, setCalendarType] = useState<'solar' | 'lunar'>('solar');

  // 國曆年月日
  const [solarYear, setSolarYear] = useState<number>(1990);
  const [solarMonth, setSolarMonth] = useState<number>(5);
  const [solarDay, setSolarDay] = useState<number>(15);

  // 農曆年月日 (直接輸入模式)
  const [lunarYearInput, setLunarYearInput] = useState<number>(1990);
  const [lunarMonthInput, setLunarMonthInput] = useState<number>(4);
  const [lunarDayInput, setLunarDayInput] = useState<number>(21);

  // 出生時辰 (0=子, 1=丑... 6=午, -1=未知)
  const [hourBranch, setHourBranch] = useState<number>(6);
  const [isHourUnknown, setIsHourUnknown] = useState<boolean>(false);

  // 睡姿/旋毛定時辰輔助狀態
  const [sleepPoseChoice, setSleepPoseChoice] = useState<string>('');
  const [hairVortexChoice, setHairVortexChoice] = useState<string>('');

  const [gender, setGender] = useState<'M' | 'F'>('M');
  const [selectedPalaceIdx, setSelectedPalaceIdx] = useState<number>(0);
  const [activeReportTab, setActiveReportTab] = useState<'overall' | 'selected' | 'unknown-guide'>('overall');

  const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
  const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  const hourNames = [
    '子時 (23:00 - 01:00)',
    '丑時 (01:00 - 03:00)',
    '寅時 (03:00 - 05:00)',
    '卯時 (05:00 - 07:00)',
    '辰時 (07:00 - 09:00)',
    '巳時 (09:00 - 11:00)',
    '午時 (11:00 - 13:00)',
    '未時 (13:00 - 15:00)',
    '申時 (15:00 - 17:00)',
    '酉時 (17:00 - 19:00)',
    '戌時 (19:00 - 21:00)',
    '亥時 (21:00 - 23:00)',
  ];

  // 倪師《天紀·天機道聽課筆記》地支對應十二經絡臟腑口訣：
  // 「肺寅大卯胃辰宮，脾巳心午小未中，申胱酉腎心包戌，亥焦子膽丑肝通」
  const BRANCH_ORGAN_MAP: Record<string, string> = {
    '子': '膽', '丑': '肝', '寅': '肺', '卯': '大腸',
    '辰': '胃', '巳': '脾', '午': '心', '未': '小腸',
    '申': '膀胱', '酉': '腎', '戌': '心包', '亥': '三焦'
  };

  // 計算實際排盤所使用的農曆年、月、日與國農曆對照資訊
  const dateInfo = useMemo(() => {
    if (calendarType === 'solar') {
      try {
        const solar = Solar.fromYmd(solarYear, solarMonth, solarDay);
        const lunar = solar.getLunar();
        return {
          year: lunar.getYear(),
          month: Math.abs(lunar.getMonth()),
          day: lunar.getDay(),
          yearGanZhi: lunar.getYearInGanZhi(),
          displayStr: `國曆 ${solarYear}年${solarMonth}月${solarDay}日 ➜ 自動轉為農曆【${lunar.getYearInGanZhi()}年 ${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}】`,
          isLeapMonth: lunar.getMonth() < 0
        };
      } catch {
        return {
          year: 1990, month: 4, day: 21, yearGanZhi: '庚午',
          displayStr: '日期轉換中...', isLeapMonth: false
        };
      }
    } else {
      const yearStemIdx = (lunarYearInput - 4) % 10;
      const yStem = heavenlyStems[yearStemIdx >= 0 ? yearStemIdx : yearStemIdx + 10];
      const yearBranchIdx = (lunarYearInput - 4) % 12;
      const yBranch = earthlyBranches[yearBranchIdx >= 0 ? yearBranchIdx : yearBranchIdx + 12];
      return {
        year: lunarYearInput,
        month: lunarMonthInput,
        day: lunarDayInput,
        yearGanZhi: `${yStem}${yBranch}`,
        displayStr: `農曆【${yStem}${yBranch}年 ${lunarMonthInput}月${lunarDayInput}日】`,
        isLeapMonth: false
      };
    }
  }, [calendarType, solarYear, solarMonth, solarDay, lunarYearInput, lunarMonthInput, lunarDayInput]);

  const year = dateInfo.year;
  const month = dateInfo.month;
  const day = dateInfo.day;

  // 年干計算
  const yearStemIdx = (year - 4) % 10;
  const yearStem = heavenlyStems[yearStemIdx >= 0 ? yearStemIdx : yearStemIdx + 10];
  const yearBranchIdx = (year - 4) % 12;
  const yearBranch = earthlyBranches[yearBranchIdx >= 0 ? yearBranchIdx : yearBranchIdx + 12];

  // 若時辰未知，預設以午時 (6) 立極排盤觀察大象
  const effectiveHour = isHourUnknown ? 6 : hourBranch;

  // 生年四化
  const sihuaMap: Record<string, { lu: string; quan: string; ke: string; ji: string }> = {
    '甲': { lu: '廉貞', quan: '破軍', ke: '武曲', ji: '太陽' },
    '乙': { lu: '天機', quan: '天梁', ke: '紫微', ji: '太陰' },
    '丙': { lu: '天同', quan: '天機', ke: '文昌', ji: '廉貞' },
    '丁': { lu: '太陰', quan: '天同', ke: '天機', ji: '巨門' },
    '戊': { lu: '貪狼', quan: '太陰', ke: '右弼', ji: '天機' },
    '己': { lu: '武曲', quan: '貪狼', ke: '天梁', ji: '文曲' },
    '庚': { lu: '太陽', quan: '武曲', ke: '太陰', ji: '天同' },
    '辛': { lu: '巨門', quan: '太陽', ke: '文曲', ji: '文昌' },
    '壬': { lu: '天梁', quan: '紫微', ke: '左輔', ji: '武曲' },
    '癸': { lu: '破軍', quan: '巨門', ke: '太陰', ji: '貪狼' },
  };
  const currentSihua = sihuaMap[yearStem] || sihuaMap['甲'];

  // 五虎遁起寅首
  const tigerStemsMap: Record<string, number> = {
    '甲': 2, '己': 2,
    '乙': 4, '庚': 4,
    '丙': 6, '辛': 6,
    '丁': 8, '壬': 8,
    '戊': 0, '癸': 0,
  };
  const tigerStartStemIdx = tigerStemsMap[yearStem] || 2;

  // 正月起寅宮（索引2），順數生月，逆數生時安命宮
  let lifePalaceBranchIdx = (2 + (month - 1) - effectiveHour) % 12;
  if (lifePalaceBranchIdx < 0) lifePalaceBranchIdx += 12;

  // 身宮：順數生月，順數生時
  let bodyPalaceBranchIdx = (2 + (month - 1) + effectiveHour) % 12;
  if (bodyPalaceBranchIdx < 0) bodyPalaceBranchIdx += 12;

  // 命宮干支
  const lifeOffsetFromTiger = (lifePalaceBranchIdx - 2 + 12) % 12;
  const lifePalaceStem = heavenlyStems[(tigerStartStemIdx + lifeOffsetFromTiger) % 10];
  const lifePalaceBranch = earthlyBranches[lifePalaceBranchIdx];

  // 納音五行局（水二局、木三局、金四局、土五局、火六局）
  const nayinBureauMap: Record<string, { name: string; number: number }> = {
    '甲子': { name: '金四局', number: 4 }, '乙丑': { name: '金四局', number: 4 },
    '丙寅': { name: '火六局', number: 6 }, '丁卯': { name: '火六局', number: 6 },
    '戊辰': { name: '木三局', number: 3 }, '己巳': { name: '木三局', number: 3 },
    '庚午': { name: '土五局', number: 5 }, '辛未': { name: '土五局', number: 5 },
    '壬申': { name: '金四局', number: 4 }, '癸酉': { name: '金四局', number: 4 },
    '甲戌': { name: '火六局', number: 6 }, '乙亥': { name: '火六局', number: 6 },
    '丙子': { name: '水二局', number: 2 }, '丁丑': { name: '水二局', number: 2 },
    '戊寅': { name: '土五局', number: 5 }, '己卯': { name: '土五局', number: 5 },
    '庚辰': { name: '金四局', number: 4 }, '辛巳': { name: '金四局', number: 4 },
    '壬午': { name: '木三局', number: 3 }, '癸未': { name: '木三局', number: 3 },
    '甲申': { name: '水二局', number: 2 }, '乙酉': { name: '水二局', number: 2 },
    '丙戌': { name: '土五局', number: 5 }, '丁亥': { name: '土五局', number: 5 },
    '戊子': { name: '火六局', number: 6 }, '己丑': { name: '火六局', number: 6 },
    '庚寅': { name: '木三局', number: 3 }, '辛卯': { name: '木三局', number: 3 },
    '壬辰': { name: '水二局', number: 2 }, '癸巳': { name: '水二局', number: 2 },
    '甲午': { name: '金四局', number: 4 }, '乙未': { name: '金四局', number: 4 },
    '丙申': { name: '火六局', number: 6 }, '丁酉': { name: '火六局', number: 6 },
    '戊戌': { name: '木三局', number: 3 }, '己亥': { name: '木三局', number: 3 },
    '庚子': { name: '土五局', number: 5 }, '辛丑': { name: '土五局', number: 5 },
    '壬寅': { name: '金四局', number: 4 }, '癸卯': { name: '金四局', number: 4 },
    '甲辰': { name: '火六局', number: 6 }, '乙巳': { name: '火六局', number: 6 },
    '丙午': { name: '水二局', number: 2 }, '丁未': { name: '水二局', number: 2 },
    '戊申': { name: '土五局', number: 5 }, '己酉': { name: '土五局', number: 5 },
    '庚戌': { name: '金四局', number: 4 }, '辛亥': { name: '金四局', number: 4 },
    '壬子': { name: '木三局', number: 3 }, '癸丑': { name: '木三局', number: 3 },
    '甲寅': { name: '水二局', number: 2 }, '乙卯': { name: '水二局', number: 2 },
    '丙辰': { name: '土五局', number: 5 }, '丁巳': { name: '土五局', number: 5 },
    '戊午': { name: '火六局', number: 6 }, '己未': { name: '火六局', number: 6 },
    '庚申': { name: '木三局', number: 3 }, '辛酉': { name: '木三局', number: 3 },
    '壬戌': { name: '水二局', number: 2 }, '癸亥': { name: '水二局', number: 2 }
  };
  const bureau = nayinBureauMap[`${lifePalaceStem}${lifePalaceBranch}`] || { name: '水二局', number: 2 };

  // 起紫微星宮位
  const computeZiweiBranchIdx = (birthDay: number, bureauNum: number): number => {
    const remainder = birthDay % bureauNum;
    if (remainder === 0) {
      const q = birthDay / bureauNum;
      return (2 + q - 1) % 12;
    } else {
      const x = bureauNum - remainder;
      const q = (birthDay + x) / bureauNum;
      if (x % 2 === 1) {
        return (2 + q - 1 - x + 12) % 12;
      } else {
        return (2 + q - 1 + x) % 12;
      }
    }
  };
  const ziweiBranchIdx = computeZiweiBranchIdx(day, bureau.number);

  // 天府星宮位（紫微天府對寅申軸: (10 - Z + 12) % 12）
  const tianfuBranchIdx = (10 - ziweiBranchIdx + 12) % 12;

  // 十四主星分佈映射
  const starPalaceMap: Record<number, string[]> = {};
  for (let i = 0; i < 12; i++) starPalaceMap[i] = [];

  // 紫微星系（逆時針排列）
  starPalaceMap[ziweiBranchIdx].push('紫微');
  starPalaceMap[(ziweiBranchIdx - 1 + 12) % 12].push('天機');
  starPalaceMap[(ziweiBranchIdx - 3 + 12) % 12].push('太陽');
  starPalaceMap[(ziweiBranchIdx - 4 + 12) % 12].push('武曲');
  starPalaceMap[(ziweiBranchIdx - 5 + 12) % 12].push('天同');
  starPalaceMap[(ziweiBranchIdx - 8 + 12) % 12].push('廉貞');

  // 天府星系（順時針排列）
  starPalaceMap[tianfuBranchIdx].push('天府');
  starPalaceMap[(tianfuBranchIdx + 1) % 12].push('太陰');
  starPalaceMap[(tianfuBranchIdx + 2) % 12].push('貪狼');
  starPalaceMap[(tianfuBranchIdx + 3) % 12].push('巨門');
  starPalaceMap[(tianfuBranchIdx + 4) % 12].push('天相');
  starPalaceMap[(tianfuBranchIdx + 5) % 12].push('天梁');
  starPalaceMap[(tianfuBranchIdx + 6) % 12].push('七殺');
  starPalaceMap[(tianfuBranchIdx + 10) % 12].push('破軍');

  // 六吉星
  const zuofuIdx = (4 + (month - 1)) % 12; // 辰宮起正月順數
  const youbiIdx = (10 - (month - 1) + 12) % 12; // 戌宮起正月逆數
  const wenchangIdx = (10 - effectiveHour + 12) % 12; // 戌宮起子時逆數
  const wenquIdx = (4 + effectiveHour) % 12; // 辰宮起子時順數

  const minorStarsMap: Record<number, string[]> = {};
  for (let i = 0; i < 12; i++) minorStarsMap[i] = [];
  minorStarsMap[zuofuIdx].push('左輔');
  minorStarsMap[youbiIdx].push('右弼');
  minorStarsMap[wenchangIdx].push('文昌');
  minorStarsMap[wenquIdx].push('文曲');

  // 天魁天鉞
  const kuiYueMap: Record<string, { kui: number; yue: number }> = {
    '甲': { kui: 1, yue: 7 }, '戊': { kui: 1, yue: 7 }, '庚': { kui: 1, yue: 7 },
    '乙': { kui: 0, yue: 8 }, '己': { kui: 0, yue: 8 },
    '丙': { kui: 11, yue: 9 }, '丁': { kui: 11, yue: 9 },
    '壬': { kui: 3, yue: 5 }, '癸': { kui: 3, yue: 5 },
    '辛': { kui: 6, yue: 2 },
  };
  const ky = kuiYueMap[yearStem] || { kui: 1, yue: 7 };
  minorStarsMap[ky.kui].push('天魁');
  minorStarsMap[ky.yue].push('天鉞');

  const palaceNames = ['命宮', '兄弟', '夫妻', '子女', '財帛', '疾厄', '遷移', '僕役', '官祿', '田宅', '福德', '父母'];

  // 計算十二宮完整數據
  const palaces: PalaceData[] = earthlyBranches.map((eb, branchIdx) => {
    const offsetFromTiger = (branchIdx - 2 + 12) % 12;
    const palaceStem = heavenlyStems[(tigerStartStemIdx + offsetFromTiger) % 10];

    const offsetFromLife = (lifePalaceBranchIdx - branchIdx + 12) % 12;
    const pName = palaceNames[offsetFromLife];

    const mainStars = starPalaceMap[branchIdx];
    const minorStars = minorStarsMap[branchIdx];
    const sihuaStars: string[] = [];

    mainStars.forEach((star) => {
      if (star === currentSihua.lu) sihuaStars.push('祿');
      if (star === currentSihua.quan) sihuaStars.push('權');
      if (star === currentSihua.ke) sihuaStars.push('科');
      if (star === currentSihua.ji) sihuaStars.push('忌');
    });

    minorStars.forEach((star) => {
      if (star === currentSihua.lu) sihuaStars.push('祿');
      if (star === currentSihua.quan) sihuaStars.push('權');
      if (star === currentSihua.ke) sihuaStars.push('科');
      if (star === currentSihua.ji) sihuaStars.push('忌');
    });

    const isLife = branchIdx === lifePalaceBranchIdx;
    const isBody = branchIdx === bodyPalaceBranchIdx;

    const startAge = (offsetFromLife * 10) + bureau.number;
    const ageRange = `${startAge} - ${startAge + 9}歲`;

    const feynmanMeanings: Record<string, string> = {
      '命宮': '你的「原廠天賦骨幹」與第一直覺濾鏡，代表精神意志、行事氣魄與人生主軸。',
      '兄弟': '平級合夥人與手足之互動模式，代表同儕協作力與身邊同行支持度。',
      '夫妻': '親密關係的心理投射與伴侶溝通模式。倪師強調：看的是性格互補互斥，非命定剋夫剋妻。',
      '子女': '新世代傳承、晚輩團隊培訓與創造力輸出，看指導後進與創新項目的能量。',
      '財帛': '金錢流動模式與財富安全感來源。倪師重在「取之有道」，看財星是否清正穩健。',
      '疾厄': '身心健康的警示儀表板，對應人紀中醫臟腑，提示日常哪些臟腑經絡需重點調養。',
      '遷移': '出門在外的社交機遇、公眾名聲、遠方開拓氣場與他人對你的第一印象。',
      '僕役': '團隊下屬、社群受眾與基層協作網絡，看能否得聚眾人之力還是心力耗損。',
      '官祿': '你最適合全力揮灑的「職場核心舞台」，看是公門體制、專業技術還是商海開拓。',
      '田宅': '居家環境、不動產儲備與心靈安定感，是陽宅風水名位落地的核心宮位。',
      '福德': '精神世界的安寧、興趣情調與潛意識，看心態是否豁達、懂不懂得自我調節。',
      '父母': '與長輩主管、體制法規的互動之道，代表原生家庭的道德滋養與庇護力。'
    };

    const mainStarStr = mainStars.join('、') || '無主星（借對宮借力）';

    return {
      earthBranch: eb,
      heavenlyStem: palaceStem,
      name: pName,
      isLifePalace: isLife,
      isBodyPalace: isBody,
      mainStars: mainStars.length > 0 ? mainStars : ['借對宮'],
      minorStars,
      sihua: sihuaStars,
      ageRange,
      feynmanMeaning: feynmanMeanings[pName] || '人生核心維度。',
      niAdvice: isLife 
        ? `命宮坐【${mainStarStr}】：倪師云大格局抓氣魄，心胸開闊則百折不撓，不為小凶曜所拘泥！` 
        : `此宮坐【${mainStarStr}】：倪師論${pName}重在知常達變，心態正則萬事順，以陽宅名位與人紀自律化解阻礙。`
    };
  });

  const selectedPalace = palaces[selectedPalaceIdx] || palaces[0];
  const lifePalace = palaces.find((p) => p.isLifePalace) || palaces[0];
  const bodyPalace = palaces.find((p) => p.isBodyPalace) || palaces[0];
  const careerPalace = palaces.find((p) => p.name === '官祿') || palaces[0];
  const wealthPalace = palaces.find((p) => p.name === '財帛') || palaces[0];
  const travelPalace = palaces.find((p) => p.name === '遷移') || palaces[0];

  // 全盤格局判斷 (倪師大格局分析)
  const determineMacroPattern = () => {
    const lifeStars = lifePalace.mainStars;
    if (lifeStars.includes('紫微') && lifeStars.includes('天府')) return { name: '紫府同宮格', desc: '帝府相會，格局宏大厚重，具備天然領袖風範與頂級資產防禦力，宜掌大局。' };
    if (lifeStars.includes('七殺') || lifeStars.includes('破軍') || lifeStars.includes('貪狼')) return { name: '殺破狼開拓破局格', desc: '人生充滿破舊立新之動能，敢打硬仗、開闢新賽道，在逆境中越挫越勇。' };
    if (lifeStars.includes('天機') || lifeStars.includes('太陰') || lifeStars.includes('天同') || lifeStars.includes('天梁')) return { name: '機月同梁守成格', desc: '文官智囊之大才，善於策劃、流程管理與體系內升遷，守成穩健，不宜盲目高槓桿冒險。' };
    if (lifeStars.includes('太陽') && lifeStars.includes('巨門')) return { name: '巨日同宮格', desc: '光明遠播、思維犀利，天生具備公眾演說、教育宣傳與化解是非的強大影響力。' };
    if (lifeStars.includes('武曲') && lifeStars.includes('貪狼')) return { name: '武貪開創格', desc: '大器晚成之大格，兼具務實財務執行力與敏銳商業嗅覺，經商或技術開創均大有可為。' };
    if (lifeStars.includes('紫微')) return { name: '紫微尊星座命', desc: '自尊心極強、責任心重，擅長宏觀統籌，注意放低身段多傾聽一線意見。' };
    if (lifeStars.includes('天府')) return { name: '天府令星坐命', desc: '溫和穩重、庫藏豐厚，重視安全感與條理，是組織中不可或缺的定海神針。' };
    return { name: '三方四正清奇格', desc: '星曜分工有序，借力使力，重在知常達變，在專業領域深耕必能脫穎而出。' };
  };
  const macroPattern = determineMacroPattern();

  // 四化星坐落宮位反查
  const findSihuaPalace = (starName: string) => {
    const found = palaces.find((p) => p.mainStars.includes(starName) || p.minorStars.includes(starName));
    return found ? `${found.name}（${found.earthBranch}宮）` : '三方會照';
  };

  return (
    <div className="glass-panel" style={{ padding: '28px', marginBottom: '30px' }}>
      {/* 頂部標題 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Compass size={24} color="var(--gold-primary)" />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--text-title)' }}>
              紫微斗數排盤引擎（支援國曆/農曆 ＆ 時辰未知推斷）
            </h2>
          </div>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
            100% 於瀏覽器本地依正統起星法推算，隱私安全。支援國曆/農曆自動轉換，並針對「不知出生時辰」提供倪師定時辰錦囊與試盤工具。
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--jade-soft)', border: '1px solid var(--jade-primary)', padding: '5px 12px', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--jade-primary)', fontWeight: 600 }}>
          <Shield size={14} /> 本地私密安全
        </div>
      </div>

      {/* 曆法切換控制器 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '16px',
        padding: '10px 16px',
        background: 'var(--bg-card-contrast)',
        borderRadius: '10px',
        border: '1px solid var(--border-subtle)',
        flexWrap: 'wrap'
      }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-title)' }}>曆法選擇：</span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setCalendarType('solar')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: calendarType === 'solar' ? 'var(--gold-primary)' : 'var(--bg-card)',
              color: calendarType === 'solar' ? '#ffffff' : 'var(--text-main)',
              border: calendarType === 'solar' ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <Sun size={15} /> 🌞 國曆（西曆/公曆）
          </button>
          <button
            onClick={() => setCalendarType('lunar')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: calendarType === 'lunar' ? 'var(--gold-primary)' : 'var(--bg-card)',
              color: calendarType === 'lunar' ? '#ffffff' : 'var(--text-main)',
              border: calendarType === 'lunar' ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <Moon size={15} /> 🌙 農曆（傳統陰曆）
          </button>
        </div>

        <span style={{ fontSize: '0.82rem', color: 'var(--gold-primary)', fontWeight: 600, marginLeft: 'auto' }}>
          {dateInfo.displayStr}
        </span>
      </div>

      {/* 排盤輸入控制器 */}
      <div style={{
        background: 'var(--bg-card-subtle)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '12px',
        padding: '16px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: '12px',
        marginBottom: '20px'
      }}>
        {/* 國曆輸入模式 */}
        {calendarType === 'solar' ? (
          <>
            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>西元年份</label>
              <input
                type="number" value={solarYear} min="1930" max="2035"
                onChange={(e) => setSolarYear(Number(e.target.value))}
                style={{ width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '6px 10px', color: 'var(--text-main)', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>國曆月份</label>
              <select
                value={solarMonth}
                onChange={(e) => setSolarMonth(Number(e.target.value))}
                style={{ width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '6px 10px', color: 'var(--text-main)', outline: 'none' }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(m => (
                  <option key={m} value={m}>{m}月</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>國曆日期</label>
              <input
                type="number" value={solarDay} min="1" max="31"
                onChange={(e) => setSolarDay(Number(e.target.value))}
                style={{ width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '6px 10px', color: 'var(--text-main)', outline: 'none' }}
              />
            </div>
          </>
        ) : (
          /* 農曆輸入模式 */
          <>
            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>農曆年份</label>
              <input
                type="number" value={lunarYearInput} min="1930" max="2035"
                onChange={(e) => setLunarYearInput(Number(e.target.value))}
                style={{ width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '6px 10px', color: 'var(--text-main)', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>農曆月份</label>
              <select
                value={lunarMonthInput}
                onChange={(e) => setLunarMonthInput(Number(e.target.value))}
                style={{ width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '6px 10px', color: 'var(--text-main)', outline: 'none' }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(m => (
                  <option key={m} value={m}>{m}月</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>農曆日期</label>
              <input
                type="number" value={lunarDayInput} min="1" max="30"
                onChange={(e) => setLunarDayInput(Number(e.target.value))}
                style={{ width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '6px 10px', color: 'var(--text-main)', outline: 'none' }}
              />
            </div>
          </>
        )}

        {/* 出生時辰控制器（含時辰未知處理） */}
        <div>
          <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
            出生時辰
          </label>
          <select
            value={isHourUnknown ? -1 : hourBranch}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val === -1) {
                setIsHourUnknown(true);
                setActiveReportTab('unknown-guide');
              } else {
                setIsHourUnknown(false);
                setHourBranch(val);
              }
            }}
            style={{ width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '6px 10px', color: isHourUnknown ? 'var(--amber-warning)' : 'var(--text-main)', outline: 'none', fontWeight: isHourUnknown ? 700 : 500 }}
          >
            <option value={-1}>❓ 不知道出生時辰（啟動輔助推算）</option>
            {hourNames.map((name, idx) => (
              <option key={idx} value={idx}>{name}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>性別造命</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as 'M' | 'F')}
            style={{ width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '6px 10px', color: 'var(--text-main)', outline: 'none' }}
          >
            <option value="M">乾造（男）</option>
            <option value="F">坤造（女）</option>
          </select>
        </div>
      </div>

      {/* 若時辰未知，提示黃色提醒條 */}
      {isHourUnknown && (
        <div style={{
          background: 'var(--amber-soft)',
          border: '1px solid var(--amber-warning)',
          borderRadius: '10px',
          padding: '12px 16px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={18} color="var(--amber-warning)" />
            <span style={{ fontSize: '0.88rem', color: 'var(--amber-warning)', fontWeight: 700 }}>
              時辰未知模式：盤面暫以倪師推崇之「午時（日正當中立極）」排盤。生年四化能量完全不變！
            </span>
          </div>
          <button
            onClick={() => setActiveReportTab('unknown-guide')}
            style={{
              background: 'var(--amber-warning)',
              color: '#ffffff',
              border: 'none',
              padding: '4px 12px',
              borderRadius: '6px',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            查看倪師定時辰四大錦囊 ➜
          </button>
        </div>
      )}

      {/* 經典十二宮盤面佈局 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(4, 130px)',
        gap: '8px',
        marginBottom: '20px'
      }}>
        {[
          5, 6, 7, 8,
          4, -1, -2, 9,
          3, -3, -4, 10,
          2, 1, 0, 11
        ].map((cellIdx, gridPos) => {
          // 中宮核心天盤
          if (cellIdx === -1) {
            return (
              <div
                key={gridPos}
                style={{
                  gridColumn: 'span 2',
                  gridRow: 'span 2',
                  background: 'linear-gradient(135deg, var(--gold-soft) 0%, var(--bg-card-contrast) 60%)',
                  border: '1.5px solid var(--gold-glow)',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  boxShadow: '0 0 20px rgba(245, 158, 11, 0.1), inset 0 1px 0 rgba(255,255,255,0.05)'
                }}
              >
                <div style={{ fontSize: '0.7rem', color: 'var(--gold-primary)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '6px', opacity: 0.7, textTransform: 'uppercase' }}>
                  ☯ 命主核心天盤
                </div>
                <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', color: 'var(--gold-primary)', fontWeight: 700, marginBottom: '4px' }}>
                  【{yearStem}{yearBranch}年】{bureau.name}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-main)', marginBottom: '10px', fontWeight: 600, lineHeight: 1.5 }}>
                  {gender === 'M' ? '乾造' : '坤造'} · {year}年{month}月{day}日<br/>
                  {isHourUnknown ? '時辰未知（以午時觀大象）' : `${earthlyBranches[effectiveHour]}時`}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--gold-glow)', fontWeight: 700, marginBottom: '10px', background: 'var(--gold-soft)', padding: '3px 10px', borderRadius: '99px', border: '1px solid var(--border-glow)' }}>
                  格局：【{macroPattern.name}】
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.73rem', background: 'var(--jade-soft)', color: 'var(--jade-primary)', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, border: '1px solid var(--border-subtle)' }}>
                    祿：{currentSihua.lu}
                  </span>
                  <span style={{ fontSize: '0.73rem', background: 'var(--crimson-soft)', color: 'var(--crimson-primary)', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, border: '1px solid var(--border-subtle)' }}>
                    權：{currentSihua.quan}
                  </span>
                  <span style={{ fontSize: '0.73rem', background: 'var(--cyan-soft)', color: 'var(--cyan-primary)', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, border: '1px solid var(--border-subtle)' }}>
                    科：{currentSihua.ke}
                  </span>
                  <span style={{ fontSize: '0.73rem', background: 'var(--amber-soft)', color: 'var(--amber-warning)', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, border: '1px solid var(--border-subtle)' }}>
                    忌：{currentSihua.ji}
                  </span>
                </div>
              </div>
            );
          }
          if (cellIdx < 0) return null;

          const p = palaces[cellIdx];
          const isSelected = selectedPalaceIdx === cellIdx;

          return (
            <div
              key={gridPos}
              className="ziwei-palace-cell"
              onClick={() => {
                setSelectedPalaceIdx(cellIdx);
                setActiveReportTab('selected');
              }}
              style={{
                background: isSelected 
                  ? 'var(--gold-soft)' 
                  : p.isLifePalace 
                  ? 'var(--bg-card-contrast)' 
                  : 'var(--bg-card)',
                border: isSelected 
                  ? '2px solid var(--gold-primary)' 
                  : p.isLifePalace 
                  ? '1.5px solid var(--gold-glow)' 
                  : '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '8px 10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: isSelected ? '0 4px 16px rgba(217, 119, 6, 0.2)' : 'none'
              }}
            >
              {/* 宮名與主星 */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    color: p.isLifePalace ? 'var(--gold-primary)' : 'var(--text-title)'
                  }}>
                    {p.name} {p.isLifePalace && '★'}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 500 }}>
                    {p.ageRange}
                  </span>
                </div>

                {/* 主星群 */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center' }}>
                  {p.mainStars.map((ms, i) => (
                    <span key={i} style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--star-main)' }}>
                      {ms}
                    </span>
                  ))}
                  {/* 四化標記 */}
                  {p.sihua.map((sh, i) => (
                    <span key={i} style={{ fontSize: '0.68rem', fontWeight: 700, background: 'var(--crimson-primary)', color: '#ffffff', padding: '1px 4px', borderRadius: '3px' }}>
                      {sh}
                    </span>
                  ))}
                </div>
              </div>

              {/* 宮干地支與輔星 */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px dashed var(--border-subtle)', paddingTop: '3px' }}>
                <span style={{ color: 'var(--text-dim)' }}>{p.minorStars.join(' ')}</span>
                <span style={{ fontWeight: 700, color: 'var(--cyan-primary)' }}>
                  {p.heavenlyStem}{p.earthBranch}
                  <span style={{ fontSize: '0.68rem', color: 'var(--gold-glow)', marginLeft: '2px', fontWeight: 600 }}>
                    ·{BRANCH_ORGAN_MAP[p.earthBranch] || ''}
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 命盤深度解釋系統 */}
      <div style={{
        background: 'var(--bg-card-contrast)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '14px',
        padding: '20px'
      }}>
        {/* 解讀模式導覽切換 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveReportTab('overall')}
              style={{
                background: activeReportTab === 'overall' ? 'var(--gold-primary)' : 'var(--bg-card)',
                color: activeReportTab === 'overall' ? '#ffffff' : 'var(--text-main)',
                border: '1px solid var(--border-subtle)',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Layers size={15} /> 🏛️ 命盤全景深度總評（倪師大格局）
            </button>

            <button
              onClick={() => setActiveReportTab('selected')}
              style={{
                background: activeReportTab === 'selected' ? 'var(--gold-primary)' : 'var(--bg-card)',
                color: activeReportTab === 'selected' ? '#ffffff' : 'var(--text-main)',
                border: '1px solid var(--border-subtle)',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Target size={15} /> 🔍 當前宮位解讀：【{selectedPalace.name}】
            </button>

            <button
              onClick={() => setActiveReportTab('unknown-guide')}
              style={{
                background: activeReportTab === 'unknown-guide' ? 'var(--gold-primary)' : 'var(--bg-card)',
                color: activeReportTab === 'unknown-guide' ? '#ffffff' : 'var(--text-main)',
                border: isHourUnknown ? '1px solid var(--amber-warning)' : '1px solid var(--border-subtle)',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <HelpCircle size={15} color={isHourUnknown ? '#fbbf24' : 'inherit'} /> 🧭 不知時辰？四大定時辰錦囊
            </button>
          </div>

          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            點選上方 12 宮任一宮位即可切換詳解
          </span>
        </div>

        {/* 1. 命盤全景總評報告 */}
        {activeReportTab === 'overall' && (
          <div>
            {/* 核心格局評述 */}
            <div style={{ background: 'var(--gold-soft)', border: '1px solid var(--border-glow)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Sparkles size={18} color="var(--gold-primary)" />
                <h3 style={{ fontSize: '1.15rem', color: 'var(--gold-primary)', fontFamily: 'var(--font-serif)', margin: 0 }}>
                  先天命局核心氣象：【{macroPattern.name}】
                </h3>
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.65, margin: 0 }}>
                {macroPattern.desc}
              </p>
            </div>

            {/* 三方四正與核心維度拆解 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '16px' }}>
              {/* 命宮天賦骨幹 */}
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', padding: '14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.86rem', color: 'var(--gold-primary)', fontWeight: 700, marginBottom: '6px' }}>
                  ★ 本命命宮（{lifePalace.earthBranch}宮·{lifePalace.mainStars.join('、')}）：
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.55 }}>
                  主宰天賦本能與思維底色。看事情重在大方向還是細節執行，決定了你的第一直覺反應。
                </div>
              </div>

              {/* 身宮後半生依歸 */}
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', padding: '14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.86rem', color: 'var(--cyan-primary)', fontWeight: 700, marginBottom: '6px' }}>
                  ★ 後半生身宮寄居：【{bodyPalace.name}】（{bodyPalace.earthBranch}宮）
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.55 }}>
                  三十歲後行動力與人生價值觀逐漸向【{bodyPalace.name}】傾斜，成為心靈成就感的主要錨定點。
                </div>
              </div>

              {/* 官祿事業舞台 */}
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', padding: '14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.86rem', color: 'var(--jade-primary)', fontWeight: 700, marginBottom: '6px' }}>
                  ★ 職場發揮舞台（官祿宮·{careerPalace.mainStars.join('、')}）：
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.55 }}>
                  適合發揮的場景。名相符則順，宜辨明是帶兵打仗的先鋒、制度守成的幕僚還是公眾發聲的名嘴。
                </div>
              </div>

              {/* 財帛金錢模式 */}
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', padding: '14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.86rem', color: 'var(--amber-warning)', fontWeight: 700, marginBottom: '6px' }}>
                  ★ 財富流動模式（財帛宮·{wealthPalace.mainStars.join('、')}）：
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.55 }}>
                  金錢安全感的來源。君子愛財取之有道，財星喜靜不喜動，重在長期的專屬技能與複利積累。
                </div>
              </div>

              {/* 遷移公眾機遇 */}
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', padding: '14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.86rem', color: 'var(--crimson-primary)', fontWeight: 700, marginBottom: '6px' }}>
                  ★ 外出社交氣場（遷移宮·{travelPalace.mainStars.join('、')}）：
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.55 }}>
                  出外開拓的社會評價與遠方貴人緣份。照亮命宮，代表外界大眾對你第一印象的心理投射。
                </div>
              </div>
            </div>

            {/* 生年四化時空導航指南 */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-title)', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Compass size={17} color="var(--gold-primary)" /> 生年四化能量時空羅盤（發力點與防禦漏洞指南）：
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '10px' }}>
                <div style={{ background: 'var(--jade-soft)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--jade-primary)' }}>【化祿·{currentSihua.lu}】機遇之春</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-main)', marginTop: '2px' }}>坐落於：{findSihuaPalace(currentSihua.lu)}。此領域乃天然機遇與貴人資源湧入地。</div>
                </div>
                <div style={{ background: 'var(--crimson-soft)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--crimson-primary)' }}>【化權·{currentSihua.quan}】掌控之夏</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-main)', marginTop: '2px' }}>坐落於：{findSihuaPalace(currentSihua.quan)}。個人意志力與主動進取攻堅之發力點。</div>
                </div>
                <div style={{ background: 'var(--cyan-soft)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--cyan-primary)' }}>【化科·{currentSihua.ke}】名望之秋</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-main)', marginTop: '2px' }}>坐落於：{findSihuaPalace(currentSihua.ke)}。專業證照、好名聲與化解是非之保護盾。</div>
                </div>
                <div style={{ background: 'var(--amber-soft)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--amber-warning)' }}>【化忌·{currentSihua.ji}】修補之冬</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-main)', marginTop: '2px' }}>坐落於：{findSihuaPalace(currentSihua.ji)}。人生關鍵作業紅叉！在此領域需減速修路，避免投機冒進。</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. 當前選取宮位深度詳解 */}
        {activeReportTab === 'selected' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.35rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--text-title)' }}>
                  【{selectedPalace.name}】（{selectedPalace.heavenlyStem}{selectedPalace.earthBranch}宮）
                </span>
                {selectedPalace.isLifePalace && (
                  <span style={{ background: 'var(--gold-soft)', color: 'var(--gold-primary)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 700, border: '1px solid var(--gold-glow)' }}>
                    本命元神所在
                  </span>
                )}
                {selectedPalace.isBodyPalace && (
                  <span style={{ background: 'var(--cyan-soft)', color: 'var(--cyan-primary)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 700 }}>
                    後半生身宮寄居
                  </span>
                )}
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                十年大限巡行：{selectedPalace.ageRange}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
              {/* 費曼生活白話定位 */}
              <div style={{ background: 'var(--bg-card)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--cyan-primary)', fontWeight: 700, marginBottom: '6px' }}>
                  🌱 費曼生活白話定位：
                </div>
                <div style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.65 }}>
                  {selectedPalace.feynmanMeaning}
                </div>
                <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px dashed var(--border-subtle)', fontSize: '0.82rem', color: 'var(--text-dim)' }}>
                  坐守主星：<strong>{selectedPalace.mainStars.join('、')}</strong> ｜ 輔星：{selectedPalace.minorStars.join(' ') || '無輔曜'}
                </div>
              </div>

              {/* 倪海廈原意提煉與生活建議 */}
              <div style={{ background: 'var(--gold-soft)', padding: '16px', borderRadius: '10px', border: '1px solid var(--gold-glow)' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--gold-primary)', fontWeight: 700, marginBottom: '6px' }}>
                  📖 倪海廈《天紀》原意提煉與決策指南：
                </div>
                <div style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.65 }}>
                  {selectedPalace.niAdvice}
                </div>
              </div>

              {/* 天機道聽課筆記：十二宮臟腑經絡對應（醫易同源） */}
              <div style={{ background: 'var(--jade-soft)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', gridColumn: '1 / -1' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--jade-primary)', fontWeight: 700, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🩺</span> 【天紀·經絡臟腑對應（醫易同源）】：地支「{selectedPalace.earthBranch}」宮 ➔ 對應人體之【{BRANCH_ORGAN_MAP[selectedPalace.earthBranch]}經】
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                  源自倪師《天紀·天機道聽課筆記》：<strong>「肺寅大卯胃辰宮，脾巳心午小未中，申胱酉腎心包戌，亥焦子膽丑肝通」</strong>。
                  若此【{selectedPalace.name}】宮內逢擎羊、陀羅、煞星或生年化忌，即提示先天此臟腑經絡氣血相對脆弱。平時應依循《人紀》黃帝內經作息重點保養【{BRANCH_ORGAN_MAP[selectedPalace.earthBranch]}】之生機！
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. 倪師不知出生時辰四大神驗錦囊 ＆ 試盤器 */}
        {activeReportTab === 'unknown-guide' && (
          <div>
            {/* 頂部說明卡 */}
            <div style={{ background: 'var(--gold-soft)', border: '1px solid var(--border-glow)', borderRadius: '12px', padding: '18px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <HelpCircle size={20} color="var(--gold-primary)" />
                <h3 style={{ fontSize: '1.2rem', color: 'var(--gold-primary)', fontFamily: 'var(--font-serif)', margin: 0 }}>
                  倪師《天紀》傳授：不知出生時辰的四大定時辰神驗錦囊
                </h3>
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.65, margin: 0 }}>
                倪海廈老師在《天紀》中強調：「若時辰不詳，切莫被江湖術士忽悠！透過古代天機道傳下的
                <strong>睡姿習慣</strong>、<strong>頭頂髮旋（旋毛）位置</strong>、<strong>過往重大事件反推</strong>
                以及<strong>四大時段試盤比對</strong>，人人皆能快速敲定八九不離十的真實時辰！
                選擇符合你的選項後，點擊「⚡套用此時辰」按鈕，命盤即時更新！」
              </p>
            </div>

            {/* 四大錦囊佈局 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '24px' }}>

              {/* ╔═══ 錦囊一：睡姿 ═══╗ */}
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '6px' }}>
                  <UserCheck size={18} color="var(--cyan-primary)" /> 錦囊一：觀察日常睡姿習慣
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '10px', lineHeight: 1.5 }}>
                  人入睡時神識放鬆，肢體契合出生時辰之氣候動態：
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { key: 'yang', label: '仰面朝天平睡（手放胸腹、端正平穩）', candidates: [0, 6, 3, 9], matchText: '子・午・卯・酉時' },
                    { key: 'ce',  label: '側身側臥（喜抱枕、微曲雙腿、一側偏睡）', candidates: [2, 8, 5, 11], matchText: '寅・申・巳・亥時' },
                    { key: 'fu',  label: '俯臥趴睡（或喜翻來覆去、臉常埋枕）', candidates: [4, 10, 1, 7], matchText: '辰・戌・丑・未時' },
                  ].map((item) => {
                    const isChosen = sleepPoseChoice === item.key;
                    return (
                      <div key={item.key} style={{ borderRadius: '8px', border: isChosen ? '1.5px solid var(--gold-primary)' : '1px solid var(--border-subtle)', background: isChosen ? 'var(--gold-soft)' : 'var(--bg-card-contrast)', overflow: 'hidden' }}>
                        <div
                          onClick={() => setSleepPoseChoice(isChosen ? '' : item.key)}
                          style={{ padding: '10px 12px', cursor: 'pointer' }}
                        >
                          <div style={{ fontSize: '0.86rem', fontWeight: 600, color: isChosen ? 'var(--gold-primary)' : 'var(--text-main)' }}>
                            {isChosen ? '✓ ' : '○ '}{item.label}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                            → 倪師推斷時辰落在：<strong style={{ color: isChosen ? 'var(--gold-primary)' : 'inherit' }}>{item.matchText}</strong>
                          </div>
                        </div>
                        {isChosen && (
                          <div style={{ padding: '8px 12px', borderTop: '1px dashed var(--border-subtle)', background: 'rgba(255,255,255,0.03)', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', alignSelf: 'center' }}>⚡點擊套用：</span>
                            {item.candidates.map((h) => (
                              <button
                                key={h}
                                onClick={() => { setIsHourUnknown(false); setHourBranch(h); setActiveReportTab('overall'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                style={{
                                  background: hourBranch === h && !isHourUnknown ? 'var(--gold-primary)' : 'var(--bg-card)',
                                  color: hourBranch === h && !isHourUnknown ? '#fff' : 'var(--text-main)',
                                  border: '1px solid var(--border-glow)',
                                  borderRadius: '6px',
                                  padding: '3px 10px',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  cursor: 'pointer'
                                }}
                              >
                                {earthlyBranches[h]}時
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ╔═══ 錦囊二：旋毛 ═══╗ */}
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '6px' }}>
                  <Sparkles size={18} color="var(--gold-primary)" /> 錦囊二：檢視頭頂髮旋（旋毛）
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '10px', lineHeight: 1.5 }}>
                  摸一摸頭頂頭髮中心的旋毛位置與個數：
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { key: 'center', label: '單個旋毛，恰好位在頭頂正中心不偏', candidates: [0, 6, 3, 9], matchText: '子・午・卯・酉時' },
                    { key: 'side',   label: '旋毛偏左或偏右，或有雙旋、三旋', candidates: [2, 8, 5, 11], matchText: '寅・申・巳・亥時' },
                    { key: 'flat',   label: '旋毛偏斜平緩，髮質粗硬或骨相方圓', candidates: [4, 10, 1, 7], matchText: '辰・戌・丑・未時' },
                  ].map((item) => {
                    const isChosen = hairVortexChoice === item.key;
                    return (
                      <div key={item.key} style={{ borderRadius: '8px', border: isChosen ? '1.5px solid var(--gold-primary)' : '1px solid var(--border-subtle)', background: isChosen ? 'var(--gold-soft)' : 'var(--bg-card-contrast)', overflow: 'hidden' }}>
                        <div
                          onClick={() => setHairVortexChoice(isChosen ? '' : item.key)}
                          style={{ padding: '10px 12px', cursor: 'pointer' }}
                        >
                          <div style={{ fontSize: '0.86rem', fontWeight: 600, color: isChosen ? 'var(--gold-primary)' : 'var(--text-main)' }}>
                            {isChosen ? '✓ ' : '○ '}{item.label}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                            → 倪師推斷時辰落在：<strong style={{ color: isChosen ? 'var(--gold-primary)' : 'inherit' }}>{item.matchText}</strong>
                          </div>
                        </div>
                        {isChosen && (
                          <div style={{ padding: '8px 12px', borderTop: '1px dashed var(--border-subtle)', background: 'rgba(255,255,255,0.03)', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', alignSelf: 'center' }}>⚡點擊套用：</span>
                            {item.candidates.map((h) => (
                              <button
                                key={h}
                                onClick={() => { setIsHourUnknown(false); setHourBranch(h); setActiveReportTab('overall'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                style={{
                                  background: hourBranch === h && !isHourUnknown ? 'var(--gold-primary)' : 'var(--bg-card)',
                                  color: hourBranch === h && !isHourUnknown ? '#fff' : 'var(--text-main)',
                                  border: '1px solid var(--border-glow)',
                                  borderRadius: '6px',
                                  padding: '3px 10px',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  cursor: 'pointer'
                                }}
                              >
                                {earthlyBranches[h]}時
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ╔═══ 錦囊三：重大事件反推法 ═══╗ */}
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '6px' }}>
                  <Target size={18} color="var(--crimson-primary)" /> 錦囊三：重大事件反推法
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '10px', lineHeight: 1.5 }}>
                  倪師：「命宮主星與你的性格最匹配，便能反推命宮位置，進而找出時辰！」
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { key: 'shap', label: '性格偏領袖型、重視面子與制度（紫微/天府）', hint: '命宮可能坐紫府方向', candidates: [0, 1, 2, 3] },
                    { key: 'pio',  label: '性格偏開拓型、敢冒險拚搏（殺破狼廉）', hint: '命宮可能坐開拓星方向', candidates: [4, 5, 6, 7] },
                    { key: 'adv',  label: '性格偏穩健型、善計畫守成（機月同梁）', hint: '命宮可能坐智囊星方向', candidates: [8, 9, 10, 11] },
                  ].map((item) => {
                    const isChosen = sleepPoseChoice === `evt_${item.key}`;
                    return (
                      <div key={item.key} style={{ borderRadius: '8px', border: isChosen ? '1.5px solid var(--crimson-primary)' : '1px solid var(--border-subtle)', background: isChosen ? 'var(--crimson-soft)' : 'var(--bg-card-contrast)', overflow: 'hidden' }}>
                        <div
                          onClick={() => setSleepPoseChoice(isChosen ? '' : `evt_${item.key}`)}
                          style={{ padding: '10px 12px', cursor: 'pointer' }}
                        >
                          <div style={{ fontSize: '0.86rem', fontWeight: 600, color: isChosen ? 'var(--crimson-primary)' : 'var(--text-main)' }}>
                            {isChosen ? '✓ ' : '○ '}{item.label}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '2px' }}>{item.hint}</div>
                        </div>
                        {isChosen && (
                          <div style={{ padding: '8px 12px', borderTop: '1px dashed var(--border-subtle)', background: 'rgba(255,255,255,0.03)', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', alignSelf: 'center' }}>⚡逐一試排：</span>
                            {item.candidates.map((h) => (
                              <button
                                key={h}
                                onClick={() => { setIsHourUnknown(false); setHourBranch(h); setActiveReportTab('overall'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                style={{
                                  background: hourBranch === h && !isHourUnknown ? 'var(--crimson-primary)' : 'var(--bg-card)',
                                  color: hourBranch === h && !isHourUnknown ? '#fff' : 'var(--text-main)',
                                  border: '1px solid var(--crimson-primary)',
                                  borderRadius: '6px',
                                  padding: '3px 10px',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  cursor: 'pointer'
                                }}
                              >
                                {earthlyBranches[h]}時
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ╔═══ 錦囊四：四大時段試盤比對 ═══╗ */}
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glow)', borderRadius: '12px', padding: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Clock size={18} color="var(--gold-primary)" />
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-title)' }}>
                    錦囊四：四大時段試盤比對（最精準）
                  </div>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: 1.5 }}>
                  倪師：「試盤比猜想更科學。點選下列四大時段排盤，觀察命宮主星性格哪個最像你！」
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {[
                    { label: '🌅 卯時', sub: '05:00 - 07:00', val: 3, desc: '朝陽初升，外向敏捷', color: 'var(--jade-primary)' },
                    { label: '☀️ 午時', sub: '11:00 - 13:00', val: 6, desc: '烈日當空，光明磊落', color: 'var(--gold-primary)' },
                    { label: '🌇 酉時', sub: '17:00 - 19:00', val: 9, desc: '夕照收斂，細膩講究', color: 'var(--crimson-primary)' },
                    { label: '🌙 子時', sub: '23:00 - 01:00', val: 0, desc: '萬籟俱寂，深沉多思', color: 'var(--cyan-primary)' },
                  ].map((slot) => {
                    const isActive = hourBranch === slot.val && !isHourUnknown;
                    return (
                      <button
                        key={slot.val}
                        onClick={() => { setIsHourUnknown(false); setHourBranch(slot.val); setActiveReportTab('overall'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        style={{
                          background: isActive ? slot.color : 'var(--bg-card-contrast)',
                          color: isActive ? '#ffffff' : 'var(--text-main)',
                          border: isActive ? `1.5px solid ${slot.color}` : '1px solid var(--border-subtle)',
                          padding: '12px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: '2px' }}>{slot.label}</div>
                        <div style={{ fontSize: '0.74rem', opacity: isActive ? 0.85 : 1, color: isActive ? 'inherit' : 'var(--text-dim)' }}>{slot.sub}</div>
                        <div style={{ fontSize: '0.78rem', marginTop: '4px', fontWeight: 600, color: isActive ? 'inherit' : slot.color }}>{slot.desc}</div>
                        {isActive && <div style={{ fontSize: '0.72rem', marginTop: '4px', fontWeight: 700 }}>✓ 已套用 · 命盤即時更新</div>}
                      </button>
                    );
                  })}
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '10px', lineHeight: 1.4 }}>
                  💡 完整 12 時辰請直接使用頂部「出生時辰」下拉選單切換
                </p>
              </div>
            </div>

            {/* 倪師安心心法定心丸 */}
            <div style={{ background: 'var(--jade-soft)', border: '1px solid var(--jade-primary)', borderRadius: '12px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--jade-primary)', fontWeight: 700, fontSize: '0.92rem', marginBottom: '6px' }}>
                <Check size={18} /> 倪海廈導師親授「不知時辰安心心法」：
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.65, margin: 0 }}>
                「算命只是天氣預報，天命只佔三分之一。<strong>生年四化（祿權科忌）完全由出生年份決定，與時辰無關！</strong>
                你的天賦機遇（祿）與防禦漏洞（忌）早已清清楚楚。再加上地紀陽宅名位相符（住西北、調採光）佔三分之一，
                人紀自律修身（看黃帝內經鍛鍊）佔三分之一。就算完全不知時辰，你依然掌握了人生三分之二的主動權，何懼之有！」
              </p>
            </div>
          </div>
        )}

        {/* 命盤引申至倪師思想核心橋樑 */}
        <div style={{
          marginTop: '28px',
          background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.12), rgba(16, 185, 129, 0.08))',
          border: '1px solid var(--border-glow)',
          borderRadius: '14px',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-glow)', fontWeight: 700, fontSize: '1rem', marginBottom: '4px' }}>
              <Compass size={18} /> 命盤已排定，倪師為何說「知命是為了改命」？
            </div>
            <div style={{ fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: 1.55 }}>
              命盤僅揭示<strong>天時與先天性格原型（天紀 1/3）</strong>。要突破化忌阻滯與煞星考驗，必須借力<strong>《地紀》陽宅名位相符法（1/3）</strong>與<strong>《人紀》黃帝內經經方自律（1/3）</strong>。
            </div>
          </div>

          {onNavigateToPhilosophy && (
            <button
              onClick={onNavigateToPhilosophy}
              className="btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                fontSize: '0.92rem',
                boxShadow: '0 4px 16px rgba(217, 119, 6, 0.3)'
              }}
            >
              <span>進一步引申：研習倪師思想核心與五紀體系</span>
              <Sparkles size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

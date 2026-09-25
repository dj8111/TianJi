export interface Lesson {
  id: string;
  moduleIndex: number;
  moduleTitle: string;
  title: string;
  category: 'foundation' | 'archetype' | 'environment' | 'decision';
  feynmanHook: string; // 100字生活比喻
  vernacularConcept: string; // 生活白話拆解
  niOriginalEssence: string; // 倪氏原文理象提煉
  scientificCalibration: string; // 科學與心理校準
  interactiveType?: 'yijing-explorer' | 'ziwei-suite' | 'ziwei-chart' | 'archetype-switcher' | 'bench-simulator' | 'season-flow' | 'bagua-room' | 'case-explorer' | 'bench-and-cases';
  feynmanPrompt: string; // 「教給朋友」的自測問題
  sampleAnswer: string;
}

export interface CaseStudy {
  id: string;
  category: 'career' | 'marriage' | 'housing' | 'health' | 'finance';
  categoryLabel: string;
  title: string;
  scenario: string; // 當前困境與情境描繪
  tianjiSolution: string; // 1. 天紀解法（象數思維＋名位微調）
  traditionalPerspective: string; // 2. 傳統三合/玄空/江湖宿命觀點
  modernDecisionModel: string; // 3. 現代心理學與商業決策模型（費曼生活化）
  takeaway: string; // 核心金句與避坑心得
}

export interface ComparisonItem {
  id: string;
  topic: string;
  feynmanTitle: string;
  niPerspective: string;
  traditionalPerspective: string;
  traditionalSchool: string;
  modernSciencePerspective: string;
  reasonAnalysis: string; // 為什麼倪師這樣主張
}

export interface UserNote {
  lessonId: string;
  feynmanExplanation: string;
  personalReflections: string;
  highlightedQuotes: string[];
  updatedAt: string;
}

export interface StarArchetype {
  name: string;
  group: 'boss' | 'pioneer' | 'adviser' | 'special';
  groupName: string;
  officeRole: string;
  superpower: string;
  blindspot: string;
  stressBehavior: string;
  careerMatch: string[];
  element: string;
}

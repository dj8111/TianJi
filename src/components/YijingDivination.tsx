import React, { useState } from 'react';
import { yijingGuaData, type YijingGua } from '../data/yijingGua';
import { 
  Sparkles, Compass, RefreshCw, ArrowRight, 
  BookOpen, MapPin, 
  Coins, Dices, Brain
} from 'lucide-react';

// 八卦基礎名稱
type TrigramKey = '乾' | '兌' | '離' | '震' | '巽' | '坎' | '艮' | '坤';

// 八卦 3 爻 (由初至上: 0=陰, 1=陽)
const TRIGRAM_BINARY: Record<string, TrigramKey> = {
  '111': '乾', // 乾三連
  '110': '兌', // 兌上缺
  '101': '離', // 離中虛
  '100': '震', // 震仰盂
  '011': '巽', // 巽下斷
  '010': '坎', // 坎中滿
  '001': '艮', // 艮覆碗
  '000': '坤', // 坤六斷
};

// 文王六十四卦速查表 [上卦][下卦] => 卦號 (1..64)
const KING_WEN_MATRIX: Record<TrigramKey, Record<TrigramKey, number>> = {
  '乾': { '乾': 1,  '兌': 10, '離': 13, '震': 25, '巽': 44, '坎': 6,  '艮': 33, '坤': 12 },
  '兌': { '乾': 43, '兌': 58, '離': 49, '震': 17, '巽': 28, '坎': 47, '艮': 31, '坤': 45 },
  '離': { '乾': 14, '兌': 38, '離': 30, '震': 55, '巽': 50, '坎': 64, '艮': 56, '坤': 35 },
  '震': { '乾': 34, '兌': 54, '離': 21, '震': 51, '巽': 32, '坎': 40, '艮': 62, '坤': 16 },
  '巽': { '乾': 9,  '兌': 61, '離': 37, '震': 42, '巽': 57, '坎': 59, '艮': 53, '坤': 20 },
  '坎': { '乾': 5,  '兌': 60, '離': 63, '震': 3,  '巽': 48, '坎': 29, '艮': 39, '坤': 7  },
  '艮': { '乾': 26, '兌': 41, '離': 22, '震': 27, '巽': 18, '坎': 4,  '艮': 52, '坤': 23 },
  '坤': { '乾': 11, '兌': 19, '離': 36, '震': 24, '巽': 46, '坎': 8,  '艮': 15, '坤': 2  },
};

// 單爻結構：6=老陰(變陽), 7=少陽(不變), 8=少陰(不變), 9=老陽(變陰)
export interface Yao {
  value: 6 | 7 | 8 | 9;
  coins: [boolean, boolean, boolean]; // true=正面(陽), false=背面(陰)
  isChanging: boolean;
  baseYinYang: 'yang' | 'yin';
  changedYinYang: 'yang' | 'yin';
}

interface YijingDivinationProps {
  onNavigateToPhilosophy?: () => void;
}

export const YijingDivination: React.FC<YijingDivinationProps> = ({ onNavigateToPhilosophy }) => {
  // 起卦模式：'coins' (三錢法) | 'numbers' (梅花數理) | 'mind' (心念感應)
  const [method, setMethod] = useState<'coins' | 'numbers' | 'mind'>('coins');
  
  // 問事主題
  const [question, setQuestion] = useState<string>('當前事業發展與重大抉擇走向');

  // 三錢法：已搖出的爻列表 (初爻在 index 0，上爻在 index 5)
  const [yaos, setYaos] = useState<Yao[]>([]);
  const [isTossing, setIsTossing] = useState<boolean>(false);
  const [currentCoins, setCurrentCoins] = useState<[boolean, boolean, boolean]>([true, true, false]);

  // 梅花數理起卦輸入
  const [numUpper, setNumUpper] = useState<number>(1);
  const [numLower, setNumLower] = useState<number>(1);
  const [numChange, setNumChange] = useState<number>(1);

  // 卦象結果狀態
  const [hasResult, setHasResult] = useState<boolean>(false);
  const [resultBaseGua, setResultBaseGua] = useState<YijingGua | null>(null);
  const [resultChangedGua, setResultChangedGua] = useState<YijingGua | null>(null);
  const [changingLines, setChangingLines] = useState<number[]>([]);

  // 輔助：根據 6 爻生成本卦與之卦
  const evaluateHexagram = (currentYaos: Yao[]) => {
    if (currentYaos.length !== 6) return;

    // 下卦: 爻 0, 1, 2
    const lowerBinary = `${currentYaos[0].baseYinYang === 'yang' ? 1 : 0}${currentYaos[1].baseYinYang === 'yang' ? 1 : 0}${currentYaos[2].baseYinYang === 'yang' ? 1 : 0}`;
    // 上卦: 爻 3, 4, 5
    const upperBinary = `${currentYaos[3].baseYinYang === 'yang' ? 1 : 0}${currentYaos[4].baseYinYang === 'yang' ? 1 : 0}${currentYaos[5].baseYinYang === 'yang' ? 1 : 0}`;

    const lowerKey = TRIGRAM_BINARY[lowerBinary] || '乾';
    const upperKey = TRIGRAM_BINARY[upperBinary] || '乾';
    const baseGuaNum = KING_WEN_MATRIX[upperKey]?.[lowerKey] || 1;
    const baseGua = yijingGuaData.find(g => g.number === baseGuaNum) || yijingGuaData[0];

    // 動爻
    const cLines: number[] = [];
    currentYaos.forEach((y, idx) => {
      if (y.isChanging) cLines.push(idx + 1); // 1-indexed 初爻到上爻
    });

    // 之卦 (變卦)
    const changedLowerBinary = `${currentYaos[0].changedYinYang === 'yang' ? 1 : 0}${currentYaos[1].changedYinYang === 'yang' ? 1 : 0}${currentYaos[2].changedYinYang === 'yang' ? 1 : 0}`;
    const changedUpperBinary = `${currentYaos[3].changedYinYang === 'yang' ? 1 : 0}${currentYaos[4].changedYinYang === 'yang' ? 1 : 0}${currentYaos[5].changedYinYang === 'yang' ? 1 : 0}`;
    const changedLowerKey = TRIGRAM_BINARY[changedLowerBinary] || '乾';
    const changedUpperKey = TRIGRAM_BINARY[changedUpperBinary] || '乾';
    const changedGuaNum = KING_WEN_MATRIX[changedUpperKey]?.[changedLowerKey] || 1;
    const changedGua = yijingGuaData.find(g => g.number === changedGuaNum) || null;

    setResultBaseGua(baseGua);
    setResultChangedGua(cLines.length > 0 && changedGuaNum !== baseGuaNum ? changedGua : null);
    setChangingLines(cLines);
    setHasResult(true);
  };

  // 三錢擲幣一次
  const tossCoinsOnce = () => {
    if (yaos.length >= 6 || isTossing) return;

    setIsTossing(true);
    // 隨機產生三枚硬幣正反面 (true = 正面字=陽3分, false = 背面背=陰2分)
    const c1 = Math.random() > 0.5;
    const c2 = Math.random() > 0.5;
    const c3 = Math.random() > 0.5;
    setCurrentCoins([c1, c2, c3]);

    setTimeout(() => {
      // 算分: 正面(陽)=3, 背面(陰)=2
      // 3正 = 9 (老陽，動)
      // 2正1背 = 8 (少陰，靜)
      // 1正2背 = 7 (少陽，靜)
      // 3背 = 6 (老陰，動)
      const sum = (c1 ? 3 : 2) + (c2 ? 3 : 2) + (c3 ? 3 : 2);
      let value: 6 | 7 | 8 | 9 = 7;
      if (sum === 9) value = 9;
      else if (sum === 8) value = 8;
      else if (sum === 7) value = 7;
      else if (sum === 6) value = 6;

      const isChanging = value === 6 || value === 9;
      const baseYinYang = (value === 7 || value === 9) ? 'yang' : 'yin';
      const changedYinYang = isChanging 
        ? (baseYinYang === 'yang' ? 'yin' : 'yang')
        : baseYinYang;

      const newYao: Yao = {
        value,
        coins: [c1, c2, c3],
        isChanging,
        baseYinYang,
        changedYinYang
      };

      const updatedYaos = [...yaos, newYao];
      setYaos(updatedYaos);
      setIsTossing(false);

      if (updatedYaos.length === 6) {
        evaluateHexagram(updatedYaos);
      }
    }, 450);
  };

  // 三錢法：一鍵搖完 6 爻
  const tossAllSixTimes = () => {
    const generated: Yao[] = [];
    for (let i = 0; i < 6; i++) {
      const c1 = Math.random() > 0.5;
      const c2 = Math.random() > 0.5;
      const c3 = Math.random() > 0.5;
      const sum = (c1 ? 3 : 2) + (c2 ? 3 : 2) + (c3 ? 3 : 2);
      let value: 6 | 7 | 8 | 9 = 7;
      if (sum === 9) value = 9;
      else if (sum === 8) value = 8;
      else if (sum === 7) value = 7;
      else if (sum === 6) value = 6;

      const isChanging = value === 6 || value === 9;
      const baseYinYang = (value === 7 || value === 9) ? 'yang' : 'yin';
      const changedYinYang = isChanging 
        ? (baseYinYang === 'yang' ? 'yin' : 'yang')
        : baseYinYang;

      generated.push({
        value,
        coins: [c1, c2, c3],
        isChanging,
        baseYinYang,
        changedYinYang
      });
    }

    setYaos(generated);
    setCurrentCoins([generated[5].coins[0], generated[5].coins[1], generated[5].coins[2]]);
    evaluateHexagram(generated);
  };

  // 梅花數理起卦
  const calculateByNumbers = (u: number, l: number, c: number) => {
    const trigramOrder: TrigramKey[] = ['乾', '兌', '離', '震', '巽', '坎', '艮', '坤'];
    // 餘數 1..8
    const uMod = ((u - 1) % 8 + 8) % 8;
    const lMod = ((l - 1) % 8 + 8) % 8;
    const changeLine = ((c - 1) % 6 + 6) % 6 + 1; // 1-indexed

    const upperKey = trigramOrder[uMod];
    const lowerKey = trigramOrder[lMod];

    // 反推爻
    const lowerBinaryMap: Record<TrigramKey, string> = {
      '乾': '111', '兌': '110', '離': '101', '震': '100',
      '巽': '011', '坎': '010', '艮': '001', '坤': '000'
    };
    const lBits = lowerBinaryMap[lowerKey];
    const uBits = lowerBinaryMap[upperKey];
    const allBits = (lBits + uBits).split('').map(b => b === '1' ? 'yang' : 'yin');

    const generated: Yao[] = allBits.map((yy, idx) => {
      const lineNum = idx + 1;
      const isC = lineNum === changeLine;
      const v = yy === 'yang' ? (isC ? 9 : 7) : (isC ? 6 : 8);
      return {
        value: v as 6 | 7 | 8 | 9,
        coins: [true, true, true],
        isChanging: isC,
        baseYinYang: yy as 'yang' | 'yin',
        changedYinYang: isC ? (yy === 'yang' ? 'yin' : 'yang') : (yy as 'yang' | 'yin')
      };
    });

    setYaos(generated);
    evaluateHexagram(generated);
  };

  // 讀取當前時空年月日時
  const applyCurrentTimeNumbers = () => {
    const now = new Date();
    const u = now.getFullYear() + (now.getMonth() + 1) + now.getDate();
    const l = now.getHours() + now.getMinutes();
    const c = (u + l) % 6 || 6;
    setNumUpper(u);
    setNumLower(l);
    setNumChange(c);
    calculateByNumbers(u, l, c);
  };

  // 心念感應起卦
  const tossMindQuick = () => {
    tossAllSixTimes();
  };

  // 重置起卦
  const resetDivination = () => {
    setYaos([]);
    setHasResult(false);
    setResultBaseGua(null);
    setResultChangedGua(null);
    setChangingLines([]);
  };

  const yaoNames = ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'];

  return (
    <div className="glass-panel" style={{ padding: '28px', marginBottom: '30px' }}>
      {/* 標題與引子導引 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '14px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.8rem' }}>☯️</span>
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                易經神機起卦與占卜（天紀筮法引子）
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                倪師云：「易經無它，常理而已。知易者不占，事在人為。」藉由筮法看清當下處境，進而引申修心之道。
              </p>
            </div>
          </div>
        </div>

        {/* 模式切換按鈕組 */}
        <div style={{ display: 'flex', background: 'var(--bg-card-subtle)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border-subtle)', gap: '4px' }}>
          <button
            onClick={() => { setMethod('coins'); resetDivination(); }}
            style={{
              background: method === 'coins' ? 'var(--gold-soft)' : 'transparent',
              color: method === 'coins' ? 'var(--gold-glow)' : 'var(--text-muted)',
              border: method === 'coins' ? '1px solid var(--gold-glow)' : '1px solid transparent',
              padding: '6px 14px',
              borderRadius: '7px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Coins size={14} /> 乾隆三錢搖卦
          </button>
          <button
            onClick={() => { setMethod('numbers'); resetDivination(); }}
            style={{
              background: method === 'numbers' ? 'var(--gold-soft)' : 'transparent',
              color: method === 'numbers' ? 'var(--gold-glow)' : 'var(--text-muted)',
              border: method === 'numbers' ? '1px solid var(--gold-glow)' : '1px solid transparent',
              padding: '6px 14px',
              borderRadius: '7px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Dices size={14} /> 梅花數理起卦
          </button>
          <button
            onClick={() => { setMethod('mind'); resetDivination(); }}
            style={{
              background: method === 'mind' ? 'var(--gold-soft)' : 'transparent',
              color: method === 'mind' ? 'var(--gold-glow)' : 'var(--text-muted)',
              border: method === 'mind' ? '1px solid var(--gold-glow)' : '1px solid transparent',
              padding: '6px 14px',
              borderRadius: '7px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Brain size={14} /> 心念神機感應
          </button>
        </div>
      </div>

      {/* 問事主題輸入 */}
      <div style={{ marginBottom: '22px', background: 'rgba(217, 119, 6, 0.05)', border: '1px solid var(--border-glow)', borderRadius: '12px', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--gold-glow)' }}>
          🎯 所問何事：
        </span>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="例如：新專案創業時機、合夥關係、近期事業抉擇..."
          style={{
            flex: 1,
            minWidth: '240px',
            background: 'var(--bg-card-contrast)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            padding: '7px 14px',
            color: 'var(--text-main)',
            fontSize: '0.9rem',
            outline: 'none'
          }}
        />
        <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
          （心誠則靈，誠意正心，動則有象）
        </span>
      </div>

      {/* 起卦互動控制台 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '28px' }}>
        {/* 左側：搖卦操作區 */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '20px' }}>
          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} color="var(--gold-primary)" />
            {method === 'coins' && '正統乾隆通寶・六搖立卦法'}
            {method === 'numbers' && '時空年月日時／報數取象法'}
            {method === 'mind' && '誠心感應・神機直斷法'}
          </div>

          {/* 模式 1: 乾隆三錢搖卦 */}
          {method === 'coins' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '20px 0', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', marginBottom: '16px' }}>
                {currentCoins.map((isYang, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: isYang 
                        ? 'radial-gradient(circle, #f59e0b 0%, #b45309 80%)'
                        : 'radial-gradient(circle, #78716c 0%, #44403c 80%)',
                      border: '3px solid #d97706',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                      transform: isTossing ? 'rotateY(360deg)' : 'none',
                      transition: 'transform 0.4s ease',
                      textAlign: 'center',
                      lineHeight: 1.2
                    }}
                  >
                    {isYang ? '乾隆\n通寶' : '滿文\n(背)'}
                  </div>
                ))}
              </div>

              <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)', textAlign: 'center', marginBottom: '16px' }}>
                進度：已擲 <strong>{yaos.length}</strong> / 6 爻（由下往上生成初爻至上爻）
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={tossCoinsOnce}
                  disabled={yaos.length >= 6 || isTossing}
                  className="btn-primary"
                  style={{
                    flex: 1,
                    opacity: yaos.length >= 6 ? 0.5 : 1,
                    cursor: yaos.length >= 6 ? 'not-allowed' : 'pointer'
                  }}
                >
                  <Coins size={16} /> 搖擲第 {yaos.length + 1} 爻
                </button>
                <button
                  onClick={tossAllSixTimes}
                  disabled={yaos.length >= 6}
                  className="btn-secondary"
                  style={{ fontSize: '0.85rem' }}
                >
                  一鍵搖完 6 爻
                </button>
                {yaos.length > 0 && (
                  <button
                    onClick={resetDivination}
                    className="btn-secondary"
                    title="重新起卦"
                  >
                    <RefreshCw size={15} />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* 模式 2: 梅花數理起卦 */}
          {method === 'numbers' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-dim)', display: 'block', marginBottom: '4px' }}>上卦數</label>
                  <input
                    type="number"
                    value={numUpper}
                    onChange={(e) => setNumUpper(Number(e.target.value))}
                    style={{ width: '100%', background: 'var(--bg-card-contrast)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '8px', color: 'var(--text-main)', textAlign: 'center' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-dim)', display: 'block', marginBottom: '4px' }}>下卦數</label>
                  <input
                    type="number"
                    value={numLower}
                    onChange={(e) => setNumLower(Number(e.target.value))}
                    style={{ width: '100%', background: 'var(--bg-card-contrast)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '8px', color: 'var(--text-main)', textAlign: 'center' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-dim)', display: 'block', marginBottom: '4px' }}>動爻數</label>
                  <input
                    type="number"
                    value={numChange}
                    onChange={(e) => setNumChange(Number(e.target.value))}
                    style={{ width: '100%', background: 'var(--bg-card-contrast)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '8px', color: 'var(--text-main)', textAlign: 'center' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => calculateByNumbers(numUpper, numLower, numChange)}
                  className="btn-primary"
                  style={{ flex: 1 }}
                >
                  <Dices size={16} /> 依數理起卦
                </button>
                <button
                  onClick={applyCurrentTimeNumbers}
                  className="btn-secondary"
                  style={{ fontSize: '0.85rem' }}
                >
                  當前時空取數
                </button>
              </div>
            </div>
          )}

          {/* 模式 3: 心念神機起卦 */}
          {method === 'mind' && (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '16px', lineHeight: 1.6 }}>
                閉目凝神三秒，心中默念您目前的處境或困惑，隨後點擊下方按鈕感應契機。
              </p>
              <button
                onClick={tossMindQuick}
                className="btn-primary"
                style={{ padding: '10px 24px', fontSize: '1rem' }}
              >
                <Brain size={18} /> 心念所動，一鍵感應起卦
              </button>
            </div>
          )}
        </div>

        {/* 右側：卦爻層疊圖形顯示 */}
        <div style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
            <span>【爻位象數】由下而上疊砌</span>
            <span>{yaos.length > 0 ? `已成 ${yaos.length} 爻` : '尚無爻位'}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: '8px', minHeight: '180px', justifyContent: 'center' }}>
            {[0, 1, 2, 3, 4, 5].map((idx) => {
              const yao = yaos[idx];
              if (!yao) {
                return (
                  <div key={idx} style={{ height: '22px', border: '1px dashed var(--border-subtle)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', fontSize: '0.72rem' }}>
                    {yaoNames[idx]}（待搖）
                  </div>
                );
              }

              const isYang = yao.baseYinYang === 'yang';
              const isMoving = yao.isChanging;

              return (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', width: '38px', textAlign: 'right' }}>
                    {yaoNames[idx]}
                  </span>

                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {isYang ? (
                      // 陽爻 ───
                      <div style={{ flex: 1, height: '14px', background: isMoving ? 'var(--crimson-glow)' : 'var(--gold-primary)', borderRadius: '2px' }} />
                    ) : (
                      // 陰爻 ── ──
                      <>
                        <div style={{ flex: 1, height: '14px', background: isMoving ? 'var(--crimson-glow)' : 'var(--text-dim)', borderRadius: '2px' }} />
                        <div style={{ width: '14px' }} />
                        <div style={{ flex: 1, height: '14px', background: isMoving ? 'var(--crimson-glow)' : 'var(--text-dim)', borderRadius: '2px' }} />
                      </>
                    )}
                  </div>

                  <span style={{ fontSize: '0.75rem', width: '56px', color: isMoving ? '#ef4444' : 'var(--text-dim)', fontWeight: isMoving ? 700 : 400 }}>
                    {yao.value === 9 && '老陽(○動)'}
                    {yao.value === 6 && '老陰(✕動)'}
                    {yao.value === 7 && '少陽(靜)'}
                    {yao.value === 8 && '少陰(靜)'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 卜卦完成：結果精析與引申大道 */}
      {hasResult && resultBaseGua && (
        <div style={{
          background: 'var(--bg-card-contrast)',
          border: '2px solid var(--border-glow)',
          borderRadius: '16px',
          padding: '26px',
          boxShadow: '0 12px 36px rgba(0,0,0,0.25)',
          animation: 'fadeIn 0.5s ease'
        }}>
          {/* 卦象雙重展示：本卦 vs 之卦 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '22px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div>
                <span style={{ fontSize: '3rem', fontFamily: 'serif', color: 'var(--gold-glow)', lineHeight: 1 }}>
                  {resultBaseGua.symbol}
                </span>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--gold-primary)', fontWeight: 600 }}>
                  【本卦・當前時勢】第 {resultBaseGua.number} 卦
                </div>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--text-title)', fontFamily: 'var(--font-serif)', margin: '2px 0' }}>
                  {resultBaseGua.name}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                  上卦：{resultBaseGua.upperTrigram} ｜ 下卦：{resultBaseGua.lowerTrigram}
                </div>
              </div>
            </div>

            {/* 若有變卦 */}
            {resultChangedGua ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'rgba(239, 68, 68, 0.08)', padding: '10px 18px', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
                <ArrowRight size={20} color="#ef4444" />
                <span style={{ fontSize: '2.4rem', fontFamily: 'serif', color: '#ef4444', lineHeight: 1 }}>
                  {resultChangedGua.symbol}
                </span>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#ef4444', fontWeight: 700 }}>
                    【之卦・未來轉機】動爻：{changingLines.join('、')} 爻
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-title)', fontFamily: 'var(--font-serif)' }}>
                    轉為第 {resultChangedGua.number} 卦：{resultChangedGua.name}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ background: 'var(--gold-soft)', padding: '8px 16px', borderRadius: '10px', fontSize: '0.85rem', color: 'var(--gold-glow)', border: '1px solid var(--border-glow)' }}>
                ✨ 六爻皆靜，純看本卦卦辭之理象
              </div>
            )}
          </div>

          {/* 費曼生活白話比喻 */}
          <div style={{
            background: 'var(--gold-soft)',
            borderLeft: '4px solid var(--gold-primary)',
            padding: '14px 18px',
            borderRadius: '0 8px 8px 0',
            marginBottom: '22px',
            fontSize: '0.96rem',
            color: 'var(--text-main)',
            lineHeight: 1.65
          }}>
            💡 <strong>費曼處境比喻：</strong> {resultBaseGua.feynmanHook}
          </div>

          {/* 三道分流精析 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div style={{ background: 'var(--cyan-soft)', border: '1px solid var(--border-subtle)', padding: '16px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--cyan-primary)', fontSize: '0.9rem', fontWeight: 700, marginBottom: '6px' }}>
                <Sparkles size={16} /> 【天機道】天時運行客觀趨勢
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                {resultBaseGua.tianjiDao}
              </p>
            </div>

            <div style={{ background: 'var(--gold-soft)', border: '1px solid var(--gold-glow)', padding: '16px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-primary)', fontSize: '0.9rem', fontWeight: 700, marginBottom: '6px' }}>
                <BookOpen size={16} /> 【人間道】進退存亡處世準則
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                {resultBaseGua.renjianDao}
              </p>
            </div>

            <div style={{ background: 'var(--jade-soft)', border: '1px solid var(--border-subtle)', padding: '16px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--jade-primary)', fontSize: '0.9rem', fontWeight: 700, marginBottom: '6px' }}>
                <MapPin size={16} /> 【地脈道】陽宅名位相符佈局
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                {resultBaseGua.dimaiDao}
              </p>
            </div>
          </div>

          {/* 🌟 核心引申橋樑（The Bridge to Ni's Philosophy） */}
          <div style={{
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
                <Compass size={18} /> 卦已卜定，倪師為何說「知易者不占，事在人為」？
              </div>
              <div style={{ fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: 1.55 }}>
                筮法卦象只是幫您拍下<strong>當前的時空照相機（天紀 1/3）</strong>。真正的轉危為安，關鍵在於藉由《地紀》陽宅名位調整空間磁場（1/3），以及透過《人紀》中醫調和心神與身心自律（1/3）！
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
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { ZiweiChart } from './ZiweiChart';
import { YijingDivination } from './YijingDivination';
import { 
  Sparkles, Compass, ArrowRight, Layers, Heart, BookOpen, 
  ChevronRight, Lightbulb 
} from 'lucide-react';

interface PortalEntranceProps {
  onNavigateToPhilosophy: () => void;
  onNavigateToTab?: (tab: string) => void;
}

export const PortalEntrance: React.FC<PortalEntranceProps> = ({ 
  onNavigateToPhilosophy
}) => {
  // 當前引子模式：'ziwei' (紫微排盤引子) | 'yijing' (易經卜卦引子)
  const [activeHook, setActiveHook] = useState<'ziwei' | 'yijing'>('ziwei');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* 迎賓 Hero 導言：開門見山以雙引子破題 */}
      <div className="glass-panel" style={{
        padding: '32px 30px',
        background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.12) 0%, rgba(30, 41, 59, 0.6) 100%)',
        border: '1px solid var(--border-glow)',
        borderRadius: '18px'
      }}>
        <div style={{ maxWidth: '1000px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--gold-soft)', border: '1px solid var(--border-glow)', padding: '4px 14px', borderRadius: '999px', fontSize: '0.82rem', color: 'var(--gold-glow)', fontWeight: 700, marginBottom: '14px' }}>
            <Sparkles size={14} /> 研習入口 · 雙象推演引子
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.1rem', color: 'var(--text-title)', lineHeight: 1.3, marginBottom: '12px' }}>
            以「紫微命盤」與「易經卜卦」為引子，入倪海廈先生五紀大道
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-main)', lineHeight: 1.7, marginBottom: '20px' }}>
            倪海廈老師一生極力掃除江湖術士恐嚇之劣風。研習《天紀》，<strong>首重親身體驗命盤之原型與卦象之時機</strong>：
            先由<strong>「紫微排盤」</strong>觀照先天格局與化忌盲區，再由<strong>「易經卜卦」</strong>明察當前動態處境與時機吉凶。
            二者皆為<strong>「引子」</strong>（天紀佔 1/3）。知命是為了改命，由盤與卦進而引申出陽宅正位（地紀 1/3）與身心經方自律（人紀 1/3）的至高心法！
          </p>

          {/* 雙引子切換巨型按鈕 */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
            <button
              onClick={() => setActiveHook('ziwei')}
              style={{
                flex: 1,
                minWidth: '260px',
                background: activeHook === 'ziwei' 
                  ? 'linear-gradient(135deg, var(--gold-primary), #b45309)' 
                  : 'rgba(255, 255, 255, 0.05)',
                border: activeHook === 'ziwei' ? '1px solid var(--gold-glow)' : '1px solid var(--border-subtle)',
                color: activeHook === 'ziwei' ? '#fff' : 'var(--text-main)',
                padding: '14px 20px',
                borderRadius: '12px',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                transition: 'all 0.25s ease',
                boxShadow: activeHook === 'ziwei' ? '0 8px 24px rgba(217, 119, 6, 0.3)' : 'none'
              }}
            >
              <div style={{ fontSize: '1.8rem', background: 'rgba(0,0,0,0.2)', padding: '8px 12px', borderRadius: '10px' }}>
                🌌
              </div>
              <div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>
                  【引子一】紫微斗數命盤排盤
                </div>
                <div style={{ fontSize: '0.78rem', opacity: activeHook === 'ziwei' ? 0.9 : 0.7, marginTop: '2px' }}>
                  輸入生辰排盤 · 觀十四主星原型與四化盲區
                </div>
              </div>
            </button>

            <button
              onClick={() => setActiveHook('yijing')}
              style={{
                flex: 1,
                minWidth: '260px',
                background: activeHook === 'yijing' 
                  ? 'linear-gradient(135deg, #059669, #047857)' 
                  : 'rgba(255, 255, 255, 0.05)',
                border: activeHook === 'yijing' ? '1px solid #34d399' : '1px solid var(--border-subtle)',
                color: activeHook === 'yijing' ? '#fff' : 'var(--text-main)',
                padding: '14px 20px',
                borderRadius: '12px',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                transition: 'all 0.25s ease',
                boxShadow: activeHook === 'yijing' ? '0 8px 24px rgba(5, 150, 105, 0.3)' : 'none'
              }}
            >
              <div style={{ fontSize: '1.8rem', background: 'rgba(0,0,0,0.2)', padding: '8px 12px', borderRadius: '10px' }}>
                ☯️
              </div>
              <div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>
                  【引子二】易經神機筮法起卦
                </div>
                <div style={{ fontSize: '0.78rem', opacity: activeHook === 'yijing' ? 0.9 : 0.7, marginTop: '2px' }}>
                  乾隆三錢搖卦 · 察 64 卦處境照相機與天機動爻
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 引子主體展示區 */}
      <div>
        {activeHook === 'ziwei' ? (
          <div>
            <div style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--gold-glow)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                ✦ 正在運行：引子一 · 紫微斗數十二宮命盤排盤引擎
              </span>
              <button
                onClick={() => setActiveHook('yijing')}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                切換為易經起卦引子 <ChevronRight size={14} />
              </button>
            </div>
            <ZiweiChart onNavigateToPhilosophy={onNavigateToPhilosophy} />
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--jade-primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                ✦ 正在運行：引子二 · 易經神機起卦與占卜（三錢搖卦・梅花數理）
              </span>
              <button
                onClick={() => setActiveHook('ziwei')}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                切換為紫微排盤引子 <ChevronRight size={14} />
              </button>
            </div>
            <YijingDivination onNavigateToPhilosophy={onNavigateToPhilosophy} />
          </div>
        )}
      </div>

      {/* 關鍵樞紐：從「引子」昇華至「倪師學習內容與思想核心」 */}
      <div className="glass-panel" style={{
        padding: '32px',
        background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.08), rgba(16, 185, 129, 0.06))',
        border: '2px solid var(--border-glow)',
        borderRadius: '18px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '22px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Compass size={26} color="var(--gold-glow)" />
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--text-title)' }}>
                大象已現，何以立命？——從「術數引子」引申入「倪師思想核心」
              </h2>
            </div>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', marginTop: '4px' }}>
              排了盤、起了卦，若只停留於吉凶算命，便落入了江湖俗套。倪師帶給我們的是一套完整的<strong>身心天地決策哲學</strong>：
            </p>
          </div>

          <button
            onClick={onNavigateToPhilosophy}
            className="btn-primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              fontSize: '0.98rem',
              fontWeight: 700,
              boxShadow: '0 6px 20px rgba(217, 119, 6, 0.35)'
            }}
          >
            <span>展開倪師思想核心 ＆ 五紀全譜專區</span>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* 三大引申維度導引卡片 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
          <div 
            onClick={onNavigateToPhilosophy}
            style={{
              background: 'var(--bg-card-contrast)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '14px',
              padding: '20px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--gold-glow)', fontWeight: 700, marginBottom: '8px' }}>
              <Layers size={20} />
              <span>1. 三才鼎立：三條腿板凳哲學</span>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              天命只佔三分之一，另外三分之二是<strong>陽宅名位（地紀）</strong>與<strong>經方身心修養（人紀）</strong>。命盤有煞不可怕，三足鼎立方能坐得四平八穩。
            </p>
            <div style={{ fontSize: '0.78rem', color: 'var(--gold-primary)', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              深入研習思想第一柱石 <ChevronRight size={12} />
            </div>
          </div>

          <div 
            onClick={onNavigateToPhilosophy}
            style={{
              background: 'var(--bg-card-contrast)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '14px',
              padding: '20px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--jade-primary)', fontWeight: 700, marginBottom: '8px' }}>
              <Heart size={20} />
              <span>2. 醫易同源：天地人身小宇宙</span>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              不知易者不足以言大醫。易經六十四卦的陰陽消長，即黃帝內經的氣血流注。斗數「化忌」是冬藏充電期，扶陽去寒方能長保生機。
            </p>
            <div style={{ fontSize: '0.78rem', color: 'var(--jade-primary)', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              深入研習思想第二柱石 <ChevronRight size={12} />
            </div>
          </div>

          <div 
            onClick={onNavigateToPhilosophy}
            style={{
              background: 'var(--bg-card-contrast)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '14px',
              padding: '20px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--cyan-primary)', fontWeight: 700, marginBottom: '8px' }}>
              <BookOpen size={20} />
              <span>3. 倪師五紀學習傳承全圖譜</span>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              從《天紀》命理易象，到《地紀》名位相符，再到《人紀》黃帝內經、針灸大成、神農本草與傷寒金匱，系統化進階研習。
            </p>
            <div style={{ fontSize: '0.78rem', color: 'var(--cyan-primary)', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              查看完整五紀學習地圖 <ChevronRight size={12} />
            </div>
          </div>

          <div 
            onClick={onNavigateToPhilosophy}
            style={{
              background: 'var(--bg-card-contrast)',
              border: '1px solid var(--border-glow)',
              borderRadius: '14px',
              padding: '20px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#f59e0b', fontWeight: 700, marginBottom: '8px' }}>
              <Lightbulb size={20} />
              <span>4. 費曼大白話解讀六大重點</span>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              不背口訣、不玩玄虛！用儀表板、新創團隊、四季更迭、供暖水電等生活極致比喻，零門檻看懂倪師學問本質。
            </p>
            <div style={{ fontSize: '0.78rem', color: '#f59e0b', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              前往費曼大白話解讀專題 <ChevronRight size={12} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

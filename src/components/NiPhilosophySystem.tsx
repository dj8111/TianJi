import React, { useState } from 'react';
import { 
  Compass, Heart, BookOpen, Layers, Shield, Sparkles, 
  MapPin, ArrowRight, Activity, Flame, Eye, 
  ExternalLink, Award, Lightbulb
} from 'lucide-react';

interface NiPhilosophySystemProps {
  onNavigateToTab?: (tab: string) => void;
}

export const NiPhilosophySystem: React.FC<NiPhilosophySystemProps> = ({ onNavigateToTab }) => {
  // 選中的思想核心分頁：'core' (四大思想核心) | 'feynman' (費曼大白話解讀六大重點) | 'curriculum' (五紀學習體系) | 'roadmap' (五階研習路徑) | 'principles' (倪師金句與辨偽)
  const [activeTab, setActiveTab] = useState<'core' | 'feynman' | 'curriculum' | 'roadmap' | 'principles'>('core');
  const [selectedPillar, setSelectedPillar] = useState<number>(1);
  const [selectedFeynmanTopic, setSelectedFeynmanTopic] = useState<number>(1);
  const [selectedBook, setSelectedBook] = useState<string>('tianji');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 頂部氣勢大橫幅 */}
      <div className="glass-panel" style={{ 
        padding: '36px 32px', 
        position: 'relative', 
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.12) 0%, rgba(16, 185, 129, 0.08) 50%, rgba(6, 182, 212, 0.08) 100%)',
        border: '1px solid var(--border-glow)'
      }}>
        <div style={{ maxWidth: '960px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--gold-soft)', border: '1px solid var(--border-glow)', padding: '5px 14px', borderRadius: '999px', fontSize: '0.82rem', color: 'var(--gold-glow)', fontWeight: 700, marginBottom: '14px' }}>
            <Sparkles size={14} /> 倪海廈先生學術思想總覽 ＆ 五紀經典修習全圖譜
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--text-title)', lineHeight: 1.3, marginBottom: '14px' }}>
            仰觀天文以明天紀，俯察地理以正地紀，中通人事以立人紀
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-main)', lineHeight: 1.7, marginBottom: '16px' }}>
            倪師常言：<strong>「算命知命，不是要你認命，而是要你改命！」</strong> 
            排盤與卜卦只是看清天時與稟賦的「引子」（天紀 1/3）。要真正立於不敗之地，必須透過居住空間名位相符（地紀 1/3）與身心經方自律（人紀 1/3），三才合一，方能坐得四平八穩。
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <span style={{ fontSize: '0.82rem', background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: '6px', color: 'var(--gold-primary)', border: '1px solid var(--border-subtle)' }}>
              ✦ 醫易同源
            </span>
            <span style={{ fontSize: '0.82rem', background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: '6px', color: 'var(--jade-primary)', border: '1px solid var(--border-subtle)' }}>
              ✦ 三才鼎立 (天1/3 地1/3 人1/3)
            </span>
            <span style={{ fontSize: '0.82rem', background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: '6px', color: 'var(--cyan-primary)', border: '1px solid var(--border-subtle)' }}>
              ✦ 大道至簡・重象重理
            </span>
            <span style={{ fontSize: '0.82rem', background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: '6px', color: '#f59e0b', border: '1px solid var(--border-subtle)' }}>
              ✦ 人間道實踐
            </span>
          </div>
        </div>
      </div>

      {/* 導航切換按鈕列 */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveTab('core')}
          className={`nav-tab-btn ${activeTab === 'core' ? 'active' : ''}`}
        >
          <Sparkles size={16} /> 思想核心四大支柱
        </button>
        <button
          onClick={() => setActiveTab('feynman')}
          className={`nav-tab-btn ${activeTab === 'feynman' ? 'active' : ''}`}
          style={{ fontWeight: activeTab === 'feynman' ? 700 : 500 }}
        >
          <Lightbulb size={16} color={activeTab === 'feynman' ? 'var(--gold-glow)' : 'currentColor'} /> 
          費曼大白話解讀六大重點
        </button>
        <button
          onClick={() => setActiveTab('curriculum')}
          className={`nav-tab-btn ${activeTab === 'curriculum' ? 'active' : ''}`}
        >
          <BookOpen size={16} /> 倪師五紀經典傳承全譜
        </button>
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`nav-tab-btn ${activeTab === 'roadmap' ? 'active' : ''}`}
        >
          <Compass size={16} /> 五階通透修習地圖
        </button>
        <button
          onClick={() => setActiveTab('principles')}
          className={`nav-tab-btn ${activeTab === 'principles' ? 'active' : ''}`}
        >
          <Shield size={16} /> 大道至簡・破除江湖迷信
        </button>
      </div>

      {/* 內容分頁 1：四大思想核心 */}
      {activeTab === 'core' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* 四大柱石選擇器 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
            {[
              { id: 1, title: '天人地「三才鼎立」', sub: '三條腿板凳哲學，命操在己', icon: Layers, color: 'var(--gold-primary)' },
              { id: 2, title: '醫易同源・天人相應', sub: '易經通經絡，化忌即冬藏', icon: Heart, color: 'var(--jade-primary)' },
              { id: 3, title: '大道至簡・重象重理', sub: '摒除雜星神煞，以自然大象斷事', icon: Eye, color: 'var(--cyan-primary)' },
              { id: 4, title: '人間道至上・事在人為', sub: '知常達變，防微杜漸以立命', icon: Award, color: '#f59e0b' }
            ].map(p => {
              const isSelected = selectedPillar === p.id;
              const Icon = p.icon;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPillar(p.id)}
                  style={{
                    background: isSelected ? 'var(--bg-card-contrast)' : 'var(--bg-card-subtle)',
                    border: isSelected ? `2px solid ${p.color}` : '1px solid var(--border-subtle)',
                    borderRadius: '14px',
                    padding: '16px 20px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 8px 24px rgba(0,0,0,0.2)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.06)', padding: '8px', borderRadius: '10px' }}>
                      <Icon size={20} color={p.color} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>核心柱石 0{p.id}</div>
                      <div style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-title)' }}>{p.title}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{p.sub}</div>
                </div>
              );
            })}
          </div>

          {/* 柱石 1 詳細內容 */}
          {selectedPillar === 1 && (
            <div className="glass-panel" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Layers size={24} color="var(--gold-glow)" />
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--text-title)' }}>
                  柱石一：天人地「三才鼎立」哲學（三條腿的木凳）
                </h2>
              </div>

              <div style={{ background: 'var(--gold-soft)', borderLeft: '4px solid var(--gold-primary)', padding: '16px 20px', borderRadius: '0 8px 8px 0', marginBottom: '22px' }}>
                <p style={{ fontSize: '0.96rem', color: 'var(--text-main)', lineHeight: 1.65 }}>
                  💬 <strong>倪師原音重現：</strong>「天命占三分之一，地紀占三分之一，人為努力與醫術占三分之一。如果你去算命，算命師告訴你注定要離婚、注定要破產，那是江湖術士！如果命不能改，那學易經天紀有何用？天命是天氣預報，下雨你可以撐傘（地紀）、多穿衣服強健體魄（人紀），命運的三分之二完全握在你自己手中！」
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px', marginBottom: '24px' }}>
                <div style={{ background: 'rgba(217, 119, 6, 0.06)', border: '1px solid var(--border-glow)', borderRadius: '12px', padding: '18px' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--gold-glow)', marginBottom: '8px' }}>
                    1. 天紀 (占 1/3) —— 先天時機與稟賦
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                    涵蓋<strong>紫微斗數排盤</strong>與<strong>易經卦象時機</strong>。它呈現的是客觀外部環境的週期（春夏秋冬）與個人的性格原型稟賦。知道何時是順境、何時是逆境，學會順應天時。
                  </p>
                </div>

                <div style={{ background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', padding: '18px' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--jade-primary)', marginBottom: '8px' }}>
                    2. 地紀 (占 1/3) —— 空間名位與環境暗示
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                    涵蓋<strong>陽宅名位相符法</strong>與<strong>室內小太極佈局</strong>。環境心理學對人的大腦與內分泌有極深潛在暗示。父居乾位、長子居東，使人人各得其所，彌補天命星曜之偏枯。
                  </p>
                </div>

                <div style={{ background: 'rgba(6, 182, 212, 0.06)', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '12px', padding: '18px' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--cyan-primary)', marginBottom: '8px' }}>
                    3. 人紀 (占 1/3) —— 經方中醫與自律修為
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                    涵蓋<strong>黃帝內經調心</strong>、<strong>針灸經絡疏通</strong>與<strong>仲景經方扶陽</strong>。身體健康與心性修為是人生一切的基石。心正身健，神氣內守，則病邪不侵、凶禍自避。
                  </p>
                </div>
              </div>

              {onNavigateToTab && (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={() => onNavigateToTab('sandbox')} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    前往互動演練沙盒：體驗三條腿板凳平衡器 <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 柱石 2 詳細內容 */}
          {selectedPillar === 2 && (
            <div className="glass-panel" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Heart size={24} color="var(--jade-primary)" />
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--text-title)' }}>
                  柱石二：醫易同源，天人相應（身心大宇宙模型）
                </h2>
              </div>

              <div style={{ background: 'rgba(16, 185, 129, 0.08)', borderLeft: '4px solid var(--jade-primary)', padding: '16px 20px', borderRadius: '0 8px 8px 0', marginBottom: '22px' }}>
                <p style={{ fontSize: '0.96rem', color: 'var(--text-main)', lineHeight: 1.65 }}>
                  💬 <strong>倪師金句：</strong>「孫思邈講『不知易者不足以言大醫』。大自然有風雨寒暑、四季更迭；人身就是天地之縮影，有喜怒憂思恐、氣血經絡流注。易經裡講的水火既濟，在中醫就是心火下交於腎水、腎水上濟於心火。天地之通塞即人體之虛實！」
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '20px' }}>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '18px' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--gold-glow)', marginBottom: '8px' }}>
                    🍂 化忌即是冬藏，絕非詛咒
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.65 }}>
                    在紫微斗數中，江湖術士常言「化忌」為癌症、凶災。但在倪師視角中，<strong>化祿是春、化權是夏、化科是秋、化忌是冬</strong>。冬天萬物凋零，是為了蓄精養銳。「冬不藏精，春必溫病」。命宮或流年逢化忌，乃老天警示應當放緩腳步、內省沉澱、守成修補，不可盲目冒進。
                  </p>
                </div>

                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '18px' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--jade-primary)', marginBottom: '8px' }}>
                    🔥 陽氣生生不息，百病因寒而生
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.65 }}>
                    易經以「乾陽」為萬物創生之本，《黃帝內經》亦言「陽氣者，若天與日，失其所則折壽而不彰」。倪師一生力抗濫用苦寒與化學藥劑，主張以經方扶陽去寒、宣通經脈，陽氣充沛則陰霾自散，百邪不入。
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 柱石 3 詳細內容 */}
          {selectedPillar === 3 && (
            <div className="glass-panel" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Eye size={24} color="var(--cyan-primary)" />
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--text-title)' }}>
                  柱石三：大道至簡，重象重常理（破除江湖恐慌詐術）
                </h2>
              </div>

              <div style={{ background: 'rgba(6, 182, 212, 0.08)', borderLeft: '4px solid var(--cyan-primary)', padding: '16px 20px', borderRadius: '0 8px 8px 0', marginBottom: '22px' }}>
                <p style={{ fontSize: '0.96rem', color: 'var(--text-main)', lineHeight: 1.65 }}>
                  💬 <strong>倪師犀利批判：</strong>「江湖術士算命，給你排上一百多顆小星星，滿盤都是紅鸞、天喜、喪門、吊客、截空，把人嚇得半死，目的就是叫你買符、作法事、改運！大道至簡！十四顆正曜、三方四正、四化飛星看清楚，格局大象就定了。易經無它，天地常理而已！」
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '20px' }}>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '18px' }}>
                  <div style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '8px' }}>
                    ✦ 以自然大象取代文字迷信
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                    水往低處流（坎為水）、火往高處竄（離為火）、日出東方朝氣蓬勃（太陽居卯為日照雷門）。不用死背口訣，凡事只要還原到大自然日常現象，人人皆能判斷吉凶進退。
                  </p>
                </div>

                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '18px' }}>
                  <div style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '8px' }}>
                    ✦ 建立理性防火牆
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                    任何以恐懼為訴求的算命都是偽法。真正正統的術數，聽完後是讓人「心性清明、責任明確、知所進退」，而不是惶惶不可終日。
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 柱石 4 詳細內容 */}
          {selectedPillar === 4 && (
            <div className="glass-panel" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Award size={24} color="#f59e0b" />
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--text-title)' }}>
                  柱石四：人間道至上，知常達變（知命盡人事）
                </h2>
              </div>

              <div style={{ background: 'rgba(245, 158, 11, 0.08)', borderLeft: '4px solid #f59e0b', padding: '16px 20px', borderRadius: '0 8px 8px 0', marginBottom: '22px' }}>
                <p style={{ fontSize: '0.96rem', color: 'var(--text-main)', lineHeight: 1.65 }}>
                  💬 <strong>倪師教誨：</strong>「六十四卦中，天機道是宇宙運轉，地脈道是空間名位，而最最核心、人人隨時能做到的就是<strong>【人間道】</strong>！處蒙昧之時則主動求師受教，處需卦之時則耐心蓄勢待發，處訟卦之時及早和解止訟。君子見微知著，防微杜漸，這才是大智慧。」
                </p>
              </div>

              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '20px' }}>
                <div style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '8px' }}>
                  🎯 現代生活與職場的人間道實踐準則
                </div>
                <ul style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.7, paddingLeft: '20px', margin: 0 }}>
                  <li><strong>進退有度：</strong> 得意時思及亢龍有悔，居安思危；困頓時念及否極泰來，不失其志。</li>
                  <li><strong>名位相符：</strong> 身在何位，盡何責任。為人子則孝悌，為領導則公正剛明，不越俎代庖。</li>
                  <li><strong>反求諸己：</strong> 遇事不怪風水、不怨八字。先審視自己言行決策有無漏洞，再微調周遭環境。</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 內容分頁 1.5：費曼大白話詳細解讀倪海廈六大學習重點 */}
      {activeTab === 'feynman' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* 費曼解說法導言 */}
          <div className="glass-panel" style={{ padding: '24px 28px', background: 'rgba(217, 119, 6, 0.06)', border: '1px solid var(--border-glow)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Lightbulb size={24} color="var(--gold-glow)" />
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--text-title)' }}>
                什麼是「費曼解說法」？——把玄奧古法轉譯為人人秒懂的生活常理
              </h2>
            </div>
            <p style={{ fontSize: '0.94rem', color: 'var(--text-main)', lineHeight: 1.7, margin: 0 }}>
              諾貝爾物理學獎得主理查·費曼（Richard Feynman）的核心哲學是：<strong>如果你不能用最淺白的大白話向外行人講清楚本質，就代表你根本沒有真正理解它。</strong>
              倪海廈先生授課最迷人之處，正是將傳統玄之又玄的術數與中醫，還原為大自然的常理。
              本專區<strong>不要求您做任何填空自測</strong>，而是由我們透過極致貼切的生活比喻（行車儀表板、團隊分工、四季輪轉、水電暖氣、心理暗示、極限平衡），帶您透徹看清倪師六大學習重點！
            </p>
          </div>

          {/* 六大重點選擇按鈕群 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
            {[
              { id: 1, title: '① 易經六十四卦', metaphor: '人生 64 種處境的高清天氣預報與行車儀表板', category: '天紀 · 易學', color: 'var(--gold-primary)' },
              { id: 2, title: '② 紫微格局與主星', metaphor: '現代新創跨國公司的 14 人部門團隊角色適配', category: '天紀 · 斗數', color: 'var(--jade-primary)' },
              { id: 3, title: '③ 四化飛星(祿權科忌)', metaphor: '大自然的春夏秋冬更迭與作業簿上的紅筆訂正', category: '天紀 · 四化', color: 'var(--cyan-primary)' },
              { id: 4, title: '④ 陽宅名位相符(地紀)', metaphor: '空間環境對大腦與家庭角色的無形催眠心理學', category: '地紀 · 名位', color: '#f59e0b' },
              { id: 5, title: '⑤ 內經五臟與治未病', metaphor: '人體內部的城市水電供暖系統與情志生理反應', category: '人紀 · 內經', color: '#8b5cf6' },
              { id: 6, title: '⑥ 傷寒經方扶陽去寒', metaphor: '借用天地動植物極端性格的物理級深層平衡術', category: '人紀 · 經方', color: '#ef4444' }
            ].map(item => {
              const isSelected = selectedFeynmanTopic === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedFeynmanTopic(item.id)}
                  style={{
                    background: isSelected ? 'var(--bg-card-contrast)' : 'var(--bg-card-subtle)',
                    border: isSelected ? `2px solid ${item.color}` : '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '16px 18px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 6px 20px rgba(0,0,0,0.2)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-title)' }}>
                      {item.title}
                    </span>
                    <span style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '4px', color: item.color, border: '1px solid var(--border-subtle)' }}>
                      {item.category}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: isSelected ? 'var(--text-main)' : 'var(--text-dim)', lineHeight: 1.45 }}>
                    💡 比喻：{item.metaphor}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 選定重點之深層費曼四維解剖 */}
          <div className="glass-panel" style={{ padding: '28px' }}>
            {selectedFeynmanTopic === 1 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <Sparkles size={24} color="var(--gold-glow)" />
                  <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--text-title)' }}>
                    【重點一】易經六十四卦 ➔ 費曼生活解說：64 種人生處境的高清天氣預報與行車儀表板
                  </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '22px' }}>
                  {/* 傳統誤區 */}
                  <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px' }}>
                      ✕ 傳統玄奧難題（江湖偽法）
                    </div>
                    <div style={{ fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                      死記納甲、世應生剋與艱澀辭藻。把卜卦當作神鬼宿命宣判，算到凶卦就惶恐不安、求神畫符。
                    </div>
                  </div>

                  {/* 費曼生活比喻 */}
                  <div style={{ background: 'rgba(217, 119, 6, 0.06)', border: '1px solid var(--border-glow)', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ color: 'var(--gold-glow)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px' }}>
                      💡 費曼生活大白話比喻
                    </div>
                    <div style={{ fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                      就像開車時看行車儀表板與天氣預報。《乾卦》是油門踩到底的大卡車，動力最強，但在頂點不減速（亢龍有悔）必定翻車；《屯卦》是暴風雨中種子剛破土，創業初期先扎根找隊友，絕不能急踩油門！
                    </div>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-title)', fontSize: '0.95rem', marginBottom: '8px' }}>
                    📖 倪師真傳底層原理（去神秘化）
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.7, margin: 0 }}>
                    倪師主張「易經無它，常理而已」。仰觀天文、俯察地理、中通人事。64 卦不是宿命論，而是大自然 64 種客觀物理規律。水往低處流（坎為水險）、火往高處竄（離為火明）、物極必反是宇宙恆定律。明理者看清情勢走向，知何時該進、何時該止。
                  </p>
                </div>

                <div style={{ background: 'var(--jade-soft)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px 20px' }}>
                  <div style={{ fontWeight: 700, color: 'var(--jade-primary)', fontSize: '0.92rem', marginBottom: '4px' }}>
                    🎯 現代生活與職場決策對策：
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                    把每一卦當作決策啟發模型（Decision Heuristic）：處順境思謙遜（謙卦吉無不利），處困境思和解（天水訟退一步海闊天空），把被動焦慮轉化為主動戰略。
                  </div>
                </div>
              </div>
            )}

            {selectedFeynmanTopic === 2 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <Sparkles size={24} color="var(--jade-primary)" />
                  <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--text-title)' }}>
                    【重點二】紫微斗數格局與十四主星 ➔ 費曼生活解說：現代跨國新創公司的 14 人部門團隊角色適配
                  </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '22px' }}>
                  <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px' }}>
                      ✕ 傳統玄奧難題（江湖偽法）
                    </div>
                    <div style={{ fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                      堆砌上百顆神煞小星，恐嚇「七殺主孤獨克夫、破軍主敗家破產」，把星曜當作懲罰與賞賜的神仙。
                    </div>
                  </div>

                  <div style={{ background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ color: 'var(--jade-primary)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px' }}>
                      💡 費曼生活大白話比喻
                    </div>
                    <div style={{ fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                      就像一家公司的跨部門合作：紫微天府是 CEO 與財務長（定制度、顧面子）；七殺破軍貪狼（殺破狼）是金牌業務與特種部隊（敢冒險、打破常規，適合開拓全新市場）；機月同梁是法務企劃與人資（守規矩、重秩序，但不適合上前線幹架）。
                    </div>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-title)', fontSize: '0.95rem', marginBottom: '8px' }}>
                    📖 倪師真傳底層原理（去神秘化）
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.7, margin: 0 }}>
                    倪師獨尊十四正曜＋三方四正大格局。主張「天生我材必有用，無所謂好星爛星，全在角色定位是否對稱」。煞星（羊陀火鈴）是強大阻力轉化而來的爆發力與開拓衝勁；吉星（左右昌曲）若安於現狀反而成為溫水煮青蛙。
                  </p>
                </div>

                <div style={{ background: 'var(--gold-soft)', border: '1px solid var(--border-glow)', borderRadius: '12px', padding: '16px 20px' }}>
                  <div style={{ fontWeight: 700, color: 'var(--gold-glow)', fontSize: '0.92rem', marginBottom: '4px' }}>
                    🎯 現代生活與職場決策對策：
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                    不要拿著命盤自我設限！若是殺破狼坐命，大膽投入新創開拓或業務一線；若是機月同梁坐命，在成熟體制內深耕專業。知己之短長，互補合作，即是造命。
                  </div>
                </div>
              </div>
            )}

            {selectedFeynmanTopic === 3 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <Sparkles size={24} color="var(--cyan-primary)" />
                  <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--text-title)' }}>
                    【重點三】四化飛星（祿權科忌） ➔ 費曼生活解說：大自然的春夏秋冬更迭與考卷上的紅筆訂正提醒
                  </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '22px' }}>
                  <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px' }}>
                      ✕ 傳統玄奧難題（江湖偽法）
                    </div>
                    <div style={{ fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                      化忌被視為天譴、破產、死期、癌症，算命師以此逼迫顧客掏錢買符改運、做法事消災。
                    </div>
                  </div>

                  <div style={{ background: 'rgba(6, 182, 212, 0.06)', border: '1px solid rgba(6, 182, 212, 0.25)', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ color: 'var(--cyan-primary)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px' }}>
                      💡 費曼生活大白話比喻
                    </div>
                    <div style={{ fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                      四化就是四季時鐘：化祿是春天播種（機遇湧現）、化權是夏日拼搏（權力擴張）、化科是秋季豐收（名譽口碑）、化忌是冬天休養（樹葉凋零、休養蓄銳）。化忌不是死刑，而是老師在作業簿上用紅筆劃的一個「需複習檢查的紅叉」！
                    </div>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-title)', fontSize: '0.95rem', marginBottom: '8px' }}>
                    📖 倪師真傳底層原理（去神秘化）
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.7, margin: 0 }}>
                    倪師強調「祿為因、忌為果」。冬不藏精，春必溫病。化忌落在哪個宮位，代表人生在那裡有認知漏洞或過度執念。化忌在財帛就踩緊煞車不借貸不投機；化忌在夫妻就多包容溝通不爭鋒芒。反求諸己、藏鋒守正，化忌反而能轉化為最深厚的人生護城河。
                  </p>
                </div>

                <div style={{ background: 'rgba(6, 182, 212, 0.08)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px 20px' }}>
                  <div style={{ fontWeight: 700, color: 'var(--cyan-primary)', fontSize: '0.92rem', marginBottom: '4px' }}>
                    🎯 現代生活與職場決策對策：
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                    大運流年逢化忌時，不要開拓新項目，而是專注內部流程優化、降槓桿、還債、鍛鍊身體。以守為攻，即為聖人之道。
                  </div>
                </div>
              </div>
            )}

            {selectedFeynmanTopic === 4 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <Sparkles size={24} color="#f59e0b" />
                  <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--text-title)' }}>
                    【重點四】陽宅名位相符法（地紀） ➔ 費曼生活解說：空間環境對大腦與家庭角色的無形催眠心理學
                  </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '22px' }}>
                  <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px' }}>
                      ✕ 傳統玄奧難題（江湖偽法）
                    </div>
                    <div style={{ fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                      羅盤量度數差一線就「出卦出煞」，動輒要求信眾砸錢敲牆改門、買昂貴山海鎮貔貅。
                    </div>
                  </div>

                  <div style={{ background: 'rgba(245, 158, 11, 0.06)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ color: '#f59e0b', fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px' }}>
                      💡 費曼生活大白話比喻
                    </div>
                    <div style={{ fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                      空間對人有極強烈的心理暗示！如果讓一個 10 歲小學生天天坐在董事長寬大的真皮高背椅上向全家發號施令，執行長坐走廊小板凳，不出三個月，小學生必定跋扈專橫，執行長必定委靡消沉。房間位置決定了家庭角色的權力與心理責任！
                    </div>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-title)', fontSize: '0.95rem', marginBottom: '8px' }}>
                    📖 倪師真傳底層原理（去神秘化）
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.7, margin: 0 }}>
                    倪師主張「名位相符，地紀補天紀之不足」。父親居西北乾位（一家之主）剛健中正；母親居西南坤位（主母）柔順持家；長男居正東震位（朝陽之木）奮發開拓。名位一正，各司其職。現代小公寓隨處立小太極，床頭靠實遠離廁所穢氣，工作桌朝向採光，環境自然安神聚氣。
                  </p>
                </div>

                <div style={{ background: 'var(--gold-soft)', border: '1px solid var(--border-glow)', borderRadius: '12px', padding: '16px 20px' }}>
                  <div style={{ fontWeight: 700, color: 'var(--gold-glow)', fontSize: '0.92rem', marginBottom: '4px' }}>
                    🎯 現代生活與職場決策對策：
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                    不必花一毛錢敲牆！檢視全家人臥房分布，讓孩子住符合輩分的方位，讓父母住主位；單身公寓劃分睡眠區與工作區，環境整潔通風，磁場立刻煥然一新。
                  </div>
                </div>
              </div>
            )}

            {selectedFeynmanTopic === 5 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <Sparkles size={24} color="#8b5cf6" />
                  <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--text-title)' }}>
                    【重點五】黃帝內經五臟與治未病 ➔ 費曼生活解說：人體內部的城市水電暖氣系統與情志生理反應
                  </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '22px' }}>
                  <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px' }}>
                      ✕ 傳統玄奧難題（江湖偽法）
                    </div>
                    <div style={{ fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                      把五行生剋背得滾瓜爛熟，遇到身體病痛卻依賴改命祈福，忽視生活起居與情緒毒素對內臟的實質物理摧毀。
                    </div>
                  </div>

                  <div style={{ background: 'rgba(139, 92, 246, 0.06)', border: '1px solid rgba(139, 92, 246, 0.25)', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ color: '#8b5cf6', fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px' }}>
                      💡 費曼生活大白話比喻
                    </div>
                    <div style={{ fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                      人體就像一座現代化城市的供暖供水網：心臟是中央加熱鍋爐與循環水泵，腎臟是冷水庫。心臟暖氣下沉加熱腎水，水氣化蒸騰成雲霧潤澤肺部，肺部再像降雨般滋潤全身。暴怒讓肝臟血管暴縮（怒傷肝），焦慮讓胃腸缺血停擺（思傷脾），驚恐讓腎上腺紊亂（恐傷腎）。
                    </div>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-title)', fontSize: '0.95rem', marginBottom: '8px' }}>
                    📖 倪師真傳底層原理（去神秘化）
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.7, margin: 0 }}>
                    倪師講透《黃帝內經》核心：陽氣者若天與日，失其所則折壽而不彰。所有頑固寒濕病變，根源皆在人體暖氣爐（心火、腎陽）衰微。不治已病治未病，晚上 11 點（子時）膽經當令熟睡，清晨排便排毒，順應四時氣候，百邪自然不能干擾。
                  </p>
                </div>

                <div style={{ background: 'var(--cyan-soft)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px 20px' }}>
                  <div style={{ fontWeight: 700, color: 'var(--cyan-primary)', fontSize: '0.92rem', marginBottom: '4px' }}>
                    🎯 現代生活與職場決策對策：
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                    管理情緒就是管理免疫力！面臨高壓時主動深呼吸調節交感神經，嚴格守住睡眠作息，不吃生冷寒涼損耗陽氣。
                  </div>
                </div>
              </div>
            )}

            {selectedFeynmanTopic === 6 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <Sparkles size={24} color="#ef4444" />
                  <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--text-title)' }}>
                    【重點六】傷寒經方扶陽祛寒 ➔ 費曼生活解說：借用天地動植物極端性格的物理級深層平衡術
                  </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '22px' }}>
                  <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px' }}>
                      ✕ 傳統玄奧難題（江湖偽法）
                    </div>
                    <div style={{ fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                      動輒開出數十味補藥大雜燴，或者見發炎就濫用苦寒清熱藥，反將患者體內陽氣徹底澆滅。
                    </div>
                  </div>

                  <div style={{ background: 'rgba(239, 68, 68, 0.06)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px' }}>
                      💡 費曼生活大白話比喻
                    </div>
                    <div style={{ fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                      就像一間陰冷發霉的房間，如果只用消毒水狂噴黴菌（微觀殺菌），只要房間依然陰冷潮濕，黴菌兩天後又會長滿。經方的做法是：搬一台大功率暖氣爐進屋（生附子、乾薑、桂枝），打開門窗讓空氣對流（麻黃解表），把陽光引進來！房間溫暖乾燥了，黴菌自然無處遁形！
                    </div>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-title)', fontSize: '0.95rem', marginBottom: '8px' }}>
                    📖 倪師真傳底層原理（去神秘化）
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.7, margin: 0 }}>
                    倪師一生力倡漢唐經方（張仲景傷寒金匱）。中藥非玄學，乃「天地動植物偏性之借力」。生石膏性至寒，大渴大熱時如天降甘霖迅速清熱且絕不損元氣；生附子性極熱，破冰融雪救回垂絕陽氣。以天地之大偏，糾正人體之偏頗。
                  </p>
                </div>

                <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px 20px' }}>
                  <div style={{ fontWeight: 700, color: '#ef4444', fontSize: '0.92rem', marginBottom: '4px' }}>
                    🎯 現代生活與職場決策對策：
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                    懂得「扶陽祛寒」的底層思維：遇到身體問題先看整體環境（體溫、氣血循環、水分代謝），改善大環境勝過在細枝末節糾纏。
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 內容分頁 2：五紀經典傳承全譜 */}
      {activeTab === 'curriculum' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
            {[
              { id: 'tianji', name: '《天紀》', tag: '紫微斗數・易經象數', color: 'var(--gold-primary)' },
              { id: 'dimai', name: '《地紀》', tag: '勘輿名位・環境心理', color: 'var(--jade-primary)' },
              { id: 'neijing', name: '《人紀・黃帝內經》', tag: '陰陽臟象・治未病', color: 'var(--cyan-primary)' },
              { id: 'zhenjiu', name: '《人紀・針灸大成》', tag: '經絡流注・神針急救', color: '#8b5cf6' },
              { id: 'shanghan', name: '《人紀・本草與傷寒》', tag: '神農經方・扶陽救逆', color: '#ef4444' }
            ].map(book => {
              const isSelected = selectedBook === book.id;
              return (
                <button
                  key={book.id}
                  onClick={() => setSelectedBook(book.id)}
                  style={{
                    background: isSelected ? 'var(--bg-card-contrast)' : 'var(--bg-card-subtle)',
                    border: isSelected ? `2px solid ${book.color}` : '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontSize: '0.98rem', fontWeight: 700, color: isSelected ? book.color : 'var(--text-title)' }}>
                    {book.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                    {book.tag}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 書籍詳情 */}
          <div className="glass-panel" style={{ padding: '28px' }}>
            {selectedBook === 'tianji' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <Sparkles size={24} color="var(--gold-glow)" />
                  <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--text-title)' }}>
                    《天紀》全集（83講・命理與易學天道篇）
                  </h3>
                </div>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.7, marginBottom: '20px' }}>
                  倪師早年於台北傳授之巨著。分為<strong>「紫微斗數論命篇」</strong>與<strong>「易經六十四卦象數與人間道篇」</strong>。獨尊十四正曜與大格局，摒棄雜曜；將易經拆解為天機道（大自然）、人間道（為人處事）與地脈道（住家方位）。
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                  <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '16px' }}>
                    <div style={{ fontWeight: 700, color: 'var(--gold-glow)', fontSize: '0.92rem', marginBottom: '6px' }}>
                      ① 紫微斗數大格局原型
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      巨日同宮（善言開創）、殺破狼（破局先鋒）、機月同梁（公卿幕僚）、府相朝垣。重視三方四正與大氣魄，化忌為盲區提醒。
                    </div>
                  </div>

                  <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '16px' }}>
                    <div style={{ fontWeight: 700, color: 'var(--gold-glow)', fontSize: '0.92rem', marginBottom: '6px' }}>
                      ② 易經三道分流
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      天機道測算時機天時，人間道指導職場決策與是非善惡，地脈道定位住宅方位。以常理取象，不尚空談。
                    </div>
                  </div>

                  <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '16px' }}>
                    <div style={{ fontWeight: 700, color: 'var(--gold-glow)', fontSize: '0.92rem', marginBottom: '6px' }}>
                      ③ 圖形思維與推背圖
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      推倡直觀圖形解碼法。卦中有畫、畫中有理，跳脫文字獄與刻板教條，直探象數精髓。
                    </div>
                  </div>
                </div>

                {onNavigateToTab && (
                  <button onClick={() => onNavigateToTab('playlists')} className="btn-secondary" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ExternalLink size={14} /> 前往天紀 83 集經典影音播放清單
                  </button>
                )}
              </div>
            )}

            {selectedBook === 'dimai' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <MapPin size={24} color="var(--jade-primary)" />
                  <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--text-title)' }}>
                    《地紀》（名位相符法與地理勘輿環境篇）
                  </h3>
                </div>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.7, marginBottom: '20px' }}>
                  倪師獨步天下的<strong>「陽宅名位相符法」</strong>：地紀能補天紀之不足。拋棄玄空理氣動輒敲牆改門之高昂代價，回歸八卦後天定位——父親住西北乾位、母親居西南坤位、長子住正東震位。名位相符則一家安和，名位不符則性情偏差。
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                  <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '16px' }}>
                    <div style={{ fontWeight: 700, color: 'var(--jade-primary)', fontSize: '0.92rem', marginBottom: '6px' }}>
                      ① 乾父坤母・正位安居
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      父親居乾位得剛健之風，事業有魄力；若長女居西北則脾氣剛暴似男兒。透過房間調度，重塑家庭責任動力學。
                    </div>
                  </div>

                  <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '16px' }}>
                    <div style={{ fontWeight: 700, color: 'var(--jade-primary)', fontSize: '0.92rem', marginBottom: '6px' }}>
                      ② 現代公寓「小太極」
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      套房單室隨處可立極。以臥室中心為原點，床頭靠實、避開穢氣、書桌臨光，隨處皆可營造安神專注之磁場。
                    </div>
                  </div>
                </div>

                {onNavigateToTab && (
                  <button onClick={() => onNavigateToTab('sandbox')} className="btn-secondary" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    前往八卦房間模擬器：親自演練房間調度 <ArrowRight size={14} />
                  </button>
                )}
              </div>
            )}

            {selectedBook === 'neijing' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <Heart size={24} color="var(--cyan-primary)" />
                  <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--text-title)' }}>
                    《人紀・黃帝內經》（中醫醫理與生理病理總綱）
                  </h3>
                </div>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.7, marginBottom: '20px' }}>
                  中醫聖經，人紀之基石。倪師以極為生動的大白話，拆解陰陽應象大論、臟象學說、五運六氣與四時調攝。強調「不治已病治未病」，將七情六慾（怒傷肝、喜傷心、思傷脾、憂傷肺、恐傷腎）轉譯為心理調攝法門。
                </p>

                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '16px', marginBottom: '20px' }}>
                  <div style={{ fontWeight: 700, color: 'var(--cyan-primary)', fontSize: '0.92rem', marginBottom: '6px' }}>
                    核心心法：順應四時與氣血流注
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.65 }}>
                    春生、夏長、秋收、冬藏。子時膽經當令宜酣睡，卯時大腸經當令宜晨起排毒。破除術數命理對壽夭的恐慌，確立「正氣存內，邪不可干」的生命自主防禦體系。
                  </div>
                </div>
              </div>
            )}

            {selectedBook === 'zhenjiu' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <Activity size={24} color="#8b5cf6" />
                  <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--text-title)' }}>
                    《人紀・針灸大成》（79集・經絡流注與神針急救）
                  </h3>
                </div>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.7, marginBottom: '20px' }}>
                  倪師針灸造詣登峰造極，融匯楊繼洲《針灸大成》精華。詳解人體正經十二脈與奇經八脈氣血流向，精通五俞穴（井滎俞經合）子母補瀉法、原絡配穴法，以及面臨昏厥危急時之「回陽九針」立竿見影之法。
                </p>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '16px' }}>
                  <div style={{ fontWeight: 700, color: '#8b5cf6', fontSize: '0.92rem', marginBottom: '6px' }}>
                    經絡即生命網絡
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.65 }}>
                    氣血不通則痛，通則不痛。透過穴道之得氣與導引，調動人體自癒力，使身心重歸陰陽平衡。
                  </div>
                </div>
              </div>
            )}

            {selectedBook === 'shanghan' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <Flame size={24} color="#ef4444" />
                  <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--text-title)' }}>
                    《人紀・神農本草經》＆《傷寒金匱》（經方正統扶陽大宗）
                  </h3>
                </div>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.7, marginBottom: '20px' }}>
                  中醫臨床之最高殿堂。倪師尊張仲景為醫聖，倡導漢唐經方之神威。精闢剖析神農本草經動植物之偏性以糾正人體偏頗，辨識傷寒六經傳變（太陽、陽明、少陽、太陰、少陰、厥陰），以石膏、麻黃、桂枝、附子等經方大劑救逆，重燃生命真火。
                </p>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '16px' }}>
                  <div style={{ fontWeight: 700, color: '#ef4444', fontSize: '0.92rem', marginBottom: '6px' }}>
                    扶陽救逆，正本清源
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.65 }}>
                    人體以陽氣為根本。凡寒濕凝滯之頑疾，皆以溫陽散寒、活血行水為治則。此乃醫易通達之極致體現。
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 內容分頁 3：五階通透修習地圖 */}
      {activeTab === 'roadmap' && (
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <Compass size={24} color="var(--gold-glow)" />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--text-title)' }}>
              研習倪師學問五階進階指南（學習階梯）
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              {
                step: '第 1 階',
                title: '【學卜以明幾】易經取象與動態思維',
                goal: '學會用乾隆三錢起卦或心念抽卦，看懂 64 卦的人生處境照相機。明白「物極必反」與「亢龍有悔」之自然法則。',
                action: '點擊頂部「易經神機起卦」或「易經 64 卦寶庫」體驗。'
              },
              {
                step: '第 2 階',
                title: '【推命以知己】紫微斗數大格局與性格原型',
                goal: '排出自己生辰八字命盤，認清命宮主星、身宮、三方四正。把十四星當團隊分工，把化忌當冬藏修心。',
                action: '點擊頂部「紫微排盤引擎」輸入生辰即時產盤。'
              },
              {
                step: '第 3 階',
                title: '【正位以安居】陽宅名位相符生活設計',
                goal: '在自家庭院或小公寓立「小太極」，讓家庭角色與空間方位對齊（父居乾、母居坤），化解星盤衝突，創造安定磁場。',
                action: '前往「陽宅與三才沙盒」親自模擬換房間之能量轉變。'
              },
              {
                step: '第 4 階',
                title: '【調形以養神】黃帝內經與身心健康防線',
                goal: '落實子午流注睡眠作息，調理情志。認識十二經脈，學習預防醫學理念，不被疾病與命理焦慮所困。',
                action: '研讀系統課堂「模組六：身心合一人紀健康防線」。'
              },
              {
                step: '第 5 階',
                title: '【三才以通達】知天命、明地理、盡人事',
                goal: '超越宿命論，胸懷坦蕩。知命而無畏，處順境不傲，處逆境不餒，成為自強不息的現代智者。',
                action: '融會貫通天人地三才，自主掌舵人生。'
              }
            ].map((s, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '18px 22px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px'
                }}
              >
                <div style={{
                  background: 'linear-gradient(135deg, var(--gold-primary), #b45309)',
                  color: '#fff',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap'
                }}>
                  {s.step}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '4px' }}>
                    {s.title}
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '6px' }}>
                    {s.goal}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--gold-glow)' }}>
                    👉 建議實踐：{s.action}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 內容分頁 4：大道至簡・破除江湖迷信 */}
      {activeTab === 'principles' && (
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <Shield size={24} color="#ef4444" />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--text-title)' }}>
              大道至簡：倪海廈破除江湖術士套路對照表
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '18px', marginBottom: '24px' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.06)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '12px', padding: '18px' }}>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ef4444', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                ✕ 江湖術士話術陷阱
              </div>
              <ul style={{ fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: 1.7, paddingLeft: '20px', margin: 0 }}>
                <li>滿盤幾百顆神煞小星，恐嚇「紅鸞見血、亡神劫財」。</li>
                <li>斷言「命帶七殺必孤獨終老、生化忌必生惡疾」。</li>
                <li>恐嚇命運不可改，除非花費數十萬「買法器、改名字、畫符做法事」。</li>
                <li>把風水搞得神神秘秘，要求改門敲牆動大工程。</li>
              </ul>
            </div>

            <div style={{ background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '12px', padding: '18px' }}>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--jade-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                ✓ 倪海廈正道天紀主張
              </div>
              <ul style={{ fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: 1.7, paddingLeft: '20px', margin: 0 }}>
                <li>大道至簡，獨尊十四正曜與三方四正大格局。</li>
                <li>七殺是開拓先鋒，化忌是冬藏反省，絕無好壞之別。</li>
                <li>命運掌在自己手裡（天紀1/3、地紀1/3、人紀1/3），反求諸己勝過求神拜佛。</li>
                <li>名位相符法零成本：換房間住（乾父、坤母、震長男），調整動線採光。</li>
              </ul>
            </div>
          </div>

          <div style={{ background: 'var(--gold-soft)', border: '1px solid var(--border-glow)', borderRadius: '12px', padding: '16px 20px', fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
            🛡️ <strong>研習核心正念：</strong> 術數是幫助我們看清自身局限與時機趨勢的工具。明理以養心，正氣以立身。知命者不怨天，知己者不尤人。
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Sun, Sparkles, Award, ShieldAlert } from 'lucide-react';

export const SeasonFlowSimulator: React.FC = () => {
  const [activeSeason, setActiveSeason] = useState<'lu' | 'quan' | 'ke' | 'ji'>('lu');

  const seasons = [
    {
      id: 'lu' as const,
      name: '化祿',
      season: '春天·發芽甦醒',
      catalyst: '欲望、機遇、資金到位',
      vernacular: '就像春雨過後種子萌發，想嘗試新專案、熱錢進來、機遇變多。讓人想擴張，但要注意不可過度膨脹或盲目借貸。',
      mindset: '順應春生：主動播種、廣結善緣、抓住浪潮。',
      color: 'var(--jade-primary)',
      icon: <Sparkles size={20} />
    },
    {
      id: 'quan' as const,
      name: '化權',
      season: '夏天·繁茂狂長',
      catalyst: '掌控、話語權、執行力拉滿',
      vernacular: '正午驕陽似火，執行力拉到最高，想當主導者，說話算數。容易變成雷厲風行的鐵腕主管，但也易因剛愎自用得罪人。',
      mindset: '順應夏長：果斷執行、扛起責任、學習柔和溝通。',
      color: 'var(--crimson-primary)',
      icon: <Sun size={20} />
    },
    {
      id: 'ke' as const,
      name: '化科',
      season: '秋天·碩果收成',
      catalyst: '名譽、學術、形象光環',
      vernacular: '秋高氣爽拿獎狀。成果受到社會認可，文質彬彬、講道理、注重聲譽。適合發表著作、考試升等、建立權威。',
      mindset: '順應秋收：沉澱成果、愛惜羽毛、謙遜明理。',
      color: 'var(--cyan-primary)',
      icon: <Award size={20} />
    },
    {
      id: 'ji' as const,
      name: '化忌',
      season: '冬天·藏鋒修整',
      catalyst: '阻礙、執念、漏洞提示燈',
      vernacular: '寒冬大地休養生息。遇到卡局、心裡有牽掛放不下。它不是詛咒，而是作業本上被老師打的紅叉，逼你停下來修補漏洞！',
      mindset: '順應冬藏：踩下煞車、內省蓄力、填補技能盲區。',
      color: 'var(--gold-primary)',
      icon: <ShieldAlert size={20} />
    },
  ];

  const current = seasons.find((s) => s.id === activeSeason) || seasons[0];

  return (
    <div className="glass-panel" style={{ padding: '24px', marginTop: '20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.15rem', color: 'var(--text-title)', fontFamily: 'var(--font-serif)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🍂 四化能量四季輪轉：生命時鐘催化劑
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          四化絕非孤立的死星，而是自然界的時空節奏。點選切換體驗春、夏、秋、冬的能量流動：
        </p>
      </div>

      {/* 四季按鈕 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px' }}>
        {seasons.map((s) => {
          const isSelected = s.id === activeSeason;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSeason(s.id)}
              style={{
                background: isSelected ? 'var(--gold-soft)' : 'var(--bg-card-subtle)',
                color: isSelected ? 'var(--gold-primary)' : 'var(--text-muted)',
                border: `1px solid ${isSelected ? 'var(--gold-primary)' : 'var(--border-subtle)'}`,
                borderRadius: '10px',
                padding: '12px 6px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.15s ease',
                fontWeight: isSelected ? 700 : 500
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.95rem' }}>
                {s.icon} {s.name}
              </div>
              <span style={{ fontSize: '0.72rem', opacity: isSelected ? 1 : 0.7 }}>
                {s.season}
              </span>
            </button>
          );
        })}
      </div>

      {/* 詳細卡片（完全融入主題，無大黑塊） */}
      <div style={{
        background: 'var(--bg-card-contrast)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '14px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.35rem', fontWeight: 700, fontFamily: 'var(--font-serif)', color: current.color }}>
              【{current.name}】{current.season}
            </span>
          </div>
          <span style={{ fontSize: '0.82rem', background: 'var(--bg-card)', color: 'var(--text-title)', padding: '3px 10px', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontWeight: 600 }}>
            催化本質：{current.catalyst}
          </span>
        </div>

        <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '14px', lineHeight: 1.65 }}>
          {current.vernacular}
        </p>

        <div style={{
          background: 'var(--gold-soft)',
          borderLeft: `4px solid ${current.color}`,
          padding: '12px 16px',
          borderRadius: '0 8px 8px 0',
          fontSize: '0.88rem',
          color: 'var(--text-main)'
        }}>
          💡 <strong>費曼決策心法：</strong> {current.mindset}
        </div>
      </div>
    </div>
  );
};

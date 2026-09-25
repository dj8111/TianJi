import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, RefreshCw } from 'lucide-react';

export const BenchSimulator: React.FC = () => {
  const [tian, setTian] = useState<number>(30); // 天命/大環境 0-100
  const [di, setDi] = useState<number>(80);   // 地紀/環境空間 0-100
  const [ren, setRen] = useState<number>(85);  // 人紀/自律與選擇 0-100

  // 總支撐力 = (tian*0.33 + di*0.33 + ren*0.33)
  const totalScore = Math.round((tian * 0.333) + (di * 0.333) + (ren * 0.333));
  
  const getStatus = () => {
    if (totalScore >= 70) {
      return {
        title: '板凳穩如泰山！',
        color: 'var(--jade-primary)',
        desc: '即便先天時運欠佳（天紀偏低），但藉由陽宅空間的良性暗示（地紀）與清醒積極的自主抉擇（人紀），板凳依然無比穩固！'
      };
    } else if (totalScore >= 45) {
      return {
        title: '略有晃動，尚能支撐',
        color: 'var(--amber-warning)',
        desc: '處於逆境過渡期。請加強生活作息自律、尋求專業醫療建議，或微調住家動線，將板凳扶正。'
      };
    } else {
      return {
        title: '搖搖欲墜，急需扶正',
        color: 'var(--crimson-primary)',
        desc: '天時低迷且個人選擇消極、環境雜亂。請記住：天命無法更改，但今晚就能把房間打掃乾淨，明天就能開始健康飲食！'
      };
    }
  };

  const status = getStatus();

  return (
    <div className="glass-panel" style={{ padding: '24px', marginTop: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
        <h3 style={{ fontSize: '1.15rem', color: 'var(--text-title)', fontFamily: 'var(--font-serif)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🪑 三條腿的圓木凳：天人地動態平衡模擬器
        </h3>
        <button 
          onClick={() => { setTian(30); setDi(80); setRen(85); }}
          className="btn-secondary"
          style={{ fontSize: '0.8rem', padding: '4px 10px' }}
        >
          <RefreshCw size={13} /> 恢復預設
        </button>
      </div>

      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
        傳統宿命論認為「天命決定 100%」。拖動下方滑桿親自體驗：當天命時運陷入低谷時，只要「地紀（空間暗示）」與「人紀（自律決策）」拉滿，人生板凳依然穩固！
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {/* 第一條腿：天紀 */}
        <div style={{ background: 'var(--bg-card-contrast)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--gold-primary)', fontWeight: 700 }}>1. 天紀 (先天時運 / 天氣)</span>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-title)' }}>{tian}%</span>
          </div>
          <input 
            type="range" min="10" max="100" value={tian} 
            onChange={(e) => setTian(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--gold-primary)', cursor: 'pointer' }}
          />
          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '4px' }}>出廠設定與客觀大環境</div>
        </div>

        {/* 第二條腿：地紀 */}
        <div style={{ background: 'var(--bg-card-contrast)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--jade-primary)', fontWeight: 700 }}>2. 地紀 (空間環境 / 習慣)</span>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-title)' }}>{di}%</span>
          </div>
          <input 
            type="range" min="10" max="100" value={di} 
            onChange={(e) => setDi(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--jade-primary)', cursor: 'pointer' }}
          />
          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '4px' }}>房間採光、名位相符、生活動線</div>
        </div>

        {/* 第三條腿：人紀 */}
        <div style={{ background: 'var(--bg-card-contrast)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--cyan-primary)', fontWeight: 700 }}>3. 人紀 (自律醫學 / 決策)</span>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-title)' }}>{ren}%</span>
          </div>
          <input 
            type="range" min="10" max="100" value={ren} 
            onChange={(e) => setRen(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--cyan-primary)', cursor: 'pointer' }}
          />
          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '4px' }}>主動自律、看醫生、心態修為</div>
        </div>
      </div>

      {/* 視覺化板凳狀態（乾淨融合） */}
      <div style={{
        background: 'var(--bg-card-contrast)',
        border: `1.5px solid ${status.color}`,
        borderRadius: '12px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        {totalScore >= 70 ? (
          <ShieldCheck size={36} color={status.color} style={{ flexShrink: 0 }} />
        ) : (
          <AlertTriangle size={36} color={status.color} style={{ flexShrink: 0 }} />
        )}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <span style={{ fontSize: '1.05rem', fontWeight: 700, color: status.color }}>
              {status.title}
            </span>
            <span style={{ fontSize: '0.8rem', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', padding: '2px 8px', borderRadius: '999px', color: 'var(--text-title)', fontWeight: 600 }}>
              人生抗風險指數：{totalScore} 分
            </span>
          </div>
          <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.55 }}>
            {status.desc}
          </div>
        </div>
      </div>
    </div>
  );
};

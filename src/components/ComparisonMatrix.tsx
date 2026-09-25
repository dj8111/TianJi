import React, { useState } from 'react';
import { comparisonsData } from '../data/comparisons';

import { Scale, Sparkles, BookOpen, Brain, HelpCircle } from 'lucide-react';

export const ComparisonMatrix: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(comparisonsData[0].id);

  const currentItem = comparisonsData.find((c) => c.id === selectedId) || comparisonsData[0];

  return (
    <div className="glass-panel" style={{ padding: '28px', marginBottom: '30px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Scale size={24} color="var(--gold-glow)" />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#fff' }}>
              跨派照妖鏡：各大門派深度對照與成因剖析
            </h2>
          </div>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
            探究傳統術數如何看、倪海廈《天紀》如何取捨，以及背後的根本成因與現代科學轉譯。
          </p>
        </div>
      </div>

      {/* 課題選單切換 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
        {comparisonsData.map((item) => {
          const isSelected = item.id === selectedId;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              style={{
                background: isSelected 
                  ? 'linear-gradient(135deg, var(--gold-primary), #b45309)' 
                  : 'rgba(255, 255, 255, 0.04)',
                color: isSelected ? '#fff' : 'var(--text-muted)',
                border: isSelected ? '1px solid var(--gold-glow)' : '1px solid var(--border-subtle)',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '0.88rem',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.2s ease'
              }}
            >
              {item.topic.split('：')[0]}
            </button>
          );
        })}
      </div>

      {/* 核心對照展示 */}
      <div style={{
        background: 'var(--bg-card-contrast)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '16px',
        padding: '24px'
      }}>
        <div style={{ marginBottom: '18px', paddingBottom: '14px', borderBottom: '1px solid var(--border-subtle)' }}>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--text-title)', fontFamily: 'var(--font-serif)' }}>
            {currentItem.topic}
          </h3>
          <div style={{ fontSize: '0.88rem', color: 'var(--gold-primary)', marginTop: '4px', fontWeight: 600 }}>
            費曼生活化定位：{currentItem.feynmanTitle}
          </div>
        </div>

        {/* 三欄對比 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {/* 天紀取向 */}
          <div style={{
            background: 'var(--gold-soft)',
            border: '1px solid var(--border-glow)',
            borderRadius: '12px',
            padding: '18px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-primary)', fontSize: '0.9rem', fontWeight: 700, marginBottom: '8px' }}>
              <Sparkles size={16} /> 倪海廈《天紀》原版取向
            </div>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.7 }}>
              {currentItem.niPerspective}
            </div>
          </div>

          {/* 傳統主流派系 */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            padding: '18px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 700, marginBottom: '8px' }}>
              <BookOpen size={16} /> 傳統主流門派觀點
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--cyan-primary)', marginBottom: '6px', fontWeight: 600 }}>
              代表流派：{currentItem.traditionalSchool}
            </div>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.7 }}>
              {currentItem.traditionalPerspective}
            </div>
          </div>

          {/* 現代科學與心理學 */}
          <div style={{
            background: 'var(--jade-soft)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            padding: '18px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--jade-primary)', fontSize: '0.9rem', fontWeight: 700, marginBottom: '8px' }}>
              <Brain size={16} /> 現代科學與行為決策轉譯
            </div>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.7 }}>
              {currentItem.modernSciencePerspective}
            </div>
          </div>
        </div>

        {/* 成因剖析（為什麼倪師這樣主張） */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-glow)',
          borderRadius: '12px',
          padding: '18px 22px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-primary)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>
            <HelpCircle size={18} /> 💡 為什麼倪師這樣主張？（底層成因深入剖析）
          </div>
          <div style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.75 }}>
            {currentItem.reasonAnalysis}
          </div>
        </div>
      </div>
    </div>
  );
};

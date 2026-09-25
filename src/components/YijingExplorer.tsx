import React, { useState } from 'react';
import { yijingGuaData } from '../data/yijingGua';
import { Compass, Search, BookOpen, MapPin, Lightbulb, Sparkles } from 'lucide-react';

export const YijingExplorer: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(yijingGuaData[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredGua = yijingGuaData.filter((g) => {
    return g.name.includes(searchQuery) || 
           g.feynmanHook.includes(searchQuery) ||
           g.decisionGuide.includes(searchQuery);
  });

  const currentGua = yijingGuaData.find((g) => g.id === selectedId) || yijingGuaData[0];

  return (
    <div className="glass-panel" style={{ padding: '28px', marginBottom: '30px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Compass size={24} color="var(--gold-glow)" />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--text-title)' }}>
              易經六十四卦生活處境寶庫（天機道・人間道・地脈道）
            </h2>
          </div>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
            倪師主張「易經無它，常理而已」。查閱各卦的自然規律（天機道）、處事準則（人間道）與陽宅名位配對（地脈道）。
          </p>
        </div>

        {/* 搜尋框 */}
        <div style={{ position: 'relative', width: '240px' }}>
          <Search size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '10px' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜尋卦名或情境..."
            style={{
              width: '100%',
              background: 'var(--bg-card-subtle)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '8px 12px 8px 36px',
              color: 'var(--text-main)',
              fontSize: '0.88rem',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* 卦象選單按鈕列 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
        {filteredGua.map((item) => {
          const isSelected = item.id === selectedId;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              style={{
                background: isSelected 
                  ? 'linear-gradient(135deg, var(--gold-primary), #b45309)' 
                  : 'rgba(255, 255, 255, 0.04)',
                color: isSelected ? '#fff' : 'var(--text-main)',
                border: isSelected ? '1px solid var(--gold-glow)' : '1px solid var(--border-subtle)',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.88rem',
                cursor: 'pointer',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ fontSize: '1.2rem', fontFamily: 'serif' }}>{item.symbol}</span>
              <span>第{item.number}卦 {item.name}</span>
            </button>
          );
        })}
      </div>

      {/* 卦象精解卡片 */}
      <div style={{
        background: 'var(--bg-card-contrast)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '16px',
        padding: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '14px', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '2.5rem', fontFamily: 'serif', color: 'var(--gold-glow)' }}>
              {currentGua.symbol}
            </span>
            <div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--text-title)', fontFamily: 'var(--font-serif)' }}>
                第 {currentGua.number} 卦：{currentGua.name}
              </h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                上卦：{currentGua.upperTrigram} ｜ 下卦：{currentGua.lowerTrigram}
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--gold-soft)', color: 'var(--gold-primary)', padding: '6px 14px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, border: '1px solid var(--border-glow)' }}>
            處境相機
          </div>
        </div>

        {/* 費曼白話比喻 */}
        <div style={{
          background: 'var(--gold-soft)',
          borderLeft: '4px solid var(--gold-primary)',
          padding: '14px 18px',
          borderRadius: '0 8px 8px 0',
          marginBottom: '20px',
          fontSize: '0.95rem',
          color: 'var(--text-main)',
          lineHeight: 1.6
        }}>
          💡 <strong>生活白話比喻：</strong> {currentGua.feynmanHook}
        </div>

        {/* 三道分流精解 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          {/* 天機道 */}
          <div style={{ background: 'var(--cyan-soft)', border: '1px solid var(--border-subtle)', padding: '16px', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--cyan-primary)', fontSize: '0.9rem', fontWeight: 700, marginBottom: '8px' }}>
              <Sparkles size={16} /> 【天機道】大自然運行趨勢
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.65 }}>
              {currentGua.tianjiDao}
            </p>
          </div>

          {/* 人間道 */}
          <div style={{ background: 'var(--gold-soft)', border: '1px solid var(--gold-glow)', padding: '16px', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-primary)', fontSize: '0.9rem', fontWeight: 700, marginBottom: '8px' }}>
              <BookOpen size={16} /> 【人間道】為人處事與決策準則
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.65 }}>
              {currentGua.renjianDao}
            </p>
          </div>

          {/* 地脈道 */}
          <div style={{ background: 'var(--jade-soft)', border: '1px solid var(--border-subtle)', padding: '16px', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--jade-primary)', fontSize: '0.9rem', fontWeight: 700, marginBottom: '8px' }}>
              <MapPin size={16} /> 【地脈道】陽宅名位相符佈局
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.65 }}>
              {currentGua.dimaiDao}
            </p>
          </div>
        </div>

        {/* 現代決策指南 */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', padding: '16px 20px', borderRadius: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-title)', fontSize: '0.92rem', fontWeight: 700, marginBottom: '6px' }}>
            <Lightbulb size={17} color="var(--cyan-primary)" /> 現代個人與職場決策指南：
          </div>
          <div style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
            {currentGua.decisionGuide}
          </div>
        </div>
      </div>
    </div>
  );
};

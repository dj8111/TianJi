import React, { useState } from 'react';
import { casesData } from '../data/casesData';
import { BookOpen, Sparkles, Brain, CheckCircle2, Search, ShieldAlert } from 'lucide-react';

export const CaseExplorer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCaseId, setSelectedCaseId] = useState<string>(casesData[0].id);

  const categories = [
    { key: 'all', label: `全部案例 (${casesData.length})` },
    { key: 'career', label: '職涯創業' },
    { key: 'marriage', label: '婚戀家庭' },
    { key: 'housing', label: '居住買房' },
    { key: 'finance', label: '財務投資' },
    { key: 'health', label: '身心健康' },
  ];

  const filteredCases = casesData.filter((item) => {
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.scenario.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.takeaway.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const activeCase = casesData.find((c) => c.id === selectedCaseId) || filteredCases[0] || casesData[0];

  return (
    <div className="glass-panel" style={{ padding: '28px', marginTop: '24px' }}>
      {/* 頂部標題 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Sparkles size={22} color="var(--gold-primary)" />
            <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--text-title)' }}>
              跨學派整合實戰微案例庫（完整 20 大情境深度會診）
            </h2>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            每一案例均並列「天紀象數＋名位解法」、「傳統門派宿命視角」與「現代心理/商業決策模型」，培養跳脫恐慌的獨立思辨力。
          </p>
        </div>

        <div style={{ background: 'var(--gold-soft)', border: '1px solid var(--border-glow)', padding: '5px 14px', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--gold-primary)', fontWeight: 700 }}>
          收錄 20 / 20 完整案例
        </div>
      </div>

      {/* 搜尋與分類過濾列 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        {/* 分類按鈕群 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              style={{
                background: selectedCategory === cat.key ? 'var(--gold-primary)' : 'var(--bg-card-contrast)',
                color: selectedCategory === cat.key ? '#ffffff' : 'var(--text-main)',
                border: '1px solid var(--border-subtle)',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.82rem',
                cursor: 'pointer',
                fontWeight: selectedCategory === cat.key ? 700 : 500,
                transition: 'all 0.15s ease'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 搜尋輸入框 */}
        <div style={{ position: 'relative', width: '220px' }}>
          <Search size={15} color="var(--text-dim)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜尋案例關鍵字..."
            style={{
              width: '100%',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '6px',
              padding: '6px 10px 6px 30px',
              fontSize: '0.82rem',
              color: 'var(--text-main)',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* 主體佈局：左側清單快速選取 + 右側三方會診詳解 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(260px, 320px) 1fr', gap: '18px' }}>
        {/* 左側案例索引清單 */}
        <div style={{
          maxHeight: '620px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          paddingRight: '6px'
        }}>
          {filteredCases.map((item) => {
            const isSelected = item.id === activeCase.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedCaseId(item.id)}
                style={{
                  background: isSelected ? 'var(--gold-soft)' : 'var(--bg-card-contrast)',
                  border: isSelected ? '1.5px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: item.category === 'career' ? 'var(--gold-soft)' : item.category === 'marriage' ? 'var(--crimson-soft)' : item.category === 'housing' ? 'var(--jade-soft)' : item.category === 'health' ? 'var(--cyan-soft)' : 'var(--amber-soft)',
                    color: item.category === 'career' ? 'var(--gold-primary)' : item.category === 'marriage' ? 'var(--crimson-primary)' : item.category === 'housing' ? 'var(--jade-primary)' : item.category === 'health' ? 'var(--cyan-primary)' : 'var(--amber-warning)',
                  }}>
                    {item.categoryLabel}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                    #{item.id.replace('case-', '')}
                  </span>
                </div>
                <div style={{ fontSize: '0.86rem', fontWeight: 600, color: isSelected ? 'var(--gold-primary)' : 'var(--text-title)', lineHeight: 1.4 }}>
                  {item.title}
                </div>
              </div>
            );
          })}
        </div>

        {/* 右側：當前案例三方會診剖析 */}
        <div style={{
          background: 'var(--bg-card-contrast)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '14px',
          padding: '22px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            {/* 標題與標籤 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{ background: 'var(--gold-soft)', color: 'var(--gold-primary)', padding: '3px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, border: '1px solid var(--border-glow)' }}>
                {activeCase.categoryLabel}
              </span>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--text-title)', margin: 0 }}>
                {activeCase.title}
              </h3>
            </div>

            {/* 當前困境與情境 */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '14px 16px', marginBottom: '18px' }}>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)', fontWeight: 700, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <ShieldAlert size={14} color="var(--amber-warning)" /> 具體生活處境難題（Scenario）：
              </div>
              <div style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                {activeCase.scenario}
              </div>
            </div>

            {/* 三方會診矩陣卡 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '18px' }}>
              {/* 1. 天紀解法 */}
              <div style={{ background: 'var(--gold-soft)', border: '1px solid var(--border-glow)', borderRadius: '10px', padding: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-primary)', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px' }}>
                  <Sparkles size={16} /> 1. 倪海廈《天紀》原版解法
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                  {activeCase.tianjiSolution}
                </div>
              </div>

              {/* 2. 傳統門派視角 */}
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px' }}>
                  <BookOpen size={16} /> 2. 傳統三合/玄空/江湖視角
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                  {activeCase.traditionalPerspective}
                </div>
              </div>

              {/* 3. 現代心理與決策模型 */}
              <div style={{ background: 'var(--jade-soft)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--jade-primary)', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px' }}>
                  <Brain size={16} /> 3. 現代科學與行為決策模型
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                  {activeCase.modernDecisionModel}
                </div>
              </div>
            </div>
          </div>

          {/* 費曼生活總結避坑指南 */}
          <div style={{
            background: 'var(--bg-card)',
            borderLeft: '4px solid var(--gold-primary)',
            borderRadius: '0 10px 10px 0',
            padding: '12px 18px',
            border: '1px solid var(--border-subtle)',
            borderLeftWidth: '4px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-primary)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '4px' }}>
              <CheckCircle2 size={16} /> 💡 費曼生活總結避坑心法（Takeaway）：
            </div>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-title)', fontWeight: 600, lineHeight: 1.6 }}>
              {activeCase.takeaway}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

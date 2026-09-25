import React, { useState } from 'react';
import { starArchetypes } from '../data/lessons';
import type { StarArchetype } from '../types';
import { Zap, EyeOff, HeartCrack, Briefcase } from 'lucide-react';

export const ArchetypeSimulator: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [selectedStar, setSelectedStar] = useState<StarArchetype>(starArchetypes[0]);

  const groupTabs = [
    { key: 'all', label: `全部星曜 (${starArchetypes.length})` },
    { key: 'boss', label: '👑 紫府統御組 (3)' },
    { key: 'pioneer', label: '⚔️ 殺破狼廉開拓組 (4)' },
    { key: 'adviser', label: '📜 機月同梁智囊組 (4)' },
    { key: 'special', label: '📢 陽武巨門實幹組 (3)' },
  ];

  const filteredStars = starArchetypes.filter(
    (star) => selectedGroup === 'all' || star.group === selectedGroup
  );

  return (
    <div className="glass-panel" style={{ padding: '24px', marginTop: '20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.15rem', color: 'var(--text-title)', fontFamily: 'var(--font-serif)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🏢 辦公室團隊角色切換：十四星曜四大陣營人格原型沙盒
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          完整收錄十四主星，並依領導、開拓、智囊、實幹四大群組系統化分類。點選切換不同星曜，檢視其現代組織角色、天賦超能力與壓力盲區：
        </p>
      </div>

      {/* 群組篩選標籤 */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
        marginBottom: '12px'
      }}>
        {groupTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedGroup(tab.key)}
            style={{
              background: selectedGroup === tab.key ? 'var(--gold-primary)' : 'var(--bg-card-contrast)',
              color: selectedGroup === tab.key ? '#ffffff' : 'var(--text-main)',
              border: selectedGroup === tab.key ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
              padding: '5px 12px',
              borderRadius: '6px',
              fontSize: '0.8rem',
              cursor: 'pointer',
              fontWeight: selectedGroup === tab.key ? 700 : 500,
              transition: 'all 0.15s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 星曜選擇標籤 */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        marginBottom: '20px',
        paddingBottom: '14px',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        {filteredStars.map((star) => {
          const isSelected = star.name === selectedStar.name;
          return (
            <button
              key={star.name}
              onClick={() => setSelectedStar(star)}
              style={{
                background: isSelected 
                  ? 'linear-gradient(135deg, var(--gold-primary), var(--gold-glow))' 
                  : 'var(--bg-card)',
                color: isSelected ? '#ffffff' : 'var(--text-main)',
                border: isSelected ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.15s ease'
              }}
            >
              {star.name}
            </button>
          );
        })}
      </div>

      {/* 詳細卡片（完全融入主題） */}
      <div style={{
        background: 'var(--bg-card-contrast)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '14px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--text-title)' }}>
                {selectedStar.name}
              </span>
              <span style={{ fontSize: '0.8rem', background: 'var(--cyan-soft)', color: 'var(--cyan-primary)', border: '1px solid var(--border-subtle)', padding: '2px 8px', borderRadius: '6px', fontWeight: 600 }}>
                {selectedStar.groupName}
              </span>
            </div>
            <div style={{ fontSize: '0.95rem', color: 'var(--gold-primary)', marginTop: '4px', fontWeight: 600 }}>
              組織生態角色：{selectedStar.officeRole}
            </div>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', background: 'var(--bg-card)', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
            五行氣化：{selectedStar.element}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
          {/* 超能力 */}
          <div style={{ background: 'var(--jade-soft)', border: '1px solid var(--border-subtle)', padding: '14px', borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--jade-primary)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
              <Zap size={16} /> 天賦超能力 (Superpower)
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.55 }}>
              {selectedStar.superpower}
            </div>
          </div>

          {/* 認知盲區 */}
          <div style={{ background: 'var(--crimson-soft)', border: '1px solid var(--border-subtle)', padding: '14px', borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--crimson-primary)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
              <EyeOff size={16} /> 潛在認知盲區 (Blindspot)
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.55 }}>
              {selectedStar.blindspot}
            </div>
          </div>

          {/* 壓力行為 */}
          <div style={{ background: 'var(--amber-soft)', border: '1px solid var(--border-glow)', padding: '14px', borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--amber-warning)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
              <HeartCrack size={16} /> 壓力下防禦模式 (Under Stress)
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.55 }}>
              {selectedStar.stressBehavior}
            </div>
          </div>

          {/* 職涯適配 */}
          <div style={{ background: 'var(--cyan-soft)', border: '1px solid var(--border-subtle)', padding: '14px', borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--cyan-primary)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
              <Briefcase size={16} /> 現代職能舞台建議
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
              {selectedStar.careerMatch.map((c, i) => (
                <span key={i} style={{ background: 'var(--bg-card)', color: 'var(--text-main)', fontSize: '0.78rem', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { baguaRoomsData } from '../data/lessons';
import { CheckCircle2, XCircle, Lightbulb } from 'lucide-react';

export const BaguaRoomSimulator: React.FC = () => {
  const [selectedDirection, setSelectedDirection] = useState<string>('乾');

  const currentRoom = baguaRoomsData.find((r) => r.trigram === selectedDirection) || baguaRoomsData[0];

  return (
    <div className="glass-panel" style={{ padding: '24px', marginTop: '20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.15rem', color: 'var(--text-title)', fontFamily: 'var(--font-serif)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🧭 空間名位動力學：室內八卦心理暗示沙盤
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          點選不同八卦方位，觀察該空間賦予居住者的心理暗示、正位效應與現代公寓通風採光建議：
        </p>
      </div>

      {/* 九宮八卦模擬盤 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '8px',
        maxWidth: '380px',
        margin: '0 auto 20px',
        background: 'var(--bg-card-subtle)',
        padding: '10px',
        borderRadius: '16px',
        border: '1px solid var(--border-subtle)'
      }}>
        {[
          { trigram: '巽', label: '東南 巽', sub: '長女' },
          { trigram: '離', label: '正南 離', sub: '中女' },
          { trigram: '坤', label: '西南 坤', sub: '母親' },
          { trigram: '震', label: '正東 震', sub: '長男' },
          { trigram: '太極', label: '中宮太極', sub: '客廳核心', isCenter: true },
          { trigram: '兌', label: '正西 兌', sub: '少女' },
          { trigram: '艮', label: '東北 艮', sub: '少男' },
          { trigram: '坎', label: '正北 坎', sub: '中男' },
          { trigram: '乾', label: '西北 乾', sub: '父親' },
        ].map((cell, idx) => {
          if (cell.isCenter) {
            return (
              <div 
                key={idx}
                style={{
                  background: 'var(--gold-soft)',
                  border: '1px dashed var(--border-glow)',
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px 6px',
                  color: 'var(--gold-primary)',
                  fontSize: '0.8rem',
                  fontWeight: 700
                }}
              >
                <span>☯️ 中宮</span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>客廳/太極</span>
              </div>
            );
          }

          const isSelected = cell.trigram === selectedDirection;
          return (
            <button
              key={idx}
              onClick={() => setSelectedDirection(cell.trigram)}
              style={{
                background: isSelected 
                  ? 'linear-gradient(135deg, var(--gold-primary), var(--gold-glow))'
                  : 'var(--bg-card)',
                color: isSelected ? '#ffffff' : 'var(--text-main)',
                border: isSelected ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                borderRadius: '10px',
                padding: '12px 6px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                transition: 'all 0.15s ease',
                boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>{cell.label}</span>
              <span style={{ fontSize: '0.72rem', color: isSelected ? '#fef3c7' : 'var(--text-dim)' }}>
                {cell.sub}
              </span>
            </button>
          );
        })}
      </div>

      {/* 當前方位分析卡片（完全融入主題，無大黑塊） */}
      <div style={{
        background: 'var(--bg-card-contrast)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '14px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.35rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--text-title)' }}>
              【{currentRoom.trigram}卦】{currentRoom.direction}
            </span>
            <span style={{ fontSize: '0.85rem', background: 'var(--jade-soft)', color: 'var(--jade-primary)', padding: '3px 10px', borderRadius: '6px', fontWeight: 600, border: '1px solid var(--border-subtle)' }}>
              對應家庭角色：{currentRoom.role}
            </span>
          </div>
        </div>

        <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', marginBottom: '16px', lineHeight: 1.65 }}>
          {currentRoom.archetypeMeaning}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          {/* 名相符 */}
          <div style={{ background: 'var(--jade-soft)', border: '1px solid var(--border-subtle)', padding: '14px', borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--jade-primary)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
              <CheckCircle2 size={16} /> 名位相當之良性效應
            </div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.55 }}>
              {currentRoom.positivePlacement}
            </div>
          </div>

          {/* 錯位 */}
          <div style={{ background: 'var(--crimson-soft)', border: '1px solid var(--border-subtle)', padding: '14px', borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--crimson-primary)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
              <XCircle size={16} /> 角色錯位可能引發的心理暗示
            </div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.55 }}>
              {currentRoom.misplacement}
            </div>
          </div>

          {/* 現代建築採光改善 */}
          <div style={{ background: 'var(--gold-soft)', border: '1px solid var(--border-glow)', padding: '14px', borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-primary)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
              <Lightbulb size={16} /> 現代公寓物理採光與動線優化
            </div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.55 }}>
              {currentRoom.modernImprovement}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

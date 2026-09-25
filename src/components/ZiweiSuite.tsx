import React, { useState } from 'react';
import { ZiweiChart } from './ZiweiChart';
import { ArchetypeSimulator } from './ArchetypeSimulator';
import { SeasonFlowSimulator } from './SeasonFlowSimulator';
import { Compass, Users, Sparkles } from 'lucide-react';

export const ZiweiSuite: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chart' | 'archetype' | 'season'>('chart');

  return (
    <div style={{ marginTop: '28px' }}>
      {/* 整合標籤切換導覽 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'var(--bg-card-contrast)',
        padding: '6px',
        borderRadius: '12px',
        border: '1px solid var(--border-subtle)',
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setActiveTab('chart')}
          style={{
            flex: 1,
            minWidth: '160px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '10px 16px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.88rem',
            fontWeight: 700,
            background: activeTab === 'chart' ? 'var(--gold-primary)' : 'transparent',
            color: activeTab === 'chart' ? '#ffffff' : 'var(--text-main)',
            boxShadow: activeTab === 'chart' ? 'var(--shadow-card)' : 'none',
            transition: 'all 0.15s ease'
          }}
        >
          <Compass size={17} /> 十二宮排盤引擎
        </button>

        <button
          onClick={() => setActiveTab('archetype')}
          style={{
            flex: 1,
            minWidth: '160px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '10px 16px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.88rem',
            fontWeight: 700,
            background: activeTab === 'archetype' ? 'var(--gold-primary)' : 'transparent',
            color: activeTab === 'archetype' ? '#ffffff' : 'var(--text-main)',
            boxShadow: activeTab === 'archetype' ? 'var(--shadow-card)' : 'none',
            transition: 'all 0.15s ease'
          }}
        >
          <Users size={17} /> 十四主星團隊原型沙盒
        </button>

        <button
          onClick={() => setActiveTab('season')}
          style={{
            flex: 1,
            minWidth: '160px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '10px 16px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.88rem',
            fontWeight: 700,
            background: activeTab === 'season' ? 'var(--gold-primary)' : 'transparent',
            color: activeTab === 'season' ? '#ffffff' : 'var(--text-main)',
            boxShadow: activeTab === 'season' ? 'var(--shadow-card)' : 'none',
            transition: 'all 0.15s ease'
          }}
        >
          <Sparkles size={17} /> 四化四季能量時鐘
        </button>
      </div>

      {/* 根據標籤展示相應工具 */}
      {activeTab === 'chart' && <ZiweiChart />}
      {activeTab === 'archetype' && <ArchetypeSimulator />}
      {activeTab === 'season' && <SeasonFlowSimulator />}
    </div>
  );
};

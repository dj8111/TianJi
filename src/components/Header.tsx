import React, { useState, useEffect } from 'react';
import { BookOpen, Scale, Compass, Shield, Tv, Sparkles, Palette } from 'lucide-react';

export type NavTabType = 'portal' | 'philosophy' | 'classroom' | 'yijing' | 'ziwei' | 'comparisons' | 'sandbox' | 'playlists';

interface HeaderProps {
  currentTab: NavTabType;
  setCurrentTab: (tab: NavTabType) => void;
  progressPercentage: number;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, setCurrentTab, progressPercentage }) => {
  const [theme, setTheme] = useState<string>('obsidian');

  useEffect(() => {
    const savedTheme = localStorage.getItem('site_theme') || 'obsidian';
    // 若原先存了已被移除的主題，自動回歸 obsidian
    const validTheme = ['obsidian', 'zen'].includes(savedTheme) ? savedTheme : 'obsidian';
    setTheme(validTheme);
    document.documentElement.setAttribute('data-theme', validTheme);
  }, []);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('site_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <header className="app-header">
      <div className="brand-wrapper" style={{ cursor: 'pointer' }} onClick={() => setCurrentTab('portal')}>
        <div className="brand-symbol">
          <span>☯️</span>
        </div>
        <div>
          <div className="brand-title">天紀·理象與生活決策研習網</div>
          <div className="brand-sub">TianJi & RenJi Feynman Portal</div>
        </div>
      </div>

      {/* 導航按鈕組：以排盤與起卦雙引子為首，引申思想核心與五紀學習內容 */}
      <nav className="nav-tabs" style={{ flexWrap: 'wrap' }}>
        <button
          className={`nav-tab-btn ${currentTab === 'portal' ? 'active' : ''}`}
          onClick={() => setCurrentTab('portal')}
          style={{ fontWeight: currentTab === 'portal' ? 700 : 500 }}
        >
          <Sparkles size={15} color={currentTab === 'portal' ? 'var(--gold-glow)' : 'currentColor'} /> 
          雙引子推演 (紫微 × 易經)
        </button>
        <button
          className={`nav-tab-btn ${currentTab === 'philosophy' ? 'active' : ''}`}
          onClick={() => setCurrentTab('philosophy')}
          style={{ fontWeight: currentTab === 'philosophy' ? 700 : 500 }}
        >
          <Compass size={15} color={currentTab === 'philosophy' ? 'var(--gold-glow)' : 'currentColor'} /> 
          思想核心 ＆ 五紀全譜
        </button>
        <button
          className={`nav-tab-btn ${currentTab === 'classroom' ? 'active' : ''}`}
          onClick={() => setCurrentTab('classroom')}
        >
          <BookOpen size={15} /> 系統課堂 (6模組)
        </button>
        <button
          className={`nav-tab-btn ${currentTab === 'yijing' ? 'active' : ''}`}
          onClick={() => setCurrentTab('yijing')}
        >
          <Sparkles size={15} /> 易經64卦寶庫
        </button>
        <button
          className={`nav-tab-btn ${currentTab === 'comparisons' ? 'active' : ''}`}
          onClick={() => setCurrentTab('comparisons')}
        >
          <Scale size={15} /> 跨派照妖鏡
        </button>
        <button
          className={`nav-tab-btn ${currentTab === 'sandbox' ? 'active' : ''}`}
          onClick={() => setCurrentTab('sandbox')}
        >
          <Compass size={15} /> 陽宅與三才沙盒
        </button>
        <button
          className={`nav-tab-btn ${currentTab === 'playlists' ? 'active' : ''}`}
          onClick={() => setCurrentTab('playlists')}
        >
          <Tv size={15} /> 經典影音全集 (5大清單)
        </button>
      </nav>

      {/* 配色切換（僅保留黑曜金與溫潤宣紙雅）與學習進度 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
        {/* 雙色主題切換器 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: 'rgba(120, 113, 108, 0.1)',
          padding: '3px 8px',
          borderRadius: '999px',
          border: '1px solid var(--border-subtle)'
        }}>
          <Palette size={14} color="var(--gold-glow)" />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginRight: '2px' }}>主題:</span>
          <button
            onClick={() => changeTheme('obsidian')}
            style={{
              background: theme === 'obsidian' ? 'var(--gold-soft)' : 'transparent',
              border: theme === 'obsidian' ? '1px solid var(--gold-glow)' : '1px solid transparent',
              borderRadius: '999px',
              padding: '3px 10px',
              fontSize: '0.75rem',
              color: theme === 'obsidian' ? 'var(--gold-glow)' : 'var(--text-muted)',
              cursor: 'pointer',
              fontWeight: theme === 'obsidian' ? 700 : 500,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            title="切換為黑曜經典深色"
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#d97706' }} />
            黑曜金
          </button>
          <button
            onClick={() => changeTheme('zen')}
            style={{
              background: theme === 'zen' ? 'var(--gold-soft)' : 'transparent',
              border: theme === 'zen' ? '1px solid var(--gold-glow)' : '1px solid transparent',
              borderRadius: '999px',
              padding: '3px 10px',
              fontSize: '0.75rem',
              color: theme === 'zen' ? 'var(--gold-glow)' : 'var(--text-muted)',
              cursor: 'pointer',
              fontWeight: theme === 'zen' ? 700 : 500,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            title="切換為溫潤宣紙雅墨"
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8c6239' }} />
            宣紙雅
          </button>
        </div>

        {/* 學習進度條 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>研習進度</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gold-glow)' }}>
              {progressPercentage}%
            </div>
          </div>
          <div style={{ width: '45px', height: '6px', background: 'rgba(120, 113, 108, 0.2)', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{ width: `${progressPercentage}%`, height: '100%', background: 'linear-gradient(90deg, var(--gold-primary), var(--jade-primary))', transition: 'width 0.3s ease' }} />
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: 'var(--jade-soft)',
          border: '1px solid var(--border-glow)',
          padding: '3px 8px',
          borderRadius: '999px',
          fontSize: '0.7rem',
          color: 'var(--jade-primary)'
        }}>
          <Shield size={11} /> 理性研習
        </div>
      </div>
    </header>
  );
};

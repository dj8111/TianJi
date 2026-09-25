import React, { useState } from 'react';
import { videoPlaylistsData } from '../data/videoPlaylists';
import { Tv, ExternalLink, PlayCircle, Clock, Tag, Sparkles } from 'lucide-react';

export const PlaylistsViewer: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'tianji' | 'renji'>('all');

  const filtered = videoPlaylistsData.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  return (
    <div className="glass-panel" style={{ padding: '28px', marginBottom: '30px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Tv size={24} color="var(--gold-glow)" />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--text-title)' }}>
              倪師原版影音全集精華導讀 (天紀 83 集 & 人紀三部曲)
            </h2>
          </div>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
            收錄五大正統經典 YouTube 影音播放清單，為研習者提供完整章節索引、核心重點與直達連結。
          </p>
        </div>

        {/* 分類篩選 */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setFilter('all')}
            style={{
              background: filter === 'all' ? 'var(--gold-primary)' : 'var(--bg-card-contrast)',
              color: filter === 'all' ? '#ffffff' : 'var(--text-main)',
              border: '1px solid var(--border-subtle)',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '0.85rem',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            全部影音 ({videoPlaylistsData.length})
          </button>
          <button
            onClick={() => setFilter('tianji')}
            style={{
              background: filter === 'tianji' ? 'var(--gold-primary)' : 'var(--bg-card-contrast)',
              color: filter === 'tianji' ? '#ffffff' : 'var(--text-main)',
              border: '1px solid var(--border-subtle)',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '0.85rem',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            天紀系列 (2)
          </button>
          <button
            onClick={() => setFilter('renji')}
            style={{
              background: filter === 'renji' ? 'var(--gold-primary)' : 'var(--bg-card-contrast)',
              color: filter === 'renji' ? '#ffffff' : 'var(--text-main)',
              border: '1px solid var(--border-subtle)',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '0.85rem',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            人紀三部曲 (3)
          </button>
        </div>
      </div>

      {/* 影音卡片網格 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {filtered.map((item) => (
          <div
            key={item.id}
            style={{
              background: 'var(--bg-card)',
              border: item.category === 'tianji' ? '1px solid var(--border-glow)' : '1px solid var(--border-subtle)',
              borderRadius: '16px',
              padding: '22px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-card)',
              transition: 'transform 0.2s ease'
            }}
          >
            <div>
              {/* 頂部標籤與集數 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  padding: '2px 10px',
                  borderRadius: '999px',
                  background: item.category === 'tianji' ? 'var(--gold-soft)' : 'var(--jade-soft)',
                  color: item.category === 'tianji' ? 'var(--gold-primary)' : 'var(--jade-primary)',
                  border: item.category === 'tianji' ? '1px solid var(--border-glow)' : '1px solid var(--border-subtle)'
                }}>
                  {item.categoryLabel}
                </span>

                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} /> {item.totalEpisodes}
                </span>
              </div>

              {/* 標題與副標 */}
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-title)', marginBottom: '6px', lineHeight: 1.4 }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--gold-primary)', marginBottom: '12px', fontWeight: 600 }}>
                {item.subtitle}
              </p>

              {/* 簡介 */}
              <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '16px' }}>
                {item.description}
              </p>

              {/* 核心主題標籤 */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                {item.coreTopics.map((topic, i) => (
                  <span key={i} style={{ background: 'var(--bg-card-subtle)', color: 'var(--text-main)', border: '1px solid var(--border-subtle)', fontSize: '0.75rem', padding: '3px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Tag size={11} color="var(--cyan-primary)" /> {topic}
                  </span>
                ))}
              </div>

              {/* 關鍵時刻章節推薦 */}
              <div style={{ background: 'var(--bg-card-contrast)', borderRadius: '10px', padding: '12px', marginBottom: '18px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} color="var(--gold-primary)" /> 推薦精華集數導讀：
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {item.recommendedKeyMoments.map((km, idx) => (
                    <div key={idx} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                      <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{km.episode}·{km.title}</span>
                      <span style={{ color: 'var(--cyan-primary)', fontSize: '0.75rem', fontWeight: 600 }}>{km.focus}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 觀看按鈕 */}
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                textDecoration: 'none',
                justifyContent: 'center',
                background: item.category === 'tianji' 
                  ? 'linear-gradient(135deg, var(--gold-primary), var(--gold-glow))' 
                  : 'linear-gradient(135deg, var(--jade-primary), #047857)'
              }}
            >
              <PlayCircle size={17} /> 開啟 YouTube 播放清單觀看 <ExternalLink size={14} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

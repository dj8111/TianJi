import React, { useState, useEffect } from 'react';
import { lessonsData } from './data/lessons';
import type { Lesson } from './types';
import { Header, type NavTabType } from './components/Header';
import { BenchSimulator } from './components/BenchSimulator';
import { ArchetypeSimulator } from './components/ArchetypeSimulator';
import { BaguaRoomSimulator } from './components/BaguaRoomSimulator';
import { SeasonFlowSimulator } from './components/SeasonFlowSimulator';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { PersonalRadarSandbox } from './components/PersonalRadarSandbox';
import { FeynmanNotes } from './components/FeynmanNotes';
import { PlaylistsViewer } from './components/PlaylistsViewer';
import { YijingExplorer } from './components/YijingExplorer';
import { ZiweiChart } from './components/ZiweiChart';
import { ZiweiSuite } from './components/ZiweiSuite';
import { CaseExplorer } from './components/CaseExplorer';
import { BenchAndCases } from './components/BenchAndCases';
import { 
  AlertTriangle, CheckCircle2, Layers, ArrowRight
} from 'lucide-react';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavTabType>('classroom');
  const [activeLessonId, setActiveLessonId] = useState<string>(lessonsData[0].id);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  // 讀取已完成章節
  useEffect(() => {
    const saved = localStorage.getItem('completed_lessons');
    if (saved) {
      try {
        setCompletedLessons(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const toggleCompleteLesson = (id: string) => {
    let updated: string[];
    if (completedLessons.includes(id)) {
      updated = completedLessons.filter((item) => item !== id);
    } else {
      updated = [...completedLessons, id];
    }
    setCompletedLessons(updated);
    localStorage.setItem('completed_lessons', JSON.stringify(updated));
  };

  const currentLesson: Lesson = lessonsData.find((l) => l.id === activeLessonId) || lessonsData[0];
  const progressPercentage = Math.round((completedLessons.length / lessonsData.length) * 100);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 頂部導航 */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        progressPercentage={progressPercentage}
      />

      {/* 主工作區 */}
      <main className="main-container" style={{ flex: 1 }}>
        {/* 1. 課堂模式 */}
        {currentTab === 'classroom' && (
          <div className="classroom-layout">
            {/* 左側：模組清單（1-10 課獨立滾動，不遮擋） */}
            <aside className="glass-panel module-nav-sidebar">
              <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--text-main)' }}>
                  課程章節（共 6 模組）
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--gold-glow)', fontWeight: 600 }}>
                  {completedLessons.length} / {lessonsData.length} 已完成
                </span>
              </div>
              <div className="module-nav-list">
                {lessonsData.map((lesson) => {
                  const isActive = lesson.id === activeLessonId;
                  const isDone = completedLessons.includes(lesson.id);
                  return (
                    <div
                      key={lesson.id}
                      className={`module-nav-item ${isActive ? 'active' : ''}`}
                      onClick={() => {
                        setActiveLessonId(lesson.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <div className="module-number-badge">
                        {isDone ? <CheckCircle2 size={13} color="#10B981" /> : lesson.moduleIndex}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: isActive ? 'var(--gold-glow)' : 'var(--text-main)', lineHeight: 1.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {lesson.moduleTitle.split('：')[1] || lesson.moduleTitle}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {lesson.title}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </aside>

            {/* 中間：寬敞大氣的主教學區（不再受右欄擠壓） */}
            <section style={{ minWidth: 0 }}>
              <article key={currentLesson.id} className="glass-panel lesson-card">
                <div className="lesson-header">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                    <div className="lesson-badge">
                      <Layers size={13} /> {currentLesson.moduleTitle}
                    </div>
                    <button
                      onClick={() => toggleCompleteLesson(currentLesson.id)}
                      className="btn-secondary"
                      style={{
                        fontSize: '0.8rem',
                        padding: '4px 12px',
                        borderColor: completedLessons.includes(currentLesson.id) ? '#10B981' : 'var(--border-subtle)',
                        color: completedLessons.includes(currentLesson.id) ? '#34d399' : 'var(--text-muted)'
                      }}
                    >
                      <CheckCircle2 size={14} />
                      {completedLessons.includes(currentLesson.id) ? '已學完此課' : '標記為已學'}
                    </button>
                  </div>
                  <h1 className="lesson-title">
                    {currentLesson.title}
                  </h1>
                </div>

                {/* 費曼生活比喻鉤子 */}
                <div className="feynman-hook-box">
                  <div className="feynman-hook-icon">💡</div>
                  <div className="feynman-hook-content">
                    <h4>日常生活比喻導引（The Feynman Hook）</h4>
                    <p>{currentLesson.feynmanHook}</p>
                  </div>
                </div>

                {/* 白話拆解 */}
                <div className="content-section">
                  <div className="section-label vernacular">
                    <span>🌱</span> 生活白話拆解（零術語）
                  </div>
                  <div className="section-body">
                    {currentLesson.vernacularConcept}
                  </div>
                </div>

                {/* 倪氏原文理象提煉 */}
                <div className="content-section">
                  <div className="section-label essence">
                    <span>📖</span> 倪海廈《天紀》原版理象精解
                  </div>
                  <div className="section-body">
                    {currentLesson.niOriginalEssence}
                  </div>
                </div>

                {/* 現代客觀校準警示框 */}
                <div className="warning-calibration-box">
                  <div className="warning-icon">
                    <AlertTriangle size={20} />
                  </div>
                  <div className="warning-body">
                    {currentLesson.scientificCalibration}
                  </div>
                </div>

                {/* 動態互動工具與專屬實戰嵌入 */}
                {currentLesson.interactiveType === 'yijing-explorer' && (
                  <div style={{ marginTop: '30px' }}>
                    <YijingExplorer />
                  </div>
                )}
                {currentLesson.interactiveType === 'ziwei-suite' && <ZiweiSuite />}
                {currentLesson.interactiveType === 'ziwei-chart' && (
                  <div style={{ marginTop: '30px' }}>
                    <ZiweiChart />
                  </div>
                )}
                {currentLesson.interactiveType === 'bench-and-cases' && <BenchAndCases />}
                {currentLesson.interactiveType === 'case-explorer' && <CaseExplorer />}
                {currentLesson.interactiveType === 'bench-simulator' && <BenchSimulator />}
                {currentLesson.interactiveType === 'archetype-switcher' && <ArchetypeSimulator />}
                {currentLesson.interactiveType === 'bagua-room' && <BaguaRoomSimulator />}
                {currentLesson.interactiveType === 'season-flow' && <SeasonFlowSimulator />}

                {/* 下一章按鈕 */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
                  {currentLesson.moduleIndex < lessonsData.length && (
                    <button
                      className="btn-primary"
                      onClick={() => {
                        const next = lessonsData.find((l) => l.moduleIndex === currentLesson.moduleIndex + 1);
                        if (next) {
                          setActiveLessonId(next.id);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                    >
                      前往下一課：{lessonsData.find((l) => l.moduleIndex === currentLesson.moduleIndex + 1)?.moduleTitle.split('：')[1]} <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </article>
            </section>
          </div>
        )}

        {/* 2. 易經六十四卦完整生活處境寶庫模式 */}
        {currentTab === 'yijing' && (
          <div>
            <YijingExplorer />
          </div>
        )}

        {/* 3. 紫微斗數十二宮命盤排盤引擎模式 */}
        {currentTab === 'ziwei' && (
          <div>
            <ZiweiChart />
          </div>
        )}

        {/* 4. 跨派照妖鏡模式 */}
        {currentTab === 'comparisons' && (
          <div>
            <ComparisonMatrix />
          </div>
        )}

        {/* 5. 互動沙盒模式 */}
        {currentTab === 'sandbox' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <ZiweiChart />
            <PersonalRadarSandbox />
            <BaguaRoomSimulator />
            <ArchetypeSimulator />
            <BenchSimulator />
          </div>
        )}

        {/* 6. 官方影音全集導讀模式 */}
        {currentTab === 'playlists' && (
          <div>
            <PlaylistsViewer />
          </div>
        )}
      </main>

      {/* 右下方浮動圓球 (FAB)：隨時隨地一鍵開展/收合費曼筆記 */}
      <FeynmanNotes currentLesson={currentLesson} />

      {/* 底部全站聲明與研習安全邊界 */}
      <footer style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '24px 2rem',
        marginTop: 'auto'
      }}>
        <div style={{ maxWidth: '1560px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--text-main)', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              ☯️ 天紀·理象與生活決策研習網
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              融合《天紀》易經六十四卦、斗數排盤、陽宅名位與《人紀》黃帝內經本草中醫的身心生活決策模型。
            </div>
          </div>

          <div style={{
            background: 'var(--gold-soft)',
            border: '1px solid var(--border-glow)',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '0.78rem',
            color: 'var(--text-main)',
            maxWidth: '650px',
            lineHeight: 1.5
          }}>
            🛡️ <strong>研習安全與醫療免責守則：</strong> 本研習平台內容僅作為傳統文化哲學與決策模型探討，非宿命定論。遇身體病痛或心理疾患，請務必第一時間尋求正規現代合格醫師與臨床心理人員診療。
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import type { Lesson, UserNote } from '../types';
import { Edit3, CheckCircle, Download, BookMarked, Sparkles, X, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FeynmanNotesProps {
  currentLesson: Lesson;
}

export const FeynmanNotes: React.FC<FeynmanNotesProps> = ({ currentLesson }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [feynmanAnswer, setFeynmanAnswer] = useState<string>('');
  const [personalReflection, setPersonalReflection] = useState<string>('');
  const [showSample, setShowSample] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // 載入該課堂筆記
  useEffect(() => {
    const saved = localStorage.getItem(`note_${currentLesson.id}`);
    if (saved) {
      try {
        const note: UserNote = JSON.parse(saved);
        setFeynmanAnswer(note.feynmanExplanation || '');
        setPersonalReflection(note.personalReflections || '');
      } catch (e) {
        console.error(e);
      }
    } else {
      setFeynmanAnswer('');
      setPersonalReflection('');
    }
    setShowSample(false);
    setSavedSuccess(false);
  }, [currentLesson.id]);

  const handleSave = () => {
    const note: UserNote = {
      lessonId: currentLesson.id,
      feynmanExplanation: feynmanAnswer,
      personalReflections: personalReflection,
      highlightedQuotes: [],
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(`note_${currentLesson.id}`, JSON.stringify(note));
    setSavedSuccess(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleExportMarkdown = () => {
    const content = `# 費曼研習筆記：${currentLesson.title}
- 模組：${currentLesson.moduleTitle}
- 記錄時間：${new Date().toLocaleDateString()}

---

## 🎯 費曼自測（向朋友解釋）
> **題目：** ${currentLesson.feynmanPrompt}

${feynmanAnswer || '（尚未填寫）'}

---

## 💡 個人生活觀察與反思
${personalReflection || '（尚未填寫）'}

---
*來自 天紀·理象與生活決策研習網*
`;
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${currentLesson.title}_費曼筆記.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* 右下方浮動圓球 (FAB) */}
      <button
        className={`feynman-fab-btn ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? '收起費曼筆記本' : '開啟費曼筆記本'}
      >
        <span className="feynman-fab-pulse" />
        {isOpen ? (
          <>
            <X size={20} />
            <span>收起筆記</span>
          </>
        ) : (
          <>
            <Edit3 size={20} />
            <span>費曼筆記本</span>
          </>
        )}
      </button>

      {/* 展開後的懸浮彈窗抽屜 */}
      {isOpen && (
        <div className="feynman-drawer-panel">
          {/* 視窗頂部標題列 */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-card-contrast)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Edit3 size={18} color="var(--gold-primary)" />
              <div>
                <h3 style={{ fontSize: '1rem', color: 'var(--text-title)', fontFamily: 'var(--font-serif)', margin: 0 }}>
                  費曼筆記本 & 自測練習
                </h3>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                  當前：{currentLesson.moduleTitle.split('：')[1]}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={handleExportMarkdown}
                className="btn-secondary"
                style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                title="匯出此課筆記為 Markdown"
              >
                <Download size={13} /> 匯出 MD
              </button>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-dim)',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '4px'
                }}
                title="關閉"
              >
                <ChevronDown size={20} />
              </button>
            </div>
          </div>

          {/* 內部捲動內容區 */}
          <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
            {/* 費曼自測挑戰卡 */}
            <div style={{
              background: 'var(--gold-soft)',
              border: '1px solid var(--border-glow)',
              borderRadius: '10px',
              padding: '14px',
              marginBottom: '16px'
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gold-primary)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <BookMarked size={16} /> 費曼輸出挑戰（教給別人聽）：
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.5, marginBottom: '8px' }}>
                {currentLesson.feynmanPrompt}
              </div>
              <button
                onClick={() => setShowSample(!showSample)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--cyan-primary)',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  padding: 0,
                  textDecoration: 'underline'
                }}
              >
                {showSample ? '隱藏參考示範' : '查看參考示範'}
              </button>

              {showSample && (
                <div style={{ marginTop: '8px', padding: '10px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '6px', fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                  💬 <strong>示範回答：</strong> {currentLesson.sampleAnswer}
                </div>
              )}
            </div>

            {/* 費曼作答輸入框 */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                用你的大白話寫下解釋：
              </label>
              <textarea
                className="note-textarea"
                value={feynmanAnswer}
                onChange={(e) => setFeynmanAnswer(e.target.value)}
                placeholder="例如：就像開車遇到暴風雨..."
              />
            </div>

            {/* 個人實踐反思 */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                生活實踐心得 / 居住空間觀察：
              </label>
              <textarea
                className="note-textarea"
                value={personalReflection}
                onChange={(e) => setPersonalReflection(e.target.value)}
                placeholder="今天觀察了家裡客廳動線/同事性格..."
              />
            </div>

            <button
              onClick={handleSave}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Sparkles size={16} /> 保存個人知識庫
            </button>

            {savedSuccess && (
              <div style={{
                marginTop: '10px',
                color: '#34d399',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}>
                <CheckCircle size={15} /> 筆記已成功儲存至本地！
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

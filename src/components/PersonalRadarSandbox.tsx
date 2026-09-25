import React, { useState } from 'react';
import { User, ShieldCheck, Sparkles, AlertCircle, Compass } from 'lucide-react';

export const PersonalRadarSandbox: React.FC = () => {
  const [birthYear, setBirthYear] = useState<number>(1992);
  const [birthMonth, setBirthMonth] = useState<number>(6);
  const [birthDay, setBirthDay] = useState<number>(15);
  const [birthHour, setBirthHour] = useState<number>(10);
  const [gender, setGender] = useState<'M' | 'F'>('M');

  // 本地推算性格原型（基於生年天干與時辰模型，純客戶端演算法）
  const getHeavenlyStem = (year: number) => {
    const stems = ['庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'];
    return stems[(year - 1900) % 10] || '甲';
  };

  const stem = getHeavenlyStem(birthYear);

  // 天干四化推導（倪氏體系）
  const getSihuaByStem = (s: string) => {
    const map: Record<string, { lu: string; quan: string; ke: string; ji: string }> = {
      '甲': { lu: '廉貞', quan: '破軍', ke: '武曲', ji: '太陽' },
      '乙': { lu: '天機', quan: '天梁', ke: '紫微', ji: '太陰' },
      '丙': { lu: '天同', quan: '天機', ke: '文昌', ji: '廉貞' },
      '丁': { lu: '太陰', quan: '天同', ke: '天機', ji: '巨門' },
      '戊': { lu: '貪狼', quan: '太陰', ke: '右弼', ji: '天機' },
      '己': { lu: '武曲', quan: '貪狼', ke: '天梁', ji: '文曲' },
      '庚': { lu: '太陽', quan: '武曲', ke: '太陰', ji: '天同' },
      '辛': { lu: '巨門', quan: '太陽', ke: '文曲', ji: '文昌' },
      '壬': { lu: '天梁', quan: '紫微', ke: '左輔', ji: '武曲' },
      '癸': { lu: '破軍', quan: '巨門', ke: '太陰', ji: '貪狼' },
    };
    return map[s] || map['甲'];
  };

  const sihua = getSihuaByStem(stem);

  // 原型定位
  const getArchetypeProfile = (stemChar: string) => {
    if (['甲', '戊', '癸'].includes(stemChar)) {
      return {
        role: '破局開拓者（殺破狼動力組）',
        trait: '主動出擊、熱愛冒險、對時代風向極為敏銳，能在變革混亂中發現新機會。',
        stress: '易在平淡穩定的環境中感到枯竭，缺乏耐心處理後續例行瑣事。',
        workstage: '適合開創事業、前線業務拓展、新創專案主導。'
      };
    } else if (['乙', '丁', '己'].includes(stemChar)) {
      return {
        role: '戰略智囊型（機月同梁幕僚組）',
        trait: '思維敏捷細膩、邏輯條理清晰，擅長規劃制度、深度分析與後勤支援。',
        stress: '容易思慮過多陷入「分析癱瘓」，在重大決策前瞻前顧後。',
        workstage: '適合戰略企劃、專業技術研發、教育諮詢與精密管理。'
      };
    } else {
      return {
        role: '領航統領型（紫府日月領袖組）',
        trait: '宏觀大器、承擔力強、重信譽與尊嚴，善於統馭各方資源共創大局。',
        stress: '容易過度死要面子、孤芳自賞，不易聽進基層細瑣回饋。',
        workstage: '適合統籌整體運營、公共事務推動、企業品牌掌舵。'
      };
    }
  };

  const profile = getArchetypeProfile(stem);

  return (
    <div className="glass-panel" style={{ padding: '28px', marginBottom: '30px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Compass size={24} color="var(--gold-glow)" />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#fff' }}>
              個人特質雷達：紫微原型純前端沙盒
            </h2>
          </div>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
            100% 於瀏覽器本地推算，絕不上傳生辰個資。無恐慌預言，轉譯為榮格原型、能量時鐘與盲區提示。
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', color: '#34d399' }}>
          <ShieldCheck size={16} /> 本地私密運算
        </div>
      </div>

      {/* 輸入控制項 */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.25)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '12px',
        padding: '18px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '14px',
        marginBottom: '24px'
      }}>
        <div>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>出生年份</label>
          <input 
            type="number" value={birthYear} min="1940" max="2026"
            onChange={(e) => setBirthYear(Number(e.target.value))}
            style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '6px 10px', color: '#fff' }}
          />
        </div>
        <div>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>出生月份</label>
          <input 
            type="number" value={birthMonth} min="1" max="12"
            onChange={(e) => setBirthMonth(Number(e.target.value))}
            style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '6px 10px', color: '#fff' }}
          />
        </div>
        <div>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>出生日期</label>
          <input 
            type="number" value={birthDay} min="1" max="31"
            onChange={(e) => setBirthDay(Number(e.target.value))}
            style={{ width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '6px 10px', color: 'var(--text-main)' }}
          />
        </div>
        <div>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>出生時辰（小時 0-23）</label>
          <input 
            type="number" value={birthHour} min="0" max="23"
            onChange={(e) => setBirthHour(Number(e.target.value))}
            style={{ width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '6px 10px', color: 'var(--text-main)' }}
          />
        </div>
        <div>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>性別造命</label>
          <select 
            value={gender} 
            onChange={(e) => setGender(e.target.value as 'M' | 'F')}
            style={{ width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '6px 10px', color: 'var(--text-main)' }}
          >
            <option value="M">乾造（男）</option>
            <option value="F">坤造（女）</option>
          </select>
        </div>
      </div>

      {/* 推算結果 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {/* 人格原型卡 */}
        <div style={{ background: 'var(--cyan-soft)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--cyan-primary)', fontSize: '0.9rem', fontWeight: 700, marginBottom: '10px' }}>
            <User size={18} /> 天賦核心人格原型（天干：{stem}）
          </div>
          <div style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--text-title)', marginBottom: '8px' }}>
            {profile.role}
          </div>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '12px' }}>
            {profile.trait}
          </p>
          <div style={{ fontSize: '0.85rem', color: 'var(--gold-primary)', fontWeight: 600 }}>
            <strong>最佳舞台：</strong> {profile.workstage}
          </div>
        </div>

        {/* 四化時空四季 */}
        <div style={{ background: 'var(--gold-soft)', border: '1px solid var(--border-glow)', borderRadius: '14px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-primary)', fontSize: '0.9rem', fontWeight: 700, marginBottom: '10px' }}>
            <Sparkles size={18} /> 先天四化能量節奏
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '6px' }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', padding: '8px 12px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--jade-primary)', fontWeight: 600 }}>化祿（春/機遇）</span>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-title)' }}>{sihua.lu}星</div>
            </div>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', padding: '8px 12px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--crimson-primary)', fontWeight: 600 }}>化權（夏/掌控）</span>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-title)' }}>{sihua.quan}星</div>
            </div>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', padding: '8px 12px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--cyan-primary)', fontWeight: 600 }}>化科（秋/聲譽）</span>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-title)' }}>{sihua.ke}星</div>
            </div>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', padding: '8px 12px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--amber-warning)', fontWeight: 600 }}>化忌（冬/漏洞）</span>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-title)' }}>{sihua.ji}星</div>
            </div>
          </div>
        </div>

        {/* 盲區漏洞警示卡 */}
        <div style={{ background: 'var(--crimson-soft)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--crimson-primary)', fontSize: '0.9rem', fontWeight: 700, marginBottom: '10px' }}>
            <AlertCircle size={18} /> 費曼盲區提示燈（化忌修補課題）
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--crimson-primary)', marginBottom: '6px' }}>
            人生關鍵考卷：【{sihua.ji}化忌】
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
            {sihua.ji === '太陽' && '容易對外人過度燃燒奉獻，卻在家人溝通中耗竭無耐心。修補課題：建立個人健康邊界，對至親多傾聽。'}
            {sihua.ji === '太陰' && '情緒容易深藏暗處默默內耗，易有夜間失眠焦慮。修補課題：曬太陽、規律運動、主動表達真實感受。'}
            {sihua.ji === '廉貞' && '對規則與秩序極端執著，遇到灰色地帶容易焦躁憤怒。修補課題：培養水一樣的圓融彈性，不鑽牛角尖。'}
            {sihua.ji === '巨門' && '言語表達容易過於鋒利直接造成人際摩擦。修補課題：說話前慢半拍，以讚美代替批評，以理通情。'}
            {sihua.ji === '天機' && '容易思慮過度、想太多卻遲遲未付諸實踐。修補課題：少做沙盤推演，每天先完成一件具體微小行動。'}
            {sihua.ji === '文曲' || sihua.ji === '文昌' && '契約文字、條款或情緒化衝動可能帶來損失。修補課題：白紙黑字務求謹慎，遇事冷靜三思。'}
            {sihua.ji === '天同' && '遇挫折容易逃避退縮、尋求短暫快感。修補課題：設定明確階段目標，在小步前進中重塑自信。'}
            {sihua.ji === '武曲' && '對財務安全感極度敏感，容易因金錢焦慮透支生活。修補課題：明白金錢是工具非目的，兼顧身心平衡。'}
            {sihua.ji === '貪狼' && '興趣廣泛但耐力不足，容易虎頭蛇尾。修補課題：精準聚焦單一核心技能，練習深度專注。'}
          </p>
        </div>
      </div>
    </div>
  );
};

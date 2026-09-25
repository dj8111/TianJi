import React from 'react';
import { BenchSimulator } from './BenchSimulator';
import { CaseExplorer } from './CaseExplorer';

export const BenchAndCases: React.FC = () => {
  return (
    <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* 三條腿圓木凳動態平衡器 */}
      <BenchSimulator />

      {/* 20 大實戰微案例會診庫 */}
      <CaseExplorer />
    </div>
  );
};

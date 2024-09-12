import './App.css';
import { useState } from 'react';
import GameBox from './component/GameBox';

function App() {

  return (
    <div className="App">
      <div className='gameBoard-container'>
        <p>TIC TAC TOE</p>
        <div className='gameBoard'> {/* 게임판 (300x300 크기) */}
          <GameBox /> {/* 상자한칸, 값 -> 코드 너무 길어져서 컴포넌트로 뺌 */}
          <GameBox />
          <GameBox />
          <GameBox />
          <GameBox />
          <GameBox />
          <GameBox />
          <GameBox />
          <GameBox />
        </div>
      </div>
    </div>
  );
}

export default App;

import './App.css';
import GameBox from './component/GameBox';
import { useState } from 'react';

function App() {
  const [box, setBox] = useState(Array(9).fill(null)); /* 상자들의 상태(value)를 저장하는 배열 */
  const [nextBox, setNextBox] = useState(true); // 초깃값 설정과 X,O 교차를 위한 리액트훅
  const copyBox = box.slice(); // nextBox라는 변수를 선언해 box 배열의 복제본을 넣음 // slice()사용해 복제한 배열의 일부를 발췌 
  const winner = calculateWinner(box); // 우승자

  const isClick = (i) => {  // 매개변수 i의 값에 따라 9개의 상자 중 업데이트 될 상자가 정해짐.
    if(copyBox[i] || winner){ // 상자에 이미 값이 있거나 우승자가 확정되었을 경우 끝내기
      return;
    };

    if(nextBox) {
      copyBox[i] = "X"; // 업데이트 될 상자의 첫값이 "X"로 정해짐(isNext를 true로 생성하였기 때문) 
    }else{
      copyBox[i] = "O";
    };

    setBox(copyBox);  // useState의 set함수인 setBox에 nextBox를 넣어 업데이트된 값이 확정
    setNextBox(!nextBox); // isNext(true, false)값이 반전되고 state가 저장됨
  };

  let result;
  let isDraw = true; // null이 없는 경우에만 true가 됨

  if(winner) {
    result = `Winner is ${winner}`;
    isDraw = ""; // 우승자가 나왔을 경우 무승부 표시X(마지막에 동시에 나오는 경우 방지 차원)
  }else{
    result = "";
  };


  for(let i=0; i<box.length; i++) {
    if(box[i] === null) { // 한 칸이라도 null이 있으면 isDraw false(무승부X) => 상자가 다 채워져야만 무승부
      isDraw = false;
      break;
    }
  };
  
  if(isDraw) {
    isDraw = "It's a DRAW!"
  }else{
    isDraw = ""
  }

  const reset = () => {
    setBox(Array(9).fill(null));
    setNextBox(true);
  }

  
  return (
    <div className="App">
      <div className='gameBoard-container'>
        <p>TIC TAC TOE</p>
        <div className='gameBoard'> {/* 게임판 (300x300 크기) */}
          <GameBox value={box[0]} onBoxClick={() => isClick(0)}/> {/* 상자한칸, 값 -> 코드 너무 길어져서 컴포넌트로 뺌 */}
          <GameBox value={box[1]} onBoxClick={() => isClick(1)}/>
          <GameBox value={box[2]} onBoxClick={() => isClick(2)}/>
          <GameBox value={box[3]} onBoxClick={() => isClick(3)}/>
          <GameBox value={box[4]} onBoxClick={() => isClick(4)}/>
          <GameBox value={box[5]} onBoxClick={() => isClick(5)}/>
          <GameBox value={box[6]} onBoxClick={() => isClick(6)}/>
          <GameBox value={box[7]} onBoxClick={() => isClick(7)}/>
          <GameBox value={box[8]} onBoxClick={() => isClick(8)}/>
        </div>
        {/* <div className='gameBoard-result'>{winner ? `winner is ${winner}` : `draw`}</div> */}
        <div className='gameBoard-result'>
          <div>{result}</div>
          <div>{isDraw}</div>
          <button onClick={reset}>Reset</button>
        </div>
      </div>
    </div>
  );
}

const calculateWinner = (box) => {
  const list = [ // 모든 승리의 경우(가로/세로/대각선)
    [0, 1, 2], // 첫 번째 행
    [3, 4, 5], // 두 번째 행
    [6, 7, 8], // 세 번째 행
    [0, 3, 6], // 첫 번째 열
    [1, 4, 7], // 두 번째 열
    [2, 5, 8], // 세 번째 열
    [0, 4, 8], // 첫 번째 대각선
    [2, 4, 6], // 두 번째 대각선
  ];

  for (let i=0; i<list.length; i++){
    const [a,b,c] = list[i];  // 승리 조합의 인덱스 값을 꺼내 a,b,c에 구조 분해 할당
    if(box[a] && box[a] === box[b] && box[a] === box[c]) {
      return box[a]; // 승자 반환
    }
  }
  return null; // 승자가 없으면 null 반환
}

export default App;
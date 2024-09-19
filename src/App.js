import './App.css';
import { useState } from 'react';
import GameBox from './component/GameBox';

function App() {

    const [box, setBox] = useState(Array(9).fill(null)); /* 상자들의 상태(value)를 저장하는 배열 */
    const [isNext, setIsNext] = useState(true); // 초깃값 설정과 X,O 교차를 위한 리액트훅
    const nextBox = box.slice(); // nextBox라는 변수를 선언해 box 배열의 복제본을 넣음 // slice()사용해 복제한 배열의 일부를 발췌 

    const isClick = (i) => { // 매개변수 i의 값에 따라 9개의 상자 중 업데이트 될 상자가 정해짐.
      if (box[i] || calculateWinner(box)) { // 이미 값이 존재 or 승자가 나왔을 때 고정되도록
        return;
      };

      if(isNext) {
        nextBox[i] = "X"; // 업데이트 될 상자의 첫값이 "X"로 정해짐(isNext를 true로 생성하였기 때문) 
      }else{
        nextBox[i] = "O";
      };
      setBox(nextBox) // useState의 set함수인 setBox에 nextBox를 넣어 업데이트된 값이 확정
      setIsNext(!isNext); // isNext(true, false)값이 반전되고 state가 저장됨
    }

    const winner = calculateWinner(box);
    let result;
    let isDraw = true; // null이 없는 경우에만 true가 됨


    if(winner) {
      result = "Winner: " + winner;
    } else {
      result = ""
    };
    
    for(let i=0; i<box.length; i++) {
      if(box[i] === null) {
        isDraw = false;
        break;
      }
    };

    if (isDraw) {
      isDraw = "It's a DRAW!";
    }else {
      isDraw = "";
    }
  
    const reset = () => {
      setBox(Array(9).fill(null));
      setIsNext(true);
    }

  return (
    <div className="App">
      <div className='gameBoard-container'>
        <p>TIC TAC TOE</p>
        <div className='gameBoard'> {/* 게임판 (300x300 크기) */}
          <GameBox value={box[0]} onBoxClick={() => isClick(0)} /> {/* 상자한칸, 값 -> 코드 너무 길어져서 컴포넌트로 뺌 */}
          <GameBox value={box[1]} onBoxClick={() => isClick(1)} />
          <GameBox value={box[2]} onBoxClick={() => isClick(2)} />
          <GameBox value={box[3]} onBoxClick={() => isClick(3)} />
          <GameBox value={box[4]} onBoxClick={() => isClick(4)} />
          <GameBox value={box[5]} onBoxClick={() => isClick(5)} />
          <GameBox value={box[6]} onBoxClick={() => isClick(6)} />
          <GameBox value={box[7]} onBoxClick={() => isClick(7)} />
          <GameBox value={box[8]} onBoxClick={() => isClick(8)} />
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
  const lines = [ // 모든 승리의 경우(가로/세로/대각선)
    [0, 1, 2], // 첫 번째 행
    [3, 4, 5], // 두 번째 행
    [6, 7, 8], // 세 번째 행
    [0, 3, 6], // 첫 번째 열
    [1, 4, 7], // 두 번째 열
    [2, 5, 8], // 세 번째 열
    [0, 4, 8], // 첫 번째 대각선
    [2, 4, 6], // 두 번째 대각선
  ];

  for(let i=0; i<lines.length; i++) {
    const [a,b,c] = lines[i]; // 승리 조합의 인덱스 값을 꺼내 a,b,c에 구조 분해 할당
    if(box[a] && box[a] === box[b] && box[a] === box[c]) {
      return box[a]; // 승자 반환
    }
  }
  return null; // 승자가 없으면 null 반환
}

export default App;
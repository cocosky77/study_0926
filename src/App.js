import './App.css';
import { useState } from 'react';
import GameBox from './component/GameBox';

function App() {
    // const [isX, setIsX] = useState(null); /* 맨 처음 클릭 후 X 나오는 거 */
    
    // const isXClick = () => {  /* 기존 isXClick() */
    //     setIsX("X"); 
    // }

    const [box, setBox] = useState(Array(9).fill(null)); /* 상자들의 상태(value)를 저장하는 배열 */
    const [isNext, setIsNext] = useState(true);

    const isXClick = (i) => { // 매개변수 i의 값에 따라 9개의 상자 중 업데이트 될 상자가 정해짐.
      if (box[i]) {
        return;
      }
      const nextBox = box.slice(); // nextBox라는 변수를 선언해 box 배열의 복제본을 넣음 // slice()사용해 복제한 배열의 일부를 발췌                                 
      if(isNext) {
        nextBox[i] = "X"; // 업데이트 될 상자의 첫값이 "X"로 정해짐(isNext를 true로 생성하였기 때문) 
      }else{
        nextBox[i] = "O";
      };
      setBox(nextBox); // useState의 set함수인 setBox에 nextBox를 넣어 업데이트된 값이 확정
      setIsNext(!isNext); // isNext(true, false)값이 반전되고 state가 저장됨
    }
  

  return (
    <div className="App">
      <div className='gameBoard-container'>
        <p>TIC TAC TOE</p>
        <div className='gameBoard'> {/* 게임판 (300x300 크기) */}
          <GameBox value={box[0]} onBoxClick={() => isXClick(0)} /> {/* 상자한칸, 값 -> 코드 너무 길어져서 컴포넌트로 뺌 */}
          <GameBox value={box[1]} onBoxClick={() => isXClick(1)} />
          <GameBox value={box[2]} onBoxClick={() => isXClick(2)} />
          <GameBox value={box[3]} onBoxClick={() => isXClick(3)} />
          <GameBox value={box[4]} onBoxClick={() => isXClick(4)} />
          <GameBox value={box[5]} onBoxClick={() => isXClick(5)} />
          <GameBox value={box[6]} onBoxClick={() => isXClick(6)} />
          <GameBox value={box[7]} onBoxClick={() => isXClick(7)} />
          <GameBox value={box[8]} onBoxClick={() => isXClick(8)} />
        </div>
      </div>
    </div>
  );
}

export default App;

/**
 * <GameBox value={box[0]} onBoxClick={() => isXClick(0)}/>
 * 
 * const [box, setBox] = useState(Array(9).fill(null)); // 상자 value를 배열로
 * const [isNext, setIsNext] = useState(true) // X,O 값
 * 
 * const isXClick = (i) => {
 *  if(box[i]) { // 이미 상자에 value값이 있으면 return(변하지 못함)
 *    return;
 * };
 * const nextBox = box.slice();
 * if (isNext) {
 * nextBox[i] = "X";
 * } else{
 * nextBox[i] = "O";
 * }
 * 
 * }
 */

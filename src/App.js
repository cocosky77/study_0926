import "./App.css";
import GameBox from "./component/GameBox";
import { useState } from "react";

function App() {
  // history: square 배열을 감싸는 배열 ex) [{...}, {...}, {...},];
  // square: 1개의 배열 ex) [null, null, "X", null ...];
  const [history, setHistory] = useState([{ square: Array(9).fill(null) }]);
  const [nextBox, setNextBox] = useState(true); // X,O 교차를 위함
  const [travel, setTravel] = useState(0); // 과거로의 시간여행을 위함

  const calculateWinner = (item) => {
    const numberOfCases = [
      // 모든 승리의 경우(가로, 세로, 대각선)
      [0, 1, 2], // 첫 번째 행
      [3, 4, 5], // 두 번째 행
      [6, 7, 8], // 세 번째 행
      [0, 3, 6], // 첫 번째 열
      [1, 4, 7], // 두 번째 열
      [2, 5, 8], // 세 번째 열
      [0, 4, 8], // 첫 번째 대각선
      [2, 4, 6], // 두 번째 대각선
    ];

    for (let i = 0; i < numberOfCases.length; i++) {
      const [a, b, c] = numberOfCases[i]; // 승리 조합의 인덱스 값을 꺼내 a,b,c에 구조 분해 할당
      if (item[a] && item[a] === item[b] && item[a] === item[c]) {
        return item[a]; // 승자 반환("X" or "O")
      }
    }
    return null; // 승자가 없으면 null 반환
  };

  const current = history[history.length - 1]; // 현재 상태의 배열(가장 최근 상태)
  const winner = calculateWinner(current.square); // 현재 상태의 우승자

  const handleClick = (i) => {
    console.log("history", history); // 클릭 > 업데이트되는 history 상태

    const copyBox = current.square.slice(); // 현재 상태의 배열 복사본(가장 최근 상태 복사본)

    // 상자에 이미 값이 있거나 우승자가 확정되었을 경우 끝내기
    if (copyBox[i] || winner) {
      return;
    }

    copyBox[i] = nextBox ? "X" : "O"; // "X", "O" 교차

    // const goBack = [...history, { square: copyBox }];

    setHistory([...history, { square: copyBox }]); // set함수에 업데이트된 배열 상태 저장
    setNextBox(!nextBox); // true, false 값이 반전되고 state가 저장됨
    setTravel(history.length); // 현재 길이 저장(즉 travel에 배열 길이가 저장됨)
  };

  const movesBtn = history.map((value, index) => {
    return (
      <li key={index}>
        <button onClick={() => timeTravel(index)}>
          {index ? `${index}로 이동` : `처음으로 이동`}
          {/* 0은 falsy한 값이기 때문 */}
        </button>
      </li>
    );
  });

  let isDraw = true; // null이 없는 경우에만 true가 됨
  let result;

  switch (winner) {
    case null:
      result = `Next turn is ${nextBox ? "X" : "O"}`;
      break; // switch case문에서 필수!

    default:
      result = `Winner is ${winner}`;
      isDraw = ""; // 우승자가 나왔을 경우 무승부 표시X(마지막에 동시에 나오는 경우 방지 차원)
      break;
  }

  for (let i = 0; i < current.square.length; i++) {
    // 한 칸이라도 null이 있으면 isDraw false(무승부X) => 상자가 다 채워져야만 무승부O
    if (current.square[i] === null) {
      isDraw = false;
      break;
    }
  }

  const timeTravel = (i) => {
    setTravel(i); // 이동하려는 i로 설정하기
    setHistory(history.slice(0, i + 1));
    setNextBox(i % 2 === 0); // X, O 값 교차 => 한 단계씩 과거로 가기 때문

    // const travel = history[history] - current;
    //  = current.square.slice(); // 현재

    // if (now.history[history.length] > 0) {
    //   // travel = now.history[history.length - 1];

    // } else {
    // }

    // const pastpast = now.square.slice();
    // const past = history[history.length - 2]; // 현재 배열 -1(한 칸 과거로)

    // const pastpast = gopast.square.slice(); // past배열 복사본

    // setHistory([...history, travel]);
  };

  if (isDraw) {
    isDraw = "It's a DRAW!";
    result = "";
  } else {
    isDraw = "";
  }

  const reset = () => {
    setHistory([{ square: Array(9).fill(null) }]); // 초기화
    setNextBox(true);
  };

  return (
    <div className="App">
      <div className="gameBoard-container">
        <p>TIC TAC TOE</p>
        {/* 게임판 (300x300 크기) */}
        <div className="gameBoard">
          <GameBox
            value={current.square[0]}
            onBoxClick={() => handleClick(0)}
          />
          <GameBox
            value={current.square[1]}
            onBoxClick={() => handleClick(1)}
          />
          <GameBox
            value={current.square[2]}
            onBoxClick={() => handleClick(2)}
          />
          <GameBox
            value={current.square[3]}
            onBoxClick={() => handleClick(3)}
          />
          <GameBox
            value={current.square[4]}
            onBoxClick={() => handleClick(4)}
          />
          <GameBox
            value={current.square[5]}
            onBoxClick={() => handleClick(5)}
          />
          <GameBox
            value={current.square[6]}
            onBoxClick={() => handleClick(6)}
          />
          <GameBox
            value={current.square[7]}
            onBoxClick={() => handleClick(7)}
          />
          <GameBox
            value={current.square[8]}
            onBoxClick={() => handleClick(8)}
          />
        </div>
        <div className="gameBoard-result">
          <div>{result}</div>
          <div>{isDraw}</div>
          <button onClick={reset}>Reset</button>
        </div>
      </div>
      <ol className="gameBoard-button">
        {/* <button onClick={() => timeTravel(travel - 1)}>Go to back!</button>
        {/* <button onClick={() => timeTravel(travel - 2)}>Go to back!</button>
        <button onClick={() => timeTravel(travel - 3)}>Go to back!</button> */}
        {movesBtn}
      </ol>
    </div>
  );
}

export default App;

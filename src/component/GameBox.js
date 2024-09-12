import { useState, useEffect } from "react";
import "./GameBox.css"

const GameBox = () => {
    const [isX, setIsX] = useState(false); /* 맨 처음 클릭 후 X 나오는 거(초깃값은 false) */
    const [change, setChange] = useState(true);
    const [value, setValue] = useState(Array(9).fill(null));

    const isXClick = () => {
        setIsX(true);
        return;
    }
    
    const isChange = () => {
        if(change === true) {
                    setChange(false);
                    return;
                }else{
                    setChange(true);
                    return;
                }
    }

    // useEffect(() => {
    //     if(change === true) {
    //         setChange(false);
    //     }else{
    //         setChange(true);
    //     }
    // },[change])

    return(
        <div>
            <div className='gameBoard-box' onClick={isXClick}>
            <div className='gameBoard-box_value' onClick={isChange}>{change ? (isX ? "X" : "") : "O"}</div>
          </div>
        </div>
    );
}

export default GameBox;

/**
 * 상자를 클릭 -> "X"부터 시작 >> 완료!
 * 클릭해서 X가 놓이면 그 다음 클릭은 무조건 O가 되어야 함(교차 반복)
 * X혹은 O이 연속해서 3개가 되면 게임 끝 => 게임판 아래에 우승자를 표시
 * 9칸이 다참(승패 결정X) => 게임판 아래에 "무승부"라고 표시
 */
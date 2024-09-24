import "./GameBox.css"

const GameBox = ({value, onBoxClick}) => {
    
    return(
        <div>
            <div className='gameBoard-box' onClick={onBoxClick}>
            {/* <div className='gameBoard-box_value' onClick={isChange}>{change ? (isX ? "X" : "") : "O"}</div> */}
            <div className='gameBoard-box_value'>{value}</div>
          </div>
        </div>
    );
}

export default GameBox;


/**
 * 
 * 상자를 클릭 -> 상자에 문자 "X" 입력 >> isClick()
 * 9개 상자 각각의 id가 없음 >> useState를 이용해 각 상자의 value를 지정하기 위해 box 배열 제작
 * 각 상자 컴포넌트(<GameBox /> value에 box배열을 차례로 삽입함)
 * 
 * 각 상자 컴포넌트(GameBox value box 차례로 삽입)
 * onBoxClick()를 onClick 메소드로 호출. [기존의 isClick()와 연결시키기 위함]
 * => isClick()은 한 상자에 X클릭을 보여주는 함수지만, 부모 컴포넌트(App)에서 자식 컴포넌트에
 * 일괄적으로 처리를 하기 위해 onBoxClick()을 만들어서 호출
 * 
 * 부모 컴포넌트(App)의 <GameBox />에서 onBoxClick()와 isClick()을 연결
 * 
 * 기존 isClick()와 다르게 수정된 isClick()은 box[i]로 모든 상자를 업데이트할 수 있도록 수정
 * 
 * 
 * 클릭해서 X가 놓이면 그 다음 클릭은 무조건 O가 되어야 함(교차 반복)
 * 
 * X혹은 O이 연속해서 3개가 되면 게임 끝 => 게임판 아래에 우승자를 표시
 * 9칸이 다참(승패 결정X) => 게임판 아래에 "무승부(It's a DRAW!)"라고 표시
 * 
 * 
 */

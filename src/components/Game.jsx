import "../styles/styles.css";
import { useEffect, useState } from 'react';
import { useLocation } from "react-router";
import squaresImg from '../assets/colorSquares.jpg';
import OptionsDiv from './OptionsDiv';
import Scoreboard from "./Scoreboard";

const startingOptions = ['Pink Square', 'Yellow Square', 'Blue Square', 'Gray Square'];

async function fetchCheck(targetName, coordX, coordY) {

    try {

    const response = await fetch(`https://wheres-waldo-5irt.onrender.com/check-option`, {
      method: "POST",
      body: JSON.stringify({ pictureId: 1, targetName: targetName, coordX: coordX, coordY: coordY }),
      headers: {'Content-type': 'application/json'},
    })

    // console.log(targetName, coordX, coordY);

    let postsData = await response.json();

    return postsData;

    } catch (error) {

        console.log(error);

    }

};

function Game() {
  const [coordX, setCoordX] = useState(0);
  const [coordY, setCoordY] = useState(0);
  const [active, setActive] = useState(false);
  const [options, setOptions] = useState(startingOptions);
  const [checkMarks, setCheckMarks] = useState([]);
  const [message, setMessage] = useState('Find and select a target');
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(0);

  const pictureId = useLocation().state;

  useEffect(() => {

    async function updateTime() {

      if (gameOver == false) {
        
        let newTime = time+1;

        setTimeout(() => setTime(newTime), 1000);

      } else { 
        return 
      }


    }

    updateTime();
    
  }, [time, gameOver])

  function restartGame() {
    setCoordX(0);
    setCoordY(0);
    setActive(false);
    setOptions(startingOptions);
    setCheckMarks([]);
    setMessage('Find and select a target');
    setGameOver(false);
    setTime(0);
  }

  function popUpTarget(e) {
    setActive(true);

    let x = e.nativeEvent.offsetX;
    let y = e.nativeEvent.offsetY;    
    
    // console.log(e.target);
    // console.log(e.clientX, e.clientY);
    console.log(x, y);
    console.log(pictureId);
  
    setCoordX(x);
    setCoordY(y);

  }

  async function selectOption(e, option) {
    
    setActive(false);

    e.stopPropagation();

    const result = await fetchCheck(option, coordX, coordY);

    console.log(result.message);

    if (result.message == 'Right on the mark!') {
      addCheckMark();
      deleteOption(option);
      
      if (options[1] == undefined) {

        setGameOver(true);
        setMessage('You won!');
        
        return;

      }

    }

    setMessage(result.message);
    
  }

  function addCheckMark() {
    let newArr = [...checkMarks]
    newArr.push([coordX, coordY])
    // console.log(Array.isArray(newArr));
    setCheckMarks(newArr);
  }

  function deleteOption(option) {
    let newArr = [...options]
    newArr.splice(newArr.indexOf(option), 1);
    // console.log(newArr);
    setOptions(newArr);
  }

  return (
  <div className="container">

    <div className="stats">
      <div>Coord X: {coordX}</div>
      <div>Coord Y: {coordY}</div>
      <div>Options: {options}</div>
      <div>Active: {active ? 'true' : 'false'}</div>
      <div>Checkmarks: {checkMarks}</div>
      <div>Time: {time} seconds</div>
    </div>

    <Scoreboard time={time} gameOver={gameOver} handleClick={restartGame}></Scoreboard>

    <div className="msgBox">{message}</div>

    <div 
      className={gameOver ? 'imgDiv gameOver' : 'imgDiv'}
      onClick={popUpTarget} 
      style={{backgroundImage: `url("${squaresImg}")`}} 
    > 

      {checkMarks.map(checkMark => {

        return(
        
        <div 
          key={checkMark}
          className='checkMark'
          style={{transform: `translateX(${checkMark[0]-25}px) translateY(${checkMark[1]-25}px)`}}
        ></div>

        )
        
      })

      }
      
      <div 
        className={gameOver ? 'rectangle invisible' : (active ? 'rectangle' : 'rectangle invisible')}
        // ref={rectangle}
        style={{transform: `translateX(${coordX-25}px) translateY(${coordY-25}px)`}}
      >
        
        <div className="square"></div>
        <OptionsDiv optionsArr={options} handleClick={selectOption}></OptionsDiv>

      </div>
    
    </div>

    <button 
      className="restartBtn"
      onClick={restartGame}
    >Restart game</button>

  </div>
  )

}

export default Game;

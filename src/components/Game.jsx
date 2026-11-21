import "../styles/styles.css";
import { useEffect, useState, useRef } from 'react';
import { useLocation } from "react-router";
import skiPic from '../assets/waldoSki.jpg'
import squaresPic from '../assets/colorSquares.jpg';
import OptionsDiv from './OptionsDiv';
import Scoreboard from "./Scoreboard";
import TargetsRef from "./TargetsRef";

async function fetchOptions(pictureId) {

  try {

  console.log(pictureId);

  const response = await fetch(`https://wheres-waldo-5irt.onrender.com/picture/${pictureId}`);

  let optionsData = await response.json();

  let options = [];

  optionsData.forEach(option => {
    
    options.push(option.name);

  });

  console.log(options);
  
  return options;

  } catch (error) {

    console.log(error);

  }

};

async function fetchCheck(pictureId, targetName, coordX, coordY) {

  try {

  const response = await fetch(`https://wheres-waldo-5irt.onrender.com/check-option`, {
    method: "POST",
    body: JSON.stringify({ pictureId: Number(pictureId), targetName: targetName, coordX: coordX, coordY: coordY }),
    headers: {'Content-type': 'application/json'},
  })

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
  const [options, setOptions] = useState([]);
  const [checkMarks, setCheckMarks] = useState([]);
  const [message, setMessage] = useState('Find and select a character');
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(0);
  const timeoutRef = useRef(null);

  const pictureId = useLocation().state;

  useEffect(() => {

    async function startGame() {      

      //fetch options once

      if (time == 0) {

      const response = await fetchOptions(pictureId);
      
      console.log(response);
      
      setOptions(response);

      }
      
      // update stopwatch every 1 second with current time
      if (gameOver == false) {
        
        let newTime = time+1;

        timeoutRef.current = setTimeout(() => {
          console.log(gameOver);
          if (gameOver == false) setTime(newTime);
        }, 1000);

        
      } else { 
        return 
      }


    }

    startGame();
    
  }, [pictureId, time, gameOver])

  function restartGame() {
    clearTimeout(timeoutRef);
    setCoordX(0);
    setCoordY(0);
    setActive(false);
    setOptions([]);
    setCheckMarks([]);
    setMessage('Find and select a character');
    setGameOver(false);
    setTime(0);
    timeoutRef.current = null;
  }

  function popUpTarget(e) {
    setActive(true);

    let x = e.nativeEvent.offsetX;
    let y = e.nativeEvent.offsetY;    
    
    console.log(x, y);
  
    setCoordX(x);
    setCoordY(y);

  }

  async function selectOption(e, option) {
    
    setActive(false);

    e.stopPropagation();

    const result = await fetchCheck(pictureId, option, coordX, coordY);

    console.log(result.message);

    if (result.message == 'Right on the mark!') {
      addCheckMark();
      deleteOption(option);
      
      //no options[1] available means last target was found in succesful selection but react state hasn't updated yet, which is why we search [1] instead of [0]
      if (options[1] == undefined) {        

        console.log('GAME IS OVERRRRR');
        
        clearTimeout(timeoutRef.current);
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
    setCheckMarks(newArr);
  }

  function deleteOption(option) {
    let newArr = [...options]
    newArr.splice(newArr.indexOf(option), 1);
    setOptions(newArr);
  }

  return (
  <div className="gameContainer">

    <div className="stats">
      <div>Coord X: {coordX}</div>
      <div>Coord Y: {coordY}</div>
      <div>Options: {options}</div>
      <div>Active: {active ? 'true' : 'false'}</div>
      <div>Checkmarks: {checkMarks}</div>
      <div>Time: {time} seconds</div>
    </div>

    <Scoreboard pictureId={pictureId} time={time} gameOver={gameOver} handleClick={restartGame}></Scoreboard>

    {pictureId == 2 ? <TargetsRef></TargetsRef> : <div style={{marginTop: '100px'}}></div>}  

    <div className="msgBox">{message}</div>

    <div 
      className={gameOver ? `pictureDiv pic${pictureId} gameOver` : `pictureDiv pic${pictureId}`}
      onClick={popUpTarget} 
      style={{backgroundImage: `url("${pictureId == 1 ? squaresPic : skiPic}")`}} 
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
        style={{transform: `translateX(${coordX-25}px) translateY(${coordY-25}px)`}}
      >
        
        <div className="square"></div>
        <OptionsDiv optionsArr={options} handleClick={selectOption}></OptionsDiv>

      </div>
    
    </div>

    {/* <button 
      className="restartBtn"
      onClick={restartGame}
    >Restart game</button> */}

  </div>
  )

}

export default Game;

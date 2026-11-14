import "../styles/styles.css";
import { useState } from 'react';
import squaresImg from '../assets/colorSquares.jpg';
import Options from './Options';

async function fetchCheck(targetName, coordX, coordY) {

    try {

    const response = await fetch(`https://wheres-waldo-5irt.onrender.com/check-option`, {
        method: "POST",
        body: JSON.stringify({ pictureTitle: 'colorSquares', targetName: targetName, coordX: coordX, coordY: coordY }),
        headers: {'Content-type': 'application/json'},
    })

    console.log(targetName, coordX, coordY);
    
    // const response = await fetch(`https://wheres-waldo-5irt.onrender.com/check-option`, {
    //     method: "POST",
    //     body: JSON.stringify({ pictureTitle: 'colorSquares', targetName: 'Pink Square', coordX: 0, coordY: 0 }),
    //     headers: {'Content-type': 'application/json'},
    // })

    let postsData = await response.json();

    // console.log(postsData);
    // console.log(response.headers);
    // console.log(response.headers.map);
    // console.log(...response.headers);

    return postsData;

    } catch (error) {

        console.log(error);

    }

};

function Home() {
  const [coordX, setCoordX] = useState(0);
  const [coordY, setCoordY] = useState(0);
  const [active, setActive] = useState(false);
  const [checkMarks, setCheckMarks] = useState([]);

  // const rectangle = useRef();

  function popUpTarget(e) {
    setActive(true);

    let x = e.nativeEvent.offsetX;
    let y = e.nativeEvent.offsetY;    
    
    // console.log(e.target);
    // console.log(e.clientX, e.clientY);
    console.log(x, y);

    setCoordX(x);
    setCoordY(y);

  }

  async function selectOption(e, char) {
    
    setActive(false);

    e.stopPropagation();

    const result = await fetchCheck(char, coordX, coordY);

    console.log(result.message);

    if (result.message == 'Right on the mark!') {
      addCheckMark();
    }

    // alert(result.message);
    
  }

  function addCheckMark() {
    let newArr = [...checkMarks]
    newArr.push([coordX, coordY])
    console.log(newArr);
    console.log(Array.isArray(newArr));
    setCheckMarks(newArr);
  }

  return (
  <>
  <div>Coord X: {coordX}</div>
  <div>Coord Y: {coordY}</div>
  <div>Active: {active ? 'true' : 'false'}</div>
  <div>Checkmarks: {checkMarks}</div>

  <div 
    onClick={popUpTarget} 
    style={{backgroundImage: `url("${squaresImg}")`}} 
    className='imgDiv'
  > 

    {checkMarks.map(checkMark => {

      console.log(checkMark);
      console.log(checkMark[0]);
      console.log(checkMark[1]);

      return(
      
      <div 
        className='checkMark'
        style={{transform: `translateX(${checkMark[0]-25}px) translateY(${checkMark[1]-25}px)`}}
      ></div>

      )
      
    })

    }
    
    <div 
      className={active ? 'rectangle' : 'rectangle invisible'}
      // ref={rectangle}
      style={{transform: `translateX(${coordX-25}px) translateY(${coordY-25}px)`}}
    >
      
      <div className="square"></div>
      <Options handleClick={selectOption}></Options>

    </div>
  
  </div>
  </>
  )

}

export default Home;

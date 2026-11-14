import "../styles/styles.css";
import { useState } from 'react';
import squaresImg from '../assets/colorSquares.jpg';
import OptionsDiv from './OptionsDiv';

const startingOptions = ['Pink Square', 'Yellow Square', 'Blue Square', 'Gray Square'];

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
  const [options, setOptions] = useState(startingOptions);
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

  async function selectOption(e, option) {
    
    setActive(false);

    e.stopPropagation();

    const result = await fetchCheck(option, coordX, coordY);

    console.log(result.message);

    if (result.message == 'Right on the mark!') {
      addCheckMark();
      deleteOption(option);
    }

    // alert(result.message);
    
  }

  function addCheckMark() {
    let newArr = [...checkMarks]
    newArr.push([coordX, coordY])
    console.log(Array.isArray(newArr));
    setCheckMarks(newArr);
  }

  function deleteOption(option) {
    let newArr = [...options]
    newArr.splice(newArr.indexOf(option), 1);
    console.log(newArr);
    setOptions(newArr);
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
      <OptionsDiv optionsArr={options} handleClick={selectOption}></OptionsDiv>

    </div>
  
  </div>
  </>
  )

}

export default Home;

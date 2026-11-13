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

    alert(result.message);
    
  }

  return (
  <div 
    onClick={popUpTarget} 
    style={{backgroundImage: `url("${squaresImg}")`}} 
    className='imgDiv'
  > 
    
    <div 
      id="foo" 
      className={active ? 'rectangle' : 'rectangle invisible'}
      // ref={rectangle}
      style={{transform: `translateX(${coordX-25}px) translateY(${coordY-25}px)`}}
    >
      
      <div className="square"></div>
      <Options handleClick={selectOption}></Options>

    </div>
  
  </div>
  )

}

export default Home;

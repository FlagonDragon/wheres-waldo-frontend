import "../styles/styles.css";
import { useState, useRef } from 'react';
import squaresImg from '../assets/colorSquares.jpg';
import Options from './Options';

function Home() {
  const [coordsX, setCoordsX] = useState(0);
  const [coordsY, setCoordsY] = useState(0); 

  const rectangle = useRef();

  function transformEle(e) {
    console.log(e.clientX, e.clientY);
    setCoordsX(e.clientX);
    setCoordsY(e.clientY);
  }

  return (
  <div 
    onClick={transformEle} 
    style={{backgroundImage: `url("${squaresImg}")`}} 
    className="imgDiv" 
  >
  {/* <img onClick={transformEle} src={squaresImg} height='500'> */}

    <p>Click anywhere to move the ball</p>
    
    <div 
      id="foo" 
      className="rectangle" 
      ref={rectangle}
      style={{transform: `translateX(${coordsX+15}px) translateY(${coordsY-25}px)`}}
    >
      <div className="square"></div>
      <Options></Options>

    </div>
  
  {/* </img> */}
  </div>
  )

}

export default Home;

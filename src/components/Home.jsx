import "../styles/styles.css";
import { useState } from 'react';
import squaresImg from '../assets/colorSquares.jpg';
import Options from './Options';

function Home() {
  const [coordsX, setCoordsX] = useState(0);
  const [coordsY, setCoordsY] = useState(0); 

  // const rectangle = useRef();

  function transformEle(e) {

    let x = e.nativeEvent.offsetX;
    let y = e.nativeEvent.offsetY;    
    
    console.log(e.target);
    console.log(e.clientX, e.clientY);
    console.log(x, y);

    setCoordsX(x);
    setCoordsY(y);

  }

  return (
  <div 
    onClick={transformEle} 
    style={{backgroundImage: `url("${squaresImg}")`}} 
    className="imgDiv" 
  >
    
    <div 
      id="foo" 
      className="rectangle" 
      // ref={rectangle}
      style={{transform: `translateX(${coordsX-25}px) translateY(${coordsY-25}px)`}}
    >
      
      <div className="square"></div>
      <Options></Options>

    </div>
  
  </div>
  )

}

export default Home;

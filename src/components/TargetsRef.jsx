import waldoImg from '../assets/waldoImg.png';
import wendaImg from '../assets/wendaImg.png';
import woofImg from '../assets/woofImg.png';
import whitebeardImg from '../assets/whitebeardImg.png';
import odlawImg from '../assets/odlawImg.png';
import sasquatchImg from '../assets/sasquatchImg.png';

function TargetsRef() {

  return (

  <div className="targetsContainer">
    
    <div className="targetDiv">
      <div 
        style={{backgroundImage: `url("${waldoImg}")`}} 
        className="targetImg"
      ></div>
      <div className="targetName">Waldo</div>
    </div>
    <div className="targetDiv">
      <div 
        style={{backgroundImage: `url("${wendaImg}")`}} 
        className="targetImg"
      ></div>
      <div className="targetName">Wenda</div>
    </div>
    <div className="targetDiv">
      <div 
        style={{backgroundImage: `url("${woofImg}")`}} 
        className="targetImg"
      ></div>
      <div className="targetName">Woof</div>
    </div>
    <div className="targetDiv">
      <div 
        style={{backgroundImage: `url("${whitebeardImg}")`}} 
        className="targetImg"
      ></div>
      <div className="targetName">Whitebeard</div>
    </div>
    <div className="targetDiv">
      <div 
        style={{backgroundImage: `url("${odlawImg}")`}} 
        className="targetImg"
      ></div>
      <div className="targetName">Odlaw</div>
    </div>
    <div className="targetDiv">
      <div 
        style={{backgroundImage: `url("${sasquatchImg}")`}} 
        className="targetImg sasquatch"
      ></div>
      <div className="targetName">Sasquatch</div>
    </div>

  </div>

  )

}

export default TargetsRef;

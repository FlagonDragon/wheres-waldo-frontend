import { useNavigate } from "react-router";
import colorSquares from '../assets/colorSquares.jpg'
import waldoSki from '../assets/waldoSki.jpg'

function Home() {

    const navigate = useNavigate();

    return(
    <>

    <div className='homeContainer'>

    <h1>Pick an image to play with</h1>

    <div 
        className='homePicture'
        style={{backgroundImage: `url("${waldoSki}")`}}
        onClick={() => {
            console.log('1');
            navigate(`/game`, {state: '1'});
        }}
    > 
    </div>

    <div 
        className='homePicture'
        style={{backgroundImage: `url("${colorSquares}")`}}
        onClick={() => {
            console.log('1');
            navigate(`/game`, {state: '2'});
        }}
    > 
    </div>

    </div>

    </>
    )
}

export default Home;
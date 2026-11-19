import colorSquares from '../assets/colorSquares.jpg'
import waldoSki from '../assets/waldoSki.jpg'

function Home() {

    return(
    <>

    <div className='homeContainer'>

    <div>Pick an image to play with</div>

    <div 
        className='homePicture'
        style={{backgroundImage: `url("${colorSquares}")`}} 
    > 
    </div>
    
    <div 
        className='homePicture'
        style={{backgroundImage: `url("${waldoSki}")`}} 
    > 
    </div>

    </div>

    </>
    )
}

export default Home;
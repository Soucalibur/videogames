import {Link} from "react-router-dom"
import Imagenes from "../CSS/img/Home/imagenes";
import s from "../CSS/landingPage.css"

const LandingPage = ()=>{

    

    return(

        <div className="containerLandingPage">
            <div>
                
                <Link to="/home">
                    <h3 className="textLandingPage"> VideoGames App <br/> Entrar</h3>
                    
                </Link>
            </div>
            
            <img src={Imagenes.backgroundLandingPage} alt="giflanding" className="backgroundLandingPage"></img>
        </div>
    )
}

export default LandingPage;
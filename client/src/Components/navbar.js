import { Link } from "react-router-dom"
import s from "../CSS/Navbar.css"

const Navbar = ()=>{

    return(
        <div className="containerNavbar">
            <Link to="/"> ImagenPágina </Link>
            <Link to="/home">Home</Link>
            <Link to="/home/createGame">Crear Juego</Link>
            
        </div>
    )
}

export default Navbar
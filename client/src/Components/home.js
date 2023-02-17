import {Link} from "react-router-dom"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {obtenerVideojuegos, getGenres} from "../redux/actions"
import "../CSS/home.css"
import img from "../CSS/img/Home/lines.jpg"
import imgLoading from "../CSS/img/Home/giphy.gif"
import Paginate from "./paginate";
import Filter from "./filter";

const Home = ()=>{

    const dispatch = useDispatch()
    const juegos = useSelector((state)=>state.games)
    
    const [currentPage, setCurrentPage] = useState(1)
    const [gamesPerPage, setGamesPerPage] = useState(10)
    const indexOfLastGame = currentPage * gamesPerPage
    const indexOfFirstGame = indexOfLastGame - gamesPerPage
    const currentGame = juegos.slice(indexOfFirstGame, indexOfLastGame)



    useEffect(()=>{

        dispatch(obtenerVideojuegos())
        dispatch(getGenres())
    }, [dispatch])



    const paginate = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    if(!juegos.length){
        return(
            <div className="contenedorLoading">
                <img src={imgLoading} alt="fondo" className="imgBackgroundLoading" />
            </div>
        )
        
    }
    else{
        return(

            <div className="contenedor">
                <Filter></Filter>
                <div className="contenedorJuegos">
                    {currentGame.map((juego)=>{
                        return(
                            <div className="contenedorGame" key={juego.id}>
                                
                                <Link to={`/home/juegos/${juego.id}`}>
                                    <p className="tituloGame">{juego.name} </p>
                                </Link>
                                
                                <img src={juego.img} className="imgContenedorJuegos" alt="imgContainer"></img>
                                <p className="ratingGame">rating: {juego.rating}</p>
                            </div>
                        )
                        
                        
                    })}
                    
                <img src={img} alt="fondo" className="imgBackground" />
                </div>

                <div>
                    <Paginate gamesPerPage={gamesPerPage} totalGames={juegos.length} paginate={paginate}  currentPage={currentPage}></Paginate>
                </div>

            </div>
    
            
            
        )
    }

    
}

export default Home
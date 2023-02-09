import {Link} from "react-router-dom"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {obtenerVideojuegos} from "../redux/actions"
import "../CSS/home.css"
import img from "../CSS/img/Home/lines.jpg"
import imgLoading from "../CSS/img/Home/giphy.gif"

const Home = ()=>{

    const dispatch = useDispatch()
    const juegos = useSelector((state)=>state.games)

    useEffect(()=>{

        dispatch(obtenerVideojuegos())

    }, [dispatch])

    console.log(juegos)


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
                <div className="nav">
                    <h3>HOME</h3>
                    <Link to="/">
                        <h2> Inicio </h2>
                    </Link>
                    <Link to="/home/createGame">
                        <h2> Crear Juego </h2>
                    </Link>
                    
                </div>
                
    
                <div className="contenedorJuegos">
                    {juegos.map((juego)=>{
                        return(
                            <div className="contenedorGame" key={juego.id}>
                                
                                <Link to={`/home/juegos/${juego.id}`}>
                                    <p className="tituloGame">{juego.name} </p>
                                </Link>
                                
                                <img src={juego.img} className="imgContenedorJuegos"></img>
                                <p className="ratingGame">rating: {juego.rating}</p>
                            </div>
                        )
                        
                        
                    })}
                </div>

                <img src={img} alt="fondo" className="imgBackground" />

            </div>
    
            
            
        )
    }

    
}

export default Home
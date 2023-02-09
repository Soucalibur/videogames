import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom'
import {obtenerDetallesJuego} from "../redux/actions"




const Juegos = (props)=>{
    const { id } = useParams()
    
    
    const dispatch = useDispatch()
    const game = useSelector((state)=>state.infGames)
    

    useEffect(()=>{

        dispatch(obtenerDetallesJuego(id))

    },[])


    if(!Object.entries(game).length){
        return(
            <div>
                <p>Cargandoasdasda...</p>
            </div>
        )
    }
    else{
        
        return(
            <div>
    
                <div>
                    <h2>Juego</h2>
                </div>
    
                <div>
                    <div>
                        <img src={game.img} />
                    </div>
                    
                    <h3>{game.name}</h3>
                    
                    <h3>Generos: {game.genres.map((genero)=>{
                        return(
                            <div key={genero.name}>
                                <p>{genero.name}</p>
                            </div>
                        )
                        
                    })}
                    </h3>
                    <h3>Descripcion: {game.description.split("<p>").join("").split("<br />").join("").split("</p>").join("")}</h3>
                    <h3>Fecha de lanzamiento: {game.date}</h3>
                    <h3>Rating: {game.rating}</h3>
                    
                    <h3>Plataformas: {game.platforms.map((e)=>{
                        return(
                            <div key={e.platform.name}>
                                <p >{e.platform.name}</p>
                            </div>
                        )
                        
                    })}
                    </h3>
    
                </div>
    
    
            </div>
        )
    }
    

}

export default Juegos
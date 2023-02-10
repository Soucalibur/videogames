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
                        <img src={game.img || game[0].background_image} alt="imgGAME" />
                    </div>
                    
                    <h3>{game.name || game[0].name}</h3>
                    
                    <h3>Generos: {game.genres? (game.genres.map((genero)=>{
                        return(
                            <div key={genero.name}>
                                <p>{genero.name}</p>
                            </div>
                        )
                        
                    })):(
                        game[0].Generos.map((genero)=>{
                            return(
                                <div key={genero.nombre}>
                                    <p>{genero.nombre}</p>
                                </div>
                            )
                        })
                    )}
                    </h3>

                    <h3>Descripcion: {game.description? 
                    (game.description.split("<p>").join("").split("<br />").join("").split("</p>").join(""))
                    :(
                        game[0].description
                    )}</h3>
                    <h3>Fecha de lanzamiento: {game.date? (game.date) : (game[0].date)}</h3>
                    <h3>Rating: {game.rating ? (game.rating) : (game[0].rating)}</h3>
                    
                    <h3>Plataformas: {game.platforms ? (game.platforms.map((e)=>{
                        return(
                            <div key={e.platform.name}>
                                <p >{e.platform.name}</p>
                            </div>
                        )
                        
                    })):(
                        game[0].platforms.map((e)=>{
                            return(
                                <div key={e}>
                                    <p >{e}</p>
                                </div>
                            )
                        })
                    )}
                    </h3>
    
                </div>
    
    
            </div>
        )
    }
    

}

export default Juegos
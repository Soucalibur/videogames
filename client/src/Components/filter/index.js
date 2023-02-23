import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { obtenerVideojuegos, gamesByGenre } from "../../redux/actions"

import s from "../../CSS/filter.css"

const Filter = ()=>{
    const dispatch = useDispatch()
    const [input, setInput] = useState({
        nombre: "",
        genero: ""
    })
    let generos = useSelector((state)=> state.genres).filter((genero)=>genero.nombre !== "Board Games" && genero.nombre !== "Educational" && genero.nombre !== "Card")
    
    const changeInput = (event)=>{
        const {value, name} = event.target
        setInput({...input, [name]: value})
    }

    const buscarJuegoPorNombre = (event)=>{
        event.preventDefault()
        dispatch(obtenerVideojuegos(input.nombre))
    }

    const buscarJuegoPorGenero = (event)=>{
        event.preventDefault()
        dispatch(gamesByGenre(input.genero))
    }

    
    return(
        <div className="containerFilter">
            
            <form onSubmit={buscarJuegoPorNombre}>
                <label> Búsqueda por nombre </label> <br/>
                <input
                    name="nombre"
                    value={input.nombre}
                    onChange={changeInput}
                    placeholder="Ej: Portal 2..." 
                />

                <button type="sumbit" className="buttonFilter">BUSCAR</button>

            </form>
            <form onSubmit={buscarJuegoPorGenero}>
                <label>Buscar por género</label> <br/>
                    <select name="genero" onChange={changeInput}>
                        {generos.sort((a,b)=>{
                            if(a.nombre > b.nombre){
                                return 1
                            }
                            else{
                                return -1
                            }
                        }).map((genero)=>{
                            return(
                                <option key={genero.nombre} value={genero.nombre}>{genero.nombre}</option>
                            )
                        })
                        
                        }
                        
                    </select>

                    <button type="sumbit" className="buttonFilter">BUSCAR</button>

            </form>
        </div>
    )
}

export default Filter
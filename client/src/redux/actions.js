export const GET_GAMES = "GET_GAMES"
export const GET_DETAIL = "GET_DETAIL"
export const GET_GENRES = "GET_GENRES"
export const POST_GAME = "POST_GAME"


export const obtenerVideojuegos = ()=>{

    return function(dispatch){
        fetch("http://localhost:3001/videogames")
        .then((response)=> response.json())
        .then((data)=> dispatch({type:GET_GAMES, payload:data}))
        
    }

}

export const obtenerDetallesJuego = (id)=>{
    return function(dispatch){
        fetch(`http://localhost:3001/videogames/${id}`,)
        .then((response)=>response.json())
        .then((data)=>dispatch({type:GET_DETAIL,payload:data}))
    }
}

export const getGenres = ()=>{
    return function(dispatch){
        fetch(`http://localhost:3001/genres`)
        .then((result)=> result.json())
        .then((data)=> dispatch({type:GET_GENRES, payload:data}))
    }
}

export const postGame = (videogame)=>{
    return function(dispatch){
        fetch(`http://localhost:3001/videogames`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(videogame)
        
        })
        
    }
}
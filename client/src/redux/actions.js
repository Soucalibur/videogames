export const GET_GAMES = "GET_GAMES"
export const GET_DETAIL = "GET_DETAIL"
export const GET_GENRES = "GET_GENRES"
export const POST_GAME = "POST_GAME"
export const SEARCH_GAME = "SEARCH_GAME "
export const GAMES_BY_GENRE= "GAMES_BY_GENRE"


export const obtenerVideojuegos = (name)=>{

    if(name){
        return function (dispatch){
           dispatch({type:SEARCH_GAME, payload: name})
        }
    }
    else{
        return function(dispatch){
            fetch("http://localhost:3001/videogames")
            .then((response)=> response.json())
            .then((data)=> dispatch({type:GET_GAMES, payload:data}))
            
        }
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

export const gamesByGenre = (genre)=>{
    return function (dispatch){
        dispatch({type: GAMES_BY_GENRE, payload: genre})
    }
}

// export const obtenerVideojuegos = (name)=>{

//     if(name){
//         return function (dispatch){
//             fetch(`http://localhost:3001/videogames?name=${name}`)
//             .then((response)=>response.json())
//             .then((data)=> dispatch({type:SEARCH_GAME, payload: data}))
//         }
//     }
//     else{
//         return function(dispatch){
//             fetch("http://localhost:3001/videogames")
//             .then((response)=> response.json())
//             .then((data)=> dispatch({type:GET_GAMES, payload:data}))
            
//         }
//     }

// }
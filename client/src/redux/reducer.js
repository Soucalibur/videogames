import {GET_GAMES,GET_DETAIL, GET_GENRES, SEARCH_GAME, GAMES_BY_GENRE} from "./actions"


const initialState = {
    games: [],
    allGames:[],
    infGames: {},
    genres: [],
    juegoGenero: {}
}

const rootRouter = (state=initialState,action)=>{

    switch (action.type) {
        case GET_GAMES :
            return{
                ...state,
                games: action.payload,
                allGames: action.payload
            }
            
        case GET_DETAIL:
            return{
                ...state,
                infGames:action.payload
            }
        case GET_GENRES:
            return{
                ...state,
                genres: action.payload
            }
        
        case SEARCH_GAME:
            let resultados = []
            for(let i = 0;i<state.allGames.length;i++){
                let nombre = action.payload.split(" ").join("").toLowerCase()
                let busqueda = state.allGames[i].name.split(" ").join("").toLowerCase()
                let contador = 0
                if(busqueda.includes(nombre)){
                    resultados.push(state.allGames[i])
                    contador++
                }
                if(contador=== 15)break
            }
            return{
                ...state,
                games: resultados
            }

        case GAMES_BY_GENRE:
            return{
                ...state,
                games: state.allGames.filter((game)=> game.genres.find((genero)=> genero.name === action.payload) )
            }

        default:
            return{
                ...state
            }
    }
}

export default rootRouter
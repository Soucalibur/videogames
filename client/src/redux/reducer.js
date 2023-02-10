import {GET_GAMES,GET_DETAIL, GET_GENRES} from "./actions"


const initialState = {
    games: [],
    infGames: {},
    genres: []
}

const rootRouter = (state=initialState,action)=>{

    switch (action.type) {
        case GET_GAMES :
            return{
                ...state,
                games: action.payload
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

        default:
            return{
                ...state
            }
    }
}

export default rootRouter
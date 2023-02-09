import {GET_GAMES,GET_DETAIL} from "./actions"


const initialState = {
    games: [],
    infGames: {}
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

        default:
            return{
                ...state
            }
    }
}

export default rootRouter
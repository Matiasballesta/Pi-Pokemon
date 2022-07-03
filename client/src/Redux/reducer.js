const initialState = {
    pokemons: [],
    allpokemons: [],
    types: [],
    pokemon: {}  
}


function rootReducer (state = initialState, action) {
    switch(action.type){
        case "GET_ALL_POKEMONS":
            return {
                ...state,
                pokemons: action.payload,
                allpokemons: action.payload
            }
            case "GET_TYPES":
                return {
                    ...state,
                    types: action.payload
                }
            case "GET_POKE_NAME":
                return{
                    ...state,
                    pokemons: action.payload
                }
            case "POST_POKES":
                return{
                    ...state
                }
                case "ORDER_BY":
                    let orderSort;
                    if(action.payload === 'asc'){
                        orderSort = state.pokemons.sort(function(a,b){
                            if(a.name > b.name){
                                return 1;
                            }
                            if(b.name > a.name){
                                return -1
                            }
                            return 0
                        })
                    }else if(action.payload === 'desc'){
                        orderSort = state.pokemons.sort(function(a,b){
                            if(a.name > b.name){
                                return -1
                            }
                            if(b.name > a.name){
                                return 1
                            }
                            return 0
                        })
                    }else if(action.payload === 'attack+'){
                        orderSort = state.pokemons.sort(function(a,b){
                            if(a.attack > b.attack){
                                return -1
                            }
                            if(b.attack > a.attack){
                                return 1
                            }
                            return 0
                        })
                    }else {
                        orderSort = state.pokemons.sort(function(a,b){
                            if(a.attack > b.attack){
                                return 1
                            }
                            if(b.attack > a.attack){
                                return -1
                            }
                            return 0
                        })
                    }
                    return{
                        ...state,
                        pokemons: orderSort
                    }
                case "FILTER_BY_CREATED":
                    const allpokes = state.allpokemons;
                    const createDb = action.payload === 'created' ? allpokes.filter(el => el.createdDb) : allpokes.filter(el => !el.createdDb)
                    return {
                        ...state,
                        pokemons: action.payload === 'all' ? allpokes : createDb
                        
                    }
                    case "FILTER_BY_TYPE":
                        let pokemons = state.allpokemons;
                        let filterType = action.payload === 'types' ? 
                        pokemons : pokemons.filter((e)=> e.types.name ? e.types.name?.includes(action.payload) : e.types?.includes(action.payload));
                        return{
                            ...state,
                            pokemons : filterType
                        };
                        case "GET_POKE_ID":
                            return{
                                ...state,
                                pokemon: action.payload
                            }
                        case "CLEAN_POKE":
                            return{
                                ...state,
                                pokemon: action.payload
                }
            default: return state;
    }

}

export default rootReducer;
const axios = require('axios');

export function getPokemons(){
        return async (dispatch) => {
            const json = await axios.get("pokemons")
            return dispatch({
                type: "GET_ALL_POKEMONS",
                payload: json.data
            })
        }
}

export function getTypes(){   
        return async (dispatch) => {
            const json = await axios.get("types")
            return dispatch({
                type: "GET_TYPES",
                payload: json.data
            })
        }
}

export function getPokeById(id){
  return async (dispatch) => {
      const json = await axios.get(`/pokemons/${id}`)
      return dispatch({
          type: "GET_POKE_ID",
          payload: json.data
      })
  }
}

export function getPokeByName(name){
    return async (dispatch) => {
    try{
            const json = await axios.get(`/pokemons?name=${name}`)
            console.log(json.data)
            return dispatch({
                type: "GET_POKE_NAME",
                payload: json.data
            })
        }catch(e){
            dispatch({type: "GET_POKE_NAME", payload: []})
            console.log(e)
        }
    }
}


export function createPokemons(payload){
    return async (dispatch) => {
        const json = await axios.post("/pokemons",payload);
        console.log(json);
        return json;
    }
}


export function filterByType(payload){
    return{
        type: "FILTER_BY_TYPE",
        payload
    }
}

export function filterDb(payload){
    return{
        type: "FILTER_BY_CREATED",
        payload
    }
}

export function OrderBy(payload){
    return{
        type: "ORDER_BY",
        payload: payload
    }
}

export function cleanPokemon(){
    return{
        type: "CLEAN_POKE",
        payload: {}
    }
}
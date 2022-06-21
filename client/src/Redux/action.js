const axios = require('axios');

export function getPokemons(){
        return async (dispatch) => {
            const json = await axios.get("http://localhost:3001/pokemons")
            return dispatch({
                type: "GET_ALL_POKEMONS",
                payload: json.data
            })
        }
}

export function getTypes(){   
        return async (dispatch) => {
            const json = await axios.get("http://localhost:3001/types")
            return dispatch({
                type: "GET_TYPES",
                payload: json.data
            })
        }
}

export function getPokeById(id){
  return async (dispatch) => {
      const json = await axios.get(`http://localhost:3001/pokemons/${id}`)
      return dispatch({
          type: "GET_POKE_ID",
          payload: json.data
      })
  }
}

export function getPokeByName(name){
    return async (dispatch) => {
        const json = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
        return dispatch({
            type: "GET_POKE_NAME",
            payload: json.data
        })
    }
}

export function createPokemons(payload){
    return async (dispatch) => {
        const json = await axios.post("http://localhost:3001/pokemons",payload);
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
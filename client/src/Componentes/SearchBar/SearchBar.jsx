import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getPokeByName} from '../../Redux/action'
import  './Searchbar.module.css';


const SearchBar = () => {

const dispatch = useDispatch();
const [pokemon, setPokemon] = useState('');
const pokemons = useSelector((state) => state.pokemons)


let changeInput = (e) => {
    setPokemon(e.target.value);
    console.log(pokemon)
}

let handleSubmit = (e) => {
    e.preventDefault(e);
    const findPoke = pokemons.find(e => e.name.toLowerCase() === pokemon.toLowerCase());
    if(findPoke){
        dispatch(getPokeByName(pokemon))
        setPokemon('')
    }else{
        setPokemon('')
        window.location.href = 'http://localhost:3000/Notfound'
        //Propiedad que te retorna el url de una pagina actual
    }
}

// let handleSubmit = (e) => {
//    e.preventDefault(e);
//    dispatch(getPokeByName(pokemon));
//    setPokemon('')
// }

    return(
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                type="text"
                placeholder='Pokemon..'
                onChange={(e) => changeInput(e)}
                value={pokemon}
                />
                <button type="submit">Buscar</button>
            </form>
        </div>
    )
}

export default SearchBar;
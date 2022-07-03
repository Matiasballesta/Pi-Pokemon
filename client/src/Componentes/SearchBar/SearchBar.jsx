import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getPokeByName} from '../../Redux/action'
import style from './Searchbar.module.css'




const SearchBar = () => {
const dispatch = useDispatch();
const [pokemon, setPokemon] = useState('');

let changeInput = (e) => {
    setPokemon(e.target.value);
    console.log(pokemon)
}

let handleSubmit = (e) => {
   e.preventDefault(e);
   dispatch(getPokeByName(pokemon));
   setPokemon('')
}


    return(
        <div className={style.container}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                type="text"
                placeholder='Pokemon..'
                onChange={(e) => changeInput(e)}
                value={pokemon}
                className={style.input}
                />
                <button className={style.button} type="submit">Search..</button>
            </form>
        </div>
    )
}

export default SearchBar;
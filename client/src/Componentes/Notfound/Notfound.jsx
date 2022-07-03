import React from 'react';
import {Link} from 'react-router-dom'
import style from './Notfound.module.css'
import { useDispatch } from 'react-redux';
import { getPokemons, getTypes } from '../../Redux/action';
import img from "./Pikachu.png"



const Notfound = () => {

const dispatch = useDispatch();

function handleClick (e){
    e.preventDefault(e);
    dispatch(getPokemons());
    dispatch(getTypes())   
}
    return(
        <div className={style.img}>
            <h1 className={style.texto}>Pokemon doesn't exist</h1>
            <img src={img} alt="Pikachu" className={style.pikachu}/>
            <div>
            <Link to='/home'>
                <button onClick={(e) => handleClick(e)}className={style.button}>Back</button>
            </Link>
            </div>
        </div>
    )
}

export default Notfound;
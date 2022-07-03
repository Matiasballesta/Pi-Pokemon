import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Link, useParams} from 'react-router-dom'
import {getPokeById, cleanPokemon} from '../../Redux/action'
import Loading from '../Loading/Loading';
import style from './Details.module.css'

export default function Details(){

const dispatch = useDispatch();
const pokemon = useSelector((state) => state.pokemon)
console.log(pokemon);
let {id} = useParams();
//props.match.params.id

useEffect(()=>{
    dispatch(getPokeById(id))
}, [])

function handlerClean(){
    dispatch(cleanPokemon())
}

if(!pokemon.name){
    return(
        <Loading/>
    )
}else {
    return (
        <div className={style.container}>
            <Link to='/home'>
                    <button className={style.button} onClick={() => handlerClean()}>Back</button>
            </Link>
            <div className={style.firstDiv}>
            <div className={style.name}>
            <h1>{pokemon.name}</h1>
            </div>
            <div className={style.secondDiv}>
            <img src={pokemon.image} alt="img not found"/>
            </div>
            </div>
           <div className={style.detail}>
            <div>
            <h2>HP: {pokemon.hp}</h2> 
            </div>
            <div>
            <h2>Attack: {pokemon.attack}</h2>  
            </div>
            <div>
            <h2>Speed: {pokemon.speed}</h2>
            </div>
            <div>
            <h2>Defense: {pokemon.defense}</h2>
            </div>
            <div>
            <h2>Weight: {pokemon.weight}</h2>  
            </div>
            <div>
            <h2>Height: {pokemon.height}</h2>  
            </div>
            <div>
                <h2>Types: </h2>
                {
                    pokemon.types?.map(el => {
                        return (
                            el.name ? <h2 key={el.name}>{el.name.toUpperCase()}</h2> : <h2 className={style.asd} key={el}>{el}</h2>
                            )
                        }
                        )
                    }
            </div>
                    </div>

        </div>
    )
  }
}
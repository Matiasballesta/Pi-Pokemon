import React from 'react';
import { useDispatch} from 'react-redux';
import SearchBar from '../SearchBar/SearchBar';
import {Link} from 'react-router-dom'
import { getPokemons } from '../../Redux/action';
import style from './Nav.module.css'


export default function Nav({types,handleFilterCreated,handleFilterTypes,handleFilterSort}) {

const dispatch = useDispatch();

function handleClick(e){
    e.preventDefault();
    dispatch(getPokemons())
}
    return (
        <div className={style.container}>
            <div className={style.divImg}>
            <Link to='/home'>
                <button className={style.button} onClick={(e) => handleClick(e)}>HOME</button>
            </Link>
            <div>
            <Link to='/create'>
                <button className={style.create}>CREATE POKEMON</button>
            </Link>
            </div>
            </div>

            <div className={style.divSelectors}>
               <select onChange={(e) => handleFilterSort(e)} className={style.selectOne}>
                    <option value=''>Order By</option>
                    <option value='asc'>A-Z</option>
                    <option value='desc'>Z-A</option>
                    <option value='attack+'>Attack +</option>
                    <option value='attack-'>Attack -</option>
                </select>
                    <select className={style.selectTwo} onChange={(e) => handleFilterCreated(e)}>
                    <option value='all'>All Pokemons</option>
                    <option value='created'>Created by Us</option>
                    <option value='api'>Existing</option>
                </select>
                <select onChange={(e) => handleFilterTypes(e)} className={style.selectThree}>
                    <option value='types'>Types</option>
                    {
                        types?.map(el => {
                            return(
                                <option className={style.options} value={el.name} key={el.name}>{el.name.toUpperCase()}</option>
                            )
                        })
                    }
                </select>
            </div>
                <div className={style.searchBar}>
                <SearchBar/>
                </div>
        </div>
    )
}
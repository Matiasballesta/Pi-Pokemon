import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getPokemons, getTypes, filterDb, filterByType, OrderBy } from '../../Redux/action';
import Card from '../Card/Card'
import Paginado from '../Paginado/Paginado';
import Nav from '../NavBar/Nav'
import Loading from '../Loading/Loading'

import style from './Home.module.css'


export default function Home(){
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons)
    const types = useSelector((state) => state.types)
    const [currentPage, setCurrentPage] = useState(1)
    const [pokesperPage, setpokesPerPage] = useState(12)
    const indexLastPoke = currentPage * pokesperPage // 1 * 12 = 12
    const indexfirstPoke = indexLastPoke - pokesperPage // 12 - 12 = 0
    const currentPokes = allPokemons.slice(indexfirstPoke, indexLastPoke)
    const [order, setOrder] = useState('')

const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
}

    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes())
    },[dispatch])

function handleFilterCreated(e){
        e.preventDefault()
        dispatch(filterDb(e.target.value));
        setCurrentPage(1)
}

function hadleFilterTypes(e){
    e.preventDefault();
    dispatch(filterByType(e.target.value))  
    setCurrentPage(1)
}

function handleFilterSort(e){
    e.preventDefault();
    dispatch(OrderBy(e.target.value))
    setCurrentPage(1)
    setOrder(e.target.value)
}


if(allPokemons.length < 1){
    return (
        <Loading/>
        )
    }else {
    return (
        <div className={style.container}>
            <Nav
            types={types}
            handleFilterCreated={handleFilterCreated}
            handleFilterTypes={hadleFilterTypes}
            handleFilterSort={handleFilterSort}
            />
            <Paginado 
            pokesperPage={pokesperPage} 
            allPokemons={allPokemons.length} 
            paginado={paginado}
            />
            <Card currentPokes={currentPokes}/>
        </div>
    )
 }
}
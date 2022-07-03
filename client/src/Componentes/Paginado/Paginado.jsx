import React from 'react';
import style from './Paginado.module.css'

export default function Paginado({pokesperPage, allPokemons, paginado}){
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(allPokemons/pokesperPage); i++){
        pageNumbers.push(i)
    }
    return(
        <nav className={style.container}>
            <ul>
                {
                pageNumbers?.map(n => ( 
                        <button onClick={() => paginado(n)} key={n} className={style.button}>{n}</button>
                ))
                }
            </ul>
        </nav>
    )

}



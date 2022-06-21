import React from 'react';
import Cards from '../Cards/Cards'
import style from './Card.module.css'

export default function Card({currentPokes}){
    
return(
    <div className={style.container}>
        {
            currentPokes.length ? (currentPokes.map((el)=> {
                return (
                    <Cards name={el.name} image={el.image} types={el.types} key={el.id} id={el.id}/>
                )
            })
            ) : window.location.href='http://localhost:3000/Notfound'
        }

    </div>
) 
}
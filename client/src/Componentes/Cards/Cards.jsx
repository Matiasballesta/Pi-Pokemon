import React from 'react';
import Card from '../Card/Card'
import style from './Cards.module.css'

export default function Cards({currentPokes}){
    
return(
    <div className={style.container}>
        {
            currentPokes.length && currentPokes.map((el)=> {
                return (
                    <Card name={el.name} image={el.image} types={el.types} key={el.id} id={el.id}/>
                )
            })
        }

    </div>
) 
}
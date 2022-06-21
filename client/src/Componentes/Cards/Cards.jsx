import React from 'react';
import {Link} from 'react-router-dom'
import style from './Cards.module.css'


const Cards = ({id, name, image, types})=> {
  
return(
    <div className={style.container}>
        <Link to={`/home/${id}`} className={style.link}>
        <div className={style.aux}>
        <h1 className={style.name}>{name}</h1>
        

        <div className={style.image}>
        <img src={image} alt="img not found" width="200px" height="250px" className={style.img}/>
        </div>

        {
                    types?.map(i => {
                        return (
                            
                                i.name ? <h2 className={style.types} key={i.name}>{i.name}</h2> : <h2 className={style.types} key={i}>{i}</h2>
                            
                        )
                    }
                    )
                }
                </div>
        </Link>
    </div>
   )
}


export default Cards;
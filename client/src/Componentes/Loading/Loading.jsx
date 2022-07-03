import React from 'react';
import style from './Loading.module.css'

export default class Loading extends React.Component{
    render(){
        return (
        <div className={style.containerII}>
            <div className={style.aux}>
            <img src='https://www.animatedimages.org/data/media/1446/animated-pokemon-image-0082.gif' alt='img' className={style.img}/>
            <h3 className={style.loading}>Loading...</h3>
            </div>
        </div>
          )
    }
}
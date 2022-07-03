import React from 'react';
import {Link} from 'react-router-dom'
import style from './Landing.module.css';


export default function LandingPage(){
    return(
        <div className={style.landing}>
            <h1 className={style.name}>Welcome to Pokemon Videogame</h1>
            <Link to='/home'>
                <button className={style.button}>Home</button>
            </Link>
            <div className={style.myname}>By Matias Ballestá</div>
        </div>
    )
}
import React from 'react';
import style from './Paginado.module.css'

export default function Paginado({pokesperPage, allPokemons, paginado}){
    const pageNumbers = []

    for(let i = 0; i <= Math.ceil(allPokemons/pokesperPage)-1; i++){
        pageNumbers.push(i+1)
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




//Si se quiere declarar un estado o bindear algo usamos el constructor si no no hace falta
// export default class Paginado extends React.Component{
//     constructor(props);
//     super(props);
//     render(){
//         <div>

//         </div>
//     }
// }

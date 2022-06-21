import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Link, useHistory} from 'react-router-dom';
import { getPokemons, getTypes, createPokemons } from '../../Redux/action';
import style from './Create.module.css'


function validate(input){
let errors = {};

if(!input.name){
errors.name = "Name is required";
}
if(!input.hp){ 
    errors.hp = "Hp must be greater than 0"
}
if(!input.defense){
    errors.defense = "Defense must be greater than 0"
}
if(!input.attack){
    errors.attack = "Attack must be greater than 0";
}
if(!input.speed){
    errors.speed = "Speed must be greater than 0";
}
if(!input.height){
    errors.height = "Height must be greater than 0";
}
if(!input.weight){
    errors.weight = "Weight must be greater than 0";
}
if(input.types.length === 0){
    errors.types = "It has to have at least one type"
}

return errors;

}


export default function Create(){

const dispatch = useDispatch();
const history = useHistory();
const types = useSelector((state) => state.types)
const pokemons = useSelector((state) => state.pokemons)
const [input, setInput] = useState({name:"", hp: "", defense: "", attack: "", speed: "",height: "",weight:"",types:[]})
const [errors, setErrors] = useState({})
const [button, setButton] = useState(true);

useEffect(()=>{
    dispatch(getPokemons())
    dispatch(getTypes())
    
},[])

const handleChange = (e)=>{
    setInput({
        ...input,
        [e.target.name]: e.target.value
    })
    setErrors(
        validate({
        ...input,
        [e.target.name]: e.target.value
    }))
}

const handleSelect = (e) => {
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
        if(input.name === '' || input.hp === '' || input.attack === '' || input.defense === '' || input.height === '' || input.weight === '' || input.types.lenght < 0){
            setButton(true)
        }else{
            setButton(false);
        }
}

const handleSubmit = (e)=>{
    e.preventDefault(e);
    if(pokemons.find((el) => el.name.toLowerCase() === input.name.toLowerCase().trim())){
        alert("Pokemon already exist");
        setErrors({
            ...input,
            [e.target.name]: "Pokemon already exist"
        })
        history.push('/home')
    }else {
        dispatch(createPokemons(input))
    alert("Pokemon created succesfully")
    setInput({
        name:"", hp: "", defense: "", attack: "", speed: "",height: "",weight:"",types: []
    })
    history.push('/home')
    }
}

    return(
        <div className={style.container}>
            <Link to='/home'>
                <button className={style.button}>Volver</button>
            </Link>
            <h1 className={style.title}>Create your own Pokemon</h1>

            <form onSubmit={(e) => handleSubmit(e)} className={style.form}>
                    <label className={style.name}>Name:</label>
                    <input
                    type="text"
                    value={input.name}
                    name="name"
                    onChange={(e) => handleChange(e)}
                    className={style.inputName}
                    />
                    {errors.name && (<p className={style.error}>{errors.name}</p>)}
                    <label lassName={style.hp}>Hp:</label>
                    <input
                    type="text"
                    value={input.hp}
                    name="hp"
                    onChange={(e) => handleChange(e)}
                    className={style.inputHp}
                    />
                    {errors.hp && (<p>{errors.hp}</p>)}
                    <label className={style.defense}>Defense:</label>
                    <input
                    type="text"
                    value={input.defense}
                    name="defense"
                    onChange={(e)=> handleChange(e)}
                    className={style.inputDefense}
                    />
                    {errors.defense && (<p>{errors.defense}</p>)}
                    <label className={style.attack}>Attack:</label>
                    <input
                    type="text"
                    value={input.attack}
                    name="attack"
                    onChange={(e)=> handleChange(e)}
                    className={style.inputAttack}
                    />
                    {errors.attack && (<p className={style.error}>{errors.attack}</p>)}
                    <label className={style.speed}>Speed:</label>
                    <input
                    type="text"
                    value={input.speed}
                    name="speed"
                    onChange={(e)=> handleChange(e)}
                    className={style.inputSpeed}
                    />
                    {errors.speed && <p className={style.error}>{errors.speed}</p>}
                    <label>Weight:</label>
                    <input
                    type="text"
                    value={input.weight}
                    name="weight"
                    onChange={(e)=> handleChange(e)}
                    />
                    {errors.weight && (<p className={style.error}>{errors.weight}</p>)}
                    <label className={style.height}>Height:</label>
                    <input
                    type="text"
                    value={input.height}
                    name="height"
                    onChange={(e)=> handleChange(e)}
                    className={style.inputHeight}
                    />
                    {errors.height && (<p className={style.error}>{errors.height}</p>)}
                    <label>Types:</label>
                    <select onChange={(e) => handleSelect(e)} className={style.select}>
                        {
                            types && types.map((el) => (
                                <option 
                                value={el.name}
                                key={el.name}
                                >{el.name}
                                </option>
                            ))
                        }
                    </select >
                    <ul><li>{input.types.map(el => el + " ")}</li></ul>
                <button type='submit' disabled={button}>Create Pokemon</button>
            </form>
        </div>
    )
}

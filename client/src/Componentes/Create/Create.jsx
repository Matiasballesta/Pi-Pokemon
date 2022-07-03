import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { getTypes, createPokemons } from '../../Redux/action';
import style from './Create.module.css'



function validate(input){
let errors = {};
let regex = /^(?![ .]+$)[a-zA-Z .]*$/gm;

if(!input.name){
errors.name = "Name is required";
}
if(!regex.test(input.name)) {
    errors.name = "Name can not contein numbers, only letters";
}
else if(input.hp < 0 || input.hp > 100 || !input.hp){ 
errors.hp = "Select an HP value between 1 and 100";
} 
else if(input.defense < 0 || input.defense > 100 || !input.defense){ 
errors.defense = "Select a Defense value between 1 and 100"
}
else if(input.attack < 0 || input.attack > 100 || !input.attack){ 
errors.attack = "Select an Attack value between 1 and 100"
}
else if(input.speed < 0 || input.speed > 100 || !input.speed){ 
errors.speed = "Select a Speed value between 1 and 100"
}
else if(input.weight < 0 || input.weight > 100 || !input.weight){ 
errors.weight = "Select a Weight value between 1 and 100"
}
else if(input.height < 0 || input.height > 100 || !input.height){ 
errors.height = "Select an Height value between 1 and 100"
}
else if(input.types.length === 0){
errors.types = "Select at least one type and no more than 2 types"
}
return errors;
}


export default function Create(){

const dispatch = useDispatch();
const navigate = useNavigate();
const types = useSelector((state) => state.types)
const pokemons = useSelector((state) => state.pokemons)
const [input, setInput] = useState({name:"", hp: "", defense: "", attack: "", speed: "",height: "",weight:"",types:[]})
const [errors, setErrors] = useState({})


useEffect(()=>{
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
        setErrors(validate({
            ...input,
            types: [...input.types, e.target.value]
        }))
        if(e.target.value === input.types[0] && input.types.length < 2){
            alert("You need to select at least one pokemon and no more than 2 pokemons")
        }else if(input.types.length < 2){
            setInput({
                ...input,
                types: [...input.types, e.target.value]
            })
        }else(
            alert("You can select at least 2 pokemons")
        )
}

const handleSubmit = (e)=>{
    e.preventDefault(e);
    if(errors.name || errors.defense || errors.speed || errors.attack || errors.weight || errors.height || errors.hp || errors.types){
       return alert("All fields must be complete and contain the required information.")
    }

    if(pokemons.find((el) => el.name.toLowerCase() === input.name.toLowerCase().trim())){
        alert("Pokemon already exist");
        setErrors({
            ...input,
            [e.target.name]: "Pokemon already exist"
        })
        return;
    }else {
        dispatch(createPokemons(input))
    alert("Pokemon created succesfully")
    navigate('/home')
    }
}

const handleDelete = (e) => {
    setInput({
        ...input,
        types: input.types.filter((el) => el !== e)
    })
}

    return(
        <div className={style.container}>
            <div className={style.header}>
            <Link to='/home'>
                <button className={style.button}>Back</button>
            </Link>
            <h1 className={style.titule}>Create your own Pokémon</h1>
            </div>
            <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
                <div className={style.formLabel}>
                    <label>Name:</label>
                    <input
                    type="text"
                    placeholder='Name..'
                    value={input.name}
                    name="name"
                    onChange={(e) => handleChange(e)}
                    className={style.input}
                    />
                    <p className={style.error}>
                    {errors.name ? <b>{errors.name}</b> : ""}
                    </p>
                </div>
                <div className={style.formLabel}>
                    <label>Hp:</label>
                    <input
                    type="text"
                    placeholder='Hp..'
                    value={input.hp}
                    name="hp"
                    onChange={(e) => handleChange(e)}
                    className={style.input}
                    />
                    <p className={style.error}>
                    {errors.hp ? <b>{errors.hp}</b> : ""}
                    </p>
                </div>
                <div className={style.formLabel}>
                    <label>Defense:</label>
                    <input
                    type="text"
                    placeholder='Defense..'
                    value={input.defense}
                    name="defense"
                    onChange={(e)=> handleChange(e)}
                    className={style.input}
                    />
                    <p className={style.error}>
                    {errors.defense ? <b>{errors.defense}</b> : ""}
                    </p>
                </div>
                <div className={style.formLabel}>
                    <label>Attack:</label>
                    <input
                    type="text"
                    placeholder='Attack..'
                    value={input.attack}
                    name="attack"
                    onChange={(e)=> handleChange(e)}
                    className={style.input}
                    />
                    <p className={style.error}>
                    {errors.attack ? <b>{errors.attack}</b> : ""}
                    </p>
                </div>
                <div className={style.formLabel}>
                    <label>Speed:</label>
                    <input
                    type="text"
                    placeholder='Speed..'
                    value={input.speed}
                    name="speed"
                    onChange={(e)=> handleChange(e)}
                    className={style.input}
                    />
                    <p className={style.error}>
                    {errors.speed ? <b>{errors.speed}</b> : ""}
                    </p>
                </div>
                <div className={style.formLabel}>
                    <label>Weight:</label>
                    <input
                    type="text"
                    placeholder='Weight..'
                    value={input.weight}
                    name="weight"
                    onChange={(e)=> handleChange(e)}
                    className={style.input}
                    />
                    <p className={style.error}>
                    {errors.weight ? <b>{errors.weight}</b> : ""}
                    </p>
                </div>
                <div className={style.formLabel}>
                    <label>Height:</label>
                    <input
                    type="text"
                    placeholder='Height..'
                    value={input.height}
                    name="height"
                    onChange={(e)=> handleChange(e)}
                    className={style.input}
                    />
                    <p className={style.error}>
                    {errors.height ? <b>{errors.height}</b> : ""}
                    </p>
                </div>
                <div className={style.formLabel}>
                    <label>Types:</label>
                    <select defaultValue="" className={style.inputType} onChange={(e) => handleSelect(e)}>
                    <option className={style.white} value="" disabled hidden>Add Types...</option>
                        {
                            types && types.map((el) => (
                                <option 
                                value={el.name}
                                key={el.name}
                                >{el.name.toUpperCase()}
                                </option>
                            ))
                        }
                    </select >
                    <p className={style.error}>
                    {errors.types ? <b>{errors.types}</b> : ""}
                    </p>            
            {
                input.types.map(el => 
                    <div className={style.types}>
                        <p>{el.toUpperCase()}</p>
                        <button className={style.buttonType} type="button" onClick={() => handleDelete(el)}>X</button>
                    </div>)
            }
                    <button className={style.button} type='submit'>Create</button>
                </div>
                </form>
        </div>
    )
}




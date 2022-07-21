const { Router } = require('express');
const axios = require('axios');
const router = Router();
const {Pokemon, Type} = require('../db');


const getApiInfo = async () => {
    try{
        const getData = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const getData2 = await axios.get(getData.data.next)

        const getFinal = getData.data.results.concat(getData2.data.results)

        const apiInfo = await Promise.all(
            getFinal.map(async el => {
                const poke = await axios.get(el.url);
                return {
                name: poke.data.name,
                id: poke.data.id,
                hp: poke.data.stats[0].base_stat,
                height: poke.data.height,
                weight: poke.data.weight,
                image: poke.data.sprites.other.home.front_default,
                attack: poke.data.stats[1].base_stat,
                defense: poke.data.stats[2].base_stat,
                speed: poke.data.stats[5].base_stat,
                types: poke.data.types.map(pokeType => pokeType.type.name)
                }
            })
        )
        return apiInfo;  
        
    }catch(e){
        console.log(e)
    }
}

const getDbInfo = async () => {
    const pokeDb = await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
    return pokeDb;
}

const getApiAndDb = async () => {
    try{
  const getApi = await getApiInfo();
  const getDb = await getDbInfo();  
  const AllPokes = getApi.concat(getDb);

  return AllPokes;

    }catch(e){
        console.log(e)
    } 
}


const getInfoById = async (id) => {
    const getId = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = getId.data
   
    return {
        name: data.name,
        id: data.id,
        types: data.types.map(pokeType => pokeType.type.name),
        hp: data.stats[0].base_stat,
        image: data.sprites.other.home.front_default,
        height: data.height,
        weight: data.weight,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat
    }
}


router.get('/', async (req,res)=> {
    const {name} = req.query;
    try{
        const getAll = await getApiAndDb();
        if(name){
            const getPokeName = await getAll.filter(e => e.name.toLowerCase() === name.toLowerCase());
            if(getPokeName.length === 0){
                res.status(404).send("It didn't found any Pokemon")
            }
            else{
                res.status(200).send(getPokeName)
            }
        }else{
            res.status(200).send(getAll)
        }
    }catch(e){
        console.log(e)
    }
})


router.get('/:id', async (req,res) => {
    const id = req.params.id;
    try{
        const dbPoke = await Pokemon.findByPk(id, {
            include: {
                model:  Type,
                attributes: ['name'],
            through:{
            attributes: []
        }
            }
        });
        if(dbPoke){
            res.json(dbPoke)
        }
    }catch(e){
        try{
            pokeApi = await getInfoById(id);
            res.json(pokeApi)

        }catch(e){
            console.log(e)
        }
    }
})


router.post('/', async(req,res) => {
    const {name, hp, attack, defense, speed, height, weight, image, types} = req.body;

   try{
       let pokeExist = await Pokemon.findOne({
           where: {
               name: name.toLowerCase()
           }
       })
       if(pokeExist) return res.json({msg: "Pokemon alredy exist"})

       let newPokemon = await Pokemon.create({
           name: name.toLowerCase(),
           image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/75.png",
           hp: hp,
           attack: attack,
           defense: defense,
           speed: speed,
           height: height,
           weight: weight
       })

       let pokeType = await Type.findAll({
           where: {
               name: types
           }
       })
       
       await newPokemon.addType(pokeType);
       res.status(200).json({msg: "Pokemon created succefully"})

   }catch(e){
       console.log(e)
   }
})


module.exports = router;







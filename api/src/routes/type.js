const { Router } = require('express');
const router = Router();
const axios = require('axios');
const {Type} = require('../db')

router.get('/', async (req,res)=>{
    try{
        const getType = await axios.get('https://pokeapi.co/api/v2/type')
        const getData = getType.data.results;
    
        getData.map(el => {
            Type.findOrCreate({
                where: {
                    name: el.name
                }
            })
        })
        const allTypes = await Type.findAll();
        res.send(allTypes)
    }catch(e){
        console.log(e)
    }
})


module.exports = router;
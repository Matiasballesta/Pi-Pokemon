const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const pokemonRoute = require('./pokemon')
const typeRoute = require('./type')

const router = Router();

router.use('/pokemons', pokemonRoute)
router.use('/types', typeRoute)


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;

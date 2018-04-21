let express = require('express');
let router = express.Router();
let PokemonController = require('../../controller/pokemonController');
let pokemonService = PokemonController.PokemonService;

router.get('/', (req, res, next) => {
    pokemonService.listAll()
        .then((pokemon) => {
            res.send(JSON.stringify(pokemon));
        });
});

module.exports = router;
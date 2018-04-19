let express = require('express');
let router = express.Router();
let PokemonController = require('../../controller/pokemonController');
let pokemonService = PokemonController.PokemonService;

router.use((req, res, next) => {
   res.set({
       'Access-Control-Allow-Origin': "*",
       'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
       'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers',
       'Content-type': 'application/json'
   });
   next();
});

router.get('/', (req, res, next) => {
    pokemonService.list()
        .then((pokemon) => {
           res.send(JSON.stringify(pokemon));
        });
});

router.post('/', (req, res, next) => {
   let newPokemon = {
       name: req.body.name,
       combatPower: req.body.combatPower,
       hp: req.body.hp,
       nickname: req.body.nickname,
   };

   pokemonService.create(newPokemon)
       .then((data) => {
          res.send(JSON.stringify(data));
       });
});

router.put('/:pokemonid', (req, res, next) => {
    let id = req.params.pokemonid;
    let data = {
        name: req.body.name,
        combatPower: req.body.combatPower,
        hp: req.body.hp,
        nickname: req.body.nickname,
    };

    pokemonService.update(id, data)
        .then((data) => {
            res.send(JSON.stringify(data));
        });
});

router.delete('/:pokemonid', (req, res, next) => {
   pokemonService.delete(req.params.pokemonid)
       .then((data) => {
          res.send(JSON.stringify(data));
       });
});

module.exports = router;
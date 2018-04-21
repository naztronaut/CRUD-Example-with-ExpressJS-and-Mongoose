let express = require('express');
let router = express.Router();
let PokemonController = require('../../controller/pokemonController');
let pokemonService = PokemonController.PokemonService;

router.use((req, res, next) => {
   res.set({
       'Content-type': 'application/json'
   }) ;
   next();
});

router.get('/', (req, res, next) => {
    pokemonService.listAll()
        .then((pokemon) => {
            res.send(JSON.stringify(pokemon));
        });
});

router.post('/', (req, res, next) => {
   let item = {
       name: req.body.name,
       combatPower: req.body.combatPower,
       hp: req.body.hp,
       nickname: req.body.nickname,
   };

   pokemonService.create(item)
       .then((pokemon) => {
          res.send(JSON.stringify(pokemon));
       });
});

router.put('/:pokemonid', (req, res, next) => {
    let update = {
        name: req.body.name,
        nickname: req.body.nickname,
        combatPower: req.body.combatPower,
        hp: req.body.hp
    };

    pokemonService.change(req.params.pokemonid, update)
        .then((pokemon) => {
           res.send(JSON.stringify(pokemon));
        });

});

router.delete('/:pokemonid', (req, res, next) => {
   pokemonService.delete(req.params.pokemonid)
       .then((pokemon) => {
           res.send(JSON.stringify(pokemon));
       }) ;
});

module.exports = router;
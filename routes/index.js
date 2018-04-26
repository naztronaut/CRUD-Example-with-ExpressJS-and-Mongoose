var express = require('express');
var router = express.Router();
let pokemonController = require('../controller/pokemonController');
let PokemonService = pokemonController.PokemonService;

/* GET home page. */

router.get('/', function(req, res, next) {
    PokemonService.listAll()
        .then((pokemon) =>{
            res.render('index', {
                pokemon: pokemon
            });
        })
        .catch((err) => {
            //redirects if error - bad error handling
            res.redirect('/');
        });
});

router.get('/:pokemonId', function(req, res, next) {
    PokemonService.listOne(req.params.pokemonId)
        .then((pokemon) =>{
          res.render('update', {
            pokemon: pokemon
          });
        });
});

router.post('/', function(req, res, next) {
    var pokemon = {
        name: req.body.name,
        nickname: req.body.nickname,
        combatPower: req.body.cp,
        hp: req.body.hp
    };
    // var scoreSave = new Score(score);
    PokemonService.create(pokemon)
        .then(() =>{
            console.log('saved');
            res.redirect('/');
        })
        .catch((err) =>{
            if(err) {
                console.log(err);
                res.redirect('/');
            }
        });
});

router.post('/:pokemonId', function(req, res, next) {
    var updateData = {
        name: req.body.name,
        nickname: req.body.nickname,
        combatPower: req.body.cp,
        hp: req.body.hp
    };

    PokemonService.update(req.params.pokemonId, updateData)
        .then(() => {
          console.log("updated");
          res.redirect('/');
        });
});

module.exports = router;

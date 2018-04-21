let Pokemon = require('../model/pokemonModel');

class PokemonService {

    static listAll(){
        return Pokemon.find({})
            .then((pokemon) => {
                return pokemon;
            });
    }

}

module.exports.PokemonService = PokemonService;
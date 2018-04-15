var Pokemon = require('../model/pokemonModel');

class PokemonService {
    static list(){
        return Pokemon.find({})
            .then((pokemon) => {
                return pokemon;
            });
    }

    static listOne(id){
        return Pokemon.findOne({_id: id})
            .then((pokemon) =>{
               return pokemon;
            });
    }

    static create(obj){
        let pokemon = new Pokemon(obj)
        return pokemon.save();
    }

    static update(id, data) {
        return Pokemon.findOne({_id: id})
            .then((pokemon) => {
                pokemon.set(data);
                pokemon.save();
                return pokemon;
            });
    }
}

module.exports.PokemonService = PokemonService;
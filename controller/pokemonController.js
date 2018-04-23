let Pokemon = require('../model/pokemonModel');

class PokemonService {

    static listAll(){
        return Pokemon.find({})
            .then((pokemon) => {
                return pokemon;
            });
    }

    // Create a new document
    static create(obj){
        let entry = new Pokemon(obj);
        return entry.save();
    }

    // Update one document
    static change(id, data){
        return Pokemon.findOne({_id: id})
            .then((pokemon) => {
               pokemon.set(data);
               pokemon.save();
               return pokemon;
            });
    }

    static delete(id){
        return Pokemon.findByIdAndRemove({_id: id})
            .then((data) => {
                return data;
            });
    }

}

module.exports.PokemonService = PokemonService;
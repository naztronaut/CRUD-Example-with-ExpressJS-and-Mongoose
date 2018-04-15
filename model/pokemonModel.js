var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pokemonSchema = new Schema({
    name: {type: String, required:true},
    combatPower: Number,
    hp: Number,
    nickname: String,
    updated: {type: Date, default: Date.now},
    pictureUrl: String
});

// add updated date with each save
pokemonSchema.pre('save', function(next){
    this.updated = new Date();
    next();
});

module.exports = mongoose.model('Pokemon', pokemonSchema);
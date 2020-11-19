const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    min_player: {
        type: Number,
        required: true,
    },
    max_player: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default : Date.now,
    }
});

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;
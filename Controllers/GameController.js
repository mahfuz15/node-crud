const mongoose = require('mongoose');
const { model } = require('../Models/Game');
// Game Model
const Game = require('../Models/Game');

module.exports = {
    index: async (req, res) => {
        try{
            let result = {};
            console.log(Object.keys(req.query).length);
            if(Object.keys(req.query).length == 0){
                result = await Game.find();
            } else {
                result = await Game.find()
                .where({min_player: {$gte: req.query.min_player}})
                .where({max_player: {$lte: req.query.max_player}});
            }
            res.status(200).send(result);
        } catch (error) {
            console.log(error.message);
        }
    },
    show: async (req, res, next) => {
        try{
            let result = {};
            if(Object.keys(req.query).length == 0){
                result = await Game.find({ "name": {$regex: ".*" + req.params.name + ".*"}});
            } else {
                result = await Game.find({ "name": {$regex: ".*" + req.params.name + ".*"}})
                .where({min_player: {$gte: req.query.min_player}})
                .where({max_player: {$gte: req.query.max_player}})
                .select('name min_player max_player date');
            }
            res.status(200).send(result);
        } catch (error) {
            console.log(console.message);
        }
    },
    store: async (req, res, next) => {
        try{
            const game = new Game(req.body);
            const result = await game.save();
            res.status(200).send(result);
        } catch (error) {
            console.log(error.message);
        }
    },
    update: async (req, res, next) => {
        try{
            const params = req.params;
            const result = await Game.updateOne(
                {
                    _id: req.params.id
                },
                {
                    name: req.body.name,
                    min_player: req.body.min_player,
                    max_player: req.body.max_player,
                    date: Date.now(),
                }
            );
            res.status(200).send(result);
        } catch(error) {
            console.log(error.message);
        }
    },
    delete: async (req, res, next) => {
        try{
            const result = await Game.deleteOne({_id: req.params.id});
            res.status(200).send(result);
        } catch (error) {
            console.log(console.message);
        }
    }
}
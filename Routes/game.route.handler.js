const express = require('express');
const router = express.Router();

const GameController = require('../Controllers/GameController');

//Get a list of all Games
router.get('/', GameController.index);

//Create a new Game
router.post('/store', GameController.store);

//Get a Game by id
router.get('/:name', GameController.show);

//Update a Game by id
router.patch('/:id', GameController.update);

//Delete a Game by id
router.delete('/:id', GameController.delete);

module.exports = router;
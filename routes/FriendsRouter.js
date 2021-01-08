const Router = require('express').Router();
const controller = require('../controllers/FriendsController')

Router.post('/add', controller.CreateFriend)
Router.get('/all/:id', controller.GetAllFriends)
Router.delete('/remove/:id', controller.DeleteFriend)

module.exports = Router;
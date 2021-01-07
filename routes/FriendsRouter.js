const Router = require('express').Router();
const controller = require('../controllers/FriendsController')

Router.post('/add', controller.CreateFriend)
Router.get('/all', controller.GetAllFriends)
Router.delete('/remove', controller.DeleteFriend)

module.exports = Router;
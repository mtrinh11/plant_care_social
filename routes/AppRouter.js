const Router = require('express').Router();
const UserRouter = require('./UserRouter');
const UserPlantsRouter = require('./UserPlantsRouter');
const FriendsRouter = require('./FriendsRouter');
const PlantPhotoRouter = require('./PlantPhotoRouter')
const PlantsDbRouter = require('./PlantsDbRouter')

Router.use('/user', UserRouter)
Router.use('/plants', UserPlantsRouter)
// Router.use('/photos', PlantPhotoRouter)
Router.use('/friends', FriendsRouter)
Router.use('/search', PlantsDbRouter)

module.exports = Router;
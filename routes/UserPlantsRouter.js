const Router = require('express').Router();
const controller = require('../controllers/UserPlantsController')

Router.post('/create', controller.CreateUserPlant)
Router.get('/children/:id', controller.GetAllUserPlants)
Router.put('/update/:id', controller.UpdatePlantDetails)
Router.delete('/delete/:id', controller.DeletePlant)

module.exports = Router;
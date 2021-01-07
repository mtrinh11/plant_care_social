const Router = require("express").Router();
const controller = require("../controllers/PlantsDbController");

Router.post('/details', controller.GetPlantDetails)
Router.get('/trefle/:query', controller.GetPlantsByApiSearch)
Router.get('/local/:query', controller.GetPlantsBySearch)

module.exports = Router;
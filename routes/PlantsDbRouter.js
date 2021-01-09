const Router = require("express").Router();
const controller = require("../controllers/PlantsDbController");

Router.get('/trefle/:query', controller.GetPlantsByApiSearch)
Router.get('/local/:query', controller.GetPlantsBySearch)
Router.get('/species/:id', controller.GetPlantSpeciesDetailsByApi)

module.exports = Router;
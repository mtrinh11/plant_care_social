const Router = require("express").Router();
const controller = require("../controllers/UserController");
const { readToken, verifyJwt } = require("../middleware");

Router.post("/register", controller.CreateUser);
Router.post("/login", controller.LoginUser);
Router.get("/session", readToken, verifyJwt, controller.SessionStatus);
Router.get("/:user_id", controller.GetUser);
Router.post("/search", controller.GetUserByEmail)

module.exports = Router;

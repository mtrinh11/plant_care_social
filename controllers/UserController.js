const { hashPassword, passwordValid, createToken } = require("../middleware");
const {User} = require('../models')

const CreateUser = async (request, response) => {
  try {
    const { firstName, lastName, email, password, zip } = request.body;
    const password_digest = await hashPassword(password);
    const user = await User.create({ firstName, lastName, email, password_digest, zip});
    response.send(user);
  } catch (error) {
    response.status(401).send({message: `Registration Error`})
    throw error;
  }
};

const LoginUser = async (request, response) => {
  try {
    const user = await User.findOne({
      where: { email: request.body.email },
      raw: true,
    });
    if (user && (await passwordValid(request.body.password, user.password_digest))) {
      let payload = {
        _id: user.id,
        userFirstName: user.firstName,
        userLastName: user.lastName
      };
      let token = createToken(payload);
      return response.send({ user, token });
    }
    return response.status(401).send({ message: `Unauthorized!` });
  } catch (error) {
    res.status(400).send({ message: 'Bad Request'})
    throw error;
  }
};

const SessionStatus = async (request, response) => {
  try {
    const { token } = response.locals;
    const user = await User.findByPk(token._id, {
    attributes: ["id", "firstName", "lastName", "email", "zip"],
    });
    response.send({ user, status: "OK" });
  } catch (error) {
    response.status(401).send({ message: "Invalid Session" });
    throw error;
  }
};

const GetUser = async (request, response) => {
  try {
    const user = await User.findByPk(request.params.user_id, {
      attributes: ["id", "firstName", "lastName", "email", "zip"],
    });
    response.send(user);
  } catch (error) {
    res.status(400).send({ message: 'Bad Request'})
    throw error;
  }
};

const GetUserByEmail = async (request, response) => {
  try {
    const user = await User.findAll({
      where: {email: request.body.email},
      attributes: ["id", "firstName", "lastName", "email", "zip"]
    })
    response.send(user)
  } catch(error) {
    res.status(400).send({ message: 'Bad Request'})
    throw error
  }
};

const UpdateUser = async (request, response) => {
  try {
    await User.update( request.body , {
      where: {id: parseInt(request.params.id)},
      returning: true,
    })
    let updatedUser = await User.findByPk(request.params.id, {
      attributes: ["id", "firstName", "lastName", "email", "zip"]
    })
    response.send(updatedUser)
  } catch (error) {
    response.status(400).send({ message: 'Bad Request'})
    throw error
  }
}

module.exports = {
  CreateUser,
  SessionStatus,
  LoginUser,
  GetUser,
  GetUserByEmail,
  UpdateUser
}
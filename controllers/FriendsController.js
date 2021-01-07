const {Friends} = require('../models')

const CreateFriend = async(req, res) => {
    try {
        const {userId, friendId} = req.body
        await Friends.create({userId, friendId})
        res.send({message: 'Success'})
    } catch (error) {
        res.status(400).send({ message: 'Bad Request'})
        throw error
    }
}

const GetAllFriends = async (req, res) => {
    try {
        const friends = await Friends.findAll({
            // where: {userId: }
        }) 
    } catch (error) {
        res.status(400).send({ message: 'Bad Request'})
        throw error
    }
}

const DeleteFriend = async (req, res) => {
    try {

    } catch (error) {
        res.status(400).send({ message: 'Bad Request'})
        throw error
    }
}

module.exports = {
    CreateFriend,
    GetAllFriends,
    DeleteFriend
}
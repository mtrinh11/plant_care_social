const {Friends} = require('../models')

const CreateFriend = async(req, res) => {
    try {
        const {userId, friendId} = req.body
        let checkIfAlreadyExists = await Friends.findAll({
            where: {
                userId: userId,
                friendId: friendId
            }
        })
        if (checkIfAlreadyExists.length > 0) {
            res.send({message: 'Relationship already exists'})
        } else { 
            await Friends.create({userId, friendId})
            res.send({message: 'Success'})
        }
    } catch (error) {
        res.status(400).send({ message: 'Bad Request'})
        throw error
    }
}

const GetAllFriends = async (req, res) => {
    try {
        const friends = await Friends.findAll({
            where: {userId: req.params.id},
            attributes: ["id", "userId", "friendId"]
        }) 
        res.send(friends)
    } catch (error) {
        res.status(400).send({ message: 'Bad Request'})
        throw error
    }
}

const DeleteFriend = async (req, res) => {
    try {
        await Friends.destroy({
            where: {id: req.params.id}
        })
        res.send({ message: 'Success'})
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
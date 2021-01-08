const {UserPlants} = require('../models')

const GetAllUserPlants = async (req, res) => {
    try {
        const plants = await UserPlants.findAll({
            where: { parent: parseInt(req.params.id) }
        })
        res.send(plants)
    } catch (error) {
        res.status(400).send({ message: 'Bad Request'})
        throw error
    }
}

const CreateUserPlant = async (req, res) => {
    try {
        const {name, parent, birthday, TreffleId} = req.body
        const plant = await UserPlants.create({name, parent, birthday, TreffleId})
        res.send(plant)
    } catch (error) {
        res.status(400).send({ message: 'Bad Request'})
        throw error
    } 
}

const DeletePlant = async (req, res) => {
    try {
        const userPlantId = parseInt(req.params.id)
        await UserPlants.destroy({
            where: {id: userPlantId}
        })
        res.send({message: `Deleted plant id: ${userPlantId}`})
    } catch (error) {
        res.status(400).send({ message: 'Bad Request'})
        throw error
    }
}

const UpdatePlantDetails = async (req, res) => {
    try {
        let plantId = parseInt(req.params.id)
        let changes = req.body
        let updatedPlant = await UserPlants.update( changes , {
            where: {id : plantId},
            returning: true
            }
        )
        res.send(updatedPlant)
    } catch (error) {
        res.status(400).send({ message: 'Bad Request'})
        throw error
    }
}

module.exports = {
    GetAllUserPlants,
    CreateUserPlant,
    DeletePlant,
    UpdatePlantDetails
}
const {Plant} = require('../models')
require('dotenv').config()

const Sequelize = require('sequelize')
const Op = Sequelize.Op;

const API_KEY = process.env.PLANTS_API_KEY
const axios = require('axios')
const request = axios.create({ baseURL: 'https://trefle.io'})

const GetPlantsBySearch = async (req, res) => {
    try {
        const results = await Plant.findAll({
            where: {common_name: {[Op.like]: '%' + req.params.query + '%'}}
        })
        return res.send(results)
    } catch (error) {
        res.status(400).send({message: `Bad Request`})
        throw error
    }
}

const GetPlantsByApiSearch = async (req, res) => {
    try {
        const results = await request.get(`/api/v1/species/search?q=${req.params.query}&token=${API_KEY}`)
        res.send(results.data)
    } catch (error) {
        res.status(400).send({message: `Trefle Database is down`})
        throw error
    }
}

const GetPlantSpeciesDetailsByApi = async(req, res) => {
    try {
        const data = await request.get(`/api/v1/species/${req.params.id}?token=${API_KEY}`)
        console.log(data.data)
        res.send(data.data)
    } catch (error) {
        res.status(400).send({message: `Trefle Database is down`})
        throw error
    }
}

module.exports = {
    GetPlantsBySearch,
    GetPlantsByApiSearch,
    GetPlantSpeciesDetailsByApi
}
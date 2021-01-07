import axios from 'axios';
require('dotenv').config()

const ApiClient = axios.create({
    baseURL: process.env.NODE_ENV === 'production'
    ? `${window.location.origin}/api`
    : 'http://localhost:3001/api'
})

export default ApiClient;
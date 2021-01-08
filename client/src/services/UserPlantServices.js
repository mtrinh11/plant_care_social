import ApiClient from './ApiServices'

export const AddPlantChild = async(formData) => {
    try {
        let res = await ApiClient.post('/plants/create', formData)
        return res
    } catch (error) {
        throw error
    }
}

export const GetPlantChildren = async(userId) => {
    try {
        let res = await ApiClient.get(`/plants/children/${userId}`)
        return res
    } catch (error) {
        throw error
    }
}

export const UpdatePlantChild = async(plantId, formData) => {
    try {
        let res = await ApiClient.put(`/plants/update/${plantId}`, formData)
        return res
    } catch (error) {
        throw error
    }
}

export const RemovePlantChild = async(plantId) => {
    try {
        let res = await ApiClient.delete(`/plants/${plantId}`)
        return res
    } catch (error) {
        throw error
    }
}
import ApiClient from './ApiServices'

export const GetUserFriends = async(userId) => {
    try {
        let res = await ApiClient.get(`/friends/all/${userId}`)
        return res
    } catch (error) {
        throw error
    }
}

export const AddToUserFriends = async(formData) => {
    try {
        let res = await ApiClient.post(`/friends/add`, formData)
        return res
    } catch (error) {
        throw error
    }
}

export const RemoveFromUserFriends = async(relationId) => {
    try {
        let res = await ApiClient.delete(`/friends/remove/${relationId}`)
        return res
    } catch (error) {
        throw error
    }
}
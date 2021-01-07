import ApiClient from './ApiServices'

export const GetSearchResultsFromApi = async (query) => {
    try {
        const res = await ApiClient.get(`/search/trefle/${query}`)
        return res
    } catch (error) {
        throw error
    }
};

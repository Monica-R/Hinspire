import { api } from './config';

export const getUserVotes = async (token) => {
    try {
        const response = await api.get("votes/myvotes", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data; // Supongamos que devuelve un array de fragment IDs
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

export const addVote = async (fragmentId, token) =>{
    try {
        const response = await api.post(`votes/vote/${fragmentId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const removeVote = async (fragmentId, token) => {
    try {
        const response = await api.delete(`votes/vote/${fragmentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
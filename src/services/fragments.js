import { api } from './config';

export const getFragmentsOfStory = async (storyId) => {
    try {
        const response = await api.get(`fragments/story/${storyId}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const createFragment = async (storyId, fragment, token) => {
    try {
        const response = await api.post(`fragments/${storyId}`, { content: fragment },{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
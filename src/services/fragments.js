import { api } from './config';

export const getFragmentsOfStory = async (storyId) => {
    try {
        const response = await api.get(`/fragments/story/${storyId}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const createFragment = async (storyId, fragment, token) => {
    try {
        const response = await api.post(`/fragments/${storyId}`, { content: fragment },{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const updateFragment = async (fragmentId, fragment, token) => {
    try {
        const response = await api.put(`/fragments/${fragmentId}`, {content: fragment}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const deleteFragment = async (fragmentId, token) => {
    try {
        const response = await api.delete(`/fragments/${fragmentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const acceptFragment = async (storyId, fragmentId, token) => {
    try {
        const response = await api.put(`/fragments/${storyId}/confirm/${fragmentId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
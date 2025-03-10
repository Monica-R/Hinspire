import { api } from './config';

export const getFragmentsOfStory = async (storyId) => {
    try {
        const response = api.get(`/story/${storyId}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
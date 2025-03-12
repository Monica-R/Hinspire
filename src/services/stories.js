import { api } from "./config";

export const fetchStories = async () => {
  try {
    const storiesRes = await api.get("stories");
    return storiesRes.data;
  } catch (error) {
    console.error('error', error);
  }
};

export const fetchStoryById =  async (storyId) => {
  try {
    const storyRes = await api.get(`stories/${storyId}`);
    return storyRes.data;
  } catch (error) {
    console.error('error', error);
  }
}

export const fetchStoriesOfUser = async (userId) => {
  try {
    console.log(userId);
    const token = localStorage.getItem("authToken");
    const storiesRes = await api.get(`stories/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return storiesRes.data;
  } catch (error) {
    console.error('error', error);
  }
};



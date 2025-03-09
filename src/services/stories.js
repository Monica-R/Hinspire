import { api } from "./config";

export const fetchStories = async () => {
  try {
    const storiesRes = await api.get("stories");
    return storiesRes.data;
  } catch (error) {
    console.error('error', error);
  }
};

export const fetchStoriesOfUser = async (userId) => {
  try {
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



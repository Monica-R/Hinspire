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

export const addStory = async (title, description, token) => {
  try {
    const storyResponse = await api.post("stories", { title: title, description: description }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return storyResponse.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateStory = async (storyId, title, description, token) => {
  try {
    const storyResponse = await api.put(`stories/${storyId}`, {
      title: title,
      description: description
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return storyResponse.data;
  } catch (error) {
    console.error(error);
  }
}

export const deleteStory = async (storyId, token) => {
  try {
    const storyResponse = await api.delete(`stories/${storyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return storyResponse.data;
  } catch (error) {
    console.error(error);
  }
};
import { api } from "./config";

export const fetchProfile = async (token) => {
  try {
    console.info("el token:", token);
    const userRes = await api.get("/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.info('la información:', userRes.data);
    return userRes.data;
  }
  catch (error) {
    console.error('error', error);
  }
}

export const editProfile = async (requestBody, token) => {
  try {
    const userRes = await api.put("/user/profile", {
      name: requestBody.name,
      email: requestBody.email,
      password: requestBody.password,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return userRes.data;
  } catch (error) {
    console.error(error);
  }
}

export const deleteProfile = async (token) =>{
  try {
    const userRes = await api.delete("/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return userRes.data;
  } catch (error) {
    return error;
  }
}
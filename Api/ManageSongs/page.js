import { getTokenFromCookie } from "../../Auth/userCookies";
import { apiError, responseValidator, url } from "../Helper/page";

export const getAllAblums = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + (await getTokenFromCookie()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(url + `/api/albums/`, requestOptions);

    return responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};

export const getAllChannels = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + (await getTokenFromCookie()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(url + `/api/channels/`, requestOptions);

    return responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};

export const getAllSongs = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + (await getTokenFromCookie()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      url + `/api/songs?limit=10&page=1`,
      requestOptions
    );

    return responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};
export const getTrendingSongs = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + (await getTokenFromCookie()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      url + `/api/songs?limit=10&page=1&list=trending`,
      requestOptions
    );

    return responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};

export const createNewAlbum = async (data) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + (await getTokenFromCookie()));

  const raw = JSON.stringify(data);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(url + `/api/albums/`, requestOptions);
    return responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};

export const getSingleSong = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + (await getTokenFromCookie()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(url + `/api/songs/${id}`, requestOptions);

    return responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};

export const getAlbumById = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + (await getTokenFromCookie()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(url + `/api/albums/${id}`, requestOptions);

    return responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};

import { getTokenFromCookie } from "../../Auth/userCookies";
import { apiError, responseValidator, url } from "../Helper/page";

export const getAllUsers = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await getTokenFromCookie()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(url + `/api/users/`, requestOptions);

    return responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};

export const getAllArtists = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await getTokenFromCookie()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(url + `/api/artist/`, requestOptions);

    return responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};

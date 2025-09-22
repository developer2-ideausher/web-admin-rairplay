import { getTokenFromCookie } from "../../Auth/userCookies";
import { apiError, responseValidator, url } from "../Helper/page";

export const getAllLanguages = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + (await getTokenFromCookie()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(url + `/api/languages/`, requestOptions);

    return responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};

export const getAllGenres = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + (await getTokenFromCookie()));
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  try {
    const response = await fetch(url + `/api/genres/`, requestOptions);

    return responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};

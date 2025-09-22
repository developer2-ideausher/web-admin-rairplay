import { apiError, responseValidator, url } from "../Helper/page";

export const loginAdmin = async (email,p) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");


  const raw = JSON.stringify({
    email: email,
    password: p,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(url + `/api/auth/login`, requestOptions);

    return responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};
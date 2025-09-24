import { getTokenFromCookie } from "../Auth/userCookies";
import { apiError, responseValidator, url } from "./Helper/page";

export const loginAdmin = async (email, p) => {
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

export const createChannel = async (data) => {
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
    const response = await fetch(url + `/api/channels/`, requestOptions);

    return responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};

export const getMediaUrl = async (fileType = "image/jpeg") => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + (await getTokenFromCookie()));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      url + `/api/file/upload/url?fileType=${encodeURIComponent(fileType)}`,
      requestOptions
    );

    return responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};

export const uploadMediaUrl = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "image/jpeg");

  const file = "<file contents here>";

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: file,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      "https://rairplay.s3.us-east-2.amazonaws.com/public/images/b1c611e6-37e0-4797-923b-513cc3a4f410.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIATXDJTI6I2IXXGWBH%2F20250923%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20250923T080014Z&X-Amz-Expires=3600&X-Amz-Signature=8af0c0cd85a238acc09d1e72cf8fcc337bdda856aa4bed863e9981eadf1e1862&X-Amz-SignedHeaders=host&x-amz-acl=public-read&x-amz-checksum-crc32=AAAAAA%3D%3D&x-amz-sdk-checksum-algorithm=CRC32&x-id=PutObject",
      requestOptions
    );

    return responseValidator(response);
  } catch (e) {
    return apiError(e);
  }
};

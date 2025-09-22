import dayjs from "dayjs";
import cookies from "js-cookie";

export const getTokenFromCookie = async () => {
  const cookieString = getToken();

  if (cookieString) {
    const { value, expiry } = JSON.parse(cookieString);

    const expiryDate = dayjs(expiry);
    const currentDate = dayjs();
    const differenceInMinutes = expiryDate.diff(currentDate, "minute");
    
    console.log(`Token expires in ${differenceInMinutes} minutes`);
    
    if (differenceInMinutes <= 0) {
      // Token has expired, remove it
      removeToken();
      return false;
    }
    
    if (differenceInMinutes <= 15) {
      // Token is close to expiration, you might want to show a warning
      // or redirect to login page depending on your use case
      console.warn("Token will expire soon. Consider refreshing or re-authenticating.");
    }
    
    console.log("Existing token returned:", value);
    return value;
  }

  return false; // No token found
};

export const getToken = () => {
  const cookie = cookies.get("RairPlayCookie");
  if (!cookie) {
    return null;
  }
  return cookie;
};

export const setToken = (token, expiryHours = 24) => {
  // Set expiry time based on hours provided (default 24 hours)
  const expiryTime = new Date(Date.now() + expiryHours * 60 * 60 * 1000);
  
  cookies.set(
    "RairPlayCookie",
    JSON.stringify({ value: token, expiry: expiryTime }),
    { 
      expires: 365 * 20, // Cookie itself expires in 20 years
      secure: true,
      sameSite: 'strict' // Added for better security
    }
  );
};

export const removeToken = () => {
  cookies.remove("RairPlayCookie");
  return true;
};

// Helper function to check if token exists and is valid
export const isTokenValid = () => {
  const cookieString = getToken();
  
  if (!cookieString) {
    return false;
  }
  
  try {
    const { expiry } = JSON.parse(cookieString);
    const expiryDate = dayjs(expiry);
    const currentDate = dayjs();
    
    return expiryDate.isAfter(currentDate);
  } catch (error) {
    console.error("Error checking token validity:", error);
    return false;
  }
};

// Helper function to get token expiry time
export const getTokenExpiryTime = () => {
  const cookieString = getToken();
  
  if (!cookieString) {
    return null;
  }
  
  try {
    const { expiry } = JSON.parse(cookieString);
    return dayjs(expiry);
  } catch (error) {
    console.error("Error getting token expiry:", error);
    return null;
  }
};
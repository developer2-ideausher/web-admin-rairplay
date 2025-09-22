"use client";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export const url="http://52.14.192.210:5000"
export const responseValidator = async (
  response,
  isToaster = false,
  message = null
) => {
  if (response.ok) {
    if (response?.status == 204) {
      toast.success(
        !message || message.length == 0 ? response.message : message,
        {
          toastId: "API-error-session-expired",
        }
      );
      return { status: true, code: 204 };
    } else {
      const res = await response.json();

      if (Array.isArray(res.data)) {
        if (isToaster) {
          toast.success(
            !message || message.length == 0 ? res.message : message,
            {
              toastId: `API-Response-success-${Math.random()}`,
            }
          );
        }
        return { status: true, data: [...res.data] };
      } else if (typeof res.data === "object") {
        if (isToaster) {
          toast.success(
            !message || message.length == 0 ? res.message : message,
            {
              toastId: `API-Response-success-${Math.random()}`,
            }
          );
        }
        return { status: true, data: res.data };
      } else if (typeof res.data === "string") {
        if (isToaster) {
          toast.success(
            !message || message.length == 0 ? res.message : message,
            {
              toastId: `API-Response-success-${Math.random()}`,
            }
          );
        }
        return { status: true, data: res.data };
      } else {
        toast.error("response.data is neither an array nor an object", {
          toastId: `API-Response-error${Math.random()}`,
        });
      }
    }
  } else if (response?.status == 401) {
    toast.error("Session Expired.", {
      toastId: "API-error-session-expired",
    });
    return { status: false, code: 401, message: "Session Expired." };
  } else if (response?.status == 413) {
    toast.error("Media file which you attach is too large.", {
      toastId: "API-error-file-size-too-large",
    });
    return { status: false, code: 413, message: "file-size-too-large" };
  } else if (response?.status >= 400 && response?.status < 500) {
    const res = await response.json();
    toast.error(res.message, {
      toastId: `API-400-error${Math.random()}`,
    });
    return { status: false, code: 400, message: res };
  } else if (response?.status >= 500) {
    const res = await response.json();
    toast.error(res, {
      toastId: `API-500-error${Math.random()}`,
    });
    return {
      status: false,
      code: response?.status,
      message: "Encounter Server Side Error.",
    };
  } else {
    toast.error("Something went wrong", {
      toastId: `API-unknown-error${Math.random()}`,
    });
    return {
      status: false,
      code: response?.status,
      message: "Something went wrong.",
    };
  }
};
export const apiError = (e) => {
  if (e.name === "AbortError") {
  } else {
    toast.error("Takes more than the usual time. Please refresh the page.", {
      toastId: `API-Timeout-error`,
    });
  }
  return { status: false, message: e };
};

export function useDebounce(value, delay = 1000) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

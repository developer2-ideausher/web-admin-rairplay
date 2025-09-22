"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { loginAdmin } from "../../Api/page";
import { toast } from "react-toastify";
import { getTokenFromCookie, setToken } from "../../Auth/userCookies";

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pw, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const checkExistingToken = async () => {
      const token = await getTokenFromCookie();
      if (token) {
        // User is already logged in, redirect to dashboard
        router.push("/dashBoard");
      }
    };

    checkExistingToken();
  }, [router]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await loginAdmin(email, pw);
      if (response.data) {
        setToken(response.data.token, 24);
        toast.success("Login successful!");

        // Redirect to dashboard
        router.push("/dashBoard");
      }
    } catch (error) {
      toast.error(error.message || "Unable to login");
    }
    setLoading(false);
  };
  return (
    // <button
    //   onClick={() => router.push("/dashBoard")}
    //   className="flex justify-center items-center w-full h-screen bg-black text-white"
    // >
    //   Go to dashboard
    // </button>
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center  h-screen flex-col gap-3 text-white bg-black w-full"
    >
      <div className="flex flex-col gap-2 items-start w-1/3">
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          placeholder="Enter your email"
          className="border focus:outline-none py-2 px-3 rounded-lg w-full"
        />
      </div>
      <div className="flex flex-col gap-2 items-start w-1/3">
        <label htmlFor="pw">Password</label>
        <input
          value={pw}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="pw"
          placeholder="Enter your password"
          className="border focus:outline-none py-2 px-3 rounded-lg w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-red-500 rounded-lg p-4 text-center text-white w-1/3"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default Page;

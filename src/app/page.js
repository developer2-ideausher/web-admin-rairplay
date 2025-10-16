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

        router.push("/dashBoard");
      }
    } catch (error) {
      toast.error(error.message || "Unable to login");
    }
    setLoading(false);
  };
  return (
    <div className="flex flex-col gap-8 justify-center items-center bg-black h-screen">
      <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-white to-red-500 font-bold text-4xl">
        Rairplay Admin
      </h1>
      {/* <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-white via-red-300 to-red-600 font-bold text-4xl">
        Rairplay Admin
      </h1> */}
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center  flex-col gap-3 text-white  w-full"
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
          className="bg-red-500 mt-4 font-semibold text-xl cursor-pointer rounded-lg p-4 text-center text-white w-1/3"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Page;

"use client";

import Title from "@/Components/Title";
import ArtistTable from "@/Components/UsersComp/ArtistTable";
import UsersTable from "@/Components/UsersComp/UsersTable";
import { Search } from "lucide-react";
import React, { useState } from "react";

const page = () => {
  const [active, setActive] = useState("users");

  const getButtonClasses = (buttonType) => {
    const baseClasses =
      "w-full py-2 text-center rounded-md shadow text-base font-semibold nuni transition-all duration-200 ease-in-out hover:opacity-80 cursor-pointer";
    const activeClasses = "bg-red-700 text-white ";
    const inactiveClasses = "bg-primary text-white hover:bg-gray-800 ";

    return `${baseClasses} ${
      active === buttonType ? activeClasses : inactiveClasses
    }`;
  };

  return (
    <div className="flex flex-col gap-4">
      <Title title="Users" />
      <div className="flex flex-row items-center w-full rounded-md justify-between bg-primary mt-2">
        <button
          className={getButtonClasses("users")}
          onClick={() => setActive("users")}
        >
          Users
        </button>
        <button
          className={getButtonClasses("artists")}
          onClick={() => setActive("artists")}
        >
          Artists
        </button>
      </div>
      <div className="flex justify-end w-full">
        <div className="w-2/11 bg-primary rounded-lg flex flex-row gap-2 p-2 mt-2">
          <Search color="white" />
          <input
            className="w-full focus:outline-none text-white"
            type="text"
            placeholder={active}
          />
        </div>
      </div>
      {active === "users" && <UsersTable />}
      {active === "artists" && <ArtistTable />}
    </div>
  );
};

export default page;

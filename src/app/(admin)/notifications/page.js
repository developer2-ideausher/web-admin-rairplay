"use client";

import InstantTab from "@/Components/NotificationTabs.js/Instant";
import ScheduledTab from "@/Components/NotificationTabs.js/Scheduled";
import Title from "@/Components/Title";
import { Plus, Search } from "lucide-react";
import React, { useState } from "react";

const page = () => {
  const [active, setActive] = useState("instant");

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
      <div className="flex flex-row justify-between items-center">
        <Title title="Notifications" />
        <button className="flex flex-row items-center gap-2 py-2 px-3 bg-red-700 rounded-md text-white nuni font-bold transition-all duration-200 ease-in-out hover:opacity-80 cursor-pointer text-sm">
          {" "}
          <span>
            <Plus />
          </span>{" "}
          Add new
        </button>
      </div>
      <div className="flex flex-row items-center w-full rounded-md justify-between bg-primary mt-2">
        <button
          className={getButtonClasses("instant")}
          onClick={() => setActive("instant")}
        >
          Instant
        </button>
        <button
          className={getButtonClasses("scheduled")}
          onClick={() => setActive("scheduled")}
        >
          Scheduled
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
      {active === "instant" && <InstantTab />}
      {active === "scheduled" && <ScheduledTab />}
    </div>
  );
};

export default page;

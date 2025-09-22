"use client";
import AddGenre from "@/Components/Lang&gen/AddGenre";
import AddLang from "@/Components/Lang&gen/AddLang";
import AllLanguages from "@/Components/Lang&gen/AllLanguageTable";
import GenTable from "@/Components/Lang&gen/GenTable";

import Title from "@/Components/Title";

import { Plus } from "lucide-react";
import React, { useState } from "react";

const page = () => {
  const [active, setActive] = useState("language");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    <div className="flex flex-col gap-8">
      <div className="flex flex-row justify-between items-center">
        <Title title="Language & Genre" />

        <div
          onClick={() => setIsDialogOpen(true)}
          className=" bg-red-700 rounded-lg flex flex-row gap-2 items-center p-2 mt-2 cursor-pointer"
        >
          <Plus color="white" />
          <p className="text-white text-base font-semibold ">Add New</p>
        </div>
      </div>
      <div className="flex flex-row items-center w-full rounded-md justify-between bg-primary mt-2">
        <button
          className={getButtonClasses("language")}
          onClick={() => setActive("language")}
        >
          Language
        </button>
        <button
          className={getButtonClasses("genre")}
          onClick={() => setActive("genre")}
        >
          Genre
        </button>
      </div>

      {active === "language" && <AllLanguages />}
      {active === "genre" && <GenTable />}
      {active === "language" && (
        <AddLang
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      )}
      {active === "genre" && (
        <AddGenre
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      )}
    </div>
  );
};

export default page;

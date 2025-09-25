import { MoveRight } from "lucide-react";
import React from "react";

const SubTitle = ({ title, sub }) => {
  return (
    <div className="flex flex-row items-center gap-4">
      <p className="2xl:text-3xl text-white text-2xl font-semibold nuni">
        {title}
      </p>
      <MoveRight color="red" />
      <span className="2xl:text-2xl text-red-500 text-xl font-semibold nuni hover:scale-105">{sub}</span>
    </div>
  );
};

export default SubTitle;

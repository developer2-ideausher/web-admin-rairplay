import React from "react";

const Card = ({ mainTitle, Sub1, num1, Sub2, num2 }) => {
  return (
    <div
      className="bg-primary rounded-lg flex flex-col gap-5 text-white w-full nuni font-semibold text-base p-4 
                    transform transition-all duration-300 ease-in-out 
                    hover:scale-105 hover:shadow-2xl hover:bg-primary/90 cursor-pointer"
    >
      <p className="text-lg">{mainTitle}</p>

      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-2 items-center">
          <p>{Sub1} :</p>
          <p className="text-xl">{num1}</p>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <p>{Sub2} :</p>
          <p className="text-xl">{num2}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;

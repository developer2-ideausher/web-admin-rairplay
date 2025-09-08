import Header from "@/Components/Header";
import Sidebar from "@/Components/Sidebar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="min-w-full  ">
      <div className="max-w-[1920px] max-h-auto w-full mx-auto flex flex-wrap items-start bg-gray-800">
        <div className=" w-full flex flex-row justify-center">
          <div className="w-68 bg-primary overflow-y-hidden h-screen overflow-hidden sticky top-0">
            <Sidebar />
          </div>

          <div className="w-full flex flex-col">
            <div className="sticky top-0 z-50 w-full   ">
              <Header />
            </div>

            <div className="p-14 overflow-y-auto flex-1 bg-secondary">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;

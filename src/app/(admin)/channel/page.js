"use client";
import Title from "@/Components/Title";
import { CloudUpload } from "lucide-react";
import React, { useState } from "react";

const page = () => {
  const [preview, setPreview] = useState(null);
  return (
    <div className="flex flex-col items-start gap-8">
     <Title title="Create New Channel" />
      <form className="flex flex-col gap-4 items-start w-full">
        <div className="flex flex-col gap-2 ">
          <label
            htmlFor="thumbnail"
            className="text-sm font-semibold nuni text-white"
          >
            Thumbnail Image
          </label>

          <div className="relative 2xl:w-40 2xl:h-40 w-32 h-32 border border-dashed bg-primary  rounded-lg flex items-center justify-center ">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {preview ? (
              <img
                src={preview}
                alt="Thumbnail Preview"
                className="object-contain w-full h-full rounded-lg"
              />
            ) : (
              <div className="flex flex-col gap-2 items-center justify-center text-center px-2 py-4">
                <CloudUpload color="gray" />
                <p className="2xl:text-sm text-xs font-semibold nuni text-gray-400">
                  Browse and chose the files you want to upload from your
                  computer.
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="channelName"
            className="text-white text-sm font-semibold "
          >
            Channel Name
          </label>
          <input
            type="text"
            id="channelName"
            placeholder="Channel Name"
            className="w-full  bg-primary rounded-lg p-3 focus:outline-none "
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="desc" className="text-white text-sm font-semibold ">
            Description
          </label>
          <textarea
            type="text"
            id="desc"
            rows={2}
            placeholder="Description"
            className="w-full  bg-primary rounded-lg p-3 focus:outline-none "
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="genre" className="text-white text-sm font-semibold ">
            Select Genre
          </label>
          <input
            type="text"
            id="genre"
            placeholder=" Select Genre"
            className="w-full  bg-primary rounded-lg p-3 focus:outline-none "
          />
        </div>
        <div className="flex justify-center items-center w-full">
          <button className="bg-red-500 text-white text-base font-semibold px-5 py-3 mt-2 rounded-lg">
            Create Channel
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;

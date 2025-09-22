"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";

const AddGenre = ({isDialogOpen, setIsDialogOpen}) => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    nativeName: "",
  });
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form data:", formData);

    // Reset form and close dialog
    setFormData({ name: "", code: "", nativeName: "" });
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    // Reset form and close dialog
    setFormData({ name: "", code: "", nativeName: "" });
    setIsDialogOpen(false);
  };
  return (
    <Dialog className="" open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="w-[60vw] bg-primary border focus:outline-none border-gray-800  [&>button]:text-white [&>button]:cursor-pointer ">
        <DialogHeader>
          <DialogTitle className="text-white font-medium text-xl">
            Add New Genre
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-8 mt-4">
            <div className="flex flex-col items-start gap-2 w-full">
              <label
                htmlFor="name"
                className="text-white font-semibold text-base"
              >
                Genre Name
              </label>
              <input
                id="name"
                className="w-full border border-gray-800 rounded-lg p-3 focus:outline-none text-white bg-transparent"
                placeholder="Rock"
                required
              />
            </div>
            <div className="flex flex-col items-start gap-2 w-full">
              <label
                htmlFor="desc"
                className="text-white font-semibold text-base"
              >
                Description
              </label>
              <textarea
                id="desc"
                rows={2}
                className="w-full border border-gray-800 rounded-lg p-3 focus:outline-none text-white"
                placeholder="Description"
                required
              />
            </div>
          </div>
          <div className="flex flex-row justify-between items-center gap-4 mt-5">
            <button
              type="button"
              className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg w-full font-semibold text-white"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-700 hover:bg-red-600 p-3 rounded-lg w-full font-semibold text-white"
            >
              Add Genre
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGenre;

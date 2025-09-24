"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { createLanguage } from "../../../Api/Lang&Genre/page";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
const AddLang = ({ isDialogOpen, setIsDialogOpen,refresh }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: "" },
    mode: "onSubmit",
  });
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await createLanguage(data);
      if (result.data) {
        toast.success("Genre Added Successfully");
        setIsDialogOpen(false);
        refresh();
      }
    } catch (e) {
      toast.error(e.message || "Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    setIsDialogOpen(false);
    reset();
  };
  return (
    <Dialog className="" open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="w-[60vw] bg-primary border focus:outline-none border-gray-800  [&>button]:text-white [&>button]:cursor-pointer ">
        <DialogHeader>
          <DialogTitle className="text-white font-medium text-xl">
            Add New Language
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Enter the language name below and click Add.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-8 mt-4">
            <div className="flex flex-col items-start gap-2 w-full">
              <label
                htmlFor="name"
                className="text-white font-semibold text-base"
              >
                Language Name
              </label>
              <input
                {...register("name", {
                  required: "Language name is required",
                  maxLength: {
                    value: 50,
                    message: "Name too long",
                  },
                })}
                id="name"
                className="w-full border border-gray-800 rounded-lg p-3 focus:outline-none text-white bg-transparent"
                placeholder="English"
              />
              <p className="text-red-400 text-sm">
                {errors.name && errors.name.message}
              </p>
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
              disabled={isSubmitting || loading}
              type="submit"
              className="bg-red-700 hover:bg-red-600 p-3 rounded-lg w-full font-semibold text-white text-center flex items-center justify-center cursor-pointer"
            >
              {isSubmitting || loading ? (
                <Loader className="animate-spin" />
              ) : (
                "Add"
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLang;

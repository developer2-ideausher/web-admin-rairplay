"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { createGenre } from "../../../Api/Lang&Genre/page";
import { toast } from "react-toastify";
const AddGenre = ({ isDialogOpen, setIsDialogOpen, refresh }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    defaultValues: { name: "", description: "" },
    mode: "onBlur",
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!isDialogOpen) reset({ name: "", description: "" });
  }, [isDialogOpen, reset]);
  const handleCancel = () => {
    reset({ name: "", description: "" });
    setIsDialogOpen(false);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await createGenre(data);
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
  return (
    <Dialog className="" open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="w-[60vw] bg-primary border focus:outline-none border-gray-800  [&>button]:text-white [&>button]:cursor-pointer ">
        <DialogHeader>
          <DialogTitle className="text-white font-medium text-xl">
            Add New Genre
          </DialogTitle>
           <DialogDescription className="text-gray-400">
            Enter the genre details below and click Add .
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-8 mt-4">
            <div className="flex flex-col items-start gap-2 w-full">
              <label
                htmlFor="name"
                className="text-white font-semibold text-base"
              >
                Genre Name
              </label>
              <input
                {...register("name", {
                  required: "Name is required",

                  maxLength: { value: 50, message: "Name is too long" },
                })}
                id="name"
                className="w-full border border-gray-800 rounded-lg p-3 focus:outline-none text-white bg-transparent"
                placeholder="Rock"
              />
              <p className="text-red-400 text-sm">
                {errors.name && errors.name.message}
              </p>
            </div>
            <div className="flex flex-col items-start gap-2 w-full">
              <label
                htmlFor="desc"
                className="text-white font-semibold text-base"
              >
                Description
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                  minLength: { value: 3, message: "Description is too short" },
                })}
                id="desc"
                rows={2}
                className="w-full border border-gray-800 rounded-lg p-3 focus:outline-none text-white"
                placeholder="Description"
              />
              <p className="text-red-400 text-sm">
                {errors.description && errors.description.message}
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center gap-4 mt-5">
            <button
              type="button"
              className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg w-full font-semibold text-white"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              disabled={isSubmitting || loading}
              type="submit"
              className="bg-red-700 hover:bg-red-600 p-3 rounded-lg w-full font-semibold text-white flex items-center justify-center"
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

export default AddGenre;

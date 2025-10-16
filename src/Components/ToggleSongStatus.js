"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
import { toggleSongStatus } from "../../Api/Dashboard/page";
const ToggleSongStatus = ({
  isDialogOpen,
  setIsDialogOpen,
  refresh,

  id,
}) => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await toggleSongStatus(id);
      if (result.data) {
        toast.success("Song Status Changed Successfully");
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
  };
  return (
    <Dialog className="" open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="w-[60vw] bg-primary border focus:outline-none border-gray-800  [&>button]:text-white [&>button]:cursor-pointer ">
        <DialogHeader>
          <DialogTitle className="text-white font-medium text-xl">
            Change Song Status
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Are you sure you want to change the status of this song?
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
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
              disabled={loading}
              className="bg-red-700 hover:bg-red-600 p-3 rounded-lg w-full font-semibold text-white text-center flex items-center justify-center cursor-pointer"
            >
              {loading ? <Loader className="animate-spin" /> : "Yes, Change it"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ToggleSongStatus;

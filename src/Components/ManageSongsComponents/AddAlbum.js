"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { CloudUpload, Loader } from "lucide-react";
import { toast } from "react-toastify";
import { createNewAlbum, getAllSongs } from "../../../Api/ManageSongs/page";
import { getMediaUrl } from "../../../Api/page";

const AddAlbum = ({ isDialogOpen, setIsDialogOpen, refresh }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      artistName: "",
    },
    mode: "onSubmit",
  });

  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [songsData, setSongsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedVisibility, setSelectedVisibility] = useState(null);
  const [selectedSongs, setSelectedSongs] = useState([]);

  const handleImageChange = (e) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (f) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(String(reader.result));
      reader.readAsDataURL(f);
    } else {
      setPreview(null);
    }
  };

  const visibilityOptions = [
    { value: true, label: "Public" },
    { value: false, label: "Private" },
  ];

  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "1px solid #374151",
      borderRadius: "0.5rem",
      padding: "0.375rem",
      minHeight: "48px",
      boxShadow: "none",
      "&:hover": {
        border: "1px solid #374151",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#1a1c23",
      border: "1px solid #374151",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#DC2626"
        : state.isFocused
        ? "#374151"
        : "transparent",
      color: "white",
      "&:hover": {
        backgroundColor: "#374151",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9CA3AF",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#DC2626",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "white",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "white",
      "&:hover": {
        backgroundColor: "#B91C1C",
        color: "white",
      },
    }),
    input: (provided) => ({
      ...provided,
      color: "white",
    }),
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getAllSongs();
      if (result.data) {
        const songOptions =
          result.data.results?.map((song) => ({
            value: song._id || song.id,
            label: song.trackName,
          })) || [];
        setSongsData(songOptions);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!selectedVisibility) {
      toast.error("Please select visibility");
      return;
    }

    if (!file) {
      toast.error("Please select a thumbnail image");
      return;
    }

    try {
      setLoading(true);

      const fileType = file.type || "image/jpeg";
      const mediaUrlRes = await getMediaUrl(fileType);

      if (!mediaUrlRes?.data?.url || !mediaUrlRes?.data?.key) {
        throw new Error("Failed to get upload URL");
      }

      const { url: presignedUrl, key } = mediaUrlRes.data;

      console.log("Uploading file to S3...", presignedUrl);

      const putResp = await fetch(presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": fileType,
        },
        body: file,
      });

      if (!putResp.ok) {
        const errorText = await putResp.text();
        console.error("S3 Upload failed:", putResp.status, errorText);
        throw new Error(
          `Image upload failed: ${putResp.status} - ${errorText}`
        );
      }

      console.log("File uploaded to S3 successfully");

      const payload = {
        name: data.name,
        artistName: data.artistName,
        description: `Album by ${data.artistName}`,
        isPublic: selectedVisibility.value,
        thumbnail: {
          key,
          url: presignedUrl.split("?")[0],
        },
        songs: selectedSongs.map((song) => song.value),
      };

      const result = await createNewAlbum(payload);
      if (result.data) {
        toast.success("Album Added Successfully");
        setIsDialogOpen(false);
        refresh();
        handleReset();
      }
    } catch (e) {
      console.error("Error in onSubmit:", e);
      toast.error(e.message || "Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    reset();
    setSelectedVisibility(null);
    setSelectedSongs([]);
    setFile(null);
    setPreview(null);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    handleReset();
  };

  useEffect(() => {
    if (isDialogOpen) {
      fetchData();
    }
  }, [isDialogOpen]);

  return (
    <Dialog className="" open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="min-w-[40vw] max-w-[70vw] bg-primary border focus:outline-none border-gray-800 [&>button]:text-white [&>button]:cursor-pointer max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-white font-medium text-xl">
            Add New Album
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Enter the album details.
          </DialogDescription>
        </DialogHeader>

        <form
          className="max-h-[70vh] overflow-y-scroll"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Thumbnail Upload */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="thumbnail"
              className="text-sm font-semibold nuni text-white"
            >
              Thumbnail Image *
            </label>

            <div className="relative 2xl:w-40 2xl:h-40 w-32 h-32 border border-dashed bg-primary rounded-lg flex items-center justify-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                required
              />
              {preview ? (
                <img
                  src={preview}
                  alt="Thumbnail Preview"
                  className="object-cover w-full h-full rounded-lg"
                />
              ) : (
                <div className="flex flex-col gap-2 items-center justify-center text-center px-2 py-4">
                  <CloudUpload color="gray" />
                  <p className="2xl:text-sm text-xs font-semibold nuni text-gray-400">
                    Browse and choose the files you want to upload from your
                    computer.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6 mt-4">
            <div className="flex flex-col items-start gap-2 w-full">
              <label
                htmlFor="name"
                className="text-white font-semibold text-base"
              >
                Album Name *
              </label>
              <input
                {...register("name", {
                  required: "Album name is required",
                  maxLength: {
                    value: 50,
                    message: "Album name too long",
                  },
                })}
                id="name"
                className="w-full border border-gray-800 rounded-lg p-3 focus:outline-none text-white bg-transparent"
                placeholder="Enter album name"
              />
              {errors.name && (
                <p className="text-red-400 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="flex flex-col items-start gap-2 w-full">
              <label
                htmlFor="artistName"
                className="text-white font-semibold text-base"
              >
                Artist Name *
              </label>
              <input
                {...register("artistName", {
                  required: "Artist name is required",
                  maxLength: {
                    value: 50,
                    message: "Artist name too long",
                  },
                })}
                id="artistName"
                className="w-full border border-gray-800 rounded-lg p-3 focus:outline-none text-white bg-transparent"
                placeholder="Enter artist name"
              />
              {errors.artistName && (
                <p className="text-red-400 text-sm">
                  {errors.artistName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col items-start gap-2 w-full">
              <label
                htmlFor="description"
                className="text-white font-semibold text-base"
              >
                Description
              </label>
              <textarea
                rows={2}
                {...register("description", {
                  required: "descriptionis required",
                  maxLength: {
                    value: 150,
                    message: "description too long",
                  },
                })}
                id="description"
                className="w-full border border-gray-800 rounded-lg p-3 focus:outline-none text-white bg-transparent"
                placeholder="Enter description"
              />
              {errors.description && (
                <p className="text-red-400 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="flex flex-col items-start gap-2 w-full">
              <label className="text-white font-semibold text-base">
                Visibility *
              </label>
              <Select
                instanceId="visibility-select"
                value={selectedVisibility}
                onChange={setSelectedVisibility}
                options={visibilityOptions}
                placeholder="Select visibility"
                styles={selectStyles}
                className="react-select-container w-full"
                classNamePrefix="react-select"
              />
            </div>

            {/* Songs Selection */}
            <div className="flex flex-col items-start gap-2 w-full">
              <label className="text-white font-semibold text-base">
                Select Songs
              </label>
              <Select
                instanceId="songs-select"
                isMulti
                value={selectedSongs}
                onChange={setSelectedSongs}
                options={songsData}
                placeholder="Select songs for this album"
                styles={selectStyles}
                isLoading={loading}
                className="react-select-container w-full"
                classNamePrefix="react-select"
                noOptionsMessage={() => "No songs available"}
              />
              <p className="text-gray-400 text-sm">
                You can select multiple songs for this album
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center gap-4 mt-6">
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
              className="bg-red-700 hover:bg-red-600 p-3 rounded-lg w-full font-semibold text-white text-center flex items-center justify-center cursor-pointer disabled:opacity-50"
            >
              {isSubmitting || loading ? (
                <Loader className="animate-spin" />
              ) : (
                "Add Album"
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAlbum;

"use client";
import Title from "@/Components/Title";
import { CloudUpload, Loader } from "lucide-react";
import React, { use, useEffect, useState } from "react";
import { getAllGenres, getAllLanguages } from "../../../../Api/Lang&Genre/page";
import { toast } from "react-toastify";
import Select from "react-select";
import { getAllSongs } from "../../../../Api/ManageSongs/page";
import { set } from "react-hook-form";
import { createChannel, getMediaUrl } from "../../../../Api/page";

const Page = () => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [languageData, setLanguageData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [songData, setSongData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const fetchData = async () => {
    try {
      setLoading(true);

      const [langRes, genreRes, songRes] = await Promise.all([
        getAllLanguages(),
        getAllGenres(),
        getAllSongs(),
      ]);

      if (langRes?.data) {
        const languageOptions = langRes.data.map((lang) => ({
          value: lang._id || lang.id,
          label: lang.name,
        }));
        setLanguageData(languageOptions);
      }
      if (genreRes?.data) {
        const genreOptions = genreRes.data.map((genre) => ({
          value: genre._id || genre.id,
          label: genre.name,
        }));
        setGenreData(genreOptions);
      }
      if (songRes?.data) {
        const songOptions = songRes.data?.results.map((song) => ({
          value: song._id || song.id,
          label: song.trackName,
        }));
        setSongData(songOptions);
      }
    } catch (e) {
      toast.error(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
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

  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#1a1c23",
      border: "none",
      borderRadius: "0.5rem",
      padding: "0.375rem",
      minHeight: "48px",
      boxShadow: "none",
      "&:hover": {
        border: "none",
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
        ? "#EF4444"
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
      backgroundColor: "#EF4444",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "white",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "white",
      "&:hover": {
        backgroundColor: "#DC2626",
        color: "white",
      },
    }),
    input: (provided) => ({
      ...provided,
      color: "white",
    }),
  };
  const handleCreate = async (e) => {
    e.preventDefault();

    if (!channelName.trim()) return toast.error("Channel name is required");
    if (!description.trim()) return toast.error("Description is required");
    if (!selectedGenres.length)
      return toast.error("Please select at least one genre");
    if (!selectedLanguage) return toast.error("Please select a language");
    if (!file) return toast.error("Please choose a thumbnail image");

    try {
      setLoading(true);

      const fileType = file.type || "image/jpeg";
      const mediaUrlRes = await getMediaUrl(fileType);
      if (!mediaUrlRes?.data?.url || !mediaUrlRes?.data?.key) {
        toast.error("Failed to get upload URL");
      }

      const { url: presignedUrl, key } = mediaUrlRes.data;

      const payload = {
        title: channelName.trim(),
        description: description.trim(),
        genres: selectedGenres.map((g) => g.value),
        language: selectedLanguage?.value,
        songs: selectedSongs.map((s) => s.value),
        thumbnail: {
          key,
          url: presignedUrl,
        },
      };

      const createRes = await createChannel(payload);
      if (!createRes?.data) {
        throw new Error(createRes?.message || "Channel creation failed");
      }

      const putResp = await fetch(presignedUrl, {
        method: "PUT",
        headers: { "Content-Type": fileType },
        body: file,
      });

      if (!putResp.ok) {
        throw new Error("Image upload failed");
      }

      toast.success("Channel created");

      setChannelName("");
      setDescription("");
      setSelectedGenres([]);
      setSelectedLanguage(null);
      setSelectedSongs([]);
      setFile(null);
      setPreview(null);
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-start gap-8">
      <Title title="Create New Channel" />
      <form
        onSubmit={handleCreate}
        className="flex flex-col gap-4 items-start w-full"
      >
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
              onChange={handleImageChange}
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
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            type="text"
            id="channelName"
            placeholder="Channel Name"
            className="w-full  bg-primary text-white rounded-lg p-3 focus:outline-none "
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full  bg-primary text-white rounded-lg p-3 focus:outline-none "
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="genre" className="text-white text-sm font-semibold ">
            Select Songs
          </label>
          <Select
            instanceId="song-select"
            isMulti
            value={selectedSongs}
            onChange={setSelectedSongs}
            options={songData}
            placeholder="Select Song(s)"
            styles={selectStyles}
            isLoading={loading}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
        <div className="flex flex-row items-center justify-between gap-5 w-full">
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="genre"
              className="text-white text-sm font-semibold "
            >
              Select Genre
            </label>
            <Select
              instanceId="genre-select"
              isMulti
              value={selectedGenres}
              onChange={setSelectedGenres}
              options={genreData}
              placeholder="Select Genre(s)"
              styles={selectStyles}
              isLoading={loading}
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="Language"
              className="text-white text-sm font-semibold "
            >
              Select Language
            </label>
            <Select
              instanceId="language-select"
              value={selectedLanguage}
              onChange={setSelectedLanguage}
              options={languageData}
              placeholder="Select Language"
              styles={selectStyles}
              isLoading={loading}
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>
        </div>

        <div className="flex justify-center items-center w-full">
          <button
            type="submit"
            disabled={loading}
            className="bg-red-500 text-white text-base font-semibold px-5 py-3 mt-2 rounded-lg flex items-center justify-center cursor-pointer"
          >
            {loading ? <Loader className="animate-spin" /> : "Create Channel"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;

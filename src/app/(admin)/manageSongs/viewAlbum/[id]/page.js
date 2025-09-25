"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { getAlbumById } from "../../../../../../Api/ManageSongs/page";
import { toast } from "react-toastify";
import { ChevronLeft, Loader, Pause, Play, Volume2 } from "lucide-react";
import SubTitle from "@/Components/SubTitle";

const Page = () => {
  const params = useParams();
  const id = params.id;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [play, setPlay] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAlbumById(id);
      if (res?.data) {
        setData(res.data);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
    setLoading(false);
  };
  const router = useRouter();
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const audioRef = useRef(null);

  const handlePlayPause = (song) => {
    if (!song.musicFile?.url) {
      toast.error("No audio file available for this song");
      return;
    }

    if (currentPlaying === song._id && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      if (currentPlaying !== song._id) {
        setCurrentPlaying(song._id);
        setLoadingAudio(true);
      } else {
        const playPromise = audioRef.current?.play();
        if (playPromise) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch((error) => {
              toast.error("Failed to resume audio playback");
              setIsPlaying(false);
            });
        }
      }
    }
  };

  useEffect(() => {
    if (currentPlaying && audioRef.current) {
      const currentSong = data?.songs?.find(
        (song) => song._id === currentPlaying
      );

      if (currentSong?.musicFile?.url) {
        setLoadingAudio(true);
        audioRef.current.src = currentSong.musicFile.url;
        audioRef.current.load();

        const playPromise = audioRef.current.play();
        if (playPromise) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setLoadingAudio(false);
            })
            .catch((error) => {
              //   console.error("Error playing audio:", error);
              toast.error(
                `Failed to play "${currentSong.trackName}". The audio file may be corrupted or unavailable.`
              );
              setIsPlaying(false);
              setLoadingAudio(false);
              setCurrentPlaying(null);
            });
        }
      }
    }
  }, [currentPlaying, data.songs]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  //   const handleError = (e) => {
  //     console.error("Audio error:", e);
  //     const currentSong = data?.songs?.find(
  //       (song) => song._id === currentPlaying
  //     );
  //     const songName = currentSong?.trackName || "Unknown song";

  //     setIsPlaying(false);
  //     setLoadingAudio(false);
  //     setCurrentPlaying(null);

  //     toast.error(
  //       `Failed to load "${songName}". The audio file may be broken or unavailable.`
  //     );
  //   };
  const handleLoadStart = () => {
    setLoadingAudio(true);
  };

  const handleCanPlay = () => {
    setLoadingAudio(false);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const currentSong = (data?.songs || []).find(
    (song) => song._id === currentPlaying
  );
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-col gap-8 w-full">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        // onError={handleError}
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        preload="metadata"
      />
      <div className="flex flex-row  justify-between items-center gap-4 w-full">
        <div className="flex flex-row items-center gap-3">
          <button className="cursor-pointer" onClick={() => router.back()}>
            <ChevronLeft color="white" />
          </button>
          <SubTitle title="Album" sub={data.name ?? "--"} />
        </div>
        <img
          src={data?.thumbnail}
          alt="Thumbnail"
          className="w-28 h-28 object-cover rounded-md"
        />
      </div>
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <Loader size={28} color="white" className="animate-spin" />
        </div>
      )}
      {!loading && data && (
        <>
          <div className="flex flex-row items-center justify-between w-full bg-primary rounded-md p-3 mt-4">
            <div className="flex flex-row items-center gap-3">
              <img
                src={data?.artist?.profilePicture?.url}
                alt="Artist Image"
                className="w-11 h-11 rounded-full object-cover"
              />
              <div className="flex flex-col gap-2">
                <p className="text-white text-xl font-semibold nuni capitalize">
                  {data?.artist?.username ?? "--"}
                </p>
                <p className="text-white text-sm font-semibold nuni capitalize">
                  {data?._id ?? "--"}
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="border-l px-3 border-gray-100 flex flex-col items-center">
                <p className="text-white">Status</p>
                <p
                  className={`${
                    data?.isActive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {data?.isActive ? "Active" : "Inactive"}
                </p>
              </div>
              <div className="border-l px-3 border-gray-100 flex flex-col items-center">
                <p className="text-white">Admin Disabled?</p>
                <p
                  className={`${
                    data?.isAdminDisabled ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {data?.isAdminDisabled ? "Yes" : "No"}
                </p>
              </div>
              <div className="border-l px-3 border-gray-100 flex flex-col items-center">
                <p className="text-white">Visibility</p>
                <p
                  className={`${
                    data?.isPublic ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {data?.isPublic ? "Public" : "Private"}
                </p>
              </div>
            </div>
          </div>
          <p className="text-white text-xl font-semibold  capitalize">
            {"Songs " + (data?.songs?.length || "--")}
          </p>
          {currentSong && (
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Volume2 size={20} className="text-green-400" />
                  <span className="text-white font-medium">Now Playing:</span>
                  <span className="text-green-400">
                    {currentSong.trackName}
                  </span>
                </div>
                <div className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div
                  className="bg-green-400 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: duration
                      ? `${(currentTime / duration) * 100}%`
                      : "0%",
                  }}
                />
              </div>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 mt-4 justify-between items-center w-full">
            {data &&
              data.songs?.length > 0 &&
              data.songs.map((song, index) => (
                <div
                  key={song._id || index}
                  className="flex flex-col items-start gap-3 bg-primary border-primary rounded-md py-3 px-5 w-full transform transition-all hover:shadow-2xl hover:bg-primary/90 hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-800  duration-300 relative "
                >
                  <div className="flex flex-row items-start gap-5 w-full">
                    <img
                      src={song?.thumbnail?.url}
                      alt="SONG Thumbnail"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex flex-col gap-2">
                      <p className=" text-red-500 font-semibold text-sm capitalize truncate">
                        {song?.trackName}
                      </p>
                      <p className="text-white text-sm">{song?._id}</p>
                      <span className="text-amber-200 font-medium text-sm">
                        {song?.isPublic ? "Public" : "Private"}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handlePlayPause(song)}
                    className="p-3 absolute right-4 top-0 bottom-0 cursor-pointer rounded-full transition-colors duration-200 flex-shrink-0"
                    disabled={!song.musicFile?.url || loadingAudio}
                  >
                    {loadingAudio && currentPlaying === song._id ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : currentPlaying === song._id && isPlaying ? (
                      <Pause size={24} color="white" />
                    ) : (
                      <Play size={24} color="white" />
                    )}
                  </button>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Page;

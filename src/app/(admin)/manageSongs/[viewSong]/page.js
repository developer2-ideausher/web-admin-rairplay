"use client";
import Title from "@/Components/Title";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getSingleSong } from "../../../../../Api/ManageSongs/page";
import {
  ChevronLeft,
  Heart,
  Loader,
  Pause,
  Play,
  Star,
  Users,
} from "lucide-react";
import SubTitle from "@/Components/SubTitle";
import Link from "next/link";
import dayjs from "dayjs";

const Page = () => {
  const params = useParams();
  const id = params.viewSong;
  const router = useRouter();
  const [play, setPlay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getSingleSong(id);
      if (res?.data) {
        setData(res.data);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row  justify-between items-center gap-4">
        <div className="flex flex-row items-center gap-3">
          <button className="cursor-pointer" onClick={() => router.back()}>
            <ChevronLeft color="white" />
          </button>
          <SubTitle title="Single track" sub={data.trackName ?? "--"} />
        </div>
      </div>
      {loading && (
        <div className="flex items-center justify-center h-screen">
          {" "}
          <Loader size={28} color="white" className="animate-spin" />
        </div>
      )}
      {!loading && data && (
        <div className="flex flex-col items-start gap-3 bg-primary border-primary rounded-md py-3 px-5 w-4/5 transform transition-all hover:shadow-2xl hover:bg-primary/90 hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-800  duration-300 ">
          <div className="flex flex-row items-center justify-between w-full">
            <p className="text-white text-2xl font-semibold nuni capitalize">
              {data.trackName ?? "--"}
            </p>
            <img
              title="Song Thumbnail"
              src={data?.thumbnail?.url}
              alt="Thumbnail"
              className="w-28 h-28 object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-col gap-8 w-full">
              <div className="flex flex-row items-center gap-3">
                <img
                  src={data?.artist?.profilePicture?.url}
                  alt=" Artist Image"
                  className="w-11 h-11 rounded-full object-cover"
                />
                <p className="text-white text-xl font-semibold nuni capitalize">
                  {data?.artist?.username ?? "--"}
                </p>
              </div>
              <div className="flex flex-row items-center gap-5">
                <div
                  title="Avg Rating"
                  className="flex flex-row items-center gap-2"
                >
                  <Star color="gold" />
                  <p className="text-white">
                    {data?.averageRating ? data.averageRating + "/5" : "--"}
                  </p>
                  <p className="text-white">
                    {"(" + data?.ratingCount + " " + "Reviews)"}
                  </p>
                </div>
                <div title="Likes" className="flex flex-row items-center gap-3">
                  <Heart color="white" />
                  <p className="text-white">{data?.like}</p>
                </div>
                <div
                  title="Listener Count"
                  className="flex flex-row items-center gap-3"
                >
                  <Users color="white" />
                  <p className="text-white">{data?.listenersCount}</p>
                </div>
                <div title="Score" className="flex flex-row items-center gap-3">
                  <p className="text-white">{"Score : " + data?.score}</p>
                </div>
              </div>
              <p
                title={data?.description ?? "--"}
                className="text-white font-semibold truncate max-w-md text-xl"
              >
                {data?.description ?? "--"}
              </p>
              <div className="flex flex-row items-center gap-2">
                <p
                  title="Genre"
                  className="text-white font-semibold border border-red-500 rounded-full p-3 "
                >
                  {"#" + data?.genres?.map((genre) => genre.name).join(", ")}
                </p>
                <p title="Language" className="text-white font-semibold">
                  {data?.songLanguage?.name}
                </p>
              </div>
            </div>
            {data?.musicFile?.url ? (
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={data.musicFile.url}
                className="transform transition-all duration-300 ease-in-out 
          hover:scale-105 hover:shadow-2xl hover:bg-primary/90 border border-white rounded-full p-4 bg-black cursor-pointer"
              >
                <Play color="white" />
              </Link>
            ) : (
              <div
                className="transform transition-all duration-300 ease-in-out 
        hover:scale-105 hover:shadow-2xl hover:bg-primary/90 border border-white rounded-full p-4 bg-black cursor-not-allowed opacity-50"
              >
                <Play color="white" />
              </div>
            )}
          </div>
          <div className="flex flex-row items-center gap-2">
            <p className="text-amber-200">Tags :</p>
            <div className="flex flex-wrap gap-2 max-w-md">
              {data?.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="border rounded-full px-3 py-1 text-sm bg-gray-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 justify-between mt-4 w-full">
            <div>
              <p className="text-amber-200">Created At </p>
              <p className="text-white">{dayjs(data?.createdAt).format("DD-MM-YYYY")}</p>
            </div>
            <div>
              <p className="text-amber-200">Updated At </p>
              <p className="text-white">{dayjs(data?.updatedAt).format("DD-MM-YYYY")}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

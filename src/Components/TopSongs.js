"use client";

import React, { useEffect, useMemo, useState } from "react";

// import Modal from "../Modal";
import dayjs from "dayjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CircleMinus, EllipsisVertical, Eye, Trash2 } from "lucide-react";
import DataTable from "./DataTable";
import { getTrendingSongs } from "../../Api/ManageSongs/page";
// import Pagination from "../Pagination";

export default function TopSongs() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getTrendingSongs();
      if (res?.data) {
        setData(res.data?.results);
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const COLUMNS = useMemo(
    () => [
      {
        header: "trackName",
        accessorKey: "trackName",
        cell: (info) => {
          const value = info.getValue();
          return (
            <p
              title={value ?? ""}
              className="text-sm font-medium nuni truncate max-w-xs text-black"
            >
              {value ?? "--"}
            </p>
          );
        },
      },
      {
        header: "description",
        accessorKey: "description",
        cell: (info) => {
          const value = info.getValue();
          return (
            <p
              title={value ?? ""}
              className="text-sm font-medium nuni truncate max-w-xs text-black"
            >
              {value ?? "--"}
            </p>
          );
        },
      },
      {
        header: "Artist",
        accessorKey: "artist",
        cell: (info) => {
          const value = info.getValue();
          return (
            <p
              title={value?.username ?? ""}
              className="text-sm font-medium nuni truncate max-w-xs text-black"
            >
              {value?.username ?? "--"}
            </p>
          );
        },
      },
      {
        header: "Genre",
        accessorKey: "genres",
        cell: (info) => {
          const value = info.getValue();
          const genreNames = Array.isArray(value)
            ? value.map((item) => item.name)
            : [];

          return (
            <p
              title={genreNames.join(", ")}
              className="text-sm font-medium nuni truncate max-w-xs text-black"
            >
              {genreNames.length > 0 ? genreNames.join(", ") : "--"}
            </p>
          );
        },
      },
      {
        header: "language",
        accessorKey: "language",
        cell: (info) => {
          const value = info.getValue();
          return (
            <p
              title={value?.name ?? ""}
              className="text-sm font-medium nuni truncate max-w-xs text-black"
            >
              {value?.name ?? "--"}
            </p>
          );
        },
      },
      {
        header: "rating Count",
        accessorKey: "ratingCount",
        cell: (info) => {
          const value = info.getValue();
          return (
            <p className="text-sm font-medium nuni truncate max-w-xs text-black">
              {value ?? "--"}
            </p>
          );
        },
      },
      {
        header: "listeners",
        accessorKey: "listenersCount",
        cell: (info) => {
          const value = info.getValue();
          return (
            <p className="text-sm font-medium nuni truncate max-w-xs text-black">
              {value ?? "--"}
            </p>
          );
        },
      },
      {
        header: " like",
        accessorKey: "like",
        cell: (info) => {
          const value = info.getValue();
          return (
            <p className="text-sm font-medium nuni truncate max-w-xs text-black">
              {value ?? "--"}
            </p>
          );
        },
      },
      {
        header: "tags",
        accessorKey: "tags",
        cell: (info) => {
          const value = info.getValue();
          const tags = Array.isArray(value) ? value : [];

          return (
            <p
              title={tags.join(", ")}
              className="text-sm font-medium nuni truncate max-w-xs text-black"
            >
              {tags.length > 0 ? tags.join(", ") : "--"}
            </p>
          );
        },
      },

      {
        header: "",
        id: "actions",
        enableSorting: false,
        enableColumnFilter: false,
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-white ">
                <EllipsisVertical className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-40 shadow-lg border border-black bg-[#23252B] text-white"
              align="end"
            >
              <DropdownMenuItem className="flex items-center gap-2 text-sm font-semibold nuni">
                <Eye /> View
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 text-sm font-semibold nuni">
                <CircleMinus /> Inactive
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 text-sm font-semibold nuni text-red-500">
                <Trash2 color="red" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    []
  );
  const [isOpen, setIsOpen] = useState(false);
  const [extendOpen, setExtendOpen] = useState(false);

  const columns = useMemo(() => COLUMNS, []);
  return (
    <div className=" rounded-lg flex flex-col mt-4">
      <div className="flex flex-row pb-1 gap-3 items-center rounded-lg ">
        <p className="text-xl font-semibold nuni text-txtgray">Top Songs</p>
      </div>
      <DataTable columns={columns} data={data} loading={loading} />
    </div>
  );
}

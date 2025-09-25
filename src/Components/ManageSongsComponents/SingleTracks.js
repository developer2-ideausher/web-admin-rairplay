"use client";

import React, { use, useEffect, useMemo, useState } from "react";

import DataTable from "../DataTable";
// import Modal from "../Modal";
import dayjs from "dayjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  CircleMinus,
  EllipsisVertical,
  Eye,
  Search,
  Trash2,
} from "lucide-react";
import { toast } from "react-toastify";
import { getAllSongs } from "../../../Api/ManageSongs/page";
import { useRouter } from "next/navigation";
// import Pagination from "../Pagination";

export default function SingleTracks() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getAllSongs();
      if (result.data) {
        setData(result.data?.results);
      }
    } catch (e) {
      toast.error(e.message || "Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };
  const router = useRouter();
  useEffect(() => {
    fetchData();
  }, []);
  const COLUMNS = useMemo(
    () => [
      {
        header: "track Name",
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
        header: "Visibility",
        accessorKey: "isPublic",
        cell: (info) => {
          const value = info.getValue();
          return (
            <p className="text-sm font-medium nuni truncate max-w-xs text-black">
              {value ? "Public" : "Private"}
            </p>
          );
        },
      },
      {
        header: "Description",
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
        header: "genres",
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
              title={value?.name}
              className="text-sm font-medium nuni truncate max-w-xs text-black"
            >
              {value?.name ?? "--"}
            </p>
          );
        },
      },
      {
        header: "Likes",
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
        header: "Listens",
        accessorKey: "listenersCount",
        cell: (info) => {
          const value = info.getValue();
          return (
            <p className="text-sm font-medium nuni  text-black">
              {value ?? "--"}
            </p>
          );
        },
      },
      {
        header: "trend Score",
        accessorKey: "trendScore",
      },
      {
        header: "Creation Date",
        accessorKey: "createdAt",
        cell: (info) => {
          const value = info.getValue();
          return (
            <p
              title={value ?? ""}
              className="text-sm font-medium nuni truncate max-w-sm text-black"
            >
              {value === null
                ? "--"
                : dayjs(value).format("DD/MM/YYYY , h:mm a")}
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
              <DropdownMenuItem
                onSelect={() => router.push(`/manageSongs/${row.original._id}`)}
                className="flex items-center gap-2 text-sm font-semibold nuni"
              >
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
    <div className=" rounded-lg flex flex-col">
      <div className="flex justify-end w-full my-4">
        <div className="w-2/11 bg-primary rounded-lg flex flex-row gap-2 p-2 mt-2">
          <Search color="white" />
          <input
            className="w-full focus:outline-none text-white"
            type="text"
            placeholder="Single Track name"
          />
        </div>
      </div>
      <div className="flex flex-row pb-1 gap-3 items-center rounded-lg ">
        <p className="text-xl font-semibold nuni text-txtgray">Single Tracks</p>
      </div>
      <DataTable columns={columns} data={data} loading={loading} />
    </div>
  );
}

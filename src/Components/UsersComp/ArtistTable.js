"use client";

import React, { useEffect, useMemo, useState } from "react";

import DataTable from "../DataTable";
// import Modal from "../Modal";
import dayjs from "dayjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { CircleMinus, EllipsisVertical, Eye, Trash2 } from "lucide-react";
import { getAllArtists } from "../../../Api/Users/page";
// import Pagination from "../Pagination";

export default function ArtistTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getAllArtists();
      if (res?.data) {
        setData(res.data);
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
        header: "Artist Id",
        accessorKey: "_id",
        cell: (info) => (
          <span className="text-sm font-medium nuni text-black">
            {info.getValue()}
          </span>
        ),
      },
      {
        header: "Artist Name",
        accessorKey: "username",
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
        header: "status",
        accessorKey: "title",
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
        header: "Location",
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
        header: "Tracks count",
        accessorKey: "count",
      },
      {
        header: "Genre",
        accessorKey: "genre",
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
        header: "plan",
        accessorKey: "artistPlan",
        cell: (info) => {
          const value = info.getValue();
          return (
            <p className="text-sm font-medium nuni truncate max-w-xs text-black capitalize">
              {value?.type ?? "--"}
            </p>
          );
        },
      },
      {
        header: "contact",
        accessorKey: "phone",
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
        header: "followers",
        accessorKey: "followers",
        cell: (info) => {
          const value = info.getValue();
          return (
            <p className="text-sm font-medium nuni truncate max-w-xs text-black">
              {value?.length ?? 0}
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
    <div className=" rounded-lg flex flex-col">
      <div className="flex flex-row pb-1 gap-3 items-center rounded-lg ">
        <p className="text-xl font-semibold nuni text-txtgray">Users</p>
      </div>
      <DataTable columns={columns} data={data} loading={loading} />
    </div>
  );
}

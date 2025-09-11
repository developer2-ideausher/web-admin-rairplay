"use client";

import React, { useMemo, useState } from "react";

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
// import Pagination from "../Pagination";

export default function PromoTab() {
  const [data] = useState([
    {
      _id: "trk_001",
      title: "Neon Skyline",
      description: "Smooth synthwave with late-night vibes",
      likes: 124,
      listens: 5210,
      createdAt: "2025-08-16T14:05:00.000Z",
    },
    {
      _id: "trk_002",
      title: "Coffee & Code",
      description: "Lo-fi beats to debug to",
      likes: 89,
      listens: 3412,
      createdAt: "2025-07-29T09:30:00.000Z",
    },
    {
      _id: "trk_003",
      title: "Desert Sun",
      description: "Ambient guitars and warm pads",
      likes: 203,
      listens: 9820,
      createdAt: "2025-06-03T18:45:00.000Z",
    },
    {
      _id: "trk_004",
      title: null,
      description: "Untitled idea sketch",
      likes: 2,
      listens: 34,
      createdAt: null,
    },
    {
      _id: "trk_005",
      title: "Midnight Runner",
      description: null,
      likes: 57,
      listens: 1900,
      createdAt: "2025-05-12T22:10:00.000Z",
    },
  ]);

  const [loading] = useState(false);
  const COLUMNS = useMemo(
    () => [
      {
        header: "Users",
        accessorKey: "_id",
        cell: (info) => (
          <span className="text-sm font-medium nuni text-black">
            {info.getValue()}
          </span>
        ),
      },
      {
        header: "Blocked",
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
        header: "Genre",
        accessorKey: "genre",
      },
      {
        header: "plan",
        accessorKey: "likes",
      },
      {
        header: "contact",
        accessorKey: "contact",
      },
      {
        header: "following",
        accessorKey: "following",
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
            <DropdownMenuContent className="w-40 shadow-lg border border-black bg-[#23252B] text-white" align="end">
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
        <p className="text-xl font-semibold nuni text-txtgray">Promos</p>
      </div>
      <DataTable columns={columns} data={data} loading={loading} />
    </div>
  );
}

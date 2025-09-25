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
import {
  CircleMinus,
  EllipsisVertical,
  Eye,
  Search,
  Trash2,
} from "lucide-react";
import { toast } from "react-toastify";
import { getAllAblums } from "../../../Api/ManageSongs/page";
import { useRouter } from "next/navigation";

export default function Albums() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getAllAblums();
      if (response.data) {
        setData(response.data);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message || "Unable to fetch albums");
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
        header: "ID",
        accessorKey: "_id",
        cell: (info) => (
          <p
            title={info.getValue()}
            className="text-sm font-medium nuni max-w-xs truncate text-black"
          >
            {info.getValue()}
          </p>
        ),
      },
      {
        header: "Album",
        accessorKey: "name",
        cell: (info) => (
          <span className="text-sm font-medium nuni text-black">
            {info.getValue()}
          </span>
        ),
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
        header: "Tracks Count",
        accessorKey: "songs",
        cell: (info) => {
          const value = info.getValue();
          return (
            <p
              title={value?.length ?? ""}
              className="text-sm font-medium nuni truncate max-w-xs text-black"
            >
              {value?.length ?? "--"}
            </p>
          );
        },
      },
      {
        header: "Last Updated",
        accessorKey: "updatedAt",
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
                onSelect={() =>
                  router.push(`/manageSongs/viewAlbum/${row.original._id}`)
                }
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
            placeholder="Album name"
          />
        </div>
      </div>
      <div className="flex flex-row pb-1 gap-3 items-center rounded-lg ">
        <p className="text-xl font-semibold nuni text-txtgray">Albums</p>
      </div>
      <DataTable columns={columns} data={data} loading={loading} />
    </div>
  );
}

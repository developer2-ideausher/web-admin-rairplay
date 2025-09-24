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
import { toast } from "react-toastify";
import { getAllUsers } from "../../../Api/Users/page";
// import Pagination from "../Pagination";

export default function UsersTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
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
        header: "User Id",
        accessorKey: "_id",
        cell: (info) => (
          <span className="text-sm font-medium nuni text-black">
            {info.getValue()}
          </span>
        ),
      },
      {
        header: "username",
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
        }
      },
      {
        header: "Verified",
        accessorKey: "isVerified",
        cell: (info) => {
          const value = info.getValue();
          return (
            <p
              className="text-sm font-medium nuni truncate max-w-xs text-black capitalize"
            >
              {value?"yes":"no"}
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
        header: "following",
        accessorKey: "following",
        cell: (info) => {
          const value = info.getValue();
          return (
            <p
              className="text-sm font-medium nuni truncate max-w-xs text-black"
            >
              {value?.length ?? 0}
            </p>
          );
        },
      },
      {
        header:"Created At",
        accessorKey: "createdAt",
        cell: (info) => {
          const value = info.getValue();
          return (
            <p
              className="text-sm font-medium nuni truncate max-w-xs text-black"
            >
              {value?(dayjs(value).format("DD-MM-YYYY") ):"--"}
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

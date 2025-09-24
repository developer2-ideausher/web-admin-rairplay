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
import { CircleMinus, EllipsisVertical, Eye, Search, Trash2 } from "lucide-react";
import { getAllLanguages } from "../../../Api/Lang&Genre/page";
import { toast } from "react-toastify";
// import Pagination from "../Pagination";

export default function AllLanguages({refreshSignal }) {
const [data,setData] = useState([]);
const [loading,setLoading] = useState(false);
const fetchData = async () => {
  try {
    setLoading(true);
    const response = await getAllLanguages();
    if (response.data) {
      setData(response.data);
      setLoading(false);
    }
  } catch (error) {
    toast.error(error.message || "Unable to fetch languages");
  } finally {
    setLoading(false);
  }
};
 useEffect(() => {
    fetchData();
  }, []);
 useEffect(() => {
    if (refreshSignal?.type === "language") {
    fetchData()
    }
  }, [refreshSignal]);


  const COLUMNS = useMemo(
    () => [
      {
        header: "name",
        accessorKey: "name",
        cell: (info) => (
          <span className="text-sm font-medium nuni text-black">
            {info.getValue()}
          </span>
        ),
      },
      {
        header: "code",
        accessorKey: "code",
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
        header: "native Name",
        accessorKey: "nativeName",
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
        header: "Updated at",
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
            <DropdownMenuContent className="w-40 shadow-lg border border-black bg-[#23252B] text-white" align="end">
              
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
            placeholder="Language name"
          />
        </div>
      </div>
      <div className="flex flex-row pb-1 gap-3 items-center rounded-lg ">
        <p className="text-xl font-semibold nuni text-txtgray">Languages</p>
      </div>
      <DataTable columns={columns} data={data} loading={loading} />
    </div>
  );
}

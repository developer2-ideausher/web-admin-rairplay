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
  SquarePen,
  Trash2,
} from "lucide-react";
import { getAllAdBanner } from "../../../Api/Ad&Banner/page";
import { toast } from "react-toastify";
import Link from "next/link";
import AdStatus from "./AdStatus";
// import Pagination from "../Pagination";

export default function AdTab() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getAllAdBanner();
      if (response.data) {
        setData(response.data);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message || "Unable to fetch ads");
    } finally {
      setLoading(false);
    }
  };
  const COLUMNS = useMemo(
    () => [
      {
        header: "id",
        accessorKey: "_id",
        cell: (info) => (
          <span className="text-sm font-medium nuni text-black">
            {info.getValue()}
          </span>
        ),
      },
      {
        header: "Banner",
        accessorKey: "bannerFile",
        cell: (info) => {
          const value = info.getValue();
          return (
            <img
              src={value}
              alt="banner"
              className="w-8 h-8 rounded-full object-cover"
            />
          );
        },
      },
      {
        header: "name",
        accessorKey: "name",
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
        header: "link",
        accessorKey: "link",
        cell: (info) => {
          const value = info.getValue();
          return (
            <Link
              href={value}
              target="_blank"
              className="text-sm font-medium nuni truncate max-w-xs text-blue-500 hover:underline"
            >
              {value ?? "--"}
            </Link>
          );
        },
      },

      {
        header: "created At",
        accessorKey: "createdAt",
        cell: (info) => {
          const value = info.getValue();
          return (
            <p className="text-sm font-medium nuni  text-black">
              {value ? dayjs(value).format("DD-MM-YYYY") : "--"}
            </p>
          );
        },
      },
      {
        header: "start Date",
        accessorKey: "startDate",
        cell: (info) => {
          const value = info.getValue();
          return (
            <p className="text-sm font-medium nuni  text-black">
              {value ? dayjs(value).format("DD-MM-YYYY") : "--"}
            </p>
          );
        },
      },
      {
        header: "stop Date",
        accessorKey: "stopDate",
        cell: (info) => {
          const value = info.getValue();
          return (
            <p className="text-sm font-medium nuni  text-black">
              {value ? dayjs(value).format("DD-MM-YYYY") : "--"}
            </p>
          );
        },
      },
      {
        header: "status",
        accessorKey: "publish",
        cell: (info) => {
          const value = info.getValue();
          return (
            <p
              className={`text-sm font-medium nuni truncate max-w-xs ${
                value
                  ? "text-green-500 border-green-500  "
                  : " text-red-500 border-red-500"
              } border rounded-full p-2 text-center`}
            >
              {value ? "Active" : "Inactive"}
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
              {/* <DropdownMenuItem className="flex items-center gap-2 text-sm font-semibold nuni">
                <Eye /> View
              </DropdownMenuItem> */}
              <DropdownMenuItem
                onSelect={() => {
                  setIsOpen(true);
                  setId(row.original._id);
                }}
                className="flex items-center gap-2 text-sm font-semibold nuni"
              >
                <SquarePen /> Change Status
              </DropdownMenuItem>
              {/* <DropdownMenuItem className="flex items-center gap-2 text-sm font-semibold nuni text-red-500">
                <Trash2 color="red" /> Delete
              </DropdownMenuItem> */}
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
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className=" rounded-lg flex flex-col">
      <div className="flex flex-row pb-1 gap-3 items-center rounded-lg ">
        <p className="text-xl font-semibold nuni text-txtgray">Ads</p>
      </div>
      <DataTable columns={columns} data={data} loading={loading} />
      {isOpen && (
        <AdStatus
          isDialogOpen={isOpen}
          setIsDialogOpen={setIsOpen}
          refresh={fetchData}
          id={id}
        />
      )}
    </div>
  );
}

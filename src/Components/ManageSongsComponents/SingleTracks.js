"use client";

import React, { useMemo, useState } from "react";

import DataTable from "../DataTable";
import Modal from "../Modal";
import dayjs from "dayjs";
import Pagination from "../Pagination";

export default function SingleTracks() {
  const COLUMNS = [
    { Header: "ID", accessor: "_id" },
    
    {
      Header: "Title",
      accessor: "title",
      Cell: ({ value }) => (
        <p
          title={value}
          className="text-sm font-medium nuni truncate max-w-xs text-black"
        >
          {value}
        </p>
      ),
    },
    {
      Header: "Message",
      accessor: "description",
      Cell: ({ value }) => (
        <p
          title={value}
          className="text-sm font-medium nuni truncate max-w-xs text-black"
        >
          {value}
        </p>
      ),
    },
    // {
    //   Header: "Category",
    //   accessor:"deliveryType" ?? "—",
    // Cell: ({ value }) => (
    //   <span className="inline-flex items-center …">
    //     {value}
    //   </span>
    // ),
    // },
    // { Header: "No. Of Workouts", accessor: "numberOfWorkouts" },
    { Header: "Notification Type", accessor: "notificationType" },
  {
  Header: "Channels",
  accessor: "deliveryChannels",
  Cell: ({ value }) => {
    if (!value || value.length === 0) return "—";

    // flatten the nested arrays into one flat array of strings
    const channels = value.flat();

    return (
      <span className="inline-flex items-center gap-1">
        {channels.map((channel, i) => (
          <span
            key={i}
            className="bg-green-100 text-secondary px-2 py-0.5 rounded-full text-xs"
          >
            {channel}
          </span>
        ))}
      </span>
    );
  },
},

    // {
    //   Header: "Status",
    //   accessor: "status",
    //   Cell: ({ value }) => {
    //     return (
    //       <span
    //         className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs nuni font-medium ${
    //           value === "active"
    //             ? "bg-green-100 text-green-800"
    //             : "bg-blue-100 text-blue-800"
    //         }`}
    //       >
    //         <span
    //           className={`h-2 w-2 rounded-full ${
    //             value === "active" ? "bg-green-500" : "bg-blue-500"
    //           }`}
    //         />
    //         {value === "active" ? "Sent" : "Scheduled"}
    //       </span>
    //     );
    //   },
    // },
    // { Header: "Rewards", accessor: "rewards" },
    {
      Header: "Creation Date",
      accessor: "createdAt",
      Cell: ({ value }) => (
        <p
          title={value}
          className="text-sm font-medium nuni truncate max-w-sm text-black"
        >
          {value === null
            ? "--"
            : dayjs(value).format("DD/MM/YYYY" + " , " + "h:mm a")}
        </p>
      ),
    },

   
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [extendOpen, setExtendOpen] = useState(false);

  const columns = useMemo(() => COLUMNS, []);
  console.log(totalCount);
  return (
    <div className="border border-[#E9EAEB] rounded-lg flex flex-col">
      <div className="flex flex-row py-5 px-6 gap-3 items-center">
        <p className="text-xl font-semibold nuni text-black">Notifications</p>
        <span className="text-[#6941C6] nuni text-xs font-semibold border bg-[#F9F5FF] py-0.5 px-2 rounded-lg">
          {totalCount} Notifications
        </span>
      </div>
      <DataTable columns={columns} data={data} loading={loading} />
       {data && paginationData && paginationData.totalPages > 1 && (
          <Pagination
          currentPage={currentPage}
          totalPages={paginationData.totalPages}
          onPageChange={onPageChange}
        />
        )}
      {/* {isOpen && <Modal><RevokeLicense onclose={()=>setIsOpen(false)}/></Modal>}
      {extendOpen && <Modal><ExtendLicenseAll onclose={()=>setExtendOpen(false)}/></Modal>} */}
    </div>
  );
}

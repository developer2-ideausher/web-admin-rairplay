"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

export default function DataTable({ columns, data = [], loading = false }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const colCount = table.getAllLeafColumns().length;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700 bg-[#191A1F]">
        {/* Header */}
        <thead className="bg-[#23252B] ">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-semibold nuni text-gray-300 uppercase tracking-wider border-b border-gray-700"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-gray-700">
          {loading ? (
            <tr>
              <td
                colSpan={colCount}
                className="px-6 py-4 text-center text-white"
              >
                Loading ...
              </td>
            </tr>
          ) : table.getRowModel().rows.length === 0 ? (
            <tr>
              <td
                colSpan={colCount}
                className="px-6 py-4 text-center text-white"
              >
                No data yet
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-[#2a2d38] text-white [&_*]:!text-white nuni duration-150"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm nuni font-medium "
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

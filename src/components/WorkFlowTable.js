import React, { useMemo, useRef } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

const columnHelper = createColumnHelper();

const WorkflowTable = React.memo(({ data, columnsConfig, tableHeight = 400, rowHeight = 40 }) => {
  const columns = useMemo(() => {
    return columnsConfig.map((columnConfig) =>
      columnHelper.accessor(columnConfig.accessor, {
        header: columnConfig.header,
        id: columnConfig.id,
        cell: columnConfig.cell || ((info) => info.getValue()),
      })
    );
  }, [columnsConfig]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Reference for scrolling container
  const tableContainerRef = useRef(null);

  // Virtualizer setup for rows
  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => rowHeight,
    overscan: 5, // Renders additional rows before and after visible ones
  });

  return (
    <div
      ref={tableContainerRef}
      style={{
        width: "100%",
        height: tableHeight,
        overflow: "auto",
        position: "relative",
        // border: "1px solid #ddd",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
        {/* Define column widths using <colgroup> */}
        <colgroup>
          {columnsConfig.map((column, index) => (
            <col key={index} style={{ width: column.width || "auto" }} />
          ))}
        </colgroup>

        {/* Sticky Table Header */}
        <thead style={{ position: "sticky", top: 0, zIndex: 2 }}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                <th
                  key={header.id}
                  style={{
                    borderBottom: "1px solid black",
                    padding: "8px",
                    textAlign: "left",
                    background: "#f1f1f1",
                    width: columnsConfig[index]?.width || "auto", // Apply column width
                  }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* Virtualized Table Body */}
        <tbody>
          <tr>
            <td colSpan={columns.length} style={{ padding: 0 }}>
              <div
                style={{
                  height: `${rowVirtualizer.getTotalSize()}px`,
                  position: "relative",
                  width: "100%",
                }}
              >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                  const row = table.getRowModel().rows[virtualRow.index];
                  return (
                    <div
                      key={row.id}
                      style={{
                        position: "absolute",
                        top: `${virtualRow.start}px`,
                        width: "100%",
                        display: "flex",
                      }}
                    >
                      {row.getAllCells().map((cell, index) => {
                        const cellValue = flexRender(cell.column.columnDef.cell, cell.getContext());
                        return (
                          <div
                            key={cell.id}
                            style={{
                              padding: "8px",
                              borderBottom: "1px solid #ddd",
                              width: columnsConfig[index]?.width || "auto", // Apply column width to row cells
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              
                            }}
                          >
                            {cellValue}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

export default WorkflowTable;

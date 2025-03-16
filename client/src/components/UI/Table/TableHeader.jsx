import { flexRender } from "@tanstack/react-table";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import "./Table.css";

const TableHeader = ({ table }) => (
  <thead>
    {table.getHeaderGroups().map((headerGroup) => (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map((header) => {
          const isSortable = header.column.getCanSort();
          const isSorted = header.column.getIsSorted();
          return (
            <th
              key={header.id}
              colSpan={header.colSpan}
              style={{ position: "relative", width: `${header.getSize()}px` }}
            >
              {header.isPlaceholder ? null : (
                <div
                  className={isSortable ? "cursor-pointer" : ""}
                  onClick={
                    isSortable
                      ? header.column.getToggleSortingHandler()
                      : undefined
                  }
                >
                  <span>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </span>
                  {isSortable && (
                    <span className="ms-2">
                      {isSorted ? (
                        isSorted === "asc" ? (
                          <FaSortUp />
                        ) : (
                          <FaSortDown />
                        )
                      ) : (
                        <FaSort />
                      )}
                    </span>
                  )}
                </div>
              )}
              <div
                onMouseDown={(e) => header.getResizeHandler()(e)}
                onTouchStart={(e) => header.getResizeHandler()(e)}
                className={`resizer ${
                  header.column.getIsResizing() ? "isResizing" : ""
                }`}
              />
            </th>
          );
        })}
      </tr>
    ))}
  </thead>
);

export default TableHeader;

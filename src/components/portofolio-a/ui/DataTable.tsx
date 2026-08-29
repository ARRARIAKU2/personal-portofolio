"use client";
import { useState } from "react";
import {
  type ColumnDef,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  LuArrowDown,
  LuArrowUp,
  LuChevronLeft,
  LuChevronRight,
  LuChevronsUpDown,
  LuSearch,
  LuSlidersHorizontal,
} from "react-icons/lu";
import { Button } from "./Button";
import { Input } from "./Field";
import { TableSkeleton } from "./Skeleton";

interface DataTableProps<T> {
  data: T[];
  // Value generic is `any`: createColumnHelper produces per-column value types
  // (e.g. ColumnDef<Lead, LeadStatus>) that don't unify under `unknown`.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  loading?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  pageSize?: number;
  toolbar?: React.ReactNode;
  empty?: React.ReactNode;
}

export function DataTable<T>({
  data,
  columns,
  loading,
  searchable = true,
  searchPlaceholder = "Search…",
  pageSize = 10,
  toolbar,
  empty,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [showCols, setShowCols] = useState(false);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, columnVisibility },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  });

  const rows = table.getRowModel().rows;

  return (
    <div className="flex flex-col">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          {searchable && (
            <div className="relative">
              <LuSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
              <Input
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full pl-9 sm:w-64"
                aria-label="Search table"
              />
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {toolbar}
          <div className="relative">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowCols((s) => !s)}
              aria-expanded={showCols}
            >
              <LuSlidersHorizontal className="size-4" />
              <span className="hidden sm:inline">Columns</span>
            </Button>
            {showCols && (
              <>
                <button
                  className="fixed inset-0 z-10 cursor-default"
                  aria-hidden
                  tabIndex={-1}
                  onClick={() => setShowCols(false)}
                />
                <div className="absolute right-0 z-20 mt-1 w-52 rounded-xl border border-zinc-200 bg-white p-1.5 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
                  {table
                    .getAllLeafColumns()
                    .filter((c) => c.getCanHide())
                    .map((col) => (
                      <label
                        key={col.id}
                        className="flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                      >
                        <input
                          type="checkbox"
                          checked={col.getIsVisible()}
                          onChange={col.getToggleVisibilityHandler()}
                          className="accent-emerald-600"
                        />
                        <span className="capitalize">
                          {col.id.replace(/_/g, " ")}
                        </span>
                      </label>
                    ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border-t border-zinc-200 dark:border-zinc-800">
        {loading ? (
          <TableSkeleton />
        ) : rows.length === 0 ? (
          empty ?? (
            <p className="p-10 text-center text-sm text-zinc-500">
              No results found.
            </p>
          )
        ) : (
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id} className="text-left">
                  {hg.headers.map((header) => {
                    const canSort = header.column.getCanSort();
                    const sorted = header.column.getIsSorted();
                    return (
                      <th
                        key={header.id}
                        className="whitespace-nowrap px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400"
                      >
                        {header.isPlaceholder ? null : canSort ? (
                          <button
                            className="inline-flex items-center gap-1 hover:text-zinc-800 dark:hover:text-zinc-100"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {sorted === "asc" ? (
                              <LuArrowUp className="size-3.5" />
                            ) : sorted === "desc" ? (
                              <LuArrowDown className="size-3.5" />
                            ) : (
                              <LuChevronsUpDown className="size-3.5 opacity-40" />
                            )}
                          </button>
                        ) : (
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/70">
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="whitespace-nowrap px-4 py-3 text-zinc-700 dark:text-zinc-200"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {!loading && rows.length > 0 && (
        <div className="flex items-center justify-between gap-4 border-t border-zinc-200 px-4 py-3 text-sm dark:border-zinc-800">
          <span className="text-zinc-500 dark:text-zinc-400">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()} · {table.getFilteredRowModel().rows.length}{" "}
            rows
          </span>
          <div className="flex items-center gap-1.5">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              aria-label="Previous page"
            >
              <LuChevronLeft className="size-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              aria-label="Next page"
            >
              <LuChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

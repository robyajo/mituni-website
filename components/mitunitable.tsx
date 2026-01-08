"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMemo, useState, useCallback } from "react";
import { EllipsisIcon, Settings2, FunnelX } from "lucide-react";
import {
  type ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { DataGrid, DataGridContainer } from "@/components/ui/data-grid";
import { DataGridColumnVisibility } from "@/components/ui/data-grid-column-visibility";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { DataGridTable } from "@/components/ui/data-grid-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import {
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from "@/components/ui/data-grid-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { DataGridTableDnd } from "@/components/ui/data-grid-table-dnd";
import { mituniData } from "@/config/data";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

// Row actions component
function RowActions({ row: _row }: { row: any }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-end">
          <Button
            size="icon"
            variant="ghost"
            className="shadow-none"
            aria-label="Edit item"
          >
            <EllipsisIcon size={16} aria-hidden="true" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span>Edit</span>
            <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Duplicate</span>
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span>Archive</span>
            <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <span>Delete</span>
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export interface MituniData {
  iD: number;
  name: string;
  status: "Active" | "Inactive" | "Pending";
  value: number;
}
export default function MituniTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnOrder, setColumnOrder] = useState<string[]>([
    "select",
    "iD",
    "name",
    "status",
    "value",
    "actions",
  ]);
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex);
      });
    }
  }, []);
  const columnHelper = createColumnHelper<MituniData>();
  const columns = [
    columnHelper.display({
      id: "select",
      header: () => <DataGridTableRowSelectAll />,
      cell: ({ row }) => <DataGridTableRowSelect row={row} />,
      size: 35,
      enableSorting: false,
      enableHiding: false,
      enableResizing: false,
      enablePinning: false,
    }),
    columnHelper.accessor("iD", {
      header: ({ column }) => (
        <DataGridColumnHeader title="ID" column={column} />
      ),
      cell: ({ getValue }) => <div>{getValue().toLocaleString()}</div>,
      size: 180,
      enableSorting: true,
      enableHiding: true,
      enableResizing: true,
      enablePinning: true,
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue) return true;
        const [min, max] = filterValue;
        const value = Number(row.getValue(columnId));
        return value >= min && value <= max;
      },
    }),
    columnHelper.accessor("name", {
      header: ({ column }) => (
        <DataGridColumnHeader title="Name" column={column} />
      ),
      cell: ({ getValue }) => (
        <div className="font-medium">{String(getValue() || "")}</div>
      ),
      size: 180,
      enableSorting: true,
      enableHiding: true,
      enableResizing: true,
      enablePinning: true,
    }),
    columnHelper.accessor("status", {
      header: ({ column }) => (
        <DataGridColumnHeader title="Status" column={column} />
      ),
      cell: ({ getValue }) => <div>{String(getValue() || "")}</div>,
      size: 180,
      enableSorting: true,
      enableHiding: true,
      enableResizing: true,
      enablePinning: true,
    }),
    columnHelper.accessor("value", {
      header: ({ column }) => (
        <DataGridColumnHeader title="Value" column={column} />
      ),
      cell: ({ getValue }) => <div>{getValue().toLocaleString()}</div>,
      size: 180,
      enableSorting: true,
      enableHiding: true,
      enableResizing: true,
      enablePinning: true,
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue) return true;
        const [min, max] = filterValue;
        const value = Number(row.getValue(columnId));
        return value >= min && value <= max;
      },
    }),
    columnHelper.display({
      id: "actions",
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }) => <RowActions row={row} />,
      size: 60,
      enableHiding: false,
      enableSorting: false,
      enableResizing: false,
      enablePinning: false,
    }),
  ];
  const table = useReactTable({
    columns,
    data: mituniData,
    pageCount: Math.ceil((mituniData?.length || 0) / pagination.pageSize),
    state: {
      pagination,
      sorting,
      columnOrder,
    },
    enableSorting: true,
    enableSortingRemoval: false,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <DataGrid
      table={table}
      recordCount={mituniData?.length || 0}
      tableLayout={{
        rowBorder: true,
        rowRounded: true,
        stripped: true,
        headerBorder: true,
        headerSticky: true,
        width: "fixed",
        columnsDraggable: true,
        columnsMovable: true,
        columnsResizable: true,
        columnsPinnable: true,
        columnsVisibility: true,
      }}
    >
      <div className="w-full space-y-2.5">
        <div>
          <Input
            className="peer min-w-60 h-8"
            value={(table.getState().globalFilter ?? "") as string}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            placeholder="Search all columns..."
            type="text"
            aria-label="Search all columns"
          />
        </div>

        <div className="flex items-center gap-3">
          <DataGridColumnVisibility
            table={table}
            trigger={
              <Button variant="outline">
                <Settings2 />
                View
              </Button>
            }
          />
        </div>

        <DataGridContainer>
          <ScrollArea>
            <DataGridTableDnd handleDragEnd={handleDragEnd} />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </DataGridContainer>
        <DataGridPagination />
      </div>
    </DataGrid>
  );
}

"use client";

// ** import components
import { DataTable } from "@/components/data-table/data-table";

// ** import schema
import { Order } from "./schema";

// ** import columns
import { getColumns } from "./components/columns";

// ** import utils
import { useExportConfig } from "./utils/config";
// import { useOrdersData } from "./utils/data-fetching";
import { ordersData } from "@/config/data";

// ** import api

// ** import toolbar
import { ToolbarOptions } from "./components/toolbar-options";

async function fetchLocalOrdersData(params: {
  page: number;
  limit: number;
  search: string;
  from_date: string;
  to_date: string;
  sort_by: string;
  sort_order: string;
}) {
  const { page, limit, search, from_date, to_date, sort_by, sort_order } =
    params;

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  let filtered = [...ordersData];

  // Search
  if (search) {
    const lowerSearch = search.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.order_id.toLowerCase().includes(lowerSearch) ||
        item.customer_name.toLowerCase().includes(lowerSearch)
    );
  }

  // Date range
  if (from_date && to_date) {
    const from = new Date(from_date).getTime();
    const to = new Date(to_date).getTime();
    filtered = filtered.filter((item) => {
      const date = new Date(item.order_date).getTime();
      return date >= from && date <= to;
    });
  }

  // Sort
  if (sort_by) {
    filtered.sort((a, b) => {
      const aVal = (a as any)[sort_by];
      const bVal = (b as any)[sort_by];
      if (aVal < bVal) return sort_order === "asc" ? -1 : 1;
      if (aVal > bVal) return sort_order === "asc" ? 1 : -1;
      return 0;
    });
  }

  // Pagination
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filtered.slice(start, end);

  return {
    success: true,
    data: paginated,
    pagination: {
      total_items: filtered.length,
      page,
      limit,
      total_pages: Math.ceil(filtered.length / limit),
    },
  };
}

// Add isQueryHook = false to satisfy TypeScript union type in DataTable
(fetchLocalOrdersData as any).isQueryHook = false;

export function OrdersDataTable() {
  return (
    <DataTable<Order, unknown>
      getColumns={getColumns}
      fetchDataFn={fetchLocalOrdersData as any}
      // fetchByIdsFn={fetchOrdersByIds}
      idField="id"
      pageSizeOptions={[10, 20, 30, 50]}
      exportConfig={useExportConfig()}
      renderToolbarContent={({
        selectedRows,
        allSelectedIds,
        totalSelectedCount,
        resetSelection,
      }) => {
        // Separate parent orders from child items
        const parentOrders = selectedRows.filter(
          (row) => !row.item_id || row.item_id === undefined
        );
        const childItems = selectedRows.filter(
          (row) => row.item_id !== undefined && row.item_id !== null
        );

        // Get parent order_ids to check if child's parent is also selected
        const parentOrderIds = new Set(
          parentOrders.map((order) => order.order_id)
        );

        // Filter out child items whose parent order is already selected
        const independentChildItems = childItems.filter(
          (child) => !parentOrderIds.has(child.order_id)
        );

        return (
          <ToolbarOptions
            selectedOrders={selectedRows.map((row) => ({
              id: row.id,
              order_id: row.order_id,
              item_id: row.item_id,
            }))}
            parentOrders={parentOrders.map((row) => ({
              id: row.id,
              order_id: row.order_id,
            }))}
            independentChildItems={independentChildItems.map((row) => ({
              id: row.id,
              order_id: row.order_id,
              item_id: row.item_id,
            }))}
            allSelectedIds={allSelectedIds}
            totalSelectedCount={totalSelectedCount}
            resetSelection={resetSelection}
          />
        );
      }}
      subRowsConfig={{
        enabled: true,
        mode: "same-columns", // "same-columns" | "nested"
        hideExpandIconWhenSingle: false,
        autoExpandSingle: false,
        indentSize: 24,
      }}
      config={{
        enableRowSelection: true,
        enableToolbar: true,
        enablePagination: true,
        enableColumnResizing: true,
        columnResizingTableId: "orders-table",
        defaultSortBy: "order_id",
      }}
    />
  );
}

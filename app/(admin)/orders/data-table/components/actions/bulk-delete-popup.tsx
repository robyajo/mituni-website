"use client";

// ** import core packages
import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

// ** import components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type DeleteMode = "orders" | "items" | null;

interface BulkDeletePopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedOrders: { id: number; order_id: string; item_id?: number }[];
  parentOrders: { id: number; order_id: string }[];
  independentChildItems: { id: number; order_id: string; item_id?: number }[];
  allSelectedIds?: (string | number)[];
  totalSelectedCount?: number;
  deleteMode: DeleteMode;
  resetSelection: () => void;
}

export function BulkDeletePopup({
  open,
  onOpenChange,
  // selectedOrders: _selectedOrders,
  parentOrders,
  independentChildItems,
  // allSelectedIds: _allSelectedIds,
  // totalSelectedCount: _totalSelectedCount,
  deleteMode,
  resetSelection,
}: BulkDeletePopupProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);

      toast.success(
        deleteMode === "orders"
          ? "Orders deleted successfully"
          : "Items deleted successfully"
      );
      onOpenChange(false);

      if (resetSelection) {
        resetSelection();
      }

      router.refresh();
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete selected orders/items"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getDialogTitle = () => {
    if (deleteMode === "orders") {
      return parentOrders.length === 1 ? "Delete Order" : "Delete Orders";
    } else {
      return independentChildItems.length === 1
        ? "Delete Item"
        : "Delete Items";
    }
  };

  const getDialogDescription = () => {
    const count =
      deleteMode === "orders"
        ? parentOrders.length
        : independentChildItems.length;

    if (deleteMode === "orders") {
      if (count === 1) {
        return (
          <>
            Are you sure you want to delete order{" "}
            <strong>{parentOrders[0].order_id}</strong>?
            <span className="block mt-2 text-destructive">
              This will delete the entire order and all its items.
            </span>
            <span className="block mt-1">This action cannot be undone.</span>
          </>
        );
      } else {
        return (
          <>
            Are you sure you want to delete <strong>{count} orders</strong>?
            <span className="block mt-2 text-destructive">
              This will delete all selected orders and their items.
            </span>
            <span className="block mt-1">This action cannot be undone.</span>
          </>
        );
      }
    } else {
      if (count === 1) {
        return (
          <>
            Are you sure you want to delete this item?
            <span className="block mt-1">This action cannot be undone.</span>
          </>
        );
      } else {
        return (
          <>
            Are you sure you want to delete <strong>{count} items</strong>?
            <span className="block mt-1">This action cannot be undone.</span>
          </>
        );
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
          <DialogDescription>{getDialogDescription()}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

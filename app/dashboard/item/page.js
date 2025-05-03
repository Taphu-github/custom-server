"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader } from "lucide-react";

import ItemTableList from "./_components/itemTableList";
import ItemTableHeader from "./_components/itemTableHeader";
import ItemFilterInputs from "./_components/itemTableFilters";
import ItemFormDialog from "./_components/itemTableDialog";
import ItemPaginationControls from "./_components/itemTablePagination";
import { useItems } from "./_components/useItem";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ItemPage() {
  const {
    items,
    loading,
    error,
    currentPage,
    totalPages,
    filters,
    setCurrentPage,
    setFilters,
    deleteItem,
    addItem,
    updateItem,
  } = useItems();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [formValues, setFormValues] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleAddClick = () => {
    setFormValues({});
    setFormMode("create");
    setIsDialogOpen(true);
  };

  const handleEditClick = (item) => {
    setFormValues({
      ...item,
      purchase_date: item.purchase_date.split("T")[0],
      // category: item.category._id,
    });
    setFormMode("edit");
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteItem(itemToDelete._id);
      toast.success("Item deleted successfully");
      setItemToDelete(null);
    } catch (err) {
      toast.error("Failed to delete item", {
        description: err.message,
      });
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      if (formMode === "edit") {
        const res = await fetch(`/api/item/${formValues._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, _id: formValues._id }),
        });
        const updated = await res.json();
        if (!res.ok) {
          throw new Error(updated.error || "Failed to update item");
        }
        updateItem(updated);
        toast.success("Item updated successfully");
      } else {
        const res = await fetch("/api/item", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const created = await res.json();
        if (!res.ok) {
          throw new Error(created.error || "Failed to create Item");
        }
        addItem(created);
        toast.success("Device addon added successfully");
      }
      setIsDialogOpen(false);
      setFormValues(null);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-[70vh]">
          <Loader className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="w-full h-full flex justify-center pt-10">
          <div className="space-y-4 w-[90%]">
            <ItemTableHeader onAdd={handleAddClick} />
            <ItemFilterInputs
              filters={filters}
              onFilterChange={(key, value) => {
                setFilters((prev) => ({ ...prev, [key]: value }));
                setCurrentPage(1);
              }}
            />
            <ItemTableList
              items={items}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
              currentPage={currentPage}
            />
            <AlertDialog
              open={!!itemToDelete}
              onOpenChange={(open) => !open && setItemToDelete(null)}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the item
                    <span className="font-semibold"> {itemToDelete?.name}</span>
                    .
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleConfirmDelete}
                    className="bg-primary text-destructive-foreground hover:bg-primary/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <ItemPaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
            <ItemFormDialog
              isOpen={isDialogOpen}
              onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) {
                  setFormValues(null);
                  setFormMode("create");
                }
              }}
              mode={formMode}
              defaultValues={formValues}
              onSubmit={handleFormSubmit}
            />
          </div>
        </div>
      )}
    </>
  );
}

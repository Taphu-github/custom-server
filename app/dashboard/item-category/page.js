"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader } from "lucide-react";

import ItemCategoryTableList from "./_components/itemCategoryTableList";
import ItemCategoryTableHeader from "./_components/itemCategoryTableHeader";
import ItemCategoryFilterInputs from "./_components/itemCategoryTableFilters";
import ItemCategoryFormDialog from "./_components/itemCategoryTableDialog";
import ItemCategoryPaginationControls from "./_components/itemCategoryTablePagination";
import { useItemCategories } from "./_components/useItemCategoryTable";
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

export default function ItemCategoryPage() {
  const {
    itemCategories,
    loading,
    error,
    currentPage,
    totalPages,
    filters,
    setCurrentPage,
    setFilters,
    deleteItemCategory,
    addItemCategory,
    updateItemCategory,
  } = useItemCategories();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [formValues, setFormValues] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const handleAddClick = () => {
    setFormValues(null);
    setFormMode("create");
    setIsDialogOpen(true);
  };

  const handleEditClick = (category) => {
    setFormValues(category);
    setFormMode("edit");
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteItemCategory(categoryToDelete._id);
      toast.success("Category deleted successfully");
      setCategoryToDelete(null);
    } catch (err) {
      toast.error("Failed to delete category", { description: err.message });
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      if (formMode === "edit") {
        const res = await fetch(`/api/item_categories/${formValues._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, _id: formValues._id }),
        });
        const updated = await res.json();
        if (!res.ok) {
          throw new Error(updated.error || "Failed to update category");
        }
        updateItemCategory(updated);
        toast.success("Category updated successfully");
      } else {
        const res = await fetch("/api/item_categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const created = await res.json();
        if (!res.ok) {
          throw new Error(created.error || "Failed to create category");
        }
        addItemCategory(created);
        toast.success("Category added successfully");
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
            <ItemCategoryTableHeader onAdd={handleAddClick} />
            <ItemCategoryFilterInputs
              filters={filters}
              onFilterChange={(key, value) => {
                setFilters((prev) => ({ ...prev, [key]: value }));
                setCurrentPage(1);
              }}
            />
            <ItemCategoryTableList
              categories={itemCategories}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
              currentPage={currentPage}
            />
            <AlertDialog
              open={!!categoryToDelete}
              onOpenChange={(open) => !open && setCategoryToDelete(null)}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the category
                    <span className="font-semibold">
                      {" "}
                      {categoryToDelete?.name}
                    </span>
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
            <ItemCategoryPaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
            <ItemCategoryFormDialog
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

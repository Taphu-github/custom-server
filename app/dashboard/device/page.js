"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader } from "lucide-react";

import DeviceTableList from "./_components/DeviceTableList";
import DeviceTableHeader from "./_components/DeviceTableHeader";
import DeviceFilterInputs from "./_components/DeviceTableFilters";
import DeviceFormDialog from "./_components/DeviceTableDialog";
import DevicePaginationControls from "./_components/DeviceTablePagination";
import { useDevices } from "./_components/useDeviceTable";
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

export default function DevicePage() {
  const {
    devices,
    loading,
    error,
    currentPage,
    totalPages,
    filters,
    setCurrentPage,
    setFilters,
    deleteDevice,
    addDevice,
    updateDevice,
  } = useDevices();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [formValues, setFormValues] = useState(null);
  const [deviceToDelete, setDeviceToDelete] = useState(null);

  const handleAddClick = () => {
    setFormValues(null);
    setFormMode("create");
    setIsDialogOpen(true);
  };

  const handleEditClick = (device) => {
    setFormValues(device);
    setFormMode("edit");
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (device) => {
    setDeviceToDelete(device);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteDevice(deviceToDelete._id);
      toast.success("Device deleted successfully");
      setDeviceToDelete(null);
    } catch (err) {
      toast.error("Failed to delete device", { description: err.message });
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      if (formMode === "edit") {
        const res = await fetch(`/api/devices/${formValues._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, _id: formValues._id }),
        });
        const updated = await res.json();
        if (!res.ok) {
          // Add this check
          throw new Error(updated.message || "Failed to update device");
        }
        updateDevice(updated.device);
        toast.success("Device updated successfully");
      } else {
        const res = await fetch("/api/devices", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const created = await res.json();
        if (!res.ok) {
          // Add this check
          throw new Error(created.message || "Failed to create device");
        }
        addDevice(created.systemowner);
        toast.success("Device added successfully");
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
            <DeviceTableHeader onAdd={handleAddClick} />
            <DeviceFilterInputs
              filters={filters}
              onFilterChange={(key, value) => {
                setFilters((prev) => ({ ...prev, [key]: value }));
                setCurrentPage(1);
              }}
            />
            <DeviceTableList
              devices={devices}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
              currentPage={currentPage}
            />
            <AlertDialog
              open={!!deviceToDelete}
              onOpenChange={(open) => !open && setDeviceToDelete(null)}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the device
                    <span className="font-semibold">
                      {" "}
                      {deviceToDelete?.d_id}
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
            <DevicePaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
            <DeviceFormDialog
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

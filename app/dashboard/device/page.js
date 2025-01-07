"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PencilIcon, TrashIcon, PlusIcon, Loader } from "lucide-react";

export default function DeviceTable() {
  const [devices, setDevices] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDevice, setCurrentDevice] = useState(null);
  const [deviceToDelete, setDeviceToDelete] = useState(null); // Track device to delete
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false); // Track AlertDialog state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/devices")
      .then((res) => res.json())
      .then((data) => {
        setDevices(data.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleOpenDialog = (device = null) => {
    setCurrentDevice(device);
    setIsDialogOpen(true);
  };

  const handleDeleteDevice = async (id) => {
    try {
      const response = await fetch(`/api/devices/${id}`, { method: "DELETE" });
      if (response.ok) {
        setDevices((prevDevices) => prevDevices.filter((device) => device._id !== id));
        setDeviceToDelete(null);
        setIsAlertDialogOpen(false);
      } else {
        console.error("Failed to delete device");
      }
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  };

  const handleOpenDeleteDialog = (device) => {
    setDeviceToDelete(device);
    setIsAlertDialogOpen(true);
  };

  return (
    <div className="w-full h-full">
      {loading ? (
        <div className="flex flex-col justify-center items-center w-full h-screen">
          <Loader className="animate-spin text-4xl" />
        </div>
      ) : (
        <div className="flex justify-center items-start w-full h-full mt-20">
          <div className="space-y-4 w-[90%]">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Devices</h2>
              <Button onClick={() => handleOpenDialog()}>
                <PlusIcon className="mr-2 h-4 w-4" /> Add Device
              </Button>
            </div>

            {/* AlertDialog for Deletion */}
            {deviceToDelete && (
              <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the device{" "}
                      <strong>{deviceToDelete.d_name}</strong>.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDeleteDevice(deviceToDelete._id)}>
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            <Table>
              <TableCaption>A list of devices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Device Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>MAC Address</TableHead>
                  <TableHead>Installed Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {devices?.map((device) => (
                  <TableRow key={device.d_id}>
                    <TableCell>{device.d_id}</TableCell>
                    <TableCell>{device.d_name}</TableCell>
                    <TableCell>{device.location}</TableCell>
                    <TableCell>{device.mac_address}</TableCell>
                    <TableCell>
                      {new Date(device.installed_date).toISOString().split("T")[0]}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(device)}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDeleteDialog(device)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}

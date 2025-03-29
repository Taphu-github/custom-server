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
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  Loader,
  Eye,
  EyeOff,
} from "lucide-react";

export default function DeviceTable() {
  const [devices, setDevices] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
        setDevices((prevDevices) =>
          prevDevices.filter((device) => device._id !== id)
        );
        setDeviceToDelete(null);
        setIsAlertDialogOpen(false);
      } else {
        console.error("Failed to delete device");
      }
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const deviceData = Object.fromEntries(formData.entries());

    // Optional: Ensure the installed_date is properly formatted
    if (deviceData.installed_date) {
      deviceData.installed_date = new Date(deviceData.installed_date);
    }

    try {
      let response;

      if (currentDevice) {
        // Edit existing device
        response = await fetch(
          `/api/devices/${currentDevice._id || currentDevice._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(deviceData),
          }
        );
        if (response.ok) {
          const updatedDevice = await response.json();
          setDevices(
            devices.map((device) =>
              device._id === currentDevice._id ? updatedDevice.device : device
            )
          );
        } else {
          throw new Error("Failed to update device");
        }
      } else {
        // Add new device
        response = await fetch("/api/devices", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(deviceData),
        });

        if (response.ok) {
          const newDevice = await response.json();
          console.log("device data", newDevice);

          setDevices([...devices, newDevice.systemowner]);
        } else {
          throw new Error("Failed to add device");
        }
      }

      setIsDialogOpen(false);
      setCurrentDevice(null);
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error processing your request. Please try again.");
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
        <div className="flex justify-center items-start w-full h-full pt-10">
          <div className="space-y-4 w-[90%]">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Devices</h2>
              <Button onClick={() => handleOpenDialog()}>
                <PlusIcon className="mr-2 h-4 w-4" /> Add Device
              </Button>
            </div>

            {/* AlertDialog for Deletion */}
            {deviceToDelete && (
              <AlertDialog
                open={isAlertDialogOpen}
                onOpenChange={setIsAlertDialogOpen}
              >
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the device <strong>{deviceToDelete.d_name}</strong>.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDeleteDevice(deviceToDelete._id)}
                    >
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {currentDevice ? "Edit Device" : "Add New Device"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="d_id">Device ID</Label>
                      <Input
                        id="d_id"
                        name="d_id"
                        defaultValue={currentDevice?.d_id}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="d_name">Device Name</Label>
                      <Input
                        id="d_name"
                        name="d_name"
                        defaultValue={currentDevice?.d_name}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          placeholder="Enter your password"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        defaultValue={currentDevice?.location}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mac_address">MAC Address</Label>
                      <Input
                        id="mac_address"
                        name="mac_address"
                        defaultValue={currentDevice?.mac_address}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="installed_date">Installed Date</Label>
                      <Input
                        id="installed_date"
                        name="installed_date"
                        type="date"
                        defaultValue={
                          currentDevice?.installed_date
                            ? new Date(currentDevice.installed_date)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit">Save</Button>
                </form>
              </DialogContent>
            </Dialog>

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
                      {
                        new Date(device.installed_date)
                          .toISOString()
                          .split("T")[0]
                      }
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

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
import { PencilIcon, TrashIcon, PlusIcon, Loader } from "lucide-react";
import { Alert } from "@/components/ui/alert";

export default function DeviceTable() {
  const [devices, setDevices] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDevice, setCurrentDevice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/devices")
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Inspect the fetched data
        setDevices(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  

  const handleOpenDialog = (device = null) => {
    setCurrentDevice(device);
    setIsDialogOpen(true);
  };

  const handleDeleteDevice = async (id) => {
    alert('deleting the data');
    try {
        const response = await fetch(`/api/devices/${id}`, { method: 'DELETE' });
        if (response.status === 200) {
            setDevices(devices.filter(device => device._id !== id)); // Ensure `d_id` is used here
        } else {
            console.error('Failed to delete device');
        }
    } catch (error) {
        console.error('Error deleting device:', error);
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
        console.log('device data',newDevice)

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

  return (
    <div className="w-full h-full ">
    {loading ?
    <div className="flex flex-col justify-center items-center w-full h-screen">
    <Loader className="animate-spin text-4xl"/>
    </div>:
    <div className="flex justify-center items-start w-full h-full mt-20">
      <div className="space-y-4 w-[90%] ">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Devices</h2>
          <Button onClick={() => handleOpenDialog()}>
            <PlusIcon className="mr-2 h-4 w-4" /> Add Device
          </Button>
        </div>
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
                {!currentDevice && (
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      defaultValue={currentDevice?.password}
                      required
                    />
                  </div>
                )}
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
              <Button type="submit">
                Save
              </Button>
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
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteDevice(device._id)}>
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>}
    </div>
  );
}

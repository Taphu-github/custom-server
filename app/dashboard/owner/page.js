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
import { Badge } from "@/components/ui/badge";
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
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { PencilIcon, TrashIcon, PlusIcon, Loader } from "lucide-react";

export default function DeviceOwnerTable() {
  const [deviceOwners, setDeviceOwners] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [devices, setDevices] = useState([]);
  const [currentDeviceOwner, setCurrentDeviceOwner] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedDeviceIds, setSelectedDeviceIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/owners")
      .then((res) => res.json())
      .then((data) => {
        setDeviceOwners(data.data);
        setLoading(false);
      })
      .catch(console.error);

    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.data))
      .catch(console.error);

    fetch("/api/devices")
      .then((res) => res.json())
      .then((data) => setDevices(data.data))
      .catch(console.error);
  }, []);

  const handleOpenDialog = (deviceOwner = null) => {
    setCurrentDeviceOwner(deviceOwner);
    setSelectedUserId(deviceOwner?.user_id || "");
    setSelectedDeviceIds(deviceOwner?.d_ids || []);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const deviceOwnerData = {
      user_id: selectedUserId,
      d_id: selectedDeviceIds,
      date_of_own: event.target.date_of_own.value,
    };

    try {
      let response;

      // if (currentDeviceOwner) {
      //   // Edit existing device owner
      //   response = await fetch(`/api/owners/${currentDeviceOwner._id}`, {
      //     method: "PATCH",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(deviceOwnerData),
      //   });
      // } else {
      // Add new device owner
      response = await fetch("/api/device_owners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deviceOwnerData),
      });
      // }

      if (response.ok) {
        const updatedData = await response.json();
        fetch("/api/owners")
          .then((res) => res.json())
          .then((data) => {
            setDeviceOwners(data.data);
            setLoading(false);
          })
          .catch(console.error);
      } else {
        throw new Error("Failed to save device owner");
      }

      setIsDialogOpen(false);
      setCurrentDeviceOwner(null);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save device owner.");
    }
  };

  const handleDeleteOwner = async (id) => {
    try {
      const response = await fetch(`/api/owners/${id}`, { method: "DELETE" });
      if (response.ok) {
        setDeviceOwners((prev) => prev.filter((owner) => owner._id !== id));
      } else {
        throw new Error("Failed to delete device owner");
      }
    } catch (error) {
      console.error("Error deleting owner:", error);
    }
  };

  return (
    <div className="w-full h-screen ">
      {loading ? (
        <div className="flex flex-col justify-center items-center w-full h-screen">
          <Loader className="animate-spin text-4xl" />
        </div>
      ) : (
        <div className="flex justify-center items-start w-full h-full pt-10">
          <div className="space-y-4 w-[90%]">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Device Owners</h2>
              <Button onClick={() => handleOpenDialog()}>
                <PlusIcon className="mr-2 h-4 w-4" /> Add Device Owner
              </Button>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {currentDeviceOwner
                      ? "Edit Device Owner"
                      : "Add Device Owner"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="user_id">User</Label>
                    <Select
                      id="user_id"
                      value={selectedUserId}
                      onValueChange={setSelectedUserId}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select User" />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.user_id} value={user.user_id}>
                            {user.username}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="d_ids">Devices</Label>
                    <Select
                      id="d_ids"
                      multiple
                      value={selectedDeviceIds}
                      onValueChange={setSelectedDeviceIds}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Devices" />
                      </SelectTrigger>
                      <SelectContent>
                        {devices.map((device) => (
                          <SelectItem key={device._id} value={device.d_id}>
                            {device.d_id}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date_of_own">Date of Ownership</Label>
                    <Input
                      id="date_of_own"
                      name="date_of_own"
                      type="date"
                      defaultValue={
                        currentDeviceOwner?.date_of_own
                          ? new Date(currentDeviceOwner.date_of_own)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      required
                    />
                  </div>

                  <Button type="submit">Save</Button>
                </form>
              </DialogContent>
            </Dialog>

            <Table>
              <TableCaption>A list of device owners.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Devices</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deviceOwners.map((owner, index) => (
                  <TableRow key={owner._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{owner.user_name}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {owner.d_ids.map((id) => (
                          <Badge key={id}>{id}</Badge>
                        ))}
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

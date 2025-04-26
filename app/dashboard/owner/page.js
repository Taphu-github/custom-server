"use client";

import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PlusIcon, Loader } from "lucide-react";

export default function DeviceOwnerTable() {
  const [deviceOwners, setDeviceOwners] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [devices, setDevices] = useState([]);
  const [currentDeviceOwner, setCurrentDeviceOwner] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({ d_id: "", user_name: "" });
  const [viewMode, setViewMode] = useState("user"); // 'user' or 'device'

  useEffect(() => {
    if (!isDialogOpen) {
      setCurrentDeviceOwner(null);
      setSelectedUserId("");
      setSelectedDeviceId("");
    }
  }, [isDialogOpen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams({
          page: currentPage.toString(),
          limit: "10",
          ...filters,
        });

        console.log("Query Params:", queryParams.toString());

        const [ownersRes, usersRes, devicesRes] = await Promise.all([
          fetch(`/api/device_owners?${queryParams}`),
          fetch("/api/users/all"),
          fetch("/api/devices/all"),
        ]);

        if (!ownersRes.ok || !usersRes.ok || !devicesRes.ok) {
          throw new Error("One or more API calls failed.");
        }

        const ownersData = await ownersRes.json();
        const usersData = await usersRes.json();
        const devicesData = await devicesRes.json();

        setDeviceOwners(ownersData?.data || []);
        setTotalPages(ownersData?.pagination?.totalPages || 1);
        setUsers(usersData?.data || []);
        setDevices(devicesData?.data || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load data", {
          description: error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      fetchData();
    }
  }, [currentPage, filters, loading]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
    // setLoading(true);
  };

  // Optional: apply client-side filters
  const filteredDeviceOwners = deviceOwners
    .map((owner) => {
      const filteredDevices = owner.d_ids.filter((device) =>
        device.d_id.toLowerCase().includes(filters.d_id.toLowerCase())
      );

      return {
        ...owner,
        d_ids: filteredDevices,
      };
    })
    .filter((owner) => {
      // only include users who still have at least one matching device
      const matchUsername = filters.user_name
        ? owner.user_name
            .toLowerCase()
            .includes(filters.user_name.toLowerCase())
        : true;
      return owner.d_ids.length > 0 && matchUsername;
    });

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/device_owners/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Failed to delete device owner.");
      }

      toast.success("Device unassigned successfully", {
        description: resData.message,
      });

      setLoading(true);

      setFilters({ ...filters }); // trigger refetch
    } catch (error) {
      toast.error("Failed to unassign device", {
        description: error.message, // ✅ display actual message from backend
      });
    }
  };

  // Update the Button onClick in the TooltipContent
  <Button
    variant="destructive"
    size="sm"
    onClick={() => handleDelete(owner, device)}
  >
    Unassign Device
  </Button>;

  const handleOpenDialog = (deviceOwner = null) => {
    setCurrentDeviceOwner(deviceOwner);

    const matchedUser = users.find(
      (u) => u.username === deviceOwner?.user_name
    );
    setSelectedUserId(matchedUser?.user_id || "");
    setSelectedDeviceId(deviceOwner?.d_id || "");
    setIsDialogOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const selectedUser = users.find((user) => user.user_id === selectedUserId);

    const deviceOwnerData = {
      user_id: selectedUserId,
      d_id: selectedDeviceId,
      date_of_own: event.target.date_of_own.value,
      remarks: event.target.remarks.value,
    };

    try {
      const response = await fetch("/api/device_owners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deviceOwnerData),
      });

      const resData = await response.json();

      if (!response.ok) {
        const errorData = await response.json();
        toast.error("Failed to save device owner", {
          description: errorData.message || "Failed to save device owner.",
        });
        throw new Error(resData.message || "Failed to save device owner.");
      }

      toast.success("Device owner added successfully", {
        description: `Device ${selectedDeviceId} assigned.`,
      });

      setIsDialogOpen(false);
      setCurrentDeviceOwner(null);
      setSelectedUserId("");
      setSelectedDeviceId("");
      setLoading(true);
      setFilters({ ...filters }); // trigger refetch
    } catch (error) {
      toast.error("Failed to add device owner", {
        description: error.message,
      });
    }
  };
  // Transform data based on view mode
  const transformedData = useMemo(() => {
    if (viewMode === "user") {
      return filteredDeviceOwners;
    } else {
      // Transform to device-centric view
      const deviceMap = new Map();
      deviceOwners.forEach((owner) => {
        owner.d_ids.forEach((device) => {
          if (!deviceMap.has(device.d_id)) {
            deviceMap.set(device.d_id, {
              d_id: device.d_id,
              users: [
                {
                  user_name: owner.user_name,
                  date_of_own: device.date_of_own,
                  remarks: device.remarks,
                  _id: device._id,
                },
              ],
            });
          } else {
            deviceMap.get(device.d_id).users.push({
              user_name: owner.user_name,
              date_of_own: device.date_of_own,
              remarks: device.remarks,
              _id: device._id,
            });
          }
        });
      });

      return Array.from(deviceMap.values());
    }
  }, [viewMode, deviceOwners, filteredDeviceOwners]);

  return (
    <div className="w-full min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center w-full min-h-screen">
          <Loader className="animate-spin text-4xl" />
        </div>
      ) : (
        <div className="flex justify-center items-start w-full h-full pt-10">
          <div className="space-y-4 w-[90%]">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold">Device Owners</h2>
                <div className="flex items-center space-x-2 bg-secondary/20 p-2 rounded-lg">
                  <Button
                    className="font-medium text-sm"
                    variant={viewMode === "user" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("user")}
                  >
                    User View
                  </Button>
                  <Button
                    className="font-medium text-sm"
                    variant={viewMode === "device" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("device")}
                  >
                    Device View
                  </Button>
                </div>
              </div>
              <Button onClick={() => handleOpenDialog()}>
                <PlusIcon className="mr-2 h-4 w-4" /> Add Device Owner
              </Button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input
                placeholder="Enter Device ID"
                value={filters.d_id}
                onChange={(e) => handleFilterChange("d_id", e.target.value)}
              />
              <Input
                placeholder="Enter Username"
                value={filters.user_name}
                onChange={(e) =>
                  handleFilterChange("user_name", e.target.value)
                }
              />
            </div>

            {/* Dialog Form */}
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
                      onValueChange={(val) => setSelectedUserId(String(val))}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select User" />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem
                            key={user.user_id}
                            value={String(user.user_id)}
                          >
                            {user.username}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="d_id">Device</Label>
                    <Select
                      id="d_id"
                      value={selectedDeviceId}
                      onValueChange={setSelectedDeviceId}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Device" />
                      </SelectTrigger>
                      <SelectContent>
                        {devices.map((device) => (
                          <SelectItem key={device._id} value={device.d_id}>
                            {device.d_id + ", " + device.d_name}
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
                      max={new Date().toISOString().split("T")[0]}
                      type="date"
                      defaultValue={
                        currentDeviceOwner?.date_of_own?.split("T")[0] || ""
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="remarks">Remarks</Label>
                    <textarea
                      id="remarks"
                      name="remarks"
                      className="w-full border border-gray-300 rounded-md p-2"
                      defaultValue={currentDeviceOwner?.remarks || ""}
                      rows={3}
                      required
                    />
                  </div>

                  <Button type="submit">Save</Button>
                </form>
              </DialogContent>
            </Dialog>

            {/* Device Owner Table */}
            {Array.isArray(transformedData) && transformedData.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No {viewMode === "user" ? "device owners" : "devices"} found.
              </p>
            ) : (
              <Table>
                <TableCaption>
                  A list of {viewMode === "user" ? "device owners" : "devices"}.
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    {viewMode === "user" ? (
                      <>
                        <TableHead>User</TableHead>
                        <TableHead>Devices</TableHead>
                      </>
                    ) : (
                      <>
                        <TableHead>Device ID</TableHead>
                        <TableHead>Users</TableHead>
                      </>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transformedData.map((item, index) => (
                    <TableRow
                      key={viewMode === "user" ? item.user_id : item.d_id}
                    >
                      <TableCell>{index + 1}</TableCell>
                      {viewMode === "user" ? (
                        <>
                          <TableCell>{item.user_name}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {Array.isArray(item.d_ids) &&
                                item.d_ids.map((device) => (
                                  // <TooltipProvider key={device.d_id}>
                                  <Popover key={device.d_id}>
                                    <PopoverTrigger>
                                      <Badge>{device.d_id}</Badge>
                                    </PopoverTrigger>
                                    <PopoverContent className="bg-primary/95 text-white p-4">
                                      <p className="font-bold text-md">
                                        Date of Ownership
                                      </p>
                                      <p>
                                        {new Date(
                                          device.date_of_own
                                        ).toDateString()}
                                      </p>
                                      <p className="font-bold text-md">
                                        Remarks
                                      </p>
                                      <p>{device.remarks}</p>
                                      <p
                                        className="font-bold bg-white text-primary hover:text-white border-[1px] hover:bg-primary transition-all ease-in-out hover:border-white text-md p-1 mt-2 rounded-sm"
                                        onClick={() => handleDelete(device._id)}
                                      >
                                        Unassign Device
                                      </p>
                                    </PopoverContent>
                                  </Popover>
                                ))}
                            </div>
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell>{item.d_id}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {item.users.map((user) => (
                                <TooltipProvider key={user._id}>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Badge variant="outline">
                                        {user.user_name}
                                      </Badge>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-primary/95 text-white p-4">
                                      <p className="font-bold text-md">
                                        Date of Ownership
                                      </p>
                                      <p>
                                        {new Date(
                                          user.date_of_own
                                        ).toDateString()}
                                      </p>
                                      <p className="font-bold text-md">
                                        Remarks
                                      </p>
                                      <p>{user.remarks}</p>
                                      <p
                                        className="font-bold bg-white text-primary hover:text-white border-[1px] hover:bg-primary transition-all ease-in-out hover:border-white text-md p-1 mt-2 rounded-sm cursor-pointer"
                                        onClick={() => handleDelete(user._id)}
                                      >
                                        Unassign User
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              ))}
                            </div>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-center space-x-4 mt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

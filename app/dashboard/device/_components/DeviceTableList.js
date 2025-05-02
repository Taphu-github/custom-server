"use client";

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
import { PencilIcon, TrashIcon } from "lucide-react";

export default function DeviceTableList({
  devices = [],
  currentPage,
  onEdit,
  onDelete,
}) {
  return (
    <Table>
      <TableCaption>A list of devices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Sl.No</TableHead>
          <TableHead>ID</TableHead>
          <TableHead>Device Name</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>MAC Address</TableHead>
          <TableHead>Installed Date</TableHead>
          <TableHead>Remarks</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {devices?.map((device, index) => (
          <TableRow key={device._id || device.d_id}>
            <TableCell>{index + 1 + (currentPage - 1) * 10}</TableCell>
            <TableCell>{device.d_id}</TableCell>
            <TableCell>{device.d_name}</TableCell>
            <TableCell>{device.location}</TableCell>
            <TableCell>{device.mac_address}</TableCell>
            <TableCell>
              {new Date(device.installed_date).toISOString().split("T")[0]}
            </TableCell>
            <TableCell>{device.remarks}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(device)}
                >
                  <PencilIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(device)}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

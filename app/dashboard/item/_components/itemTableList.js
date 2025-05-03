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
import { Badge } from "@/components/ui/badge";
import { PencilIcon, TrashIcon } from "lucide-react";

export default function ItemTableList({
  items = [],
  currentPage,
  onEdit,
  onDelete,
}) {
  return (
    <Table>
      <TableCaption>A list of device addons.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Sl.No</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Unique ID</TableHead>
          <TableHead>Model Number</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Purchase Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items?.map((addon, index) => (
          <TableRow key={addon._id}>
            <TableCell>{index + 1 + (currentPage - 1) * 10}</TableCell>
            <TableCell>{addon.name}</TableCell>
            <TableCell>{addon.unique_identifier}</TableCell>
            <TableCell>{addon.model_number}</TableCell>
            <TableCell>{addon.category?.name}</TableCell>
            <TableCell>
              {new Date(addon.purchase_date).toISOString().split("T")[0]}
            </TableCell>
            <TableCell>
              <Badge
                className={`${
                  addon.used === "yes" ? "bg-primary" : "bg-red-600"
                } text-white mr-2`}
              >
                Used
              </Badge>
              <Badge
                className={`${
                  addon.functional === "yes" ? "bg-primary" : "bg-red-600"
                } text-white`}
              >
                Functional
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(addon)}
                >
                  <PencilIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(addon)}
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

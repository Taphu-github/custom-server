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

export default function ItemCategoryTableList({
  categories = [],
  currentPage,
  onEdit,
  onDelete,
}) {
  return (
    <Table>
      <TableCaption>A list of item categories.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Sl.No</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Remarks</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories?.map((category, index) => (
          <TableRow key={category._id}>
            <TableCell>{index + 1 + (currentPage - 1) * 10}</TableCell>
            <TableCell>{category.name}</TableCell>
            <TableCell>{category.remarks || "-"}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(category)}
                >
                  <PencilIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(category)}
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

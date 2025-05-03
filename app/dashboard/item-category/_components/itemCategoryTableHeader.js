import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function ItemCategoryTableHeader({ onAdd }) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Item Categories</h2>
      <Button onClick={onAdd}>
        <PlusIcon className="mr-2 h-4 w-4" /> Add Category
      </Button>
    </div>
  );
}

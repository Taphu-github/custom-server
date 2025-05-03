import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function ItemTableHeader({ onAdd }) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Items</h2>
      <Button onClick={onAdd}>
        <PlusIcon className="mr-2 h-4 w-4" /> Add Items
      </Button>
    </div>
  );
}

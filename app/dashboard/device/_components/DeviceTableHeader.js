// components/DeviceTableHeader.jsx

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function DeviceTableHeader({ onAdd }) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Devices</h2>
      <Button onClick={onAdd}>
        <PlusIcon className="mr-2 h-4 w-4" /> Add Device
      </Button>
    </div>
  );
}

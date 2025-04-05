"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function FilterBar({ filters, onChange }) {
  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="relative">
        <Search className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search by name..."
          name="full_name"
          value={filters.full_name}
          onChange={onChange}
          className="pl-8"
        />
      </div>
      <Input
        placeholder="Search by CID..."
        name="cid"
        value={filters.cid}
        onChange={onChange}
      />
      <Input
        placeholder="Search by phone..."
        name="phone"
        value={filters.phone}
        onChange={onChange}
      />
      <Input
        placeholder="Search by dzongkhag..."
        name="dzongkhag"
        value={filters.dzongkhag}
        onChange={onChange}
      />
      <Input
        placeholder="Search by gewog..."
        name="gewog"
        value={filters.gewog}
        onChange={onChange}
      />
    </div>
  );
}

import { Input } from "@/components/ui/input";

export default function DeviceFilterInputs({ filters, onFilterChange }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Input
        placeholder="Filter by Device ID"
        value={filters.d_id}
        onChange={(e) => onFilterChange("d_id", e.target.value)}
      />
      <Input
        placeholder="Filter by Device Name"
        value={filters.d_name}
        onChange={(e) => onFilterChange("d_name", e.target.value)}
      />
      <Input
        placeholder="Filter by Location"
        value={filters.location}
        onChange={(e) => onFilterChange("location", e.target.value)}
      />
    </div>
  );
}

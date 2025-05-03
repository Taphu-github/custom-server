import { Input } from "@/components/ui/input";

export default function ItemCategoryFilterInputs({ filters, onFilterChange }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <Input
        placeholder="Filter by Name"
        value={filters.name}
        onChange={(e) => onFilterChange("name", e.target.value)}
      />
    </div>
  );
}

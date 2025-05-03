import { Input } from "@/components/ui/input";

export default function ItemFilterInputs({ filters, onFilterChange }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Input
        placeholder="Filter by Unique Identifier"
        value={filters.unique_identifier}
        onChange={(e) => onFilterChange("unique_identifier", e.target.value)}
      />
      <Input
        placeholder="Filter by Model Number"
        value={filters.model_number}
        onChange={(e) => onFilterChange("model_number", e.target.value)}
      />
      <Input
        type="date"
        placeholder="Filter by Purchase Date"
        value={filters.purchase_date}
        onChange={(e) => onFilterChange("purchase_date", e.target.value)}
      />
    </div>
  );
}

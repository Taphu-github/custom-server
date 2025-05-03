import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ThreeStateSwitch } from "@/components/ui/three-state-switch";

export default function ItemFilterInputs({ filters, onFilterChange }) {
  // const handleThreeStateSwitch = (name, state) => {
  //   console.log(state);
  //   const value = state === "true" ? "" : state === "none" ? "No" : "Yes";
  //   onFilterChange(name, value);
  // };

  return (
    <div className="grid grid-cols-5 gap-4 items-start">
      <Input
        placeholder="Filter by Unique Identifier"
        value={filters.unique_identifier || ""}
        onChange={(e) => onFilterChange("unique_identifier", e.target.value)}
      />
      <Input
        placeholder="Filter by Model Number"
        value={filters.model_number || ""}
        onChange={(e) => onFilterChange("model_number", e.target.value)}
      />
      <Input
        type="date"
        placeholder="Filter by Purchase Date"
        value={filters.purchase_date || ""}
        onChange={(e) => onFilterChange("purchase_date", e.target.value)}
      />

      {/* <div className="flex flex-col justify-center items-center"> */}
      <div className="flex justify-center items-center gap-4 h-full">
        <div className="flex flex-col justify-center items-center gap-2">
          {/* <label htmlFor="functional" className="text-sm cursor-pointer">
            Functional
          </label> */}
          <ThreeStateSwitch
            id="functional"
            label="Functional"
            defaultValue=""
            onValueChange={(value) => {
              onFilterChange("functional", value);
            }}
          />
          {/* <Checkbox
            id="functional"
            checked={filters.functional === "yes"} // convert string to boolean
            onCheckedChange={(checked) =>
              onFilterChange("functional", checked ? "yes" : "")
            }
          /> */}
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          {/* <Checkbox
            id="used"
            checked={filters.used === "yes"} // convert string to boolean
            onCheckedChange={(checked) =>
              onFilterChange("used", checked ? "yes" : "")
            }
          /> */}
          {/* <label htmlFor="used" className="text-sm cursor-pointer">
            Used
          </label> */}
          <ThreeStateSwitch
            id="used"
            label="Used"
            defaultValue=""
            onValueChange={(value) => {
              onFilterChange("used", value);
            }}
          />
        </div>
      </div>
      {/* </div> */}

      <div className="flex justify-center">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            onFilterChange("unique_identifier", "");
            onFilterChange("model_number", "");
            onFilterChange("purchase_date", "");
            onFilterChange("functional", "");
            onFilterChange("used", "");
          }}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
}

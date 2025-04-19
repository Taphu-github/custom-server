import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

export default function RecentIntrusionsTable({ recentIntrusions }) {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-green-700 mt-1 mb-2">
        Recent Intrusions
      </h2>

      <Card className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] font-semibold">#</TableHead>
              <TableHead className="font-semibold">Animal</TableHead>
              <TableHead className="font-semibold">Time</TableHead>
              <TableHead className="font-semibold">Animal Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentIntrusions?.map((intrusion, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium text-green-700">
                  {intrusion.animal}
                </TableCell>
                <TableCell className="text-green-600">
                  {intrusion.enroach_time}
                </TableCell>
                <TableCell className="text-green-600">
                  {intrusion.animal_count}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

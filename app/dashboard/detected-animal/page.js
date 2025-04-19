"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

export default function DetectedAnimalTable() {
  const [detectedAnimals, setDetectedAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    deviceId: "",
    animalName: "",
    encroachDate: "",
    encroachTime: "",
  });

  const itemsPerPage = 13;
  const animal_name = [
    "Bear",
    "Boar",
    "Cattle",
    "Deer",
    "Elephant",
    "Horse",
    "Monkey",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams({
          page: currentPage.toString(),
          limit: itemsPerPage.toString(),
          ...filters,
        });

        const res = await fetch(`/api/detected_animals?${queryParams}`);
        const data = await res.json();
        setDetectedAnimals(data.data || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters, currentPage]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "all" ? "" : value,
    }));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader className="animate-spin text-4xl" />
        </div>
      ) : (
        <div className="flex flex-col items-center w-full p-10 space-y-4">
          <h2 className="text-2xl font-bold">Detected Animals</h2>
          <div className="grid grid-cols-4 gap-4 w-full">
            <Input
              placeholder="Device ID"
              value={filters.deviceId}
              onChange={(e) => handleFilterChange("deviceId", e.target.value)}
            />
            <Select
              value={filters.animalName}
              onValueChange={(value) => handleFilterChange("animalName", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter Animal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {animal_name.map((name, i) => (
                  <SelectItem key={i} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="date"
              value={filters.encroachDate}
              onChange={(e) =>
                handleFilterChange("encroachDate", e.target.value)
              }
            />
            <Input
              type="time"
              value={filters.encroachTime}
              onChange={(e) =>
                handleFilterChange("encroachTime", e.target.value)
              }
            />
          </div>

          <Table>
            <TableCaption>Filtered detected animals</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Device ID</TableHead>
                <TableHead>Animal Name</TableHead>
                <TableHead>Encroach Date</TableHead>
                <TableHead>Encroach Time</TableHead>
                <TableHead>Animal Count</TableHead>
                <TableHead>Category ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {detectedAnimals.map((animal) => (
                <TableRow key={animal._id}>
                  <TableCell>{animal.d_id}</TableCell>
                  <TableCell>{animal_name[animal.a_c_id]}</TableCell>
                  <TableCell>{animal.enroach_date.split("T")[0]}</TableCell>
                  <TableCell>{animal.enroach_time}</TableCell>
                  <TableCell>{animal.animal_count}</TableCell>
                  <TableCell>{animal.a_c_id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center space-x-4 mt-4">
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

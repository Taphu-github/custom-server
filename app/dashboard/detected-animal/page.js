"use client";

import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
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
import { toast } from "sonner";

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

  // const downloadCSV = async () => {
  //   try {
  //     const queryParams = new URLSearchParams({
  //       ...filters,
  //     });

  //     const res = await fetch(`/api/detected_animals/all?${queryParams}`);
  //     const result = await res.json();

  //     const data = result.data || [];

  //     if (!data.length) {
  //       alert("No data found for the selected filters.");
  //       return;
  //     }

  //     const headers = [
  //       "Device ID",
  //       "Animal Name",
  //       "Encroach Date",
  //       "Encroach Time",
  //       "Animal Count",
  //       "Category ID",
  //     ];

  //     const rows = data.map((animal) => [
  //       animal.d_id,
  //       animal_name[animal.a_c_id],
  //       handleDateFormat(animal.enroach_date),
  //       animal.enroach_time,
  //       animal.animal_count,
  //       animal.a_c_id,
  //     ]);

  //     const csvContent =
  //       "data:text/csv;charset=utf-8," +
  //       [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

  //     const encodedUri = encodeURI(csvContent);
  //     const link = document.createElement("a");
  //     link.setAttribute("href", encodedUri);
  //     link.setAttribute("download", "detected_animals_report.csv");
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } catch (err) {
  //     console.error("Failed to generate CSV:", err);
  //     toast.info("Failed to generate CSV.");
  //   }
  // };

  const downloadExcel = async () => {
    try {
      const queryParams = new URLSearchParams({
        ...filters,
      });

      const res = await fetch(`/api/detected_animals/all?${queryParams}`);
      const result = await res.json();

      const data = result.data || [];

      if (!data.length) {
        alert("No data found for the selected filters.");
        return;
      }

      const rows = data.map((animal) => ({
        "Device ID": animal.d_id,
        "Animal Name": animal_name[animal.a_c_id],
        "Encroach Date": handleDateFormat(animal.enroach_date),
        "Encroach Time": animal.enroach_time,
        "Animal Count": animal.animal_count,
        "Category ID": animal.a_c_id,
      }));

      const worksheet = XLSX.utils.json_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Detected Animals");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "detected_animals_report.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Failed to generate Excel:", err);
      alert("Failed to generate Excel file.");
    }
  };

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

  const handleDateFormat = (dateString) => {
    const date = new Date(dateString).toUTCString().split(" ");
    return `${date[1]} ${date[2]} ${date[3]}`;
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
          <div className="grid grid-cols-5 gap-4 w-full">
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
            <Button variant="default" onClick={downloadExcel}>
              Generate Report
            </Button>
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
                  <TableCell>{handleDateFormat(animal.enroach_date)}</TableCell>
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

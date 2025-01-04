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
import { Loader } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function DetectedAnimalTable() {
  const [detectedAnimals, setDetectedAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 14;

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
    fetch("/api/detected_animals")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setDetectedAnimals(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(detectedAnimals.length / itemsPerPage);
  const paginatedAnimals = detectedAnimals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      {loading ? (
        <div className="flex flex-col justify-center items-center w-full h-screen">
          <Loader className="animate-spin text-4xl" />
        </div>
      ) : (
        <div className="flex flex-col justify-between items-center w-full h-full p-10 space-y-4">
          <div className="w-full space-y-4">
            <h2 className="text-2xl font-bold">Detected Animals</h2>
            <Table>
              <TableCaption>A list of detected animals.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Device ID</TableHead>
                  <TableHead>Animal Name</TableHead>
                  <TableHead>Encroach Time</TableHead>
                  <TableHead>Encroach Date</TableHead>
                  <TableHead>Animal Count</TableHead>
                  <TableHead>Animal Category ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedAnimals.map((detectedAnimal) => (
                  <TableRow key={detectedAnimal._id}>
                    <TableCell>{detectedAnimal.d_id}</TableCell>
                    <TableCell>{animal_name[detectedAnimal.a_c_id]}</TableCell>
                    <TableCell>{detectedAnimal.enroach_time}</TableCell>
                    <TableCell>
                      {new Date(detectedAnimal.enroach_date)
                        .toISOString()
                        .split("T")[0]}
                    </TableCell>
                    <TableCell>{detectedAnimal.animal_count}</TableCell>
                    <TableCell>{detectedAnimal.a_c_id}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
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


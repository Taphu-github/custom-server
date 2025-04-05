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
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    deviceId: "",
    animalName: "",
    encroachDate: "",
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
    fetch("/api/detected_animals")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setLoading(false);
        setDetectedAnimals(data.data);
        setFilteredAnimals(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const filtered = detectedAnimals.filter((animal) => {
      const matchesDeviceId = animal.d_id
        .toLowerCase()
        .includes(filters.deviceId.toLowerCase());

      const matchesAnimalName =
        !filters.animalName ||
        animal_name[animal.a_c_id]?.toLowerCase() ===
          filters.animalName.toLowerCase();

      const matchesDate =
        !filters.encroachDate ||
        new Date(animal.enroach_date).toISOString().split("T")[0] ===
          filters.encroachDate;

      return matchesDeviceId && matchesAnimalName && matchesDate;
    });

    setFilteredAnimals(filtered);
    setCurrentPage(1);
  }, [filters, detectedAnimals]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAnimals.length / itemsPerPage);
  const paginatedAnimals = filteredAnimals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // const handleFilterChange = (key, value) => {
  //   setFilters((prev) => ({ ...prev, [key]: value }));
  // };

  // const handleFilterChange = (key, value) => {
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     [key]: value,
  //   }));

  //   if (key === "animalName" && value === "all") {
  //     setFilters((prevFilters) => ({
  //       ...prevFilters,
  //       [key]: "",
  //     }));
  //   }
  // };

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value === "all" ? "" : value,
    }));
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
                  <TableHead>
                    <Input
                      placeholder="Filter Device ID"
                      value={filters.deviceId}
                      onChange={(e) =>
                        handleFilterChange("deviceId", e.target.value)
                      }
                    />
                  </TableHead>
                  <TableHead>
                    <Select
                      value={filters.animalName}
                      onValueChange={(value) =>
                        handleFilterChange("animalName", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Filter Animal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Animals</SelectItem>{" "}
                        {/* Use "all" instead of an empty string */}
                        {animal_name.map((name, index) => (
                          <SelectItem key={index} value={name}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableHead>

                  <TableHead>
                    <Input
                      type="date"
                      value={filters.encroachDate}
                      onChange={(e) =>
                        handleFilterChange("encroachDate", e.target.value)
                      }
                    />
                  </TableHead>
                </TableRow>
                <TableRow>
                  <TableHead>Device ID</TableHead>
                  <TableHead>Animal Name</TableHead>
                  <TableHead>Encroach Date</TableHead>
                  <TableHead>Encroach Time</TableHead>
                  <TableHead>Animal Count</TableHead>
                  <TableHead>Animal Category ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedAnimals.map((detectedAnimal) => (
                  <TableRow key={detectedAnimal._id}>
                    <TableCell>{detectedAnimal.d_id}</TableCell>
                    <TableCell>{animal_name[detectedAnimal.a_c_id]}</TableCell>
                    <TableCell>
                      {
                        new Date(detectedAnimal.enroach_date)
                          .toISOString()
                          .split("T")[0]
                      }
                    </TableCell>
                    <TableCell>{detectedAnimal.enroach_time}</TableCell>
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

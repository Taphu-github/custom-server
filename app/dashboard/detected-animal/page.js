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
import { Loader } from "lucide-react";

export default function DetectedAnimalTable() {
  const [detectedAnimals, setDetectedAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="w-full h-screen">
      {loading ? (
        <div className="flex flex-col justify-center items-center w-full h-screen">
          <Loader className="animate-spin text-4xl" />
        </div>
      ) : (
        <div className="flex justify-center items-start w-full h-full m-10">
          <div className="space-y-4 w-[90%] ">
            <div className="flex justify-start items-center">
              <h2 className="text-2xl font-bold">Detected Animals</h2>
            </div>
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
                {detectedAnimals.map((detectedAnimal) => (
                  <TableRow key={detectedAnimal._id}>
                    <TableCell>{detectedAnimal.d_id}</TableCell>
                    <TableCell>{animal_name[detectedAnimal.a_c_id]}</TableCell>
                    <TableCell>{detectedAnimal.enroach_time}</TableCell>
                    <TableCell>
                      {
                        new Date(detectedAnimal.enroach_date)
                          .toISOString()
                          .split("T")[0]
                      }
                    </TableCell>
                    <TableCell>{detectedAnimal.animal_count}</TableCell>
                    <TableCell>{detectedAnimal.a_c_id}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}

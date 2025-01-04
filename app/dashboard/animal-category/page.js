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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PencilIcon, Loader } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function AnimalCategoryTable() {
  const [animalCategories, setAnimalCategories] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentAnimalCategory, setCurrentAnimalCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch animal categories from the API on mount
  useEffect(() => {
    fetchAnimalCategories();
    setLoading(false);
  }, []);

  const fetchAnimalCategories = async () => {
    try {
      const response = await fetch("/api/animal_categories");
      const data = await response.json();

      // Ensure data is an array
      setAnimalCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching animal categories:", error);
      setAnimalCategories([]); // Fallback to empty array on error
    }
  };

  useEffect(() => {
    fetch("/api/animal_categories")
      .then((res) => res.json())
      .then((data) => {
        setAnimalCategories(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleOpenDialog = (animalCategory = null) => {
    setCurrentAnimalCategory(animalCategory);
    setIsDialogOpen(true);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log('formData', formData);
    const animalCategoryData = Object.fromEntries(formData.entries());

    try {
      if (currentAnimalCategory) {
        // Edit existing animal category
        await fetch(`/api/animal_categories/${currentAnimalCategory._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(animalCategoryData),
        });
        setAnimalCategories(
          animalCategories.map((category) =>
            category.a_c_id === currentAnimalCategory.a_c_id
              ? { ...category, ...animalCategoryData }
              : category
          )
        );
      } else {
        // Add new animal category
        const response = await fetch("/api/animal_categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(animalCategoryData),
        });
        const newCategory = await response.json();
        setAnimalCategories([...animalCategories, newCategory]);
      }
    } catch (error) {
      console.error("Error saving animal category:", error);
    }

    setIsDialogOpen(false);
    setCurrentAnimalCategory(null);
  };

  return (
    <div className="flex justify-center items-start w-full h-full mt-20">
      {loading ? (
        <div className="flex flex-col justify-center items-center w-full h-screen">
          <Loader className="animate-spin text-4xl" />
        </div>
      ) : (
        <div className="space-y-4 w-[90%]">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Animal Categories</h2>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {currentAnimalCategory ? "Edit Category" : "Add New Category"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="animal_name">Animal Name</Label>
                  <Input
                    id="animal_name"
                    name="animal_name"
                    defaultValue={currentAnimalCategory?.animal_name}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="animal_description">Animal Description</Label>
                  <Textarea
                    id="animal_description"
                    name="animal_description"
                    rows="6"
                    defaultValue={currentAnimalCategory?.animal_description}
                    required
                  />
                </div>
                <Button type="submit">
                  Save
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          <Table>
            <TableCaption>A list of animal categories.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Animal Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(animalCategories) &&
                animalCategories.map((category) => (
                  <TableRow key={category.a_c_id}>
                    <TableCell>{category.a_c_id}</TableCell>
                    <TableCell>{category.animal_name}</TableCell>
                    <TableCell>{category.animal_description}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(category)}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

'use client'

import { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Mock data for demonstration
const initialDetectedAnimals = [
  {
    animal_id: '1',
    d_id: '1',
    animal_name: 'Elephant',
    enroach_time: '08:30',
    enroach_date: '2023-10-19',
    animal_count: 3,
    animal_category_id: '1',
  },
  {
    animal_id: '2',
    d_id: '2',
    animal_name: 'Tiger',
    enroach_time: '14:15',
    enroach_date: '2023-09-15',
    animal_count: 1,
    animal_category_id: '2',
  },
  // Add more mock detected animals as needed
]


export default function DetectedAnimalTable() {
  const [detectedAnimals, setDetectedAnimals] = useState(initialDetectedAnimals)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentDetectedAnimal, setCurrentDetectedAnimal] = useState(null)

//   const handleOpenDialog = (detectedAnimal: DetectedAnimal | null = null) => {
//     setCurrentDetectedAnimal(detectedAnimal)
//     setIsDialogOpen(true)
//   }

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const detectedAnimalData = Object.fromEntries(formData.entries())

    if (currentDetectedAnimal) {
      // Edit existing detected animal
      setDetectedAnimals(detectedAnimals.map(animal => animal.animal_id === currentDetectedAnimal.animal_id ? { ...animal, ...detectedAnimalData } : animal))
    } else {
      // Add new detected animal
      setDetectedAnimals([...detectedAnimals, { ...detectedAnimalData, animal_id: (detectedAnimals.length + 1).toString() }])
    }

    setIsDialogOpen(false)
    setCurrentDetectedAnimal(null)
  }

  return (
    <div className='flex justify-center items-start w-full h-full mt-20'>
    <div className="space-y-4 w-[90%] ">
      <div className="flex justify-start items-center">
        <h2 className="text-2xl font-bold">Detected Animals</h2>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentDetectedAnimal ? 'Edit Animal' : 'Add New Animal'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="d_id">Device ID</Label>
                <Input id="d_id" name="d_id" defaultValue={currentDetectedAnimal?.d_id} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="animal_name">Animal Name</Label>
                <Input id="animal_name" name="animal_name" defaultValue={currentDetectedAnimal?.animal_name} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="enroach_time">Encroach Time</Label>
                <Input id="enroach_time" name="enroach_time" type="time" defaultValue={currentDetectedAnimal?.enroach_time} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="enroach_date">Encroach Date</Label>
                <Input id="enroach_date" name="enroach_date" type="date" defaultValue={currentDetectedAnimal?.enroach_date} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="animal_count">Animal Count</Label>
                <Input id="animal_count" name="animal_count" type="number" defaultValue={currentDetectedAnimal?.animal_count?.toString()} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="animal_category_id">Animal Category ID</Label>
                <Input id="animal_category_id" name="animal_category_id" defaultValue={currentDetectedAnimal?.animal_category_id} required />
              </div>
            </div>
            <Button type="submit">{currentDetectedAnimal ? 'Edit Animal' : 'Add Animal'}</Button>
          </form>
        </DialogContent>
      </Dialog>
      <Table>
        <TableCaption>A list of detected animals.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
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
            <TableRow key={detectedAnimal.animal_id}>
              <TableCell>{detectedAnimal.animal_id}</TableCell>
              <TableCell>{detectedAnimal.d_id}</TableCell>
              <TableCell>{detectedAnimal.animal_name}</TableCell>
              <TableCell>{detectedAnimal.enroach_time}</TableCell>
              <TableCell>{detectedAnimal.enroach_date}</TableCell>
              <TableCell>{detectedAnimal.animal_count}</TableCell>
              <TableCell>{detectedAnimal.animal_category_id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </div>
  )
}

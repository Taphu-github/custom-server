'use client'

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PencilIcon, TrashIcon, PlusIcon } from 'lucide-react'

// Mock data for demonstration
const initialDevices = [
  {
    d_id: '1',
    d_name: 'Device 1',
    password: '********',
    location: 'Thimphu',
    mac_address: '00:1B:44:11:3A:B7',
    mqtt_id: 'MQTT123',
    installed_date: '2023-10-01',
  },
  {
    d_id: '2',
    d_name: 'Device 2',
    password: '********',
    location: 'Paro',
    mac_address: '00:1B:44:11:3A:B8',
    mqtt_id: 'MQTT456',
    installed_date: '2023-09-15',
  },
  // Add more mock devices as needed
]



export default function DeviceTable() {
  const [devices, setDevices] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentDevice, setCurrentDevice] = useState(null)

  useEffect(() => {
    fetch("/api/devices")
      .then((res) => res.json())
      .then((data) => {
        setDevices(data.data)

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleOpenDialog = (device = null) => {
    setCurrentDevice(device)
    setIsDialogOpen(true)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const deviceData = Object.fromEntries(formData.entries())

    if (currentDevice) {
      // Edit existing device
      setDevices(devices.map(device => device.d_id === currentDevice.d_id ? { ...device, ...deviceData } : device))
    } else {
      // Add new device
      setDevices([...devices, { ...deviceData, d_id: (devices.length + 1).toString() }])
    }

    setIsDialogOpen(false)
    setCurrentDevice(null)
  }

  return (
    <div className='flex justify-center items-start w-full h-full mt-20'>
    <div className="space-y-4 w-[90%] ">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Devices</h2>
        <Button onClick={() => handleOpenDialog()}><PlusIcon className="mr-2 h-4 w-4" /> Add Device</Button>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentDevice ? 'Edit Device' : 'Add New Device'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="d_name">Device Name</Label>
                <Input id="d_name" name="d_name" defaultValue={currentDevice?.d_name} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" defaultValue={currentDevice?.password} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" defaultValue={currentDevice?.location} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mac_address">MAC Address</Label>
                <Input id="mac_address" name="mac_address" defaultValue={currentDevice?.mac_address} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="installed_date">Installed Date</Label>
                <Input id="installed_date" name="installed_date" type="date" defaultValue={currentDevice?.installed_date} required />
              </div>
            </div>
            <Button type="submit">{currentDevice ? 'Edit Device' : 'Add Device'}</Button>
          </form>
        </DialogContent>
      </Dialog>
      <Table>
        <TableCaption>A list of devices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Device Name</TableHead>
            <TableHead>Password</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>MAC Address</TableHead>
            <TableHead>Installed Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device.d_id}>
              <TableCell>{device.d_id}</TableCell>
              <TableCell>{device.d_name}</TableCell>
              <TableCell>{device.password}</TableCell>
              <TableCell>{device.location}</TableCell>
              <TableCell>{device.mac_address}</TableCell>
              <TableCell>{device.installed_date}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(device)}>
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </div>
  )
}

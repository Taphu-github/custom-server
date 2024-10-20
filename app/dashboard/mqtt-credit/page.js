'use client'

import { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PencilIcon, TrashIcon, PlusIcon } from 'lucide-react'

// Mock data for demonstration
const initialMQTTCredits = [
  {
    mqtt_id: '1',
    user_name: 'mqtt_user1',
    password: '********',
  },
  {
    mqtt_id: '2',
    user_name: 'mqtt_user2',
    password: '********',
  },
  // Add more mock mqtt credits as needed
]



export default function MQTTCreditTable() {
  const [mqttCredits, setMQTTCredits] = useState(initialMQTTCredits)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentMQTTCredit, setCurrentMQTTCredit] = useState(null)

  const handleOpenDialog = (mqttCredit = null) => {
    setCurrentMQTTCredit(mqttCredit)
    setIsDialogOpen(true)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const mqttCreditData = Object.fromEntries(formData.entries())

    if (currentMQTTCredit) {
      // Edit existing mqtt credit
      setMQTTCredits(mqttCredits.map(mqttCredit => mqttCredit.mqtt_id === currentMQTTCredit.mqtt_id ? { ...mqttCredit, ...mqttCreditData } : mqttCredit))
    } else {
      // Add new mqtt credit
      setMQTTCredits([...mqttCredits, { ...mqttCreditData, mqtt_id: (mqttCredits.length + 1).toString() }])
    }

    setIsDialogOpen(false)
    setCurrentMQTTCredit(null)
  }

  return (
    <div className='flex justify-center items-start w-full h-full mt-20'>
    <div className="space-y-4 w-[90%] ">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">MQTT Credentials</h2>
        <Button onClick={() => handleOpenDialog()}><PlusIcon className="mr-2 h-4 w-4" /> Add MQTT Credential</Button>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentMQTTCredit ? 'Edit MQTT Credential' : 'Add New MQTT Credential'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="user_name">Username</Label>
                <Input id="user_name" name="user_name" defaultValue={currentMQTTCredit?.user_name} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" defaultValue={currentMQTTCredit?.password} required />
              </div>
            </div>
            <Button type="submit">{currentMQTTCredit ? 'Edit MQTT Credential' : 'Add MQTT Credential'}</Button>
          </form>
        </DialogContent>
      </Dialog>
      <Table>
        <TableCaption>A list of MQTT Credentials.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Password</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mqttCredits.map((mqttCredit) => (
            <TableRow key={mqttCredit.mqtt_id}>
              <TableCell>{mqttCredit.mqtt_id}</TableCell>
              <TableCell>{mqttCredit.user_name}</TableCell>
              <TableCell>{mqttCredit.password}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(mqttCredit)}>
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

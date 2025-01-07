'use client'

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { PencilIcon, TrashIcon, PlusIcon, Loader } from 'lucide-react'

export default function MQTTCreditTable() {
  const [mqttCredits, setMQTTCredits] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)
  const [currentMQTTCredit, setCurrentMQTTCredit] = useState(null)
  const [mqttCreditToDelete, setMqttCreditToDelete] = useState(null) // Track MQTT credential to delete
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/mqtt_creds")
      .then((res) => res.json())
      .then((data) => {
        setMQTTCredits(data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleOpenDialog = (mqttCredit = null) => {
    setCurrentMQTTCredit(mqttCredit)
    setIsDialogOpen(true)
  }

  const handleOpenDeleteDialog = (mqttCredit) => {
    setMqttCreditToDelete(mqttCredit)
    setIsAlertDialogOpen(true)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const mqttCreditData = Object.fromEntries(formData.entries())

    try {
      let response

      if (currentMQTTCredit) {
        // Edit existing MQTT credit
        response = await fetch(`/api/mqtt_creds/${currentMQTTCredit._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mqttCreditData),
        })

        if (response.ok) {
          const updatedMQTTCredit = await response.json()
          setMQTTCredits(
            mqttCredits.map((mqttCredit) =>
              mqttCredit.mqtt_id === currentMQTTCredit.mqtt_id ? updatedMQTTCredit.data : mqttCredit
            )
          )
        } else {
          throw new Error("Failed to update MQTT credit")
        }
      } else {
        // Add new MQTT credit
        response = await fetch("/api/mqtt_creds", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...mqttCreditData }),
        })

        if (response.ok) {
          const newMQTTCredit = await response.json()
          setMQTTCredits([...mqttCredits, newMQTTCredit.data])
        } else {
          throw new Error("Failed to add MQTT credit")
        }
      }

      setIsDialogOpen(false)
      setCurrentMQTTCredit(null)
    } catch (error) {
      console.error("Error:", error)
      alert("There was an error processing your request. Please try again.")
    }
  }

  const handleDeleteMqttCredentials = async () => {
    try {
      const response = await fetch(`/api/mqtt_creds/${mqttCreditToDelete._id}`, { method: 'DELETE' })
      if (response.ok) {
        setMQTTCredits(mqttCredits.filter(mqttCred => mqttCred._id !== mqttCreditToDelete._id))
        setIsAlertDialogOpen(false)
        setMqttCreditToDelete(null)
      } else {
        console.error('Failed to delete MQTT credential')
      }
    } catch (error) {
      console.error('Error deleting MQTT credential:', error)
    }
  }

  return (
    <div className='flex justify-center items-start w-full h-full mt-10'>
      {loading ? (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <Loader className="animate-spin text-4xl" />
        </div>
      ) : (
        <div className="space-y-4 w-[90%] ">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">MQTT Credentials</h2>
            <Button onClick={() => handleOpenDialog()}><PlusIcon className="mr-2 h-4 w-4" /> Add MQTT Credential</Button>
          </div>

          {/* AlertDialog for Deletion */}
          {mqttCreditToDelete && (
            <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. It will permanently delete the MQTT credential for{" "}
                    <strong>{mqttCreditToDelete.user_name}</strong>.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteMqttCredentials}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{currentMQTTCredit ? 'Edit MQTT Credential' : 'Add New MQTT Credential'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mqtt_id">MQTT ID</Label>
                    <Input id="mqtt_id" name="mqtt_id" defaultValue={currentMQTTCredit?.mqtt_id} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user_name">Username</Label>
                    <Input id="user_name" name="user_name" defaultValue={currentMQTTCredit?.user_name} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" defaultValue={currentMQTTCredit?.password} required />
                  </div>
                </div>
                <Button type="submit">Save</Button>
              </form>
            </DialogContent>
          </Dialog>

          <Table>
            <TableCaption>A list of MQTT Credentials.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>MQTT ID</TableHead>
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
                      <Button variant="ghost" size="icon" onClick={() => handleOpenDeleteDialog(mqttCredit)}>
                        <TrashIcon className="h-4 w-4" />
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
  )
}

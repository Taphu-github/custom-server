'use client'

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PencilIcon, TrashIcon, PlusIcon } from 'lucide-react'

export default function UserTable() {
  const [users, setUsers] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  // Fetch users from API on mount
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users')
      const data = await response.json()
      
      // Ensure `data` is an array, if not, fallback to an empty array
      setUsers(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching users:', error)
      setUsers([])  // Fallback to an empty array on error
    }
  }

  const handleOpenDialog = (user = null) => {
    setCurrentUser(user)
    setIsDialogOpen(true)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const userData = Object.fromEntries(formData.entries())

    try {
      if (currentUser) {
        // Edit existing user
        const response = await fetch(`/api/users/${currentUser.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        })
        if (response.ok) {
          const updatedUser = await response.json()
          setUsers(users.map(user => user.id === currentUser.id ? updatedUser : user))
        } else {
          console.error('Failed to update user')
        }
      } else {
        // Add new user
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        })
        if (response.ok) {
          const newUser = await response.json()
          setUsers([...users, newUser])
        } else {
          console.error('Failed to add user')
        }
      }
    } catch (error) {
      console.error('Error saving user:', error)
    }

    setIsDialogOpen(false)
    setCurrentUser(null)
  }

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`/api/users/${id}`, { method: 'DELETE' })
      if (response.ok) {
        setUsers(users.filter(user => user.id !== id))
      } else {
        console.error('Failed to delete user')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  return (
    <div className='flex justify-center items-start w-full h-full mt-20'>
      <div className="space-y-4 w-[90%]">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Users</h2>
          <Button onClick={() => handleOpenDialog()}><PlusIcon className="mr-2 h-4 w-4" /> Add User</Button>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentUser ? 'Edit User' : 'Add New User'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="user_name">Username</Label>
                  <Input id="user_name" name="user_name" defaultValue={currentUser?.user_name} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" defaultValue={currentUser?.password} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cid">CID</Label>
                  <Input id="cid" name="cid" defaultValue={currentUser?.cid} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" defaultValue={currentUser?.name} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" defaultValue={currentUser?.phone} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date_of_birth">Date of Birth</Label>
                  <Input id="date_of_birth" name="date_of_birth" type="date" defaultValue={currentUser?.date_of_birth} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dzongkhag">Dzongkhag</Label>
                  <Input id="dzongkhag" name="dzongkhag" defaultValue={currentUser?.dzongkhag} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gewog">Gewog</Label>
                  <Input id="gewog" name="gewog" defaultValue={currentUser?.gewog} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="village">Village</Label>
                  <Input id="village" name="village" defaultValue={currentUser?.village} required />
                </div>
              </div>
              <Button type="submit">{currentUser ? 'Edit User' : 'Add User'}</Button>
            </form>
          </DialogContent>
        </Dialog>
        <Table>
          <TableCaption>A list of users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>CID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>Dzongkhag</TableHead>
              <TableHead>Gewog</TableHead>
              <TableHead>Village</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.user_name}</TableCell>
                <TableCell>{user.cid}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.date_of_birth}</TableCell>
                <TableCell>{user.dzongkhag}</TableCell>
                <TableCell>{user.gewog}</TableCell>
                <TableCell>{user.village}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(user)}>
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(user.id)}>
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

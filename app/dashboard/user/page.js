'use client'

import { useState, useEffect} from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PencilIcon, TrashIcon, PlusIcon } from 'lucide-react'

// Mock data for demonstration
const initialUsers = [
  {
    id: '1',
    user_name: 'john_doe',
    password: '********',
    cid: 'CID123',
    name: 'John Doe',
    phone: '1234567890',
    date_of_birth: '1990-01-01',
    dzongkhag: 'Thimphu',
    gewog: 'Kawang',
    village: 'Motithang'
  },
  {
    id: '1',
    user_name: 'john_doe',
    password: '********',
    cid: 'CID123',
    name: 'John Doe',
    phone: '1234567890',
    date_of_birth: '1990-01-01',
    dzongkhag: 'Thimphu',
    gewog: 'Kawang',
    village: 'Motithang'
  },
  {
    id: '1',
    user_name: 'john_doe',
    password: '********',
    cid: 'CID123',
    name: 'John Doe',
    phone: '1234567890',
    date_of_birth: '1990-01-01',
    dzongkhag: 'Thimphu',
    gewog: 'Kawang',
    village: 'Motithang'
  },
  {
    id: '1',
    user_name: 'john_doe',
    password: '********',
    cid: 'CID123',
    name: 'John Doe',
    phone: '1234567890',
    date_of_birth: '1990-01-01',
    dzongkhag: 'Thimphu',
    gewog: 'Kawang',
    village: 'Motithang'
  },
  // Add more mock users as needed
]

// type User = typeof initialUsers[0]

export default function UserTable() {
  const [users, setUsers] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
      fetch("/api/users")
        .then((res) => res.json())
        .then((data) => {
          setUsers(data.data)
  
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(users)
    }, []);

  const handleOpenDialog = (user = null) => {
    setCurrentUser(user)
    setIsDialogOpen(true)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const userData = Object.fromEntries(formData.entries())

    if (currentUser) {
      // Edit existing user
      setUsers(users.map(user => user.id === currentUser.id ? { ...user, ...userData } : user))
    } else {
      // Add new user
      setUsers([...users, { ...userData, id: (users.length + 1).toString() }])
    }

    setIsDialogOpen(false)
    setCurrentUser(null)
  }

  return (
    <div className='flex justify-center items-start w-full h-full mt-20'>
    <div className="space-y-4 w-[90%] ">
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
            <TableHead>Email</TableHead>
            <TableHead>Dzongkhag</TableHead>
            <TableHead>Gewog</TableHead>
            <TableHead>Village</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.user_id}>
              <TableCell>{user.user_id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.cid}</TableCell>
              <TableCell>{user.full_name}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.dzongkhag}</TableCell>
              <TableCell>{user.gewog}</TableCell>
              <TableCell>{user.village}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(user)}>
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
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PencilIcon, TrashIcon, PlusIcon, Loader } from "lucide-react";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(users);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenDialog = (user = null) => {
    setCurrentUser(user);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    console.log("formData", userData);

    try {
      if (currentUser) {
        // Edit existing user
        const response = await fetch(`/api/users/${currentUser._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
        if (response.ok) {
          const updatedUser = await response.json();
          setUsers(
            users.map((user) =>
              user._id === currentUser._id ? updatedUser.data : user
            )
          );
        } else {
          console.error("Failed to update user");
        }
      } else {
        // Add new user
        const response = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
        if (response.ok) {
          const newUser = await response.json();
          setUsers([...users, newUser.data]);
        } else {
          console.error("Failed to add user");
        }
      }
    } catch (error) {
      console.error("Error saving user:", error);
    }

    setIsDialogOpen(false);
    setCurrentUser(null);
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (response.ok) {
        setUsers(users.filter((user) => user._id !== id));
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="flex justify-center items-start w-full h-full mt-20">
      {loading ? (
        <div className="flex flex-col justify-center items-center w-full h-screen">
          <Loader className="animate-spin text-4xl" />
        </div>
      ) : (
        <div className="space-y-4 w-[90%] ">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Users</h2>
            <Button onClick={() => handleOpenDialog()}>
              <PlusIcon className="mr-2 h-4 w-4" /> Add User
            </Button>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {currentUser ? "Edit User" : "Add New User"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      defaultValue={currentUser?.username}
                      required
                    />
                  </div>
                  {!currentUser && (
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        defaultValue={currentUser?.password}
                        required
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="cid">CID</Label>
                    <Input
                      id="cid"
                      name="cid"
                      defaultValue={currentUser?.cid}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Name</Label>
                    <Input
                      id="full_name"
                      name="full_name"
                      defaultValue={currentUser?.full_name}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      defaultValue={currentUser?.email}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      name="role"
                      defaultValue={currentUser?.role || "user"}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      defaultValue={currentUser?.phone}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dzongkhag">Dzongkhag</Label>
                    <Input
                      id="dzongkhag"
                      name="dzongkhag"
                      defaultValue={currentUser?.dzongkhag}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gewog">Gewog</Label>
                    <Input
                      id="gewog"
                      name="gewog"
                      defaultValue={currentUser?.gewog}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="village">Village</Label>
                    <Input
                      id="village"
                      name="village"
                      defaultValue={currentUser?.village}
                      required
                    />
                  </div>
                </div>
                <Button type="submit">
                  Save
                </Button>
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
                <TableHead>Role</TableHead>
                <TableHead>Dzongkhag</TableHead>
                <TableHead>Gewog</TableHead>
                <TableHead>Village</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user.user_id}>
                  <TableCell>{index}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.cid}</TableCell>
                  <TableCell>{user.full_name}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.dzongkhag}</TableCell>
                  <TableCell>{user.gewog}</TableCell>
                  <TableCell>{user.village}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenDialog(user)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteUser(user._id)}
                      >
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
  );
}

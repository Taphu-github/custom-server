"use client";

import { useState, useEffect, useCallback } from "react";
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
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PencilIcon, TrashIcon, PlusIcon, Loader } from "lucide-react";
import UserForm from "./components/UserForm";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function UserTable() {
  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(8);
  const [users, setUsers] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null); // Track user to delete
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    full_name: "",
    dzongkhag: "",
    gewog: "",
    phone: "",
    cid: "",
  });

  // const fetchUsers = () => {
  //   setLoading(true);
  //   // Add filters to URL
  //   const queryParams = new URLSearchParams({
  //     page: currentPage,
  //     limit: itemsPerPage,
  //     ...Object.fromEntries(
  //       Object.entries(filters).filter(([_, value]) => value !== "")
  //     ),
  //   });

  //   fetch(`/api/users?${queryParams}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUsers(data.data);
  //       setTotalPages(data.pagination.totalPages);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setLoading(false);
  //     });
  // };

  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  // Debounced fetch function
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [filters]);

  // Separate effect for fetching data
  useEffect(() => {
    fetchUser();
  }, [currentPage, itemsPerPage, debouncedFilters]);

  const fetchUser = useCallback(() => {
    setLoading(true);
    const queryParams = new URLSearchParams({
      page: currentPage,
      limit: itemsPerPage,
      ...Object.fromEntries(
        Object.entries(debouncedFilters).filter(([_, value]) => value !== "")
      ),
    });

    fetch(`/api/users?${queryParams}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
        setTotalPages(data.pagination.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [currentPage, itemsPerPage, debouncedFilters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add pagination controls
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleOpenDialog = (user = null) => {
    setCurrentUser(user);
    setIsDialogOpen(true);
  };

  const handleOpenDeleteDialog = (user) => {
    setUserToDelete(user);
    setIsAlertDialogOpen(true);
  };

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(`/api/users/${userToDelete._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setUsers(users.filter((user) => user._id !== userToDelete._id));
        setIsAlertDialogOpen(false);
        setUserToDelete(null);
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Add this before the closing Table tag
  return (
    <div className="flex justify-center items-start w-full h-screen pt-10">
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

          {/* Add Filters */}
          <div className="grid grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by name..."
                name="full_name"
                value={filters.full_name}
                onChange={handleFilterChange}
                className="pl-8"
              />
            </div>
            <Input
              placeholder="Search by CID..."
              name="cid"
              value={filters.cid}
              onChange={handleFilterChange}
            />
            <Input
              placeholder="Search by phone..."
              name="phone"
              value={filters.phone}
              onChange={handleFilterChange}
            />
            <Input
              placeholder="Search by dzongkhag..."
              name="dzongkhag"
              value={filters.dzongkhag}
              onChange={handleFilterChange}
            />
            <Input
              placeholder="Search by gewog..."
              name="gewog"
              value={filters.gewog}
              onChange={handleFilterChange}
            />
          </div>

          {/* AlertDialog for Deletion */}
          {userToDelete && (
            <AlertDialog
              open={isAlertDialogOpen}
              onOpenChange={setIsAlertDialogOpen}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. It will permanently delete the
                    user <strong>{userToDelete.username}</strong>.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteUser}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <UserForm
                currentUser={currentUser}
                setIsDialogOpen={setIsDialogOpen}
                onSuccess={fetchUser}
              />
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
                <TableRow key={user._id}>
                  <TableCell>{index + 1}</TableCell>
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
                        onClick={() => handleOpenDeleteDialog(user)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-center w-full space-x-4 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
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

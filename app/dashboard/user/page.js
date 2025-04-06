"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, Loader } from "lucide-react";
import UserForm from "./components/UserForm";
import PaginationControls from "./components/PaginationControls";
import FilterBar from "./components/FilterBar";
import DeleteUserDialog from "./components/DeleteUserDialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import UserTableContent from "./components/UserTable";

export default function UserTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(8);
  const [users, setUsers] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    full_name: "",
    dzongkhag: "",
    gewog: "",
    phone: "",
    cid: "",
  });
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
      setCurrentPage(1); // Reset to page 1 on new filter
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, itemsPerPage, debouncedFilters]);

  const fetchUsers = useCallback(() => {
    setLoading(true);
    const queryParams = new URLSearchParams({
      page: currentPage,
      limit: itemsPerPage,
      ...Object.fromEntries(
        Object.entries(debouncedFilters).filter(([_, v]) => v)
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
        console.error(error);
        setLoading(false);
      });
  }, [currentPage, itemsPerPage, debouncedFilters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
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
      const res = await fetch(`/api/users/${userToDelete._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u._id !== userToDelete._id));
        setIsAlertDialogOpen(false);
        setUserToDelete(null);
      } else {
        alert("Delete failed");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="flex justify-center items-start w-full h-screen pt-10">
      {loading ? (
        <div className="flex flex-col justify-center items-center w-full h-screen">
          <Loader className="animate-spin text-4xl" />
        </div>
      ) : (
        <div className="space-y-4 w-[90%]">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Users</h2>
            <Button onClick={() => handleOpenDialog()}>
              <PlusIcon className="mr-2 h-4 w-4" /> Add User
            </Button>
          </div>

          <FilterBar filters={filters} onChange={handleFilterChange} />

          <DeleteUserDialog
            open={isAlertDialogOpen}
            setOpen={setIsAlertDialogOpen}
            user={userToDelete}
            onDelete={handleDeleteUser}
          />

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <UserForm
                currentUser={currentUser}
                setIsDialogOpen={setIsDialogOpen}
                onSuccess={fetchUsers}
              />
            </DialogContent>
          </Dialog>
          {/* 
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
          </Table> */}
          <UserTableContent
            users={users}
            onEdit={handleOpenDialog}
            onDelete={handleOpenDeleteDialog}
          />

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}

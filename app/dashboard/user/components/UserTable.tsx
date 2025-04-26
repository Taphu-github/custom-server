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
import { PencilIcon, TrashIcon } from "lucide-react";

interface User {
  _id: string;
  user_id: number;
  username: string;
  cid: string;
  full_name: string;
  phone: string;
  email: string;
  role: string;
  dzongkhag: string;
  gewog: string;
  village: string;
}

interface UserTableContentProps {
  users: User[];
  currentPage: number;
  itemsPerPage: number;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export default function UserTableContent({
  users,
  currentPage,
  itemsPerPage,
  onEdit,
  onDelete,
}: UserTableContentProps) {
  return (
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
            <TableCell>
              {index + 1 + (currentPage - 1) * itemsPerPage}
            </TableCell>
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
                  onClick={() => onEdit(user)}
                >
                  <PencilIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(user)}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

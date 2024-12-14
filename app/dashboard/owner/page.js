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
import { Badge } from "@/components/ui/badge"
import { Loader } from "lucide-react";


export default function DeviceOwnerTable() {
  const [deviceOwners, setDeviceOwners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/owners")
      .then((res) => res.json())
      .then((data) => {
        setDeviceOwners(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <div className="w-full h-screen ">
    {loading ?
    <div className="flex flex-col justify-center items-center w-full h-screen">
    <Loader className="animate-spin text-4xl"/>
    </div>:
    <div className="flex justify-center items-start w-full h-full mt-20">
      <div className="space-y-4 w-[90%] ">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Device Owners</h2>
        </div>

        <Table>
          <TableCaption>A list of device owners.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>User ID</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>Device ID(s)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deviceOwners?.map((owner) => (
              <TableRow key={owner._id}>
                <TableCell>{owner.user_id}</TableCell>
                <TableCell>{owner.user_name}</TableCell>
                <TableCell>
                  <div className="flex justify-center items-start flex-col gap-1 ">

                  {owner.d_ids?.map((id, index)=>{
                  return <Badge key={index}>{id}</Badge>
                }
              )}
                  </div>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>}
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";

export function useDevices() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [filters, setFilters] = useState({
    d_name: "",
    d_id: "",
    location: "",
  });

  const fetchDevices = async () => {
    try {
      //   setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: 10,
        ...filters,
      });

      const response = await fetch(`/api/devices?${queryParams}`);
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to fetch devices");
      }

      const data = await response.json();
      setDevices(data.data);
      setTotalPages(data.pagination.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, [currentPage, filters]);

  const deleteDevice = async (id) => {
    const response = await fetch(`/api/devices/${id}`, { method: "DELETE" });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Failed to delete device");
    }
    setDevices((prev) => prev.filter((device) => device._id !== id));
  };

  const updateDevice = (updatedDevice) => {
    setDevices((prev) =>
      prev.map((d) => (d._id === updatedDevice._id ? updatedDevice : d))
    );
  };

  const addDevice = (newDevice) => {
    setDevices((prev) =>
      [...prev, newDevice].sort(
        (a, b) =>
          new Date(b.installed_date).getTime() -
          new Date(a.installed_date).getTime()
      )
    );
  };

  return {
    devices,
    loading,
    error,
    currentPage,
    totalPages,
    filters,
    setCurrentPage,
    setFilters,
    fetchDevices,
    deleteDevice,
    updateDevice,
    addDevice,
  };
}

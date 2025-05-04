"use client";
import { useState, useEffect } from "react";

export function useItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [filters, setFilters] = useState({
    unique_identifier: "",
    model_number: "",
    category: "",
    used: "",
    functional: "",
  });

  const fetchItems = async () => {
    try {
      setError(null);

      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: 10,
        ...filters,
      });

      const response = await fetch(`/api/item?${queryParams}`);
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to fetch items");
      }

      const data = await response.json();
      setItems(data.data);
      setTotalPages(data.pagination.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [currentPage, filters]);

  const deleteItem = async (id) => {
    const response = await fetch(`/api/item/${id}`, { method: "DELETE" });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || "Failed to delete item");
    }
    setItems((prev) => prev.filter((addon) => addon._id !== id));
  };

  const updateItem = (updatedAddon) => {
    setItems((prev) =>
      prev.map((a) => (a._id === updatedAddon._id ? updatedAddon : a))
    );
  };

  const refreshItem = () => {
    // setItems((prev) =>
    //   [...prev, newAddon].sort(
    //     (a, b) =>
    //       new Date(a.purchase_date).getTime()-
    //       new Date(b.purchase_date).getTime()
    //   )
    // );

    fetchItems();
  };

  return {
    items,
    loading,
    error,
    currentPage,
    totalPages,
    filters,
    setCurrentPage,
    setFilters,
    fetchItems,
    deleteItem,
    updateItem,
    refreshItem,
  };
}

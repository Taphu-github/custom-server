"use client";
import { useState, useEffect } from "react";

export function useItemCategories() {
  const [itemCategories, setItemCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [filters, setFilters] = useState({
    name: "",
  });

  const fetchItemCategories = async () => {
    try {
      setError(null);

      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: 10,
        ...filters,
      });

      const response = await fetch(`/api/item_categories?${queryParams}`);
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to fetch categories");
      }

      const data = await response.json();
      setItemCategories(data.data);
      setTotalPages(data.pagination.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItemCategories();
  }, [currentPage, filters]);

  const deleteItemCategory = async (id) => {
    const response = await fetch(`/api/item_categories/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || "Failed to delete category");
    }
    setItemCategories((prev) => prev.filter((cat) => cat._id !== id));
  };

  const updateItemCategory = (updatedCategory) => {
    setItemCategories((prev) =>
      prev.map((c) => (c._id === updatedCategory._id ? updatedCategory : c))
    );
  };

  const addItemCategory = (newCategory) => {
    setItemCategories((prev) => [newCategory, ...prev]);
  };

  return {
    itemCategories,
    loading,
    error,
    currentPage,
    totalPages,
    filters,
    setCurrentPage,
    setFilters,
    fetchItemCategories,
    deleteItemCategory,
    updateItemCategory,
    addItemCategory,
  };
}

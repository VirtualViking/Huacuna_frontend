// src/hooks/useCMS.ts

import { useState, useCallback } from "react";

interface UseCMSOptions<T, R> {
  service: {
    getAll: (filters?: any) => Promise<T[]>;
    getById: (id: number) => Promise<T>;
    create: (data: R) => Promise<T>;
    update: (id: number, data: R) => Promise<T>;
    delete: (id: number) => Promise<void>;
    activate?: (id: number) => Promise<void>;
    deactivate?: (id: number) => Promise<void>;
  };
}

export function useCMS<T extends { id: number }, R>({
  service,
}: UseCMSOptions<T, R>) {
  const [items, setItems] = useState<T[]>([]);
  const [currentItem, setCurrentItem] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const fetchAll = useCallback(
    async (filters?: any) => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await service.getAll(filters);
        setItems(data);
        return data;
      } catch (err: any) {
        const errorMsg = err.message || "Error al cargar datos";
        setError(errorMsg);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [service]
  );

  const fetchById = useCallback(
    async (id: number) => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await service.getById(id);
        setCurrentItem(data);
        return data;
      } catch (err: any) {
        const errorMsg = err.message || "Error al cargar el registro";
        setError(errorMsg);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [service]
  );

  const create = useCallback(
    async (data: R) => {
      setIsLoading(true);
      setError(null);
      try {
        const newItem = await service.create(data);
        setItems((prev) => [newItem, ...prev]);
        return newItem;
      } catch (err: any) {
        const errorMsg = err.message || "Error al crear el registro";
        setError(errorMsg);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [service]
  );

  const update = useCallback(
    async (id: number, data: R) => {
      setIsLoading(true);
      setError(null);
      try {
        const updatedItem = await service.update(id, data);
        setItems((prev) =>
          prev.map((item) => (item.id === id ? updatedItem : item))
        );
        setCurrentItem(updatedItem);
        return updatedItem;
      } catch (err: any) {
        const errorMsg = err.message || "Error al actualizar el registro";
        setError(errorMsg);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [service]
  );

  const remove = useCallback(
    async (id: number) => {
      setIsLoading(true);
      setError(null);
      try {
        await service.delete(id);
        setItems((prev) => prev.filter((item) => item.id !== id));
      } catch (err: any) {
        const errorMsg = err.message || "Error al eliminar el registro";
        setError(errorMsg);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [service]
  );

  const activate = useCallback(
    async (id: number) => {
      if (!service.activate) return;
      
      setIsLoading(true);
      setError(null);
      try {
        await service.activate(id);
        await fetchAll();
      } catch (err: any) {
        const errorMsg = err.message || "Error al activar el registro";
        setError(errorMsg);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [service, fetchAll]
  );

  const deactivate = useCallback(
    async (id: number) => {
      if (!service.deactivate) return;
      
      setIsLoading(true);
      setError(null);
      try {
        await service.deactivate(id);
        await fetchAll();
      } catch (err: any) {
        const errorMsg = err.message || "Error al desactivar el registro";
        setError(errorMsg);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [service, fetchAll]
  );

  return {
    items,
    currentItem,
    isLoading,
    error,
    clearError,
    fetchAll,
    fetchById,
    create,
    update,
    remove,
    activate,
    deactivate,
    setCurrentItem,
  };
}
"use client"

import type React from "react"

import { useState, useCallback } from "react"

export interface Toast {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback(({ ...props }: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: Toast = { id, ...props }

    setToasts((prev) => [...prev, newToast])

    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 5000)

    return {
      id,
      dismiss: () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      update: (updates: Partial<Toast>) =>
        setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t))),
    }
  }, [])

  return {
    toast,
    toasts,
    dismiss: (toastId: string) => setToasts((prev) => prev.filter((t) => t.id !== toastId)),
  }
}

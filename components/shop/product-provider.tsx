"use client"

import { ReactNode } from 'react'

interface ProductProviderProps {
  children: ReactNode
}

export function ProductProvider({ children }: ProductProviderProps) {
  return children
}
'use client'

import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function AppThemeProvider({ children }: Props) {
  return (
    <ThemeProvider
      attribute="data-theme"
      value={{ light: 'light', dark: 'dark' }}
      enableSystem
      defaultTheme="system"
    >
      {children}
    </ThemeProvider>
  )
}

'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const active = theme === 'system' ? systemTheme : theme

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(active === 'dark' ? 'light' : 'dark')}
      className="rounded cursor-pointer py-0.5 px-2 bg-gray-200 dark:text-white dark:bg-gray-700"
    >
      {active === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  )
}

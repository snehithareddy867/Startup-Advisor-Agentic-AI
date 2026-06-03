'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Role = 'founder' | 'investor' | 'mentor'

export type User = {
  name: string
  email: string
  role: Role
}

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, role: Role, name?: string) => User
  signup: (name: string, email: string, role: Role) => User
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEY = 'startupadvisor:user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setUser(JSON.parse(raw))
    } catch {
      // ignore
    }
    setLoading(false)
  }, [])

  const persist = (u: User) => {
    setUser(u)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
    } catch {
      // ignore
    }
  }

  const login = (email: string, role: Role, name?: string) => {
    const u: User = { email, role, name: name || email.split('@')[0].replace(/[._]/g, ' ') }
    persist(u)
    return u
  }

  const signup = (name: string, email: string, role: Role) => {
    const u: User = { name, email, role }
    persist(u)
    return u
  }

  const logout = () => {
    setUser(null)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export const roleHome: Record<Role, string> = {
  founder: '/founder',
  investor: '/investor',
  mentor: '/mentor',
}

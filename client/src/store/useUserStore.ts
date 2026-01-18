import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import Cookies from 'js-cookie'

interface User {
    id: string;
    email: string
}

interface UserStore{
    user: User | null
    access_token: string | null,
    setUser: (user: User | null) => void
    setToken: (token: string | null) => void
    logout: () => void;
}

const cookieStorage = {
  getItem: (name: string): string | null => {
    if (typeof window === 'undefined') return null
    return Cookies.get(name) || null
  },
  setItem: (name: string, value: string): void => {
    if (typeof window === 'undefined') return
    Cookies.set(name, value, { 
      expires: 7, // 7 days
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/'
    })
  },
  removeItem: (name: string): void => {
    if (typeof window === 'undefined') return
    Cookies.remove(name, { path: '/' })
  },
}

export const useUserStore = create(
    persist<UserStore>(
        (set, get) => ({
            user: null,
            access_token: null,

            setUser: (user) => set({user}),
            setToken: (access_token) => {
                set({access_token})
            },
            logout: () =>
                set({
                user: null,
                access_token: null,
                }),
        }),
        {
            name: 'binary:user',
            storage: createJSONStorage(() => cookieStorage),
        }
    )
)
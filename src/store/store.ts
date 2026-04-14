import { User } from "@/types/User"
import { create } from "zustand"



type UserStore = {
  user: User | null
  loading: any
  setUser: (user: User) => void
  setLoading: (loading: any) => void
  logout: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
loading:null,
  setUser: (user) => set({ user }),

setLoading: (loading) => set({loading}),

  logout: () => set({ user: null }),
}))
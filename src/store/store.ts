import { User } from "@/types/User"
import { create } from "zustand"



type UserStore = {
  user: User | null
  setUser: (user: User) => void
  logout: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),


  logout: () => set({ user: null }),
}))
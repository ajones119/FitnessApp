import { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';

export type AuthStore = { 
    user: User | null,
    session: Session | null,
    setUser: (state: User | null) => void,
    setSession: (state: Session | null) => void,
}

const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    session: null,
    setUser: (state: User | null) => set({ user: state }),
    setSession: (state: Session | null) => set({ session: state }),
}))

export default useAuthStore;
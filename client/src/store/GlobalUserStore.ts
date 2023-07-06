import { create } from "zustand";

interface UserI {
  id: number;
  username: string;
  name: string;
  picture: string;
  user_id: number;
}

interface GlobalUserStoreState {
  userID: number;
  currentUser: UserI | null;
  updateUserID: (id: number) => void;

  updateWholeUser: (user: UserI) => void;
}

export const useGloblalUserStore = create<GlobalUserStoreState>((set) => ({
  userID: 12,
  currentUser: null,

  updateUserID: (id) => set((state) => ({ ...state, userID: id })),
  updateWholeUser: (user) => set((state) => ({ ...state, currentUser: user })),
}));

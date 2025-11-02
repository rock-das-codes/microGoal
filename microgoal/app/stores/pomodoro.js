import { create } from 'zustand'
import { getGoals } from '../goalService'
const usePomo = create((set) => ({
  pomo: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}))


const useGoal = create((set) => ({

  goal: '',
  updateGoal: (newGoal) => set({ goal: newGoal }),
  completedGoals: [],
  addCompletedGoal: (goal) =>
    set((state) => ({ completedGoals: [...state.completedGoals, goal] })),
  gaveupGoals: [],
  addGaveupGoal: (goal) =>
    set((state) => ({ gaveupGoals: [...state.gaveupGoals, goal] })),
  id: null,
  updateId: (newId) => set({ id: newId }),
}))
const useTime = create((set) => ({
  time: "",
  updateTime: (newTime) => set({ time: newTime }),
}))


export  { useGoal, usePomo, useTime };
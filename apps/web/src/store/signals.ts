'use client'
import { create } from 'zustand'

const ALL_PLATFORMS = ['REDDIT', 'TELEGRAM', 'X', 'FACEBOOK', 'LINKEDIN']

interface SignalFilters {
  platforms: string[]
  minIntent: number
  minFit: number
  keywords: string[]
}

const defaultFilters: SignalFilters = {
  platforms: ['REDDIT', 'TELEGRAM'],
  minIntent: 70,
  minFit: 80,
  keywords: ['"alternative to"', '"need recommendations"', '"getting banned"'],
}

interface SignalStore {
  filters: SignalFilters
  selectedSignalId: string | null
  togglePlatform: (platform: string) => void
  setMinIntent: (v: number) => void
  setMinFit: (v: number) => void
  addKeyword: (kw: string) => void
  removeKeyword: (kw: string) => void
  setSelectedSignal: (id: string | null) => void
  resetFilters: () => void
}

export const useSignalStore = create<SignalStore>((set) => ({
  filters: defaultFilters,
  selectedSignalId: null,

  togglePlatform: (platform) =>
    set((s) => ({
      filters: {
        ...s.filters,
        platforms: s.filters.platforms.includes(platform)
          ? s.filters.platforms.filter((p) => p !== platform)
          : [...s.filters.platforms, platform],
      },
    })),

  setMinIntent: (v) => set((s) => ({ filters: { ...s.filters, minIntent: v } })),
  setMinFit: (v) => set((s) => ({ filters: { ...s.filters, minFit: v } })),

  addKeyword: (kw) =>
    set((s) => ({
      filters: { ...s.filters, keywords: [...s.filters.keywords, kw] },
    })),

  removeKeyword: (kw) =>
    set((s) => ({
      filters: { ...s.filters, keywords: s.filters.keywords.filter((k) => k !== kw) },
    })),

  setSelectedSignal: (id) => set({ selectedSignalId: id }),
  resetFilters: () => set({ filters: defaultFilters }),
}))

export { ALL_PLATFORMS }

'use client'
import { create } from 'zustand'

type Tone = 'Helpful' | 'Expert' | 'Casual'

interface EngagementStore {
  selectedDraftId: number | null
  activeTone: Tone
  composeText: string
  selectDraft: (id: number, text: string) => void
  setTone: (tone: Tone) => void
  setComposeText: (text: string) => void
  reset: () => void
}

export const useEngagementStore = create<EngagementStore>((set) => ({
  selectedDraftId: 1,
  activeTone: 'Helpful',
  composeText: '',

  selectDraft: (id, text) => set({ selectedDraftId: id, composeText: text }),
  setTone: (tone) => set({ activeTone: tone }),
  setComposeText: (text) => set({ composeText: text }),
  reset: () => set({ selectedDraftId: null, composeText: '' }),
}))

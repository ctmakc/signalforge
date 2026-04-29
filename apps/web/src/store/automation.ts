'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AutoMode = 'manual' | 'assisted' | 'autopilot'

export interface Policy {
  label: string
  on: boolean
  risk: 'high' | 'medium' | null
}

interface AutomationStore {
  mode: AutoMode
  policies: Policy[]
  setMode: (mode: AutoMode) => void
  togglePolicy: (index: number) => void
}

const defaultPolicies: Policy[] = [
  { label: 'Require approval for public replies', on: true, risk: null },
  { label: 'Require approval for first DM', on: true, risk: null },
  { label: 'Require approval when AI confidence < 70%', on: true, risk: null },
  { label: 'Auto-dismiss signals below score 40', on: false, risk: null },
  { label: 'Auto-engage with high intent (90+) signals', on: false, risk: 'medium' },
  { label: 'Auto-send DM follow-ups after 48h no reply', on: false, risk: 'high' },
]

export const useAutomationStore = create<AutomationStore>()(
  persist(
    (set) => ({
      mode: 'assisted',
      policies: defaultPolicies,
      setMode: (mode) => set({ mode }),
      togglePolicy: (index) =>
        set((s) => ({
          policies: s.policies.map((p, i) => (i === index ? { ...p, on: !p.on } : p)),
        })),
    }),
    { name: 'sf-automation' }
  )
)

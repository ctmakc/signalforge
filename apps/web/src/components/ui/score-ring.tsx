import { cn } from '@/lib/utils'

interface ScoreRingProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

function getScoreColor(score: number) {
  if (score >= 80) return { text: 'text-emerald-700', ring: 'ring-emerald-400', bg: 'bg-emerald-50' }
  if (score >= 60) return { text: 'text-amber-700', ring: 'ring-amber-400', bg: 'bg-amber-50' }
  if (score >= 40) return { text: 'text-orange-700', ring: 'ring-orange-400', bg: 'bg-orange-50' }
  return { text: 'text-red-700', ring: 'ring-red-400', bg: 'bg-red-50' }
}

const sizes = {
  sm: 'w-8 h-8 text-xs ring-2',
  md: 'w-10 h-10 text-sm ring-2',
  lg: 'w-12 h-12 text-base ring-2',
}

export function ScoreRing({ score, size = 'md', className }: ScoreRingProps) {
  const colors = getScoreColor(score)
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full font-bold',
        colors.text,
        colors.ring,
        colors.bg,
        sizes[size],
        className
      )}
    >
      {score}
    </div>
  )
}

import { cn } from '@/lib/utils'

const colors: Record<string, string> = {
  REDDIT: 'bg-orange-100 text-orange-600',
  TELEGRAM: 'bg-sky-100 text-sky-600',
  X: 'bg-zinc-100 text-zinc-800',
  FACEBOOK: 'bg-blue-100 text-blue-600',
  LINKEDIN: 'bg-blue-100 text-blue-700',
}

const labels: Record<string, string> = {
  REDDIT: 'RD',
  TELEGRAM: 'TG',
  X: 'X',
  FACEBOOK: 'FB',
  LINKEDIN: 'LI',
}

interface PlatformIconProps {
  platform: string
  size?: 'sm' | 'md'
  className?: string
}

export function PlatformIcon({ platform, size = 'md', className }: PlatformIconProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded font-bold',
        size === 'sm' ? 'w-5 h-5 text-[10px]' : 'w-6 h-6 text-xs',
        colors[platform] ?? 'bg-zinc-100 text-zinc-600',
        className
      )}
    >
      {labels[platform] ?? '?'}
    </span>
  )
}

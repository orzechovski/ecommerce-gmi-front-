import { cn } from '@/lib/utils'

type TagProps = {
  className?: string
  text: string
}

const Tag: React.FC<TagProps> = ({ className, text }) => {
  const tagsColors = [
    'bg-green-500',
    'bg-violet-500',
    'bg-rose-500',
    'bg-cyan-500',
    'bg-amber-500',
    'bg-blue-500',
    'bg-orange-500',
    'bg-indigo-500',
    'bg-lime-500',
    'bg-red-500',
    'bg-pink-500',
    'bg-purple-500',
    'bg-teal-500',
    'bg-yellow-500',
    'bg-emerald-500',
    'bg-gray-500'
  ]

  const pickedColor = tagsColors[Math.floor(Math.random() * tagsColors.length)]
  return (
    <section
      className={cn(
        'self-start px-2 py-1 text-xs font-medium  text-white rounded-md',
        className,
        pickedColor
      )}
    >
      {text}
    </section>
  )
}

export default Tag

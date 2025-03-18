import { cn } from '@renderer/libs/utils'

const Heading = ({ title, className }: { title: string; className?: string }) => {
  return (
    <h1 className={cn('heading-text  select-none text-white py-2 ', className)}>{title}</h1>
  )
}

export default Heading

import { cn } from '@/lib/utils'
import { useFormContext } from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
  FormLabel
} from '@/components/ui/form'
import { Input } from '../ui/input'

type BaseInputProps = {
  className?: string
  type?: 'text' | 'email' | 'password' | 'number'
  name: string
  label?: string
  placeholder: string
  description?: string
}

const BaseInput: React.FC<BaseInputProps> = ({
  className,
  name,
  type = 'text',
  label,
  placeholder,
  description
}) => {
  const { control } = useFormContext()
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('w-full relative', className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input placeholder={placeholder} {...field} type={type} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default BaseInput

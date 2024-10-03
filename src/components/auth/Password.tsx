import { cn } from '@/lib/utils'
import { useFormContext } from 'react-hook-form'
import { FormField, FormItem, FormControl, FormDescription, FormMessage, FormLabel } from '@/components/ui/form'
import { PasswordInput } from '../ui/password-input'

type PasswordProps = {
   className?: string
   name?: string
   label?: string
   description?: string
   placeholder?: string
}

const Password: React.FC<PasswordProps> = ({
   className,
   name = 'password',
   label = 'Password',
   description = 'Set your password',
   placeholder = 'Password',
}) => {
   const { control } = useFormContext()
   return (
      <FormField
         control={control}
         name={name}
         render={({ field }) => (
            <FormItem className={cn(className)}>
               <FormLabel>{label}</FormLabel>
               <FormControl>
                  <PasswordInput placeholder={placeholder} {...field} />
               </FormControl>
               <FormDescription>{description}</FormDescription>
               <FormMessage />
            </FormItem>
         )}
      />
   )
}

export default Password

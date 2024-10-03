'use client'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { toast } from 'sonner'
type QueryProviderProps = {
   children: React.ReactNode
}

const queryClient = new QueryClient({
   queryCache: new QueryCache({
      onError: (error) => {
         toast.error('Błąd 💔', {
            description: error.message,
         })
      },
   }),
})

const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
   return (
      <QueryClientProvider client={queryClient}>
         {children}
         <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
      </QueryClientProvider>
   )
}
export default QueryProvider

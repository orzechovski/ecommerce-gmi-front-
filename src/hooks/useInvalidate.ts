import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

export type QueryKeys = (string | number | Record<string, string | number>)[]

const useInvalidate = () => {
   const queryClient = useQueryClient()

   const invalidate = useCallback(
      (queryKeys: QueryKeys) => {
         queryClient.invalidateQueries({
            queryKey: queryKeys,
         })
      },
      [queryClient]
   )
   return invalidate
}
export default useInvalidate

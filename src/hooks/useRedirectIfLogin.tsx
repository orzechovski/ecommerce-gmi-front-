import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const useRedirectIfLogin = () => {
   const { push } = useRouter()

   const { data } = useSession()
   if (data) {
      push('/')
   }
}

export default useRedirectIfLogin

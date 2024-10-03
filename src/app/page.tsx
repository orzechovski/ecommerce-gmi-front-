import Logout from '@/components/global/Logout'
import ThemeSwitch from '@/components/global/ThemeSwitch'

export default function Home() {
  return (
    <main className="flex items-center justify-center h-full">
      <ThemeSwitch />
      <Logout />
    </main>
  )
}

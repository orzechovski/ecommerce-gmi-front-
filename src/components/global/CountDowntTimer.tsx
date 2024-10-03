import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

type CountdownTimerProps = {
  exp: number
  className?: string
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ exp, className }) => {
  const [timeLeft, setTimeLeft] = useState<number>(exp * 1000 - Date.now())

  useEffect(() => {
    // Funkcja aktualizująca czas pozostały
    const updateTimer = () => {
      const currentTime = Date.now()
      const remainingTime = exp * 1000 - currentTime
      setTimeLeft(remainingTime)
    }

    // Uruchamianie aktualizacji co sekundę
    const intervalId = setInterval(updateTimer, 1000)

    // Czyszczenie po zakończeniu komponentu
    return () => clearInterval(intervalId)
  }, [exp])

  // Funkcja formatująca czas na godziny, minuty, sekundy
  const formatTimeLeft = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return `${hours}h ${minutes}m ${seconds}s`
  }

  return (
    timeLeft > 0 && (
      <div className={cn(className)}>{formatTimeLeft(timeLeft)}</div>
    )
  )
}

export default CountdownTimer

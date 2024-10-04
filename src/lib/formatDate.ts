import { format, parseISO } from 'date-fns'

export const formatDate = (date: string) => {
   if (!date) return ''
   // Convert the ISO string to a Date object
   const parsedDate = parseISO(date)
   // Check if the parsed date is '1900-01-01T00:00:00Z'
   return parsedDate.getTime() === new Date('1900-01-01T00:00:00Z').getTime() ? '' : format(parsedDate, 'dd.MM.yyyy')
}

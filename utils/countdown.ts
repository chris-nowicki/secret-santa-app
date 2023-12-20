import { differenceInDays, differenceInWeeks } from 'date-fns'

export function countdown(targetDate: Date) {
  // Get the current date
  const currentDate = new Date()

  // Calculate the difference in days and weeks
  const daysRemaining = differenceInDays(targetDate, currentDate)
  const weeksRemaining = differenceInWeeks(targetDate, currentDate)

  return {
    weeks: weeksRemaining,
    days: (daysRemaining % 7) + 1,
  }
}

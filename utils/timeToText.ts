type Args = {
    seconds: number
    minutes?: number
    short?: boolean
  }
  
  export default function timeToText({
    seconds,
    minutes,
    short = false,
  }: Args): string {
    const min = minutes ?? Math.floor(seconds / 60)
    const hours = Math.floor(min / 60)
    const minutesLeft = min % 60
  
    const hoursLabel = short ? 'ч' : ' ч'
    const minutesLabel = short ? 'м' : ' мин'
  
    return hours > 0
      ? `${hours}${hoursLabel} ${minutesLeft}${minutesLabel}`
      : `${minutesLeft}${minutesLabel}`
  }
  
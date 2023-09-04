import { useAppDispatch, useAppSelector } from '@/redux/reduxHook';
import { TStatistic, StaticSeason, selectStatisticEntities } from '@/redux/Reducers/statisticSlice';
import { defaultTaskTime } from '@/redux/Reducers/timerPomodoroSlice';
import timeToText from '@/utils/timeToText';

const weekdays = new Map([
    [0, 'Вс'],
    [1, 'Пн'],
    [2, 'Вт'],
    [3, 'Ср'],
    [4, 'Чт'],
    [5, 'Пт'],
    [6, 'Сб'],
])

function getWeekDays(week: StaticSeason): number[] {
  const now = new Date()
  const start = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDay() === 0 ? now.getDate() - 6 : now.getDate() - now.getDay() + 1
  )

  if (week === StaticSeason.weekAgo) start.setDate(start.getDate() - 7)
  if (week === StaticSeason.twoWeekAgo) start.setDate(start.getDate() - 14)

  const weekDays = []
  for (let i = 0; i < 7; i++)
    weekDays.push(
      new Date(
        start.getFullYear(),
        start.getMonth(),
        start.getDate() + i
      ).getTime()
    )  
  return weekDays
}


function getBarData(
  weekData: TStatistic[],
  weekDays: number[]
): { id: number; day?: string; pomodorosTime: number }[] {
  return weekDays.map((day, index) => {
    const dayData = weekData[index]
    // cons
    if (!dayData)
      return {
        id: day,
        day: weekdays.get(new Date(day).getDay()),
        pomodorosTime: 0,
      }
    return {
      id: dayData.id,
      day: weekdays.get(new Date(dayData.id).getDay()),
      pomodorosTime: dayData.pomodorosTime * 97,
    }
  })
}

function getAxisData(axisStep: number): string[] {
  const axisData: string[] = []
  
  for (let i = 1; i < 5; i++) {
    axisData.unshift(timeToText({seconds: i * axisStep * defaultTaskTime}))
  }

  return axisData
}


export default function useChart() {
  const statsEntities = useAppSelector(selectStatisticEntities)
  const week = useAppSelector((state) => state.statistics.week)
  const days = getWeekDays(week)
  const data = days.map((day) => statsEntities[day])

  const maxPomodorosTime = data 
    .map((entry) => (entry ? entry.pomodorosTime : 0))
    .reduce((prev, curr) => (curr > prev ? curr : prev), 0)

  const axisStep = Math.ceil(
    maxPomodorosTime ? maxPomodorosTime / defaultTaskTime / 5 : 1
  )
  const axisData = getAxisData(axisStep)
  const barData = getBarData(data as TStatistic[], days)

  return { axisStep, axisData, barData }
}
  
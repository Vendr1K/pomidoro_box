import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit'
import { RootState } from '../store'

export enum StaticSeason  {
    currentWeek = 'Эта неделя',
    weekAgo = 'Предыдущая неделя',
    twoWeekAgo = '2 недели назад',
}

export type TStatistic = {
    id: number,
    pomodorosCount: number,
    pomodorosTime: number,
    pomodorosPause: number,
    pomodorosStops: number,
}

const startDay = (date: Date): number => (new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime())
 
const statisticAdapter = createEntityAdapter<TStatistic>()
const initialState = statisticAdapter.getInitialState({
    day: startDay(new Date()),
    week: StaticSeason.currentWeek

})

export const statisticSlice = createSlice({
    name: 'statistic',
    initialState: initialState,
    reducers: {
        'load': (state) => {
            if (state.ids.includes(startDay(new Date()))) return
      
            statisticAdapter.addOne(state, {
              id: startDay(new Date()),
              pomodorosCount: 0,
              pomodorosTime: 0,
              pomodorosPause: 0,
              pomodorosStops: 0,
            })
            // console.log(localStorage.getItem('pomodoroLS') === null)
            const localStats = localStorage.getItem('pomodoroLS')
            if (localStats === 'undefined' || localStats === null) return
      
            const stats = JSON.parse(localStats)
            if (!stats || !stats.length) return
      
            statisticAdapter.setMany(state, stats)
        },
        'update': (state, action: PayloadAction<Partial<TStatistic>>) => {
            const entity = state.entities[startDay(new Date())]
            if (!entity) return state
        
            statisticAdapter.updateOne(state, {
                id: entity.id,
                changes: {
                pomodorosCount:
                    entity.pomodorosCount + (action.payload.pomodorosCount ?? 0),
                pomodorosTime:
                    entity.pomodorosTime + (action.payload.pomodorosTime ?? 0),
                pomodorosPause: entity.pomodorosPause + (action.payload.pomodorosPause ?? 0),
                pomodorosStops: entity.pomodorosStops + (action.payload.pomodorosStops ?? 0),
                },
            })
        },

        'save': (state) => {
            if (state.ids.length > 0)
              localStorage.setItem(
                'pomodoroLS',
                JSON.stringify(state.ids.map((id) => state.entities[id]))
              )
          },

        'changeDay': (state, action: PayloadAction<number>) => {
            state.day = action.payload
        },

        'changeWeek': (state, action: PayloadAction<StaticSeason>) => {
            state.week = action.payload
        }
    }
})

export default statisticSlice.reducer

export const {
    'save': saveStats,
    'load': loadStats,
    'update': updateStats,
    'changeDay': changeDay,
    'changeWeek': changeWeek,
} = statisticSlice.actions

export const {
    selectById: selectStatisticById,
    selectAll: selectAllStatistic,
    selectEntities: selectStatisticEntities,
} = statisticAdapter.getSelectors((state: RootState) => state.statistics)
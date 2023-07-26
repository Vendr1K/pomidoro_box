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
    pomidorosCount: number,
    pomidorosTime: number,
    pomidorosPAuse: number,
    pomidorosStops: number,
}

const startDay = (date: Date): number => (new Date(date.getFullYear(), date.getMonth(), date.getDay()).getTime())
 
const statisticAdapter = createEntityAdapter<TStatistic>()
const initialState = statisticAdapter.getInitialState({
    day: startDay(new Date()),
    week: StaticSeason.currentWeek

})

export const statisticSlice = createSlice({
    name: 'statistic',
    initialState: initialState,
    reducers: {
        'changeWeek': (state, action: PayloadAction<StaticSeason>) => {
            state.week = action.payload
        }
    }
})

export default statisticSlice.reducer

export const {
    'changeWeek': changeWeek,
    
} = statisticSlice.actions

export const {
    selectById: selectStatisticById,
    selectAll: selectAllStatistic,
    selectEntities: selectStatisticEntities,
 
} = statisticAdapter.getSelectors((state: RootState) => state.statistics)
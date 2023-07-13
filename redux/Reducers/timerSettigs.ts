import { createSlice } from "@reduxjs/toolkit";

export interface ITimerSettings {
    taskTime: number,
    shortBreakTime: number,
    longBreakTime: number,
}

const initialState: ITimerSettings = {
    taskTime: 25 * 60,
    shortBreakTime: 5 * 60,
    longBreakTime: 25 * 60,
}

export const timerSettings = createSlice({
    initialState: initialState,
    name: 'settings',
    reducers:{
        'reset': () => initialState,
        'incrementTaskTime': (state) => {
            state.taskTime += 1 * 60;
        },
        'incrementShortBreakTime': (state) => {
            state.shortBreakTime += 1 * 60;
        },
        'incrementLongBreakTime': (state) => {
            state.longBreakTime += 1 * 60;
        },
        'decrementTaskTime': (state) => {
            state.taskTime -= 1 * 60;
        },
        'decrementShortBreakTime': (state) => {
            state.shortBreakTime -= 1 * 60;
        },
        'decrementLongBreakTime': (state) => {
            state.longBreakTime -= 1 * 60;
        },
    }
})

export default timerSettings.reducer

export const {
    'reset': reset, 
    'incrementTaskTime': incrementTaskTime,
    'incrementShortBreakTime': incrementShortBreakTime,
    'incrementLongBreakTime': incrementLongBreakTime,
    'decrementTaskTime': decrementTaskTime,
    'decrementShortBreakTime': decrementShortBreakTime,
    'decrementLongBreakTime': decrementLongBreakTime,

} = timerSettings.actions
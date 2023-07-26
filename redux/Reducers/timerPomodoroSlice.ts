import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

const defaultTaskTime = 25 * 60
const defaultShortBreakTime = 5 * 60 
const defaultLongBreakTime = 25 * 60

export enum ETimerStatus {
    pomodoro_off,
    pomodoro_on, 
    pomodoro_pause,
    pomodoro_break_on,
    pomodoro_break_pause,
}

export interface ITimer {
    startTime: number,
    taskTime: number,
    taskTimeLeft: number,
    status: ETimerStatus,
    currentPauseTime: number,
    allPauseTime: number,
    pomodoroTime: number,
    pomodoroStart: number,
    pomodoroPauseStart: number,
    shortPause: number,
    longPause: number
    pomodoroCount: number,
    taskCount: number,

}

const initialState: ITimer = {
    startTime: 0,
    taskTime: defaultTaskTime,
    taskTimeLeft: defaultTaskTime,
    status: ETimerStatus.pomodoro_off,
    currentPauseTime: 0,
    allPauseTime: 0,
    pomodoroTime: 0,
    pomodoroStart: 0,
    pomodoroPauseStart: 0,
    shortPause: 5 * 60,
    longPause: 25 * 60, 
    pomodoroCount: 1,
    taskCount: 0,
}


export const timerPomodoroReducer = createSlice({
    name: 'timer',
    initialState: initialState,
    reducers: {
        'tick': (state) => {
            let baseTime = state.taskTime
            if(state.status === ETimerStatus.pomodoro_break_on)
            // baseTime = state.pomodoroCount % 4 === 0 ? defaultLongBreakTime : defaultShortBreakTime
            baseTime = state.pomodoroCount !== 0 ?  state.pomodoroCount % 4 === 0 ? state.longPause : state.shortPause : state.shortPause 
            
            return {
                ...state,
                taskTimeLeft: baseTime + state.currentPauseTime - Math.round((Date.now() - state.startTime) / 1000)
            }
        },
        
        'start': (state, action) => {
            // pomodoroStart = Date.now()
            return {
                ...state,
                startTime: Date.now(),
                taskTimeLeft: state.taskTime,
                status: ETimerStatus.pomodoro_on,
                // pomodoroCount: state.pomodoroCount + 1,
                allPauseTime: state.allPauseTime + state.currentPauseTime,
                currentPauseTime: 0,
                pomodoroStart: action.payload

            }
        },

        'stop': (state, action) => ({
            ...state,
            // taskTime: defaultTaskTime,
            taskTimeLeft: action.payload,
            status: ETimerStatus.pomodoro_off,
            // pomodoroCount: state.pomodoroCount - 1,
            // pomodoroCount: 0,
            currentPauseTime: 0,
            allPauseTime: 0,
        }),

        'pause': (state, action) => {
            // pomodoroPauseStart = Date.now()
            return {
                ...state,
                status: 
                state.status === ETimerStatus.pomodoro_on ? ETimerStatus.pomodoro_pause : ETimerStatus.pomodoro_break_pause  ,
                pomodoroPauseStart: action.payload

            }
        },

        'continue': (state) => ({
            ...state,
            currentPauseTime: state.currentPauseTime + Math.round((Date.now() - state.pomodoroPauseStart) / 1000),
            status: state.status === ETimerStatus.pomodoro_pause
                ? ETimerStatus.pomodoro_on : ETimerStatus.pomodoro_break_on
        }),

        'complited': (state) => ({
            ...state,
            // pomodoroCount: state.pomodoroCount + 1,
            pomodoroCount: state.pomodoroCount + 1,
            startTime: Date.now(),
            pomodoroTime: state.pomodoroTime + state.currentPauseTime + Math.round((Date.now() - state.pomodoroStart) / 1000),
            
            // taskTimeLeft: state.pomodoroCount % 4 === 0 ? defaultLongBreakTime : defaultShortBreakTime,
            taskTimeLeft: state.pomodoroCount !== 0 ?  state.pomodoroCount % 4 === 0 ? state.longPause : state.shortPause : state.shortPause,
            status: ETimerStatus.pomodoro_break_on,
            allPauseTime: state.allPauseTime + state.currentPauseTime,
            currentPauseTime: 0
        }) ,

        'skip': (state, action) => {

            // pomodoroPauseStart = Date.now()

            // ...state,
            // startTime: Date.now(),
            // taskTimeLeft: state.taskTime,
            // status: ETimerStatus.pomodoro_on,
            // pomodoroCount: state.pomodoroCount + 1,
            // allPauseTime: state.allPauseTime + state.currentPauseTime,
            // currentPauseTime: 0,
            // pomodoroStart: action.payload

            return {
                ...state,
                startTime: Date.now(),
                taskTimeLeft: state.taskTime,
                status: ETimerStatus.pomodoro_off,
                // status: ETimerStatus.pomodoro_on,
                // pomodoroCount: state.pomodoroCount + 1,
                // pomodoroPauseStart: action.payload,
                allPauseTime: state.allPauseTime + state.currentPauseTime,
                currentPauseTime: 0

            }
        },

        'startAfterBreak' : (state) => ({
            ...state,
            taskTimeLeft: defaultTaskTime,
            status: ETimerStatus.pomodoro_off,
            currentPauseTime: 0,
            allPauseTime: 0,
        }),

        'reviseTimeTask' : (state, action) => ({
            ...state,
            taskTimeLeft: action.payload.timeLeft,
            taskTime: action.payload.taskTime,
            pomodoroPauseStart: action.payload.startPause,
            startTime: action.payload.startTime,
            currentPauseTime: action.payload.currentPauseTime
            // pomodoroCount: action.payload.count
        }),

        'reviceShortPauseTime' : (state, action) => ({
            ...state,
            shortPause: action.payload
        }),    
        'reviceLongPauseTime' : (state, action) => ({
            ...state,
            longPause: action.payload
        }),
        
        
        'changeStatus': (state, action) => ({
            ...state,
            status: action.payload.status
        }),

        'changePomodoroCount': (state, action) => ({
            ...state,
            pomodoroCount: action.payload.pomodoroCount
        }),

        'changeTaskCount': (state, action) => ({
            ...state,
            taskCount: action.payload.taskCount
        }),


        'changePause': (state) => {
            // pomodoroPauseStart = Date.now()
            return {
                ...state,
                status: ETimerStatus.pomodoro_pause ,
                pomodoroPauseStart: Date.now()

            }
        },
        
    }
})


export default timerPomodoroReducer.reducer

export const {
    'tick' : tickTimer,
    'start' : stratPomodoroTimer,
    'pause' : pausePomidoroTImer,
    'stop' : stopPomidoroTimer,
    'continue' : continuePomidoroTimer,
    'complited': complitedPomodoroTask,
    'skip': skipPomodoroBreak,
    'startAfterBreak': startAfterBreak,

    
    'reviseTimeTask': reviseTimeTask,
    'changeStatus' : changeStatus,
    'changePause' : changePause,
    'changePomodoroCount': changePomodoroCount,
    'changeTaskCount': changeTaskCount,
    'reviceShortPauseTime' :  reviceShortPauseTime,
    'reviceLongPauseTime' :  reviceLongPauseTime,

} = timerPomodoroReducer.actions

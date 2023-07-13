import { configureStore, combineReducers } from "@reduxjs/toolkit";
import tasksReducer from './Reducers/taskSlice'
import currentTaskReducer from './Reducers/currentTask'
import timerReducer from './Reducers/timerPomodoroSlice'
import configTimerReducer from './Reducers/timerSettigs'
// const rootReducer =  combineReducers({
//     counter: counterReducer,
//     tasks: tasksReducer,
// })


export const setupStore = configureStore({
  reducer: {
    tasks: tasksReducer,
    currentTask: currentTaskReducer,
    timer: timerReducer,
    settings: configTimerReducer
},
  // devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof setupStore.getState>;
export type AppDispatch = typeof setupStore.dispatch;



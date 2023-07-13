import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit'
import { RootState } from '../store'

interface ICurrentTask {
    index: number,
    id: number | null
}

const initialState: ICurrentTask = {
    index: 0,
    id: null
}

export const currentTaskSlice = createSlice({
    name: 'currentTask',
    initialState: initialState,
    reducers: {
        changeCurrentTask: (state, action) => {
            state.index = action.payload.index
            state.id = action.payload.id
        }
    }
})

export default currentTaskSlice.reducer

export const {
    changeCurrentTask: changeTask
} = currentTaskSlice.actions



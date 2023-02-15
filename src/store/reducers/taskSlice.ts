import { createSlice, PayloadAction } from '@reduxjs/toolkit'; 
import { v4 as uuid } from 'uuid'


export type TTasksList = {
    [id: string]: TTaskStateItem
}

export type TTaskStateItem = {
    countPlan: number,
    countPass: number,
    index: number,
    name: string
}

type TasksStateType = {
    tasks: TTasksList,
    order: Array<string>
}

const initialState: TasksStateType = {
    tasks: {},
    order: [],
};

export const taskSlice = createSlice({
    name: 'taskList',
    initialState,

    reducers: {
        addTask: (state, action: PayloadAction<{ name: string }>) => {

            const newTaskUuid = uuid()
            const maxTaskIndex = Math.max(
                0,
                ...Object.keys(state.tasks).map(i => state.tasks[i].index)
            )
            state.order.push(newTaskUuid)
            state.tasks[newTaskUuid] = {
                name: action.payload.name,
                countPlan: 1,
                countPass: 0,
                index: maxTaskIndex + 1,
            }

        },
        deleteTask: (state, action: PayloadAction<{ id: string }>) => {
            const taskIdToDelete = action.payload.id
            delete state.tasks[taskIdToDelete]
            state.order = state.order.filter(item => item !== taskIdToDelete)
        },

        incrementCountPlan: (state, action: PayloadAction<{ id: string }>) => {
            state.tasks[action.payload.id].countPlan = state.tasks[action.payload.id].countPlan + 1
        },

        decrementCountPlan: (state, action: PayloadAction<{ id: string }>) => {
            state.tasks[action.payload.id].countPlan = state.tasks[action.payload.id].countPlan - 1
        },

        editTask: (state, action: PayloadAction<{ id: string, name: string }>) => {
            state.tasks[action.payload.id].name = action.payload.name
        },
    },

});

export const { addTask, deleteTask, incrementCountPlan, decrementCountPlan, editTask } = taskSlice.actions;

export default taskSlice.reducer;

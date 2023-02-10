import { createSlice } from '@reduxjs/toolkit';


export type TimerStateType = {
    mode: 'breake' | 'work' 
    cycleCount: number
}

const initialState: TimerStateType = {
    mode: 'work',
    cycleCount: 0
};



export const timerSlice = createSlice({
    name: 'timer',
    initialState,

    reducers: {
        setModeWork: (state) => {
            state.mode = 'work'
        },
        setModeBreake: (state) => {
            state.mode = 'breake'
        },
        incrementCycleCount: (state) => {
            state.cycleCount = state.cycleCount + 1
        }
    }
});

export const { setModeWork, setModeBreake, incrementCycleCount } = timerSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

// export const selectTask = (state: RootState) => state.tasksReducer.tasks;


export default timerSlice.reducer;

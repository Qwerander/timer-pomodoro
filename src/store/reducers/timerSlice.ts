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

export default timerSlice.reducer;

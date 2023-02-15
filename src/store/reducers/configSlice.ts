import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ThemeType = 'light' | 'dark'

export type TimerStateType = {
    timeOnePomodor: number,
    timeShortBreak: number,
    timeLongBreak: number,
    theme: ThemeType
}

const initialState: TimerStateType = {
    timeOnePomodor: 25,
    timeShortBreak: 5,
    timeLongBreak: 15,
    theme: 'light'
};

export const configSlice = createSlice({
    name: 'config',
    initialState,

    reducers: {
        setOnePomodorTime: (state, action: PayloadAction<{ time: number }>) => {
            state.timeOnePomodor = action.payload.time
        },
        setShortBreake: (state, action: PayloadAction<{ time: number }>) => {
            state.timeShortBreak = action.payload.time
        },
        setLongBreake: (state, action: PayloadAction<{ time: number }>) => {
            state.timeLongBreak = action.payload.time
        },
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' 
                ? state.theme = 'dark'
                : state.theme = 'light'
        }
    }
});

export const { setOnePomodorTime, setShortBreake, setLongBreake, toggleTheme } = configSlice.actions;

export default configSlice.reducer;

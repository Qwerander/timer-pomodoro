import { createSlice, PayloadAction } from '@reduxjs/toolkit'; //createAsyncThunk



export type StatisticListType = {
    [days: number]: StatisticDayType
}

export type StatisticDayType = {
    time: number,
    count: number,
    paused: number,
    stops: number,
}

export type StatisticStateType = {
    days: StatisticListType 
    selectedDay: keyof StatisticStateType['days'] | 0
    lastDay: keyof StatisticStateType['days'] | 0
}

const initialState: StatisticStateType = {
    days: {},
    selectedDay: 0,
    lastDay: 0,
};

export const statisticSlice = createSlice({
    name: 'statistic',
    initialState,

    reducers: {
        addNewDay: (state, action: PayloadAction<{newDay: number}> ) => {
            state.days[action.payload.newDay] = {
                count: 0,
                paused: 0,
                stops: 0,
                time: 0,
            }
            state.lastDay = action.payload.newDay
            state.selectedDay = action.payload.newDay
        },
        addTime: (state, action: PayloadAction<{currentDay: number, time: number}> ) => {
            state.days[action.payload.currentDay].time = 
                state.days[action.payload.currentDay].time + 
                    action.payload.time
        },
        addStops: (state, action: PayloadAction<{currentDay: number, stops: number}>) => {
            state.days[action.payload.currentDay].stops = 
                state.days[action.payload.currentDay].stops + action.payload.stops
        },
        addPause: (state, action: PayloadAction<{currentDay: number, pause: number}>) => {
            state.days[action.payload.currentDay].paused = 
                state.days[action.payload.currentDay].paused + action.payload.pause
        },
        addPomodor: (state, action: PayloadAction<{currentDay: number}>) => {
            state.days[action.payload.currentDay].count = 
                state.days[action.payload.currentDay].count + 1
        },
        setSelectedDay: (state, action: PayloadAction<{day: number}>) => {
            state.selectedDay = action.payload.day
        }
    }
});

export const { addNewDay, addTime, addPause, addStops, addPomodor, setSelectedDay } = statisticSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

// export const selectTask = (state: RootState) => state.tasksReducer.tasks;


export default statisticSlice.reducer;

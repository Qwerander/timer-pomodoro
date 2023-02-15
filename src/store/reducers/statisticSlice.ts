import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from "moment";

export type StatisticDayType = {
    date: string,
    time: number,
    count: number,
    paused: number,
    stops: number,
}

export type StatisticStateType = {
    days: Array<StatisticDayType>
    lastDay: string
}

const initialState: StatisticStateType = {
    days: [],
    // selectedDay: 0,
    lastDay: '',
};

export const currentDate = moment().format('YYYY-MM-DD');

export const statisticSlice = createSlice({
    name: 'statistic',
    initialState,
    
    reducers: {
        addNewDay: (state) => {
            const statDay = state.days.find(day => day.date === currentDate);
            if (statDay?.date !== currentDate) {
                state.days.push({
                        date: currentDate,
                        count: 0,
                        paused: 0,
                        stops: 0,
                        time: 0,
                    })
            }
            state.lastDay = currentDate
        },
        addTime: (state, action: PayloadAction<{time: number}>) => {    
            state.days[state.days.length - 1].time =
              state.days[state.days.length - 1].time + action.payload.time;
            
        },
        addStops: (state, action: PayloadAction<{stops: number}>) => {
            state.days[state.days.length - 1].stops = 
                state.days[state.days.length - 1].stops + action.payload.stops
        },
        addPause: (state, action: PayloadAction<{pause: number}>) => {
            state.days[state.days.length - 1].paused = 
                state.days[state.days.length - 1].paused + action.payload.pause
        },
        addPomodor: (state) => {
            state.days[state.days.length - 1].count = 
                state.days[state.days.length - 1].count + 1
        },
   
    }
});

export const { addNewDay, addTime, addPause, addStops, addPomodor } = statisticSlice.actions;

export default statisticSlice.reducer;

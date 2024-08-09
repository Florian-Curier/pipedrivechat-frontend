import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
};


export const userSlice = createSlice({
    name: 'alerts',
    initialState,
    reducers: {
        updateAlertsInStore: (state, action) => {
            state.value = action.payload
        },
        addAlertInStore: (state, action) => {
            state.value.push(action.payload)
        },
        updateAlertInStore: (state, action) => {
            
            let data = state.value.filter(alert => alert._id !== action.payload._id)
            data.push(action.payload)
            state.value = data
            console.log(data)
        },
        deleteAlertInStore: (state, action) => {
            state.value = state.value.filter(alert => alert._id !== action.payload)
        },
    },
});

export const { updateAlertsInStore, addAlertInStore, updateAlertInStore, deleteAlertInStore } = userSlice.actions;
export default userSlice.reducer;
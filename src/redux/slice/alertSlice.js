import { createSlice } from '@reduxjs/toolkit';
export const initialState = { variant: "info", message: "", preventDuplicate: true, persist: false }
const alertsSlice = createSlice({
    name: 'alertsState',
    initialState: {},
    reducers: {
        showSuccess: (state, action) => {
            state = getDefaultProperties(state, action);
            state.variant = "success";
        },
        showError: (state, action) => {
            state = getDefaultProperties(state, action);
            state.variant = "error";
        },
        showWarning: (state, action) => {
            state = getDefaultProperties(state, action);
            state.variant = "warning";
        },
        showInfo: (state, action) => {
            state = getDefaultProperties(state, action);
            state.variant = "info";
        }
    },
});

const getDefaultProperties = (state, action) => {
    state.message = action.payload?.message || initialState.message
    state.preventDuplicate = false
    state.persist = action.payload?.persist || initialState.persist;
    state.time = new Date().getTime();
    return state;
}
export const { showSuccess, showError, showWarning, showInfo } = alertsSlice.actions;
export default alertsSlice.reducer;
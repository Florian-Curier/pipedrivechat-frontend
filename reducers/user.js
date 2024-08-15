import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {user_name: null,
            pipedrive_user_id : null,
            pipedrive_company_id: null,
            api_domain: null,
            google_email:null
    }
};


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        updateUserInStore: (state, action) => {
            state.value.user_name = action.payload.user_name,
            state.value.pipedrive_user_id = action.payload.pipedrive_user_id,
            state.value.pipedrive_company_id = action.payload.pipedrive_company_id,
            state.value.api_domain  = action.payload.api_domain,
            state.value.google_email = action.payload.google_email
        },

        clearGoogleEmailInStore: (state) => {
            state.value.google_email = null

        }
    }});

export const { updateUserInStore, clearGoogleEmailInStore } = userSlice.actions;
export default userSlice.reducer;
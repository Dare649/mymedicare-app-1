import { createSlice } from "@reduxjs/toolkit";
import {
    getHqPartner,
    updateHqPartner
} from "./hq-partner-account";

interface BranchPartnerData {
  id: number;
  uuid: number;
  name: string;
  website: string;
  phone: string;
  referral_code: string;
  address: {
    street_address: string;
    city: string;
    state: string;
    country: string;
  };
  contact_person: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    country_code: string;
    position: string;
  };
  [key: string]: any;
}


interface HqPartnerState {
    getHqPartnerStatus: "idle" | "isLoading" | "succeeded" | "failed";
    updateHqPartnerStatus: "idle" | "isLoading" | "succeeded" | "failed";
    status: "idle" | "isLoading" | "succeeded" | "failed";
    hqPartner: BranchPartnerData | null;
    allHqPartner: BranchPartnerData[];
    error: string | null;
}


const initialState: HqPartnerState = {
    getHqPartnerStatus: "idle",
    updateHqPartnerStatus: "idle",
    status: "idle",
    hqPartner: null,
    allHqPartner: [],
    error: null,
}


const hqPartnerSlice = createSlice({
    name: "hqPartner",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        // update hq partner
        .addCase(updateHqPartner.pending, (state) => {
            state.updateHqPartnerStatus = "isLoading";
        })
        .addCase(updateHqPartner.fulfilled, (state, action) => {
            state.updateHqPartnerStatus = "succeeded";
            state.hqPartner = action.payload;
            state.allHqPartner.push(action.payload); 
        })
        .addCase(updateHqPartner.rejected, (state, action) => {
            state.updateHqPartnerStatus = "failed";
            state.error = action.error.message || "Failed to update hq partner";
        })


        // get partner
        .addCase(getHqPartner.pending, (state) => {
        state.getHqPartnerStatus = "isLoading";
        })
        .addCase(getHqPartner.fulfilled, (state, action) => {
        state.getHqPartnerStatus = "succeeded";
        state.hqPartner = action.payload;
        })
        .addCase(getHqPartner.rejected, (state, action) => {
        state.getHqPartnerStatus = "failed";
        state.error = action.error.message ?? "Failed to retrieve hq partner"
        })
    },
})

export default hqPartnerSlice.reducer;
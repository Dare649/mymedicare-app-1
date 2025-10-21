import { createSlice } from "@reduxjs/toolkit";
import {
    getBranchPartner,
    updateBranchPartner,
    createBranchPartner
} from "./branch-partner-account";

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


interface branchPartnerState {
    getBranchPartnerStatus: "idle" | "isLoading" | "succeeded" | "failed";
    updateBranchPartnerStatus: "idle" | "isLoading" | "succeeded" | "failed";
    createBranchPartnerStatus: "idle" | "isLoading" | "succeeded" | "failed";
    status: "idle" | "isLoading" | "succeeded" | "failed";
    branchPartner: BranchPartnerData | null;
    allBranchPartner: BranchPartnerData[];
    error: string | null;
}


const initialState: branchPartnerState = {
    getBranchPartnerStatus: "idle",
    updateBranchPartnerStatus: "idle",
    createBranchPartnerStatus: "idle",
    status: "idle",
    branchPartner: null,
    allBranchPartner: [],
    error: null,
}


const branchPartnerSlice = createSlice({
    name: "branchPartner",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        // update hq partner
        .addCase(updateBranchPartner.pending, (state) => {
            state.updateBranchPartnerStatus = "isLoading";
        })
        .addCase(updateBranchPartner.fulfilled, (state, action) => {
            state.updateBranchPartnerStatus = "succeeded";
            state.branchPartner = action.payload;
            state.allBranchPartner.push(action.payload); 
        })
        .addCase(updateBranchPartner.rejected, (state, action) => {
            state.updateBranchPartnerStatus = "failed";
            state.error = action.error.message || "Failed to update hq partner";
        })

        // create hq partner
        .addCase(createBranchPartner.pending, (state) => {
            state.createBranchPartnerStatus = "isLoading";
        })
        .addCase(createBranchPartner.fulfilled, (state, action) => {
            state.createBranchPartnerStatus = "succeeded";
            state.branchPartner = action.payload;
            state.allBranchPartner.push(action.payload); 
        })
        .addCase(createBranchPartner.rejected, (state, action) => {
            state.createBranchPartnerStatus = "failed";
            state.error = action.error.message || "Failed to update hq partner";
        })


        // get partner
        .addCase(getBranchPartner.pending, (state) => {
        state.getBranchPartnerStatus = "isLoading";
        })
        .addCase(getBranchPartner.fulfilled, (state, action) => {
        state.getBranchPartnerStatus = "succeeded";
        state.branchPartner = action.payload;
        })
        .addCase(getBranchPartner.rejected, (state, action) => {
        state.getBranchPartnerStatus = "failed";
        state.error = action.error.message ?? "Failed to retrieve hq partner"
        })
    },
})

export default branchPartnerSlice.reducer;
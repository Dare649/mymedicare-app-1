import { createSlice } from "@reduxjs/toolkit";
import { getPartnerDashboard } from "./dashboard";

interface DashboardData {
    totalPatients: number;
    totalPatientsRM: number;
    totalBloodPressureReadings: number;
    totalBloodSugarReadings: number;
    totalWeightReadings: number;
    totalVitalReadings: number;
}

interface DashboardState {
    getPartnerDashboardStatus: "idle" | "isLoading" | "succeeded" | "failed";
    dashboard: DashboardData | null;
    error: string | null;
}

const initialState: DashboardState = {
    getPartnerDashboardStatus: "idle",
    dashboard: null,
    error: null,
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPartnerDashboard.pending, (state) => {
                state.getPartnerDashboardStatus = "isLoading";
            })
            .addCase(getPartnerDashboard.fulfilled, (state, action) => {
                state.getPartnerDashboardStatus = "succeeded";
                state.dashboard = action.payload.data; // Use the `data` from your API response
            })
            .addCase(getPartnerDashboard.rejected, (state, action) => {
                state.getPartnerDashboardStatus = "failed";
                state.error = action.error.message || "Failed to fetch dashboard";
            });
    },
});

export default dashboardSlice.reducer;

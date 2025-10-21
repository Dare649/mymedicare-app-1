import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";


// get branch dashboard
export const getPartnerDashboard = createAsyncThunk(
    "dashboard/getPartnerDashboard",
    async (_, { rejectWithValue}) => {
        try {
            const res = await axiosInstance.get('/api/partner/get_dashboard_stats');
            return res.data;
        } catch (error: any) {
            return rejectWithValue({
                message: error.res?.message
            });
        }
    }
);
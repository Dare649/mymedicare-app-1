import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

// get hq branches
export const getHqBranches = createAsyncThunk(
    "hq-branches/getHqBranches",
    async (_, { rejectWithValue}) => {
        try {
            const res = await axiosInstance.get('/api/partner/branches');
            return res.data;
        } catch (error: any) {
            return rejectWithValue({
                message: error.res?.message
            });
        }
    }
);
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

// get all doctors
export const getAllDoctors = createAsyncThunk(
    "doctor/getAllDoctors",
    async (_, { rejectWithValue}) => {
        try {
            const res = await axiosInstance.get('/api/~admin/doctors');
            return res.data.data;
        } catch (error: any) {
            return rejectWithValue({
                message: error.res?.message
            });
        }
    }
);


// get a doctor
export const getDoctor = createAsyncThunk(
    "doctor/getDoctor",
    async (uuid: string, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(`/api/~admin/doctor/${uuid}`);
            return res.data.data;
        } catch (error: any) {
            return rejectWithValue({
                message: error.res?.message
            });
        }
    }
)
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";


// get all patient
export const getAllPatient = createAsyncThunk(
    "patient/getAllPatient",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get('/api/~admin/patients');
            return res.data.data;
        } catch (error: any) {
            return rejectWithValue({
                message: error.res?.message
            });
        }
    }
);


// get a patient
export const getPatient = createAsyncThunk(
    "patient/getPatient",
    async (uuid: string, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(`/api/~admin/patient/${uuid}`);
            return res.data.data;
        } catch (error: any) {
            return rejectWithValue({
                message: error.res?.message
            });
        }
    }
);


// get patient at risk
export const getAllAdminRiskPatient = createAsyncThunk(
    "patient/getAllAdminRiskPatient",
    async (_, { rejectWithValue}) => {
        try {
            const res = await axiosInstance.get('/api/~admin/get_at_risk');
            return res.data?.data?.patients_at_risk;
        } catch (error: any) {
            return rejectWithValue({
                message: error.res?.message
            });
        }
    }
);


// get inactive patient
export const getAllAdminInactivePatient = createAsyncThunk(
    "patient/getAllAdminInactivePatient",
    async (_, { rejectWithValue}) => {
        try {
            const res = await axiosInstance.get('/api/~admin/inactive_patients');
            return res.data?.data;
        } catch (error: any) {
            return rejectWithValue({
                message: error.res?.message
            });
        }
    }
);
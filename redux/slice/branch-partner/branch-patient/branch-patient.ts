import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

interface BranchPatient {
    name : string;
    email : string;
    phone : string;
    country_code : string;
}


// create single patient
export const createBranchPatient = createAsyncThunk(
    "branch-patient/createBranchPatient",
    async(data: BranchPatient, { rejectWithValue}) => {
        try {
            const res = await axiosInstance.post("/api/partner/add_patient", data);
            return res.data;
        } catch (error: any) {
            return rejectWithValue({
                message: error.res?.data?.message
            })
        }
    }
);


export const createBranchPatientBulk = createAsyncThunk(
  "branch-patient/createBranchPatientBulk",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/api/partner/upload_list", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data?.message || 'Bulk upload failed',
      });
    }
  }
);


// get all patient
export const getAllBranchPatient = createAsyncThunk(
    "branch-patient/getAllBranchPatient",
    async (_, { rejectWithValue}) => {
        try {
            const res = await axiosInstance.get('/api/partner/get_referred/patient');
            return res.data.data;
        } catch (error: any) {
            return rejectWithValue({
                message: error.res?.message
            });
        }
    }
);

// get patient at risk
export const getAllBranchRiskPatient = createAsyncThunk(
    "branch-patient/getAllBranchRiskPatient",
    async (_, { rejectWithValue}) => {
        try {
            const res = await axiosInstance.get('/api/partner/get_at_risk');
            return res.data?.data?.patients_at_risk;
        } catch (error: any) {
            return rejectWithValue({
                message: error.res?.message
            });
        }
    }
);


// get inactive patient
export const getAllBranchInactivePatient = createAsyncThunk(
    "branch-patient/getAllBranchInactivePatient",
    async (_, { rejectWithValue}) => {
        try {
            const res = await axiosInstance.get('/api/partner/get_inactive_patients');
            return res.data?.data;
        } catch (error: any) {
            return rejectWithValue({
                message: error.res?.message
            });
        }
    }
);


// get a patient
export const getBranchPatient = createAsyncThunk(
    "branch-patient/getBranchPatient",
    async (uuid: string, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(`/api/partner/${uuid}/patient_details`);
            return res.data.data; 
        } catch (error: any) {
            return rejectWithValue({
                message: error.res?.message
            });
        }
    }
)
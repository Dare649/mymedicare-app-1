import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

interface HqPatient {
    name : string;
    email : string;
    phone : string;
    country_code : string;
}


// create patient
export const createHqPatient = createAsyncThunk(
    "hq-patient/createHqPatient",
    async(data: HqPatient, { rejectWithValue}) => {
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


export const createHqPatientBulk = createAsyncThunk(
  "hq-patient/createHqPatientBulk",
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
export const getAllHqPatient = createAsyncThunk(
    "hq-patient/getAllHqPatient",
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


// get a partner
export const getHqPatient = createAsyncThunk(
    "hq-patient/getHqPatient",
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


// get a partner reading
interface GetHqPatientReadingArgs {
    uuid: string;
    reading: string;
}

export const getHqPatientReading = createAsyncThunk(
    "hq-patient/getHqPatientReading",
    async (
        args: GetHqPatientReadingArgs,
        thunkAPI
    ) => {
        const { uuid, reading } = args;
        try {
            const res = await axiosInstance.get(`/api/partner/${uuid}/get_all_readings/${reading}`);
            return res.data.data; 
        } catch (error: any) {
            return thunkAPI.rejectWithValue({
                message: error.response?.message
            });
        }
    }
)


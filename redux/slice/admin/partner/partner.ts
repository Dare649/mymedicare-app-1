import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

interface Partner {
    name : string;
    email : string;
    phone : string;
    country_code : string;
    type : string;
}


// create partner
export const createPartner = createAsyncThunk(
    "partner/createPartner",
    async(data: Partner, { rejectWithValue}) => {
        try {
            const res = await axiosInstance.post("/api/~admin/partner", data);
            return res.data;
        } catch (error: any) {
            return rejectWithValue({
                message: error.res?.data?.message
            })
        }
    }
);


// get all partner
export const getAllPartners = createAsyncThunk(
    "partner/getAllPartners",
    async (_, { rejectWithValue}) => {
        try {
            const res = await axiosInstance.get('/api/~admin/partners');
            return res.data.data;
        } catch (error: any) {
            return rejectWithValue({
                message: error.res?.message
            });
        }
    }
);


// get a partner
export const getPartner = createAsyncThunk(
    "partner/getPartner",
    async (uuid: string, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(`/api/~admin/partner/${uuid}`);
            return res.data.data;
        } catch (error: any) {
            return rejectWithValue({
                message: error.res?.message
            });
        }
    }
)
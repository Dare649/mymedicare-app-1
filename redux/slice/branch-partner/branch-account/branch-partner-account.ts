import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

interface BranchPartner {
    name: string;
    website: string;
    state: string;
    city: string;
    country: string;
    street_address: string;
    cp_first_name: string;
    cp_last_name: string;
    cp_email: string;
    cp_phone : string;
    cp_country_code: string;
    cp_position: string;
}

interface BranchPartnerSignnUp {
    email: string;
    password: string;
    name: string;
    referral_code: string;
}

// get branch partner
export const getBranchPartner = createAsyncThunk(
    "branch-partner-account/getBranchPartner",
    async (_, { rejectWithValue}) => {
        try {
            const res = await axiosInstance.get('/api/partner');
            return res.data.data;
        } catch (error: any) {
            return rejectWithValue({
                message: error.res?.message
            });
        }
    }
);


// update branch partner
export const updateBranchPartner = createAsyncThunk(
    "branch-partner-account/updateBranchPartner",
    async(data: BranchPartner, { rejectWithValue}) => {
        try {
            const res = await axiosInstance.post("/api/partner/update_account", data);
            return res.data;
        } catch (error: any) {
            return rejectWithValue({
                message: error.res?.data?.message
            })
        }
    }
);


// update branch partner
export const createBranchPartner = createAsyncThunk(
    "branch-partner-account/createBranchPartner",
    async(data: BranchPartnerSignnUp, { rejectWithValue}) => {
        try {
            const res = await axiosInstance.post("/api/create_branch", data);
            return res.data;
        } catch (error: any) {
            return rejectWithValue({
                message: error.res?.data?.message
            })
        }
    }
);
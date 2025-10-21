import { createSlice } from "@reduxjs/toolkit";
import {
    getAllPatient,
    getPatient,
    getAllAdminInactivePatient,
    getAllAdminRiskPatient   
} from "./patient";


interface Address {
  street_address: string;
  city: string;
  state: string;
  zip_code: string | null;
  country: string;
}


interface RmTracking {
  blood_pressure: "yes" | "no";
  blood_sugar: "yes" | "no";
  weight: "yes" | "no";
  food_log: "yes" | "no";
}

interface PatientData {
  id: number;
  user_id: number;
  uuid: string;
  name: string;
  email: string;
  country_code: string;
  phone: string;
  last_login: string;         
  active_status: string;
  status: string;              
  created_at: string;          
  sex: string;
  profile_picture: string;
  date_of_birth: string;       
  age: number;
  special_needs: string[];
  allergies: string[];
  chronic_conditions: string[];
  address: Address;
  prescription_count: number;
  consultation_count: number;
  rm_tracking?: RmTracking;
}

interface PatientState {
    getAllPatientStatus: "idle" | "isLoading" | "succeeded" | "failed";
    getPatientStatus: "idle" | "isLoading" | "succeeded" | "failed";
    status: "idle" | "isLoading" | "succeeded" | "failed";
    getAllAdminRiskPatientStatus: "idle" | "isLoading" | "succeeded" | "failed";
    getAllAdminInactivePatientStatus: "idle" | "isLoading" | "succeeded" | "failed";
    patient: PatientData | null;
    allPatient: PatientData[];
    allAdminPatient: PatientData[];
    allAdminInactivePatient: PatientData[];
    error: string | null;
};

const initialState: PatientState = {
    getAllPatientStatus: "idle",
    getPatientStatus: "idle",
    getAllAdminRiskPatientStatus: "idle",
    getAllAdminInactivePatientStatus: "idle",
    status: "idle",
    patient: null,
    allPatient: [],
    allAdminPatient: [],
    allAdminInactivePatient: [],
    error: null,
};



const adminPatientSlice = createSlice({
    name: "adminPatient",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder

        // get patient
        .addCase(getPatient.pending, (state) => {
            state.getPatientStatus = "isLoading";
        })
        .addCase(getPatient.fulfilled, (state, action) => {
            state.getPatientStatus = "succeeded";
            state.patient = action.payload;
        })
        .addCase(getPatient.rejected, (state, action) => {
            state.getPatientStatus = "failed";
            state.error = action.error.message ?? "Failed to retrieve patient"
        })

        // get all patient
        .addCase(getAllPatient.pending, (state) => {
            state.getAllPatientStatus = "isLoading";
        })
        .addCase(getAllPatient.fulfilled, (state, action) => {
            state.getAllPatientStatus = "succeeded";
            state.allPatient = Array.isArray(action.payload) ? action.payload : [];
        })
        .addCase(getAllPatient.rejected, (state, action) => {
            state.getAllPatientStatus = "failed";
            state.error = action.error.message ?? "Failed to retrieve partners list."
        })

        // get all branch partner patient at risk
        .addCase(getAllAdminRiskPatient.pending, (state) => {
        state.getAllAdminRiskPatientStatus = "isLoading";
        })
        .addCase(getAllAdminRiskPatient.fulfilled, (state, action) => {
        state.getAllAdminRiskPatientStatus = "succeeded";

        // ✅ Ensure we extract patients_at_risk array from payload.data
        const patients =
            action.payload?.data?.patients_at_risk || action.payload || [];

        state.allAdminPatient = Array.isArray(patients) ? patients : [];
        })
        .addCase(getAllAdminRiskPatient.rejected, (state, action) => {
        state.getAllAdminRiskPatientStatus = "failed";
        state.error = action.error.message ?? "Failed to retrieve list of patient at risk."
        })

        // get all  Admin partner inactive patient
        .addCase(getAllAdminInactivePatient.pending, (state) => {
        state.getAllAdminInactivePatientStatus = "isLoading";
        })
        .addCase(getAllAdminInactivePatient.fulfilled, (state, action) => {
        state.getAllAdminInactivePatientStatus = "succeeded";
        const patients =
            action.payload?.data || action.payload || [];

        state.allAdminInactivePatient = Array.isArray(patients) ? patients : [];
        })
        .addCase(getAllAdminInactivePatient.rejected, (state, action) => {
        state.getAllAdminInactivePatientStatus = "failed";
        state.error = action.error.message ?? "Failed to retrieve list of inactive patient."
        })
    },
});


export default adminPatientSlice.reducer;

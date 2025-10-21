import { createSlice } from "@reduxjs/toolkit";
import {
    createHqPatient,
    getHqPatient,
    getAllHqPatient,
    createHqPatientBulk,
    getHqPatientReading
} from "./hq-patient";

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
  createHqPatientStatus: "idle" | "isLoading" | "succeeded" | "failed";
  createHqPatientBulkStatus: "idle" | "isLoading" | "succeeded" | "failed";
  getAllHqPatientStatus: "idle" | "isLoading" | "succeeded" | "failed";
  getHqPatientStatus: "idle" | "isLoading" | "succeeded" | "failed";
  getHqPatientReadingStatus: "idle" | "isLoading" | "succeeded" | "failed";
  status: "idle" | "isLoading" | "succeeded" | "failed";
  partnerPatient: PatientData | null;
  allPartnerPatient: PatientData[];
  error: string | null;
}

const initialState: PatientState = {
  createHqPatientStatus: "idle",
  createHqPatientBulkStatus: "idle",
  getAllHqPatientStatus: "idle",
  getHqPatientStatus: "idle",
  getHqPatientReadingStatus: "idle",
  status: "idle",
  partnerPatient: null,
  allPartnerPatient: [],
  error: null,
};

const hqPartientSlice = createSlice({
  name: "partnerPatient",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Create Partner 
      .addCase(createHqPatient.pending, (state) => {
        state.createHqPatientStatus = "isLoading";
      })
      .addCase(createHqPatient.fulfilled, (state, action) => {
        state.createHqPatientStatus = "succeeded";
        state.partnerPatient = action.payload;
        state.allPartnerPatient.push(action.payload); // optionally push to the list
      })
      .addCase(createHqPatient.rejected, (state, action) => {
        state.createHqPatientStatus = "failed";
        state.error = action.error.message || "Failed to create partner";
      })


      // Create Partner bulk 
      .addCase(createHqPatientBulk.pending, (state) => {
        state.createHqPatientBulkStatus = "isLoading";
      })
      .addCase(createHqPatientBulk.fulfilled, (state, action) => {
        state.createHqPatientBulkStatus = "succeeded";
        state.partnerPatient = action.payload;
        state.allPartnerPatient.push(action.payload); // optionally push to the list
      })
      .addCase(createHqPatientBulk.rejected, (state, action) => {
        state.createHqPatientBulkStatus = "failed";
        state.error = action.error.message || "Failed to create partner";
      })

      // get partner
      .addCase(getHqPatient.pending, (state) => {
        state.getHqPatientStatus = "isLoading";
      })
      .addCase(getHqPatient.fulfilled, (state, action) => {
        state.getHqPatientStatus = "succeeded";
        state.partnerPatient = action.payload?.data || null;
      })
      .addCase(getHqPatient.rejected, (state, action) => {
        state.getHqPatientStatus = "failed";
        state.error = action.error.message ?? "Failed to retrieve partner"
      })

      // get partner readings
      .addCase(getHqPatientReading.pending, (state) => {
        state.getHqPatientReadingStatus = "isLoading";
      })
      .addCase(getHqPatientReading.fulfilled, (state, action) => {
        state.getHqPatientReadingStatus = "succeeded";
        state.partnerPatient = action.payload;
      })
      .addCase(getHqPatientReading.rejected, (state, action) => {
        state.getHqPatientReadingStatus = "failed";
        state.error = action.error.message ?? "Failed to retrieve patient reading"
      })

      // get all partner
      .addCase(getAllHqPatient.pending, (state) => {
        state.getAllHqPatientStatus = "isLoading";
      })
      .addCase(getAllHqPatient.fulfilled, (state, action) => {
        state.getAllHqPatientStatus = "succeeded";
        state.allPartnerPatient = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getAllHqPatient.rejected, (state, action) => {
        state.getAllHqPatientStatus = "failed";
        state.error = action.error.message ?? "Failed to retrieve partners list."
      })
  },
});

export default hqPartientSlice.reducer;

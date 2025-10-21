import { createSlice } from "@reduxjs/toolkit";
import { 
  createPartner,
  getAllPartners,
  getPartner, 
} from "./partner";

interface PartnerData {
  id: number;
  name: string;
  email: string;
  phone: string;
  country_code: string;
  type: string;
  created_at: string;
  user_id: number;
  uuid: string;
  website: string;
  status: string;
  role: string;
  balance: string;
}

interface PartnerState {
  createPartnerStatus: "idle" | "isLoading" | "succeeded" | "failed";
  getAllPartnersStatus: "idle" | "isLoading" | "succeeded" | "failed";
  getPartnerStatus: "idle" | "isLoading" | "succeeded" | "failed";
  status: "idle" | "isLoading" | "succeeded" | "failed";
  partner: PartnerData | null;
  allPartner: PartnerData[];
  error: string | null;
}

const initialState: PartnerState = {
  createPartnerStatus: "idle",
  getAllPartnersStatus: "idle",
  getPartnerStatus: "idle",
  status: "idle",
  partner: null,
  allPartner: [],
  error: null,
};

const adminPartnerSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Create Partner 
      .addCase(createPartner.pending, (state) => {
        state.createPartnerStatus = "isLoading";
      })
      .addCase(createPartner.fulfilled, (state, action) => {
        state.createPartnerStatus = "succeeded";
        state.partner = action.payload;
        state.allPartner.push(action.payload); // optionally push to the list
      })
      .addCase(createPartner.rejected, (state, action) => {
        state.createPartnerStatus = "failed";
        state.error = action.error.message || "Failed to create partner";
      })

      // get partner
      .addCase(getPartner.pending, (state) => {
        state.getPartnerStatus = "isLoading";
      })
      .addCase(getPartner.fulfilled, (state, action) => {
        state.getPartnerStatus = "succeeded";
        state.partner = action.payload;
      })
      .addCase(getPartner.rejected, (state, action) => {
        state.getPartnerStatus = "failed";
        state.error = action.error.message ?? "Failed to retrieve partner"
      })

      // get all partner
      .addCase(getAllPartners.pending, (state) => {
        state.getAllPartnersStatus = "isLoading";
      })
      .addCase(getAllPartners.fulfilled, (state, action) => {
        state.getAllPartnersStatus = "succeeded";
        state.allPartner = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getAllPartners.rejected, (state, action) => {
        state.getAllPartnersStatus = "failed";
        state.error = action.error.message ?? "Failed to retrieve partners list."
      })
  },
});

export default adminPartnerSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { getHqBranches } from "./hq-branches";

// Define the structure of a single HQ Branch
interface HqBranchesData {
    id: number,
    user_id: string,
    uuid: string,
    name: string,
    email: string,
    referral_code: string,
    country_code: string,
    phone: string,
    website: string,
    type: string,
    status: string,
    role: string,
    has_contact_person: boolean,
    balance: string,
    patient_count: number,
    total_vital_readings: number,
    address: string | null,
    contact_person: string | null,
    created_at: string
}


// Define the Redux state structure
interface HqBranchesState {
  getHqBranchesStatus: "idle" | "isLoading" | "succeeded" | "failed";
  status: "idle" | "isLoading" | "succeeded" | "failed";
  hqBranches: HqBranchesData | null;
  allHqBranches: HqBranchesData[];
  error: string | null;
}

// Initial state
const initialState: HqBranchesState = {
  getHqBranchesStatus: "idle",
  status: "idle",
  hqBranches: null,
  allHqBranches: [],
  error: null,
};

// Slice
const hqBranchesSlice = createSlice({
  name: "hqBranches", 
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all HQ branches
      .addCase(getHqBranches.pending, (state) => {
        state.getHqBranchesStatus = "isLoading";
      })
      .addCase(getHqBranches.fulfilled, (state, action) => {
        state.getHqBranchesStatus = "succeeded";
        const branches = action.payload?.data?.branches || [];
        state.allHqBranches = Array.isArray(branches) ? branches : [];
      })

      .addCase(getHqBranches.rejected, (state, action) => {
        state.getHqBranchesStatus = "failed";
        state.error =
          action.error.message ??
          "Failed to retrieve headquarters branches list.";
      });
  },
});

// Export reducer
export default hqBranchesSlice.reducer;

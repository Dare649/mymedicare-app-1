import { createSlice } from "@reduxjs/toolkit";
import {
    getSignedInUser,
    resendOtp,
    signIn,
    signUp,
    verifyOtp,
    getDoctorSpeciality,
    resetPassword,
} from "./auth";

  interface Auth {
    createdAt?: string;
    id: string;
    name: string,
    email: string,
    role: string,
    country_code: string,
    phone: string,
    password: string,
    speciality_id: string,
    profile_picture: string,
    has_contact_person: boolean,
  }
  
  interface AuthState {
    user: Auth | null; 
    token: string | null;
    signInStatus: "idle" | "isLoading" | "succeeded" | "failed";
    signUpStatus: "idle" | "isLoading" | "succeeded" | "failed";
    resetPasswordStatus: "idle" | "isLoading" | "succeeded" | "failed";
    verifyOtpStatus: "idle" | "isLoading" | "succeeded" | "failed";
    getDoctorSpecialityStatus: "idle" | "isLoading" | "succeeded" | "failed";
    resendOtpStatus: "idle" | "isLoading" | "succeeded" | "failed";
    getSignedInUserStatus: "idle" | "isLoading" | "succeeded" | "failed";
    error: string | null;
    doctorSpecialty: Auth[];
  }
  
  const initialState: AuthState = {
    user: null, // Change from an array to null
    token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
    signInStatus: "idle",
    signUpStatus: "idle",
    resetPasswordStatus: "idle",
    verifyOtpStatus: "idle",
    resendOtpStatus: "idle",
    getSignedInUserStatus: "idle",
    getDoctorSpecialityStatus: "idle",
    error: null,
    doctorSpecialty: [],
  };
  
  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Handle sign in
        .addCase(signIn.pending, (state) => {
          state.signInStatus = "isLoading";
        })
        .addCase(signIn.fulfilled, (state, action) => {
          state.signInStatus = "succeeded";
          // The payload structure is: { message, status, data: { user, token } }
          const { user, token } = action.payload.data;
          state.token = token;
          state.user = user;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          console.log('login user', user);
          console.log('login token', token);
        })
        .addCase(signIn.rejected, (state, action) => {
          state.signInStatus = "failed";
          state.error = action.error.message || "Failed to sign in, try again.";
        })
  
        // Handle fetching signed-in user
        .addCase(getSignedInUser.pending, (state) => {
          state.getSignedInUserStatus = "isLoading";
        })
        .addCase(getSignedInUser.fulfilled, (state, action) => {
          state.getSignedInUserStatus = "succeeded";
          state.user = action.payload; // Save fetched user data
        })
        .addCase(getSignedInUser.rejected, (state, action) => {
          state.getSignedInUserStatus = "failed";
          state.error = action.error.message || "Failed to get signed-in user.";
        })
  
        // Handle sign up
        .addCase(signUp.pending, (state) => {
          state.signUpStatus = "isLoading";
        })
        .addCase(signUp.fulfilled, (state, action) => {
          state.signUpStatus = "succeeded";
          state.user = action.payload.user; // Save user info here
        })
        .addCase(signUp.rejected, (state, action) => {
          state.signUpStatus = "failed";
          state.error = action.error.message || "Failed to sign up, try again.";
        })

        // Handle reset password
        .addCase(resetPassword.pending, (state) => {
          state.resetPasswordStatus = "isLoading";
        })
        .addCase(resetPassword.fulfilled, (state, action) => {
          state.resetPasswordStatus = "succeeded";
          state.user = action.payload.user; // Save user info here
        })
        .addCase(resetPassword.rejected, (state, action) => {
          state.resetPasswordStatus = "failed";
          state.error = action.error.message || "Failed to reset password, try again.";
        })
  
        // Handle OTP verification
        .addCase(verifyOtp.pending, (state) => {
          state.verifyOtpStatus = "isLoading";
        })
        .addCase(verifyOtp.fulfilled, (state, action) => {
          state.verifyOtpStatus = "succeeded";
        })
        .addCase(verifyOtp.rejected, (state, action) => {
          state.verifyOtpStatus = "failed";
          state.error =
            action.error.message || "OTP verification failed, try again.";
        })
  
        // Handle OTP resend
        .addCase(resendOtp.pending, (state) => {
          state.resendOtpStatus = "isLoading";
        })
        .addCase(resendOtp.fulfilled, (state) => {
          state.resendOtpStatus = "succeeded";
        })
        .addCase(resendOtp.rejected, (state, action) => {
          state.resendOtpStatus = "failed";
          state.error = action.error.message || "Failed to resend OTP, try again.";
        })


        .addCase(getDoctorSpeciality.pending, (state) => {
          state.getDoctorSpecialityStatus = "isLoading";
        })
        .addCase(getDoctorSpeciality.fulfilled, (state, action) => {
          state.doctorSpecialty = action.payload;
          state.getDoctorSpecialityStatus = "succeeded";
        })
        .addCase(getDoctorSpeciality.rejected, (state, action) => {
          state.getDoctorSpecialityStatus = "failed";
          state.error = action.error.message ?? "Failed to get request";
        })
    },
  });
  
  export default authSlice.reducer;
  
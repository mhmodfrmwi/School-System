import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
  participants: [],
  loading: false, 
  error: null, 
};


export const getParticipants = createAsyncThunk(
  "participants/getParticipants",
  async (schoolHubId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      const response = await fetch(
        `http://localhost:4000/api/v1/manager/school-hub/${schoolHubId}/participants`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const participantsSlice = createSlice({
  name: "participant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    
      .addCase(getParticipants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
     
      .addCase(getParticipants.fulfilled, (state, action) => {
        state.loading = false;
        state.participants = action.payload.participations || [];
      })
   
      .addCase(getParticipants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch participants";
      });
  },
});


export default participantsSlice.reducer;
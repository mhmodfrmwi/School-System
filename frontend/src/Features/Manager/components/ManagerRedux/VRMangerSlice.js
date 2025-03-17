import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getToken = () => sessionStorage.getItem("token");

export const fetchVirtualRooms = createAsyncThunk(
    "virtualRooms/fetchVirtualRooms",
    async (_, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (!token) {
          return rejectWithValue("Authentication required. Please log in.");
        }
  
        const response = await fetch("http://localhost:4000/api/v1/manager/virtualRoom", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log("API Response:", response); 
  
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to fetch virtual rooms");
        }
  
        const data = await response.json();
        return data.virtualRooms;
      } catch (error) {
        console.error("API Error:", error); 
        return rejectWithValue(error.message);
      }
    }
  );

// Post Virtual Room (new code)
export const postVR = createAsyncThunk(
  "virtualRooms/postVR",
  async (virtualRoomData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Authentication required. Please log in.");
      }

      const response = await fetch("http://localhost:4000/api/v1/manager/virtualRoom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(virtualRoomData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//delete vr
export const deleteVR = createAsyncThunk(
    "virtualRooms/deleteVirtualRooms",
    async (id, { rejectWithValue }) => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/manager/virtualRoom/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        });
  
        if (!response.ok) {
          const error = await response.json();
          return rejectWithValue(error.message || "Failed to delete vr");
        }
  
        return id; // Return the deleted id to update state
      } catch (error) {
        return rejectWithValue(error.message || "Failed to delete vr");
      }
    }
  );
//update vr
export const updateVirtualRoom = createAsyncThunk(
    "VirtualRooms/updaterVirtualRoom",
    async ({ id, formData }, { rejectWithValue }) => {
      try {
        console.log("Sending update request:", id, formData);
  
        const response = await fetch(
          `http://localhost:4000/api/v1/manager/virtualRoom/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify(formData), 
          }
        );
  
        if (!response.ok) {
          const errorText = await response.text(); 
          console.error("API Error Response:", errorText);
          throw new Error(`Failed to update VR: ${errorText}`);
        }
        const data = await response.json();
        return { id, updatedRoom: data };
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
const virtualRoomSlice = createSlice({
  name: "virtualRooms",
  initialState: {
    virtualRooms: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchVirtualRooms.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVirtualRooms.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.virtualRooms = action.payload;
      })
      .addCase(fetchVirtualRooms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(postVR.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postVR.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.virtualRooms.push(action.payload); 
      })
      .addCase(postVR.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteVR.fulfilled, (state, action) => {
        state.virtualRooms = state.virtualRooms.filter((room) => room._id !== action.payload);
      })
      .addCase(deleteVR.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default virtualRoomSlice.reducer;
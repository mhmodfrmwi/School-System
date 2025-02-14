import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const getToken = () => sessionStorage.getItem("token");

// Fetch Materials
export const fetchVR = createAsyncThunk(
    "teacherVirtualRooms/getTeacherVirtualRoom",
    async (grade_subject_semester_id, { rejectWithValue }) => {
        try {
            const token = getToken();
            if (!token) {
                return rejectWithValue("Authentication required. Please log in.");
            }
            if (!grade_subject_semester_id) {
                return rejectWithValue("Invalid ID: grade_subject_semester_id is missing.");
              }

            const url = `http://localhost:4000/api/v1/teacher/Teacher-virtualRoom/${grade_subject_semester_id}`;
            console.log("Fetching virtual rooms from:", url);

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Failed to fetch virtual rooms.");
            }

            const data = await response.json();
            console.log("Fetched Virtual Rooms:", data); 
            console.log("API Response Structure:", data);

            return data.virtualRooms; 
        } catch (error) {
            console.error("API Error:", error.message);
            return rejectWithValue(error.message || "API Request Failed");
        }
    }
);

// Delete Material
export const deleteVR = createAsyncThunk(
    "materials/deleteMaterial",
    async (id, { rejectWithValue }) => {
        try {
            console.log("Deleting vr with ID:", id); 

            if (!id) {
                return rejectWithValue("Invalid vr ID");
            }

            const response = await fetch(`http://localhost:4000/api/v1/teacher/virtualRoom/${id}`, {
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

            return id;
        } catch (error) {
            return rejectWithValue(error.message || "Failed to delete vr");
        }
    }
);

//update
export const updateTeacherVirtualRoom = createAsyncThunk(
    "teacherVirtualRooms/updateTeacherVirtualRoom",
    async ({ id, formData }, { rejectWithValue }) => {
      try {
        console.log("Sending update request:", id, formData);
  
        const response = await fetch(
          `http://localhost:4000/api/v1/teacher/virtualRoom/${id}`,
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
         //toast.success("Updated VR successfully"); 
        const data = await response.json();
        return { id, updatedRoom: data };
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
// Post PDF Material
export const createTeacherVirtualRoom = createAsyncThunk(
    "teacherVirtualRooms/createTeacherVirtualRoom",
    async (formData, { rejectWithValue }) => {
        try {
            const token = getToken();
            if (!token) {
                return rejectWithValue("Authentication required. Please log in.");
            }

            const { class_id, grade_subject_semester_id, ...restFormData } = formData;
            const apiUrl = `http://localhost:4000/api/v1/teacher/virtualRoom/${grade_subject_semester_id}/${class_id}`;

            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(restFormData),
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

const PdfMaterial = createSlice({
    name: "teacherVirtualRooms",
   initialState: {
    teacherVirtualRooms: [],
    status: "idle",
    error: null,
    loading: false,
    message: null,
    },
    reducers: {
        clearMessage: (state) => {
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchVR.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchVR.fulfilled, (state, action) => {
            console.log("Reducer received data:", action.payload); 
            state.teacherVirtualRooms = action.payload; 
            state.loading = false;
        })
        .addCase(fetchVR.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
            .addCase(createTeacherVirtualRoom.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(createTeacherVirtualRoom.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.teacherVirtualRooms.push(action.payload);
                toast.success("Teacher virtual room created successfully!");
            })
            .addCase(createTeacherVirtualRoom.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to create teacher virtual room";
                toast.error(state.error);
            })
            .addCase(deleteVR.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.teacherVirtualRooms = state.teacherVirtualRooms.filter(
                    (material) => material.id !== action.payload
                );
                toast.success("Material deleted successfully");
            })
            .addCase(deleteVR.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to delete material";
                state.loading = false;
                toast.error(state.error);
            });
    },
});

export default PdfMaterial.reducer;

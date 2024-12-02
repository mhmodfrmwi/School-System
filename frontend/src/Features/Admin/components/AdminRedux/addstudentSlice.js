import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  phoneNumber: "",
  studentClass: "",
  gender: "",
  status: "idle",
  error: null,
};

export const postStudent = createAsyncThunk(
  "addstudent/postStudent",
  async (studentData, { rejectWithValue }) => {
    // console.log(studentData);
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/auth/register",
        {
          method: "POST",
          body: JSON.stringify(studentData),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) {
        throw new Error("Failed to post student data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to post student data");
    }
  },
);

const addstudentSlice = createSlice({
  name: "addstudent",
  initialState,
  reducers: {
    addStudenttoserver: {
      prepare(fullName, email, password, phoneNumber, studentClass, gender) {
        return {
          payload: {
            fullName,
            email,
            password,
            phoneNumber,
            studentClass,
            gender,
          },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.email = action.payload.email;
        state.password = action.payload.password;
        state.phoneNumber = action.payload.phoneNumber;
        state.studentClass = action.payload.studentClass;
        state.gender = action.payload.gender;
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postStudent.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(postStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        Object.assign(state, action.payload);
      })
      .addCase(postStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { addStudenttoserver } = addstudentSlice.actions;
export default addstudentSlice.reducer;

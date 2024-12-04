import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  students: [],
  fullName: "",
  email: "",
  password: "",
  phoneNumber: "",
  studentClass: "",
  gender: "",
  status: "idle",
  message: "",
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


export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await fetch(
      "http://localhost:4000/api/v1/getUsers/students",
    );
    const data = await response.json();
    const students = data.students;
    // console.log(students);

    return students;
  },
);

export const removeStudent = createAsyncThunk(
  "students/removeStudent",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/getUsers/students/${id}`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) {
        throw new Error("Failed to delete student");
      }
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    editStudent: (state, action) => {
      const index = state.students.findIndex(
        (student) => student.id === action.payload.id,
      );
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },
    clearMessage: (state) => {
      state.message = "";
    },
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
    })
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(removeStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = state.students.filter(
          (student) => student.id !== action.payload,
        );
        state.message = "Student deleted successfully";
      })
      .addCase(removeStudent.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export const { addStudent, editStudent, clearMessage ,addStudenttoserver} = studentSlice.actions;

export default studentSlice.reducer;

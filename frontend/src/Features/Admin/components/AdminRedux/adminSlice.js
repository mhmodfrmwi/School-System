import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  phoneNumber: "",
  gender: "",
  status: "idle",
  error: null,
  admins: [],
  message: "",
};

export const postAdmin = createAsyncThunk(
  'addadmin/postAdmin',
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/auth/register", // تعديل المسار حسب API الخاص بك
        {
          method: 'POST',
          body: JSON.stringify(adminData),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to post admin data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to post admin data');
    }
  }
);


export const fetchAdmins = createAsyncThunk(
  "admins/fetchAdmins",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/getUsers/admins",
      );

      if (!response.ok) {
        throw new Error("Failed to fetch admins");
      }

      const data = await response.json();
      return data.admins;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const removeAdmin = createAsyncThunk(
  "admins/removeAdmin",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/getUsers/admins/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete admin");
      }
      dispatch(fetchAdmins());
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const adminSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {
    addAdmin: (state, action) => {
      state.admins.push(action.payload);
    },
    editAdmin: (state, action) => {
      const index = state.admins.findIndex(
        (admin) => admin.id === action.payload.id,
      );
      if (index !== -1) {
        state.admins[index] = action.payload;
      }
    },
    clearMessage: (state) => {
      state.message = "";
    },
    addAdmintoServer: {
      prepare(fullName, email, password, phoneNumber, gender) {
        return {
          payload: {
            fullName,
            email,
            password,
            phoneNumber,
            gender,
          },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.email = action.payload.email;
        state.password = action.payload.password;
        state.phoneNumber = action.payload.phoneNumber;
        state.gender = action.payload.gender;
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postAdmin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(postAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        Object.assign(state, action.payload);
      })
      .addCase(postAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchAdmins.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.admins = action.payload;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })

      .addCase(removeAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.admins = state.admins.filter(
          (admin) => admin.id !== action.payload,
        );
        state.message = "Admin deleted successfully";
      })
      .addCase(removeAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export const { addAdmin, editAdmin, clearMessage, addAdmintoServer } =
  adminSlice.actions;

export default adminSlice.reducer;

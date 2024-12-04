import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  phoneNumber: "",
  gender: "",
  status: "idle",
  error: null,
  bosses: [],
  message: "",
  loading: false,
};

export const postBosse = createAsyncThunk(
  "bosses/postBosse",
  async (bossesData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/auth/register",
        {
          method: "POST",
          body: JSON.stringify(bossesData),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        return toast.error(error.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const fetchBosses = createAsyncThunk(
  "bosses/fetchBosses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/getUsers/bosses",
      );

      if (!response.ok) {
        const error = await response.json();
        return toast.error(error.message);
      }

      const data = await response.json();
      return data.bosses;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const removeBosse = createAsyncThunk(
  "bosses/removeBosse",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/getUsers/bosses/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        return toast.error(error.message);
      }

      dispatch(fetchBosses());

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const bossesSlice = createSlice({
  name: "bosses",
  initialState,
  reducers: {
    addBosse: (state, action) => {
      state.bosses.push(action.payload);
    },
    editBosse: (state, action) => {
      const index = state.bosses.findIndex(
        (bosses) => bosses.id === action.payload.id,
      );
      if (index !== -1) {
        state.bosses[index] = action.payload;
      }
    },
    clearMessage: (state) => {
      state.message = "";
    },
    addBossetoServer: {
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
      .addCase(postBosse.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(postBosse.fulfilled, (state, action) => {
        state.status = "succeeded";
        Object.assign(state, action.payload);
      })
      .addCase(postBosse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchBosses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBosses.fulfilled, (state, action) => {
        state.loading = false;
        state.bosses = action.payload;
      })
      .addCase(fetchBosses.rejected, (state) => {
        state.loading = false;
      })
      .addCase(removeBosse.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeBosse.fulfilled, (state, action) => {
        state.loading = false;
        state.bosses = state.bosses.filter(
          (bosse) => bosse.id !== action.payload,
        );
        state.message = "Bosses deleted successfully";
      })
      .addCase(removeBosse.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearMessage, addBosse, editBosse, addBossetoServer } =
  bossesSlice.actions;

export default bossesSlice.reducer;

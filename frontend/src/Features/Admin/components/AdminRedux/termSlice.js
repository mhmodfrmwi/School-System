import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  startYear: "",
  endYear: "",
  term: "",
  terms: [],
  status: "idle",
  error: null,
  message: "",
  loading: false,
};

const getAuthToken = () => {
  return sessionStorage.getItem("token") || "";
};

export const postTerm = createAsyncThunk(
  "terms/postTerm",
  async (termData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/semester/createSemester",
        {
          method: "POST",
          body: JSON.stringify(termData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuthToken()}`,
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to post term data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to post term data");
    }
  },
);

export const fetchTerms = createAsyncThunk(
  "terms/fetchTerms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/semester",
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data.semesters;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch terms");
    }
  },
);

export const editTermAsync = createAsyncThunk(
  "terms/editTermAsync",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/semester/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(updatedData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuthToken()}`,
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to edit term");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const removeTerm = createAsyncThunk(
  "terms/removeTerm",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/semester/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuthToken()}`,
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      dispatch(fetchTerms());
      return id;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to remove term");
    }
  },
);

const termsSlice = createSlice({
  name: "terms",
  initialState,
  reducers: {
    addTerm: (state, action) => {
      state.terms.push(action.payload);
    },
    editTerm: (state, action) => {
      const index = state.terms.findIndex(
        (term) => term.id === action.payload.id,
      );
      if (index !== -1) {
        state.terms[index] = action.payload;
      }
    },
    clearMessage: (state) => {
      state.message = "";
    },
    addTermToServer: {
      prepare(startYear, endYear, term) {
        return {
          payload: {
            startYear,
            endYear,
            term,
          },
        };
      },
      reducer(state, action) {
        state.startYear = action.payload.startYear;
        state.endYear = action.payload.endYear;
        state.term = action.payload.term;
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postTerm.pending, (state) => {
        state.status = "loading";
        state.error = "";
        state.loading = true;
      })
      .addCase(postTerm.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.terms.push(action.payload);
        toast.success("Term added successfully");
      })
      .addCase(postTerm.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to post term data";
        state.loading = false;
        toast.error(state.error);
      })
      .addCase(fetchTerms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTerms.fulfilled, (state, action) => {
        state.loading = false;
        state.terms = action.payload;
      })
      .addCase(fetchTerms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch terms";
        if (
          state.error.includes("NetworkError") ||
          state.error.includes("Token is required!")
        ) {
          // Handle network error case
        } else {
          toast.error(state.error);
        }
      })
      .addCase(removeTerm.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(removeTerm.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.terms = state.terms.filter((term) => term._id !== action.payload);
        toast.success("Term deleted successfully!");
        state.loading = false;
      })
      .addCase(removeTerm.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to remove term";
        state.loading = false;
        toast.error(state.error);
      })
      .addCase(editTermAsync.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(editTermAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTerm = action.payload.semester;
        const index = state.terms.findIndex(
          (term) => term._id === updatedTerm._id,
        );
        if (index !== -1) {
          state.terms[index] = updatedTerm;
        }
        state.message = "Term updated successfully";
        toast.success("Term updated successfully");
      })
      .addCase(editTermAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to edit term";
        toast.error(state.error);
      });
  },
});

export const { clearMessage, addTerm, editTerm, addTermToServer } =
  termsSlice.actions;
export default termsSlice.reducer;

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

// Post a new term
export const postTerm = createAsyncThunk(
  "terms/postTerm",
  async (termData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/addTerm",
        {
          method: "POST",
          body: JSON.stringify(termData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post term data");
      }

      const data = await response.json();
      return data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to post term data");
    }
  },
);

// Fetch all terms
export const fetchTerms = createAsyncThunk(
  "terms/fetchTerms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/admin/terms");

      if (!response.ok) {
        throw new Error("Failed to fetch terms");
      }

      const data = await response.json();
      return data.terms;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const editTermAsync = createAsyncThunk(
  "terms/editTermAsync",
  async ({ id, updatedTerm }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/terms/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedTerm),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit term");
      }

      const data = await response.json();
      return data.term;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Remove a term
export const removeTerm = createAsyncThunk(
  "terms/removeTerm",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/admin/terms/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        return toast.error(error.message);
      }

      dispatch(fetchTerms());

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
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
        (term) => term.id === action.payload.id
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
        state.error = null;
      })
      .addCase(postTerm.fulfilled, (state, action) => {
        state.status = "succeeded";
        Object.assign(state, action.payload);
      })
      .addCase(postTerm.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchTerms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTerms.fulfilled, (state, action) => {
        state.loading = false;
        state.terms = action.payload;
      })
      .addCase(fetchTerms.rejected, (state) => {
        state.loading = false;
      })
      .addCase(removeTerm.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeTerm.fulfilled, (state, action) => {
        state.loading = false;
        state.terms = state.terms.filter((term) => term.id !== action.payload);
        state.message = "Term deleted successfully";
      })
      .addCase(removeTerm.rejected, (state) => {
        state.loading = false;
      }).addCase(editTermAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTermAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTerm = action.payload;
        const index = state.terms.findIndex((term) => term._id === updatedTerm._id);
        if (index !== -1) {
          state.terms[index] = updatedTerm;
        }
        state.message = "Term updated successfully";
      }
    )
      .addCase(editTermAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
  },
});

export const { clearMessage, addTerm, editTerm, addTermToServer } = termsSlice.actions;

export default termsSlice.reducer;

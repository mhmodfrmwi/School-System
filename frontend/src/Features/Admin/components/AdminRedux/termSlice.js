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
    console.log(termData);
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/semester/createSemester",
        {
          method: "POST",
          body: JSON.stringify(termData),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response from server:", errorData); // Log server error
        throw new Error(errorData.message || "Failed to post term data");
      }

      const data = await response.json();
      toast.success("Term added successfully");
      return data;
    } catch (error) {
      console.error("Error in postTerm:", error); // Log client-side error
      toast.error(error.message || "Failed to post term data");
      return rejectWithValue(error.message || "Failed to post term data");
    }
  },
);

// Fetch all terms
export const fetchTerms = createAsyncThunk(
  "terms/fetchTerms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/semester",
      );

      if (!response.ok) {
        throw new Error("Failed to fetch terms");
      }

      const data = await response.json();
      return data.semesters;
    } catch (error) {
      toast.error(error.message || "Failed to fetch terms");
      return rejectWithValue(error.message);
    }
  },
);

// Edit a term
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
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        throw new Error(errorData.message || "Failed to edit term");
      }

      const data = await response.json();
      console.log("Server response:", data);
      return data;
    } catch (error) {
      toast.error(error.message || "Failed to edit term");
      return rejectWithValue(error.message);
    }
  }
);
// Remove a term
export const removeTerm = createAsyncThunk(
  "terms/removeTerm",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/admin/semester/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }
      toast.success(" Term deleted successfully!");
      dispatch(fetchTerms());
      return id;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to remove manager");
    }
  }
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
        state.error = null;
        state.loading = true;
      })
      .addCase(postTerm.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.terms.push(action.payload);
      })
      .addCase(postTerm.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.loading = false;
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
        state.status = "loading";
        state.loading = true;
      })
      .addCase(removeTerm.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.managers = state.managers.filter(
          (term) => term._id !== action.payload
        );
        toast.success("Term deleted successfully!");
        state.loading = false;
      })
      .addCase(removeTerm.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to remove manager";
        state.loading = false;
        toast.error(state.error); // here
      })
      .addCase(editTermAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTermAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTerm = action.payload.semester;
        const index = state.terms.findIndex((term) => term._id === updatedTerm._id);
        if (index !== -1) {
          state.terms[index] = updatedTerm;
        }
        state.message = "Term updated successfully";
      })
      .addCase(editTermAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessage, addTerm, editTerm, addTermToServer } =
  termsSlice.actions;

export default termsSlice.reducer;

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
        throw new Error(errorData.message || "Failed to post term data");
      }

      const data = await response.json();
    
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
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/semester",
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
        throw new Error(errorData.message || "Failed to edit term");
      }

      const data = await response.json();
      return data;
    } catch (error) {
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
        state.error = ""; // Ensure error is not null
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
        state.error = action.payload || "Failed to post term data"; // Fallback to default error
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
        state.error = action.payload || "Failed to fetch terms"; // Fallback to default error
        if (state.error.includes("NetworkError")) {
          // Optionally handle network error case
        } else {
          toast.error(state.error); // Show toast with the error message
        }
      })
      .addCase(removeTerm.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(removeTerm.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.terms = state.terms.filter(
          (term) => term._id !== action.payload
        );
        toast.success("Term deleted successfully!");
        state.loading = false;
      })
      .addCase(removeTerm.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to remove term"; // Fallback to default error
        state.loading = false;
        toast.error(state.error); // Show toast with the error message
      })
      .addCase(editTermAsync.pending, (state) => {
        state.loading = true;
        state.error = ""; // Ensure error is not null
      })
      .addCase(editTermAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTerm = action.payload.semester;
        const index = state.terms.findIndex((term) => term._id === updatedTerm._id);
        if (index !== -1) {
          state.terms[index] = updatedTerm;
        }
        state.message = "Term updated successfully";
        toast.success("Term updated successfully");
      })
      .addCase(editTermAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to edit term"; // Fallback to default error
        toast.error(state.error); // Show toast with the error message
      });
  }
  
});

export const { clearMessage, addTerm, editTerm, addTermToServer } =
  termsSlice.actions;

export default termsSlice.reducer;

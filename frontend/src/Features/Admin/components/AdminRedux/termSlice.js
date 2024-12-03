import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  terms: [],
  status: "idle",
  message: "",
};

// Fetch all terms
export const fetchTerms = createAsyncThunk(
  "terms/fetchTerms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/terms");
      if (!response.ok) {
        throw new Error("Failed to fetch terms");
      }
      const data = await response.json();
      return data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add a new term
export const addTermAsync = createAsyncThunk(
  "terms/addTerm",
  async (newTerm, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/terms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTerm),
      });

      if (!response.ok) {
        throw new Error("Failed to add term");
      }

      const data = await response.json();
      return data; // Assuming it returns the created term
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Edit an existing term
export const editTermAsync = createAsyncThunk(
  "terms/editTerm",
  async ({ id, updatedTerm }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/terms/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTerm),
      });

      if (!response.ok) {
        throw new Error(`Failed to edit term: ${response.statusText}`);
      }

      const data = await response.json();
      return data; // Return the updated term
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Remove a term
export const removeTerm = createAsyncThunk(
  "terms/removeTerm",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/terms/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete term");
      }

      return id; // Return the id of the deleted term
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create a slice
const termSlice = createSlice({
  name: "terms",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Terms
      .addCase(fetchTerms.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTerms.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.terms = action.payload;
      })
      .addCase(fetchTerms.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })

      // Add Term
      .addCase(addTermAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTermAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.terms.push(action.payload);
        state.message = "Term added successfully";
      })
      .addCase(addTermAsync.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })

      // Edit Term
      .addCase(editTermAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editTermAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.terms.findIndex((term) => term.id === action.payload.id);
        if (index !== -1) {
          state.terms[index] = action.payload; // Update the term in the state
        }
        state.message = "Term updated successfully";
      })
      .addCase(editTermAsync.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })

      // Delete Term
      .addCase(removeTerm.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeTerm.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.terms = state.terms.filter((term) => term.id !== action.payload); // Remove the term from the state
        state.message = "Term deleted successfully";
      })
      .addCase(removeTerm.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export const { clearMessage } = termSlice.actions;

export default termSlice.reducer;

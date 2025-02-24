import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const getToken = () => sessionStorage.getItem("token");
const BASE_URL = "http://localhost:4000/api/v1/";
const initialState = {
  status: "idle",
  error: null,
  generalLibrary: [],
  loading: false,
  message: "",
};

export const createLibraryItem = createAsyncThunk(
  "generalLibrary/createLibraryItem",
  async (libraryItemData, { rejectWithValue }) => {
    console.log(libraryItemData);
    try {
      const response = await fetch(`${BASE_URL}general/create-library-item`, {
        method: "POST",
        body: JSON.stringify(libraryItemData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchLibraryItems = createAsyncThunk(
  "generalLibrary/fetchLibraryItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}general/get-library-items`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();

      return data.libraryItems;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchLibraryItemById = createAsyncThunk(
  "generalLibrary/fetchLibraryItemById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}general/get-library-item/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data.libraryItem;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateLibraryItemById = createAsyncThunk(
  "generalLibrary/updateLibraryItemById",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}general/get-library-item/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(updatedData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      toast.success("library item updated");
      return data.libraryItem;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteLibraryItemById = createAsyncThunk(
  "generalLibrary/deleteLibraryItemById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}general/get-library-item/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const generalLibrarySlice = createSlice({
  name: "generalLibrary",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle createLibraryItem
      .addCase(createLibraryItem.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(createLibraryItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.generalLibrary.push(action.payload);
        toast.success("Library item added successfully!");
      })
      .addCase(createLibraryItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to create library item";
        toast.error(state.error);
      })

      // Handle fetchLibraryItems
      .addCase(fetchLibraryItems.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchLibraryItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.generalLibrary = action.payload;
        state.loading = false;
      })
      .addCase(fetchLibraryItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch library items";
        state.loading = false;
        if (
          !state.error.includes("NetworkError") &&
          !state.error.includes("Token is required!")
        ) {
          toast.error(state.error);
        }
      })

      // Handle fetchLibraryItemById
      .addCase(fetchLibraryItemById.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchLibraryItemById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.generalLibrary = action.payload;
        state.loading = false;
      })
      .addCase(fetchLibraryItemById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch library item by ID";
        state.loading = false;
        if (
          !state.error.includes("NetworkError") &&
          !state.error.includes("Token is required!")
        ) {
          toast.error(state.error);
        }
      })

      // Handle updateLibraryItemById
      .addCase(updateLibraryItemById.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(updateLibraryItemById.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.generalLibrary.findIndex(
          (item) => item._id === action.payload._id,
        );
        if (index !== -1) {
          state.generalLibrary[index] = action.payload;
        }
      })
      .addCase(updateLibraryItemById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to update library item";
      })

      // Handle deleteLibraryItemById
      .addCase(deleteLibraryItemById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteLibraryItemById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.generalLibrary = state.generalLibrary.filter(
          (item) => item._id !== action.payload,
        );
      })
      .addCase(deleteLibraryItemById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to delete library item";
      });
  },
});

export const { clearMessage } = generalLibrarySlice.actions;
export default generalLibrarySlice.reducer;

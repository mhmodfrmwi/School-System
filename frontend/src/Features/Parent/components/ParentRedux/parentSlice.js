import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedKid: JSON.parse(localStorage.getItem('selectedKid')) || null,
  kidsList: [],
  status: 'idle',
  error: null
};

const parentKidsSlice = createSlice({
  name: 'parentKids',
  initialState,
  reducers: {
    setSelectedKid: (state, action) => {
      state.selectedKid = action.payload;
      localStorage.setItem('selectedKid', JSON.stringify(action.payload));
    },
    clearSelectedKid: (state) => {
      state.selectedKid = null;
      localStorage.removeItem('selectedKid');
    },
    setKidsList: (state, action) => {
      state.kidsList = action.payload;
    }
  }
});

export const { setSelectedKid, clearSelectedKid, setKidsList } = parentKidsSlice.actions;
export default parentKidsSlice.reducer;
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const createAssignment = createAsyncThunk(
    'assignments/createAssignment',
    async ({ gradeSubjectSemesterId, classId, ...assignmentData }, { rejectWithValue }) => {
        try {
            const url = `http://localhost:3000/assignments/create-assignment/${gradeSubjectSemesterId}?classId=${classId}`;
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`, 
            };

            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(assignmentData),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'Failed to create assignment');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Server Error');
        }
    }
);

const assignmentSlice = createSlice({
    name: 'assignmentsTeacher',
    initialState: {
        assignment: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createAssignment.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createAssignment.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.assignment.push(action.payload.assignment); 
                toast.success('Assignment created successfully!');
                
            })
            .addCase(createAssignment.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default assignmentSlice.reducer;
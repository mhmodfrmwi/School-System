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

export const fetchAssignments = createAsyncThunk(
    'assignments/fetchAssignments',
    async (_, { rejectWithValue }) => {
        try {
            const url = 'http://localhost:3000/assignments/';
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            };

            const response = await fetch(url, {
                method: 'GET',
                headers,
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'Failed to fetch assignments');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Server Error');
        }
    }
);

export const editAssignment = createAsyncThunk(
    'assignments/editAssignment',
    async ({ assignmentId, updatedData }, { rejectWithValue }) => {
        try {
            const url = `http://localhost:3000/assignments/${assignmentId}`;
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            };

            const response = await fetch(url, {
                method: 'PATCH',
                headers,
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'Failed to edit assignment');
            }

            const data = await response.json();
            toast.success('Assignment updated successfully!');
            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Server Error');
        }
    }
);

export const deleteAssignment = createAsyncThunk(
    'assignments/deleteAssignment',
    async (assignmentId, { rejectWithValue }) => {
        try {
            const url = `http://localhost:3000/assignments/${assignmentId}`;
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            };

            const response = await fetch(url, {
                method: 'DELETE',
                headers,
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'Failed to delete assignment');
            }
            toast.success('Assignment deleted successfully!');
            return assignmentId; 
        } catch (error) {
            return rejectWithValue(error.message || 'Server Error');
        }
    }
);

export const getAssignmentSubmissions = createAsyncThunk(
    'assignments/getAssignmentSubmissions',
    async (assignmentId, { rejectWithValue }) => {
        try {
            const url = `http://localhost:3000/assignments/submissions/${assignmentId}`;
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            };

            const response = await fetch(url, {
                method: 'GET',
                headers,
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'Failed to fetch submissions');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Server Error');
        }
    }
);

export const getSubmissionDetails = createAsyncThunk(
    'assignments/getSubmissionDetails',
    async (submissionId, { rejectWithValue }) => {
        try {
            const url = `http://localhost:3000/assignments/submissions/get-submission/${submissionId}`;
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            };

            const response = await fetch(url, {
                method: 'GET',
                headers,
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'Failed to fetch submission details');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Server Error');
        }
    }
);

export const updateSubmissionGrade = createAsyncThunk(
    'assignments/updateSubmissionGrade',
    async ({ submissionId, grade }, { rejectWithValue, dispatch, getState }) => {
        try {
            const url = `http://localhost:3000/assignments/submission/${submissionId}`;
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            };

            const response = await fetch(url, {
                method: 'PATCH',
                headers,
                body: JSON.stringify({ grade }), 
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'Failed to update grade');
            }

            const data = await response.json();
            return { submission: data }; 
        } catch (error) {
            return rejectWithValue(error.message || 'Server Error');
        }
    }
);



const assignmentSlice = createSlice({
    name: 'assignmentsTeacher',
    initialState: {
        assignment: [],
        submissions: [], 
        studentSubmissions: [], 
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
            })
            .addCase(fetchAssignments.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssignments.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.assignment = action.payload; 
            })
            .addCase(fetchAssignments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(editAssignment.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(editAssignment.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const updatedAssignment = action.payload.assignment;
                const index = state.assignment.findIndex((a) => a._id === updatedAssignment._id);
                if (index !== -1) {
                    state.assignment[index] = updatedAssignment;
                }
                toast.success('Assignment updated successfully!');
            })
            .addCase(editAssignment.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteAssignment.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteAssignment.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.assignment = state.assignment.filter((a) => a._id !== action.payload);
            })
            .addCase(deleteAssignment.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getAssignmentSubmissions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAssignmentSubmissions.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.submissions = action.payload; 
            })
            .addCase(getAssignmentSubmissions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getSubmissionDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getSubmissionDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.submissionDetails = action.payload; 
            })
            .addCase(getSubmissionDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateSubmissionGrade.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateSubmissionGrade.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload && action.payload.submission) {
                    const updatedSubmission = action.payload.submission;
                    const index = state.submissions.findIndex((s) => s._id === updatedSubmission._id);
                    if (index !== -1) {
                        state.submissions[index] = updatedSubmission; 
                    }
                    toast.success('Grade updated successfully!');
                } else {
                    console.error("Invalid payload:", action.payload);
                }
            })
            .addCase(updateSubmissionGrade.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                toast.error(action.payload || 'Failed to update grade');
            });
            
    },
});

export default assignmentSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:3000/parent/student";

// Fetch all exams for student by subject
export const fetchAllExams = createAsyncThunk(
    "parentExam/fetchAllExams",
    async (gradeSubjectSemesterId, { getState, rejectWithValue }) => {
        const state = getState();
        const studentId = state.motivationparent.selectedKid?._id;
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        if (!token) return rejectWithValue("Authentication required");
        if (!studentId) return rejectWithValue("Student ID is required");
        if (!gradeSubjectSemesterId) return rejectWithValue("Subject semester ID is required");

        try {
            const response = await fetch(
                `${BASE_URL}/all-exams/${gradeSubjectSemesterId}/${studentId}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to fetch all exams");
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Fetch missed exams for student by subject
export const fetchMissedExams = createAsyncThunk(
    "parentExam/fetchMissedExams",
    async (gradeSubjectSemesterId, { getState, rejectWithValue }) => {
        const state = getState();
        const studentId = state.motivationparent.selectedKid?._id;
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        if (!token) return rejectWithValue("Authentication required");
        if (!studentId) return rejectWithValue("Student ID is required");
        if (!gradeSubjectSemesterId) return rejectWithValue("Subject semester ID is required");

        try {
            const response = await fetch(
                `${BASE_URL}/missed/${gradeSubjectSemesterId}/${studentId}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to fetch missed exams");
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Fetch completed exams for student by subject
export const fetchCompletedExams = createAsyncThunk(
    "parentExam/fetchCompletedExams",
    async (gradeSubjectSemesterId, { getState, rejectWithValue }) => {
        const state = getState();
        const studentId = state.motivationparent.selectedKid?._id;
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        if (!token) return rejectWithValue("Authentication required");
        if (!studentId) return rejectWithValue("Student ID is required");
        if (!gradeSubjectSemesterId) return rejectWithValue("Subject semester ID is required");

        try {
            const response = await fetch(
                `${BASE_URL}/completed-exams/${gradeSubjectSemesterId}/${studentId}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to fetch completed exams");
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Fetch all exam results for student
export const fetchStudentResults = createAsyncThunk(
    "parentExam/fetchStudentResults",
    async (studentId, { rejectWithValue }) => {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        if (!token) return rejectWithValue("Authentication required");
        if (!studentId) return rejectWithValue("Student ID is required");

        try {
            const response = await fetch(
                `http://localhost:3000/parent/student-results/${studentId}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to fetch student results");
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchUpcomingExams = createAsyncThunk(
    "parentExam/fetchUpcomingExams",
    async (gradeSubjectSemesterId, { getState, rejectWithValue }) => {
        const state = getState();
        const studentId = state.motivationparent.selectedKid?._id;
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        if (!token) return rejectWithValue("Authentication required");
        if (!studentId) return rejectWithValue("Student ID is required");
        if (!gradeSubjectSemesterId) return rejectWithValue("Subject semester ID is required");

        try {
            const response = await fetch(
                `${BASE_URL}/Upcoming-Exams-exams/${gradeSubjectSemesterId}/${studentId}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to fetch upcoming exams");
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Add this with your other async thunks
export const fetchRunningExams = createAsyncThunk(
    "parentExam/fetchRunningExams",
    async (gradeSubjectSemesterId, { getState, rejectWithValue }) => {
        const state = getState();
        const studentId = state.motivationparent.selectedKid?._id;
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        if (!token) return rejectWithValue("Authentication required");
        if (!studentId) return rejectWithValue("Student ID is required");
        if (!gradeSubjectSemesterId) return rejectWithValue("Subject semester ID is required");

        try {
            const response = await fetch(
                `${BASE_URL}/Running-Exams-exams/${gradeSubjectSemesterId}/${studentId}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to fetch running exams");
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const parentExamSlice = createSlice({
    name: "parentExam",
    initialState: {
        allExams: [],
        completedExams: [],
        missedExams: [],
        upcomingExams: [],
        runningExams: [],
        studentResults: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearExamError: (state) => {
            state.error = null;
        },
        resetStudentResults: (state) => {
            state.studentResults = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // All Exams
            .addCase(fetchAllExams.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllExams.fulfilled, (state, action) => {
                state.loading = false;
                state.allExams = action.payload.exams || action.payload || [];
            })
            .addCase(fetchAllExams.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Completed Exams
            .addCase(fetchCompletedExams.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCompletedExams.fulfilled, (state, action) => {
                state.loading = false;
                state.completedExams = action.payload.exams || action.payload || [];
            })
            .addCase(fetchCompletedExams.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Missed Exams
            .addCase(fetchMissedExams.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMissedExams.fulfilled, (state, action) => {
                state.loading = false;
                state.missedExams = action.payload || [];
            })
            .addCase(fetchMissedExams.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Student Results
            .addCase(fetchStudentResults.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStudentResults.fulfilled, (state, action) => {
                state.loading = false;
                state.studentResults = action.payload.results || [];
            })
            .addCase(fetchStudentResults.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Upcoming Exams
            .addCase(fetchUpcomingExams.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUpcomingExams.fulfilled, (state, action) => {
                state.loading = false;
                state.upcomingExams = action.payload.exams || action.payload || [];
            })
            .addCase(fetchUpcomingExams.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add this in the extraReducers builder
            .addCase(fetchRunningExams.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRunningExams.fulfilled, (state, action) => {
                state.loading = false;
                state.runningExams = action.payload.exams || action.payload || [];
            })
            .addCase(fetchRunningExams.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export default parentExamSlice.reducer;
export const { clearExamError, resetStudentResults } = parentExamSlice.actions;
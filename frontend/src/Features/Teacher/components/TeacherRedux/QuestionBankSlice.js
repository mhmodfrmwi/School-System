import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    status: "idle",
    error: null,
    loading: false,
    questionbank: [],
};

const getToken = () => sessionStorage.getItem("token");

export const postQuestionBank = createAsyncThunk(
    "questionBank/postQuestionBank",
    async (formData, { rejectWithValue }) => {
        try {
            const token = getToken();
            if (!token) {
                return rejectWithValue("Authentication required. Please log in.");
            }

            const { grade_subject_semester_id, ...restFormData } = formData;
            const response = await fetch(
                `http://localhost:4000/api/v1/teacher/questionBank/${grade_subject_semester_id}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(restFormData),

                }
            );
            console.log("Data sent to backend:", JSON.stringify(restFormData));

            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error.message);
            }
            console.log("Data being sent:", restFormData);
            console.log("Form Data:", formData);

            const data = await response.json();
            return data;

        } catch (error) {
            return rejectWithValue(error.message || "Failed to add question bank data");
        }
    }
);

export const fetchMyQuestions = createAsyncThunk(
    "myQuestions/fetchMyQuestions",
    async (grade_subject_semester_id, { rejectWithValue }) => {
        try {
            const token = getToken();
            if (!token) {
                return rejectWithValue("Authentication required. Please log in.");
            }

            if (!grade_subject_semester_id) {
                return rejectWithValue("Invalid ID: grade_subject_semester_id is missing.");
            }

            const response = await fetch(
                `http://localhost:4000/api/v1/teacher/questionBank/${grade_subject_semester_id}/my-questions`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error.message);
            }

            const data = await response.json();
            console.log("Fetched questions:", data);
            return data; // Return the entire response
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch questions");
        }
    }
);

export const fetchAllQuestions = createAsyncThunk(
    "allQuestions/fetchAllQuestions",
    async (grade_subject_semester_id, { rejectWithValue }) => {
        try {
            const token = getToken();
            if (!token) {
                return rejectWithValue("Authentication required. Please log in.");
            }

            if (!grade_subject_semester_id) {
                return rejectWithValue("Invalid ID: grade_subject_semester_id is missing.");
            }

            const response = await fetch(
                `http://localhost:4000/api/v1/teacher/questionBank/${grade_subject_semester_id}/all-questions`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error.message);
            }

            const data = await response.json();
            console.log("Fetched questions:", data);
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch questions");
        }
    }
);

export const deleteQuestion = createAsyncThunk(
    "qustions/deleteQuestion",
    async (questionId, { rejectWithValue }) => {
        try {
            console.log("Deleting material with ID:", questionId); 

            if (!questionId) {
                return rejectWithValue("Invalid material ID");
            }

            const response = await fetch(`http://localhost:4000/api/v1/teacher/questionBank/${questionId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                },
            });

            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error.message || "Failed to delete question");
            }

            return questionId;
        } catch (error) {
            return rejectWithValue(error.message || "Failed to delete question");
        }
    }
);

export const updateQuestion = createAsyncThunk(
    "questions/updateQuestion",
    async ({ questionId, formData }, { rejectWithValue }) => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) return rejectWithValue("Authentication required. Please log in.");
  
        const response = await fetch(`http://localhost:4000/api/v1/teacher/questionBank/${questionId}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) {
          const error = await response.json();
          return rejectWithValue(error.message);
        }
        return await response.json();
  
      } catch (error) {
        return rejectWithValue(error.message || "Failed to update question");
      }
    }
  );

const QuestionBank = createSlice({
    name: "questionbank",
    initialState,
    reducers: {
        clearMessage: (state) => {
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyQuestions.pending, (state) => {
                state.status = "loading";
                state.loading = true;
            })
            .addCase(fetchMyQuestions.fulfilled, (state, action) => {
                console.log("Fetched data:", action.payload);
                state.loading = false;
                state.questionbank = action.payload.questions;  
            })
            .addCase(fetchMyQuestions.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to fetch pdfMaterials";
                state.loading = false;
                toast.error(state.error);
            })
            .addCase(fetchAllQuestions.pending, (state) => {
                state.status = "loading";
                state.loading = true;
            })
            .addCase(fetchAllQuestions.fulfilled, (state, action) => {
                console.log("Fetched data:", action.payload);
                state.loading = false;
                state.questionbank = action.payload.questions; // Store only the questions array  
            })
            .addCase(fetchAllQuestions.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to fetch pdfMaterials";
                state.loading = false;
                toast.error(state.error);
            })
            .addCase(postQuestionBank.pending, (state) => {
                state.status = "loading";
                state.loading = true;
            })
            .addCase(postQuestionBank.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.questionbank.push(action.payload);
                state.loading = false;
            })
            .addCase(postQuestionBank.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to add question bank data";
                state.loading = false;
                toast.error(state.error);
            })
            .addCase(deleteQuestion.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteQuestion.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.questionbank = state.questionbank.filter(
                    (question) => question._id !== action.payload 
                );
            })
            .addCase(deleteQuestion.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to delete question";
                state.loading = false;
                toast.error(state.error);
            })
            .addCase(updateQuestion.fulfilled, (state, action) => {
                state.status = "succeeded";
                const updatedQuestion = action.payload;
                toast.success("Question updated successflly")
                state.questionbank = state.questionbank.map((question) =>
                    question._id === updatedQuestion._id ? updatedQuestion : question
                );
            })
            .addCase(updateQuestion.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to update question";
                toast.error(state.error);
            });
    },
});

export default QuestionBank.reducer;

import axios from "axios";
import { setRole } from "@/Features/Auth/AuthRedux/roleSlice";
import store from "@/store";

const API_URLToGet = "http://localhost:4000/api/v1/parent/kids";
//fetch data
export const fetchParentKids = async () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication required. Please log in.");
  }

  try {
    const response = await axios.get(API_URLToGet, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const API_URL = "http://localhost:4000/api/v1/parent/chooseKid";

export const postSelectedKid = async ({ id, email, role, classId }) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication required. Please log in.");
  }

  const response = await axios.post(
    API_URL,
    { id, email, role, classId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );

  const newToken = response.data?.student_token;
  if (newToken) {
    sessionStorage.removeItem("token");
    sessionStorage.setItem("token", newToken);
    store.dispatch(setRole("student"));
  }

  return response.data;
};

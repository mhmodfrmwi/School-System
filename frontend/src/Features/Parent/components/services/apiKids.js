import axios from "axios";

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

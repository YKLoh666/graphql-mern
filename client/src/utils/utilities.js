import axios from "axios";

export const verifyAuth = async (navigate, shouldAuth) => {
  try {
    const response = await axios.get("http://localhost:5000/auth", {
      withCredentials: true,
    });

    const { verified } = response.data;

    if (shouldAuth === 0) {
      return { verified };
    } else if (shouldAuth === true && !verified) {
      navigate("/login");
    } else if (shouldAuth === false && verified) {
      navigate("/");
    }
  } catch (error) {
    // Handle Axios request errors
    console.error("Axios request failed:", error);

    // Check the error response, if available
    if (error.response) {
      console.error("Error response data:", error.response.data);
    }

    // Handle the case where verification failed due to an error
    console.log("Verification failed due to an error.");
  }
};

import { clientInstance } from "@/api/services/axiosClient";
import { serverInstance } from "@/api/services/axiosServer";

export const verifyLogin = async (data: any) => {
  try {
    const { data: result } = await clientInstance.post("/authen/login", data);
    const token = result.accessToken;
    const cookieResponse = await serverInstance.post(
      "/api/auth/login",
      { token },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (cookieResponse.status !== 200) {
      throw new Error('Failed to set cookie');
    }

    return result;
  } catch (error) {
    console.error("Error during login verification:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await clientInstance.post("/authen/logout");
    const response = await serverInstance.post("/api/auth/logout");
    if (response.status !== 200) {
      throw new Error('Failed to clear cookie');
    }

    return response.data;
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};
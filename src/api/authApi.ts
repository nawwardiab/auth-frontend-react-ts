import type { AxiosResponse } from "axios";
import api from "../utils/axiosConfig";

export interface User {
  id: number;
  username: string;
  email: string;
}

export const login = async (email: string, password: string): Promise<void> => {
  try {
    await api.post("/login", {
      email,
      password,
    });
  } catch (err: unknown) {
    const msg = (err as Error).message;
    console.error("Login error:", msg);
    throw err;
  }
};

// Signup
export const signup = async (
  username: string,
  email: string,
  password: string,
  repeatedPassword: string
): Promise<void> => {
  try {
    await api.post("/register", {
      username,
      email,
      password,
      repeatedPassword,
    });
  } catch (err: unknown) {
    console.error("Register error:", (err as Error).message);
    throw err;
  }
};

// fetch current logged in user
export const getProfile = async (): Promise<User> => {
  try {
    const res: AxiosResponse<{ user: User }> = await api.get("/api/profile");
    return res.data.user;
  } catch (err: unknown) {
    console.error("Fetch profile error:", err);
    throw err;
  }
};

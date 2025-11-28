import axiosInstance from "./axios";
import {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  ApiResponse,
  User,
} from "../types";

export const authApi = {
  // Register new user
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await axiosInstance.post<ApiResponse<AuthResponse>>(
      "/auth/register",
      data
    );
    return response.data.data!;
  },

  // Login user
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axiosInstance.post<ApiResponse<AuthResponse>>(
      "/auth/login",
      credentials
    );
    return response.data.data!;
  },

  // Refresh access token
  refresh: async (
    refreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string }> => {
    const response = await axiosInstance.post<
      ApiResponse<{ accessToken: string; refreshToken: string }>
    >("/auth/refresh", { refreshToken });
    return response.data.data!;
  },

  // Logout user
  logout: async (refreshToken: string): Promise<void> => {
    await axiosInstance.post("/auth/logout", { refreshToken });
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const response = await axiosInstance.get<ApiResponse<{ user: User }>>(
      "/auth/me"
    );
    return response.data.data!.user;
  },
};

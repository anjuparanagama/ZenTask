import api from "@/lib/api";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export const login = async (email: string, password: string) => {
  const { data } = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  });

  return data;
};

export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  const { data } = await api.post("/auth/register", {
    name,
    email,
    password,
  });

  return data;
};

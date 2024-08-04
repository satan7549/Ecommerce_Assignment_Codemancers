export enum UserRole {
  USER = "user",
  SUPER_ADMIN = "superAdmin",
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthState {
  loading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  role: string | null;
  error: string | null;
}

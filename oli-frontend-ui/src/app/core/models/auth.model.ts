export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
}

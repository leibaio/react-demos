export interface CreateUser {
  username: string;
  password: string;
  roles: string;
  email?: string;
}

export interface UserInfo {
  id?: string;
  username: string;
  email?: string;
  avatar?: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  role: string;
}

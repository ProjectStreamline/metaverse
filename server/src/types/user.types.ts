export interface UserInput {
    username: string;
    password: string;
  }
  
  export interface User {
    id: number;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface UserResponse {
    id: number;
    username: string;
    createdAt: Date;
  }
  
  export interface AuthResponse {
    token: string;
    user: UserResponse;
  }

  export interface JwtPayload {
    id: number;
    username: string;
    createdAt: string;
  }
interface IUser {
  id: number;
  name: string;
  email: string;
}

interface IUserRequest {
  id?: number;
  name?: string;
  email?: string;
}

interface IUserResponse {
  id: number;
  name: string;
  email: string;
}

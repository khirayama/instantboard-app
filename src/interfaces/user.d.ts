interface IUser {
  id: number;
  name: string;
  email: string;
  imageUrl: string;
}

interface IUserRequest {
  id?: number;
  name?: string;
  email?: string;
  imageUrl?: string;
}

interface IUserResponse {
  id: number;
  name: string;
  email: string;
  imageUrl: string;
}

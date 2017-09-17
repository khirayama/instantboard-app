interface IRequest {
  id: number|null;
  status: string;
  member: IUser|null;
}

interface IRequestRequest {
  id?: number;
  status?: string;
  labelId: number|null;
  memberName: string;
}

interface IRequestResponse {
  id: number;
  status: string;
  member: IUserResponse;
}

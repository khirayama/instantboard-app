interface IRequest {
  id: string|null;
  status: string;
  member: IUser|null;
}

interface IRequestRequest {
  id?: string;
  status?: string;
  labelId: string;
  memberName: string;
}

interface IRequestResponse {
  id: string;
  status: string;
  member: IUserResponse;
}

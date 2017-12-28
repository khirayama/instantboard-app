interface IRequest {
  id: number;
  status: string;
  member: {
    id: number;
    name: string;
    email: string;
  };
  label: {
    id: number,
    name: string,
  }|null;
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
  member: {
    id: number;
    name: string;
    email: string;
  };
  label: {
    id: number,
    name: string,
  };
}

interface ILabel {
  id: string;
  name: string;
  visibled: boolean;
  priority: number;
  members: IUser[];
}

interface ILabelRequest {
  id?: string;
  name?: string;
  visibled?: boolean;
  priority?: number;
  members: IUser[];
}

interface ILabelResponse {
  id: number;
  name: string;
  visibled: boolean;
  priority: number;
  members: IUserResponse[];
  createdAt: string;
  updatedAt: string;
}

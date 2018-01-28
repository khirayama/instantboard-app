interface ILabel {
  id: number;
  name: string;
  visibled: boolean;
  priority: number;
  requests: IRequest[];
}

interface ILabelCreateRequest {
  name?: string;
  visibled?: boolean;
  priority?: number;
  requests: IRequest[];
}

interface ILabelRequest {
  id: number;
  name?: string;
  visibled?: boolean;
  priority?: number;
  requests: IRequest[];
}

interface IMemberResponse {
  id: number;
  name: string;
  email: string;
  imageUrl: string;
  requestId: string;
  status: string;
}

interface ILabelResponse {
  id: number;
  name: string;
  priority: number;
  visibled: boolean;
  members: IMemberResponse[];
  createdAt: string;
  updatedAt: string;
}

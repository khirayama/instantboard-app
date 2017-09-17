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

interface ILabelResponse {
  id: number;
  name: string;
  visibled: boolean;
  priority: number;
  requests: IRequestResponse[];
}

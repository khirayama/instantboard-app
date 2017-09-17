interface ILabel {
  id: string;
  name: string;
  visibled: boolean;
  priority: number;
  requests: IRequest[];
}

interface ILabelRequest {
  id?: string;
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

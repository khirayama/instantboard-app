interface ILabel {
  id: string;
  name: string;
  visibled: boolean;
  priority: number;
  members: IMember[];
}

interface ILabelRequest {
  id?: string;
  name?: string;
  visibled?: boolean;
  priority?: number;
  members?: IMember[];
}

interface ILabelResponse {
  id: number;
  name: string;
  visibled: boolean;
  priority: number;
  members: IMemberResponse[];
  createdAt: string;
  updatedAt: string;
}

interface IMember {
}

interface IMemberResponse {
}

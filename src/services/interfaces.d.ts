// Label
interface ILabelRequestId {
  id: number;
}

interface ILabelRequestParams {
  name?: string;
  visibled?: boolean;
  priority?: number;
}

interface ILabelMemberResponse {
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
  members: ILabelMemberResponse[];
  createdAt: string;
  updatedAt: string;
}

// Task
interface ITaskRequestId {
  id: number;
}

interface ITaskRequestParams {
  labelId: number;
  text?: string;
  content?: string;
  completed?: boolean;
  priority?: number;
}

interface ITaskResponse {
  id: number;
  label: {
    id: number;
    name: string;
    priority: number;
    visibled: boolean;
  };
  text: string;
  content: string;
  completed: boolean;
  priority: number;
  schedule: {
    shortMonthName: string;
    shortDayName: string;
    date: number;
  } | null;
  createdAt: string;
  updatedAt: string;
}

// User
interface IUserResponse {
  id: number;
  name: string;
  email: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

// Request
interface IRequestRequestId {
  id: number;
}

interface IRequestRequestParams {
  status?: string;
  labelId: number | null;
  memberId: number;
}

interface IRequestResponse {
  id: number;
  status: string;
  member: {
    id: number;
    name: string;
    email: string;
    imageUrl: string;
  };
  label: {
    id: number;
    name: string;
  };
}

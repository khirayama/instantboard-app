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
  imageUrl: string;
  requestId: number;
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
interface ITaskRequestParams {
  id: number;
  labelId: number;
  content: string;
  completed: boolean;
  priority: number;
}

interface ITaskScheduleResponse {
  shortMonthName: string;
  shortDayName: string;
  date: number;
}

interface ITaskLabelResponse {
  id: number;
  name: string;
  priority: number;
  visibled: boolean;
}

interface ITaskResponse {
  id: number;
  label: ITaskLabelResponse;
  text: string;
  content: string;
  completed: boolean;
  priority: number;
  schedule: ITaskScheduleResponse | null;
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

interface IMemberResponse {
  id: number;
  name: string;
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
  labelId: number;
  memberId: number;
}

interface IRequestResponse {
  id: number;
  status: string;
  member: {
    id: number;
    name: string;
    imageUrl: string;
  };
  label: {
    id: number;
    name: string;
  };
}

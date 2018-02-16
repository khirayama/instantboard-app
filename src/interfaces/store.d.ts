// State - User
interface IUser {
  id: number;
  name: string;
  email: string;
  imageUrl: string;
}

// State - Member
interface IMember {
  id: number;
  name: string;
  imageUrl: string;
}

// State - Task
interface ITaskSchedule {
  shortMonthName: string;
  shortDayName: string;
  date: number;
}

interface ITask {
  id: number;
  labelId: number;
  text: string;
  content: string;
  completed: boolean;
  priority: number;
  schedule: ITaskSchedule | null;
}

// State - Label
interface ILabelMember {
  id: number;
  name: string;
  imageUrl: string;
  requestId: number;
  status: string;
}

interface ILabel {
  id: number;
  name: string;
  visibled: boolean;
  priority: number;
  members: ILabelMember[];
}

// State - Request
interface IRequest {
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
  } | null;
}

// State - UI
interface IUI {
  isLoadingTasks: boolean;
  isLoadingLabels: boolean;
  isLoadingRequests: boolean;
  isLoadingMembers: boolean;
  errors: {
    resourceName: string;
    resourceId: string | null;
    message: string | null;
  }[];
}

// State
interface IState {
  profile: IUser | null;
  tasks: ITask[];
  labels: ILabel[];
  requests: IRequest[];
  members: IMember[];
  ui: IUI;
}

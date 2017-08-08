// Resource
interface IUser {
}

interface IRequest {
}

interface ILabel {
}

interface ITask {
}

// UI
interface IHistroy {
  activity: string;
  selectedLabelId: string|null;
  selectedTaskId: string|null;
}

interface IError {
  resourceName: string;
  resourceId: string|null;
  message: string|null;
}

interface ILoading {
  tasks: boolean;
  labels: boolean;
  requests: boolean;
  members: boolean;
}

interface IUI {
  currentHistoryIndex: number;
  histories: IHistroy[];
  loading: ILoading;
  errors: IError[];
}

// State
interface IState {
  idToken: string|null;
  profile: IUser|null;
  tasks: ITask[];
  labels: ILabel[];
  requests: IRequest[];
  members: IUser[];
  ui: IUI;
}

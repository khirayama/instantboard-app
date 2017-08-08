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
interface IError {
  resourceName: string;
  resourceId: string|null;
  message: string|null;
}

interface IIsLoading {
  tasks: boolean;
  labels: boolean;
  requests: boolean;
  members: boolean;
}

interface IIsShownModal {
  task: boolean;
  label: boolean;
}

interface IUI {
  activity: string;
  selectedLabelId: string|null;
  selectedTaskId: string|null;
  isLoadingTasks: boolean;
  isLoadingLabels: boolean;
  isLoadingRequests: boolean;
  isLoadingMembers: boolean;
  isShownTaskModal: boolean;
  isShownLabelModal: boolean;
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

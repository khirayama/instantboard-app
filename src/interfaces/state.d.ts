interface IState {
  idToken: string|null;
  profile: {
    connecting: boolean;
    data: IUser|null;
  };
  tasks: {
    connecting: boolean;
    data: ITask[];
  };
  labels: {
    connecting: boolean;
    data: ILabel[];
  };
  requests: {
    connecting: boolean;
    data: IRequest[];
  };
  members: {
    connecting: boolean;
    data: IUser[];
  };
  ui: IUI;
}

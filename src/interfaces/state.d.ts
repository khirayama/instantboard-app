interface IState {
  profile: IUser|null;
  tasks: ITask[];
  labels: ILabel[];
  requests: IRequest[];
  members: IUser[];
  ui: IUI;
}

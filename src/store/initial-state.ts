const initialState: IState = {
  profile: null,
  tasks: [],
  labels: [],
  requests: [],
  members: [],
  ui: {
    isLoadingTasks: false,
    isLoadingLabels: false,
    isLoadingRequests: false,
    isLoadingMembers: false,
    errors: [],
  },
};
export default initialState;

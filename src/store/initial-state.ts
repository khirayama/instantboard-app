const initialState: IState = {
  idToken: null,
  profile: null,
  tasks: [],
  labels: [],
  requests: [],
  members: [],
  ui: {
    selectedTaskId: null,
    selectedLabelId: null,
    isLoadingTasks: false,
    isLoadingLabels: false,
    isLoadingRequests: false,
    isLoadingMembers: false,
    isShownTaskModal: false,
    isShownLabelModal: false,
    errors: [],
  },
};
export default initialState;

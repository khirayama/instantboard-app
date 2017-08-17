interface IUI {
  selectedTaskId: string|null;
  selectedLabelId: string|null;
  isLoadingTasks: boolean;
  isLoadingTaskCids: string[];
  isLoadingLabels: boolean;
  isLoadingLabelCids: string[];
  isLoadingRequests: boolean;
  isLoadingRequestCids: string[];
  isLoadingMembers: boolean;
  isLoadingMemberCids: string[];
  errors: {
    resourceName: string;
    resourceId: string|null;
    message: string|null;
  }[];
}

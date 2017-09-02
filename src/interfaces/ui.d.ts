interface IUI {
  selectedTaskId: string|null;
  selectedLabelId: string|null;
  isLoadingTasks: boolean;
  isLoadingLabels: boolean;
  isLoadingRequests: boolean;
  isLoadingMembers: boolean;
  errors: Array<{
    resourceName: string;
    resourceId: string|null;
    message: string|null;
  }>;
}

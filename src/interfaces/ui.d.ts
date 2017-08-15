interface IUI {
  selectedLabelId: string|null;
  selectedTaskId: string|null;
  isLoadingTasks: boolean;
  isLoadingLabels: boolean;
  isLoadingRequests: boolean;
  isLoadingMembers: boolean;
  isShownTaskModal: boolean;
  isShownLabelModal: boolean;
  errors: Array<{
    resourceName: string;
    resourceId: string|null;
    message: string|null;
  }>;
}

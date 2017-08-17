interface IUI {
  selectedLabelId: string|null;
  selectedTaskId: string|null;
  errors: Array<{
    resourceName: string;
    resourceId: string|null;
    message: string|null;
  }>;
}

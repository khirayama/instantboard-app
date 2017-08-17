interface ITask {
  id: string;
  labelId: string;
  text: string;
  completed: boolean;
  connecting: boolean;
  schedule?: {
    shortMonthName: string;
    shortDayName: string;
    date: number;
  };
}

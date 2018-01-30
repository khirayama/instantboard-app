interface ISchedule {
  shortMonthName: string;
  shortDayName: string;
  date: number;
}

interface ITask {
  id: number;
  labelId: number;
  text: string;
  content: string;
  completed: boolean;
  priority: number;
  schedule: ISchedule | null;
}

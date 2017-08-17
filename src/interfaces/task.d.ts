interface ITask {
  cid: string;
  labelCid: string;
  text: string;
  completed: boolean;
  schedule: {
    shortMonthName: string;
    shortDayName: string;
    date: number;
  } | null;
}

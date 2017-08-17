interface ITask {
  connecting: boolean;
  cid: string;
  data: {
    id: string;
    labelId: string;
    text: string;
    completed: boolean;
    schedule: {
      shortMonthName: string;
      shortDayName: string;
      date: number;
    } | null;
  };
}

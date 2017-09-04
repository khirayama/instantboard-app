interface ISchedule {
  shortMonthName: string;
  shortDayName: string;
  date: number;
}

interface IScheduleResponse {
}

interface ITask {
  id: string;
  labelId: string;
  text: string;
  completed: boolean;
  priority: number;
  schedule: ISchedule | null;
}

interface ITaskRequest {
  id?: string;
  labelId?: string;
  text?: string;
  content?: string;
  completed?: boolean;
  priority?: number;
  schedule?: ISchedule| null;
}

interface ITaskResponse {
  id: string;
  labelId: string;
  text: string;
  completed: boolean;
  priority: number;
  schedule: IScheduleResponse | null;
  createdAt: string;
  updatedAt: string;
}

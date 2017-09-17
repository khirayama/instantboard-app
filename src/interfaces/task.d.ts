interface ISchedule {
  shortMonthName: string;
  shortDayName: string;
  date: number;
}

interface IScheduleResponse {
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

interface ITaskCreateRequest {
  labelId: number;
  text: string;
  content?: string;
  completed?: boolean;
  priority?: number;
  schedule?: ISchedule| null;
}

interface ITaskRequest {
  id: number;
  labelId: number;
  text: string;
  content?: string;
  completed?: boolean;
  priority?: number;
  schedule?: ISchedule| null;
}

interface ITaskResponse {
  id: number;
  label: {
    id: number;
    name: string;
    priority: number;
    visibled: boolean;
  };
  text: string;
  content: string;
  completed: boolean;
  priority: number;
  schedule: IScheduleResponse | null;
  createdAt: string;
  updatedAt: string;
}

function transformSchedule(schedule: { shortMonthName: string; shortDayName: string; date: number }): ITaskSchedule {
  return {
    shortMonthName: schedule.shortMonthName,
    shortDayName: schedule.shortDayName,
    date: schedule.date,
  };
}

export function transformRequest(request: {
  id: number;
  status: string;
  member: {
    id: number;
    name: string;
    imageUrl: string;
  };
  label: {
    id: number;
    name: string;
  };
}): IRequest {
  return {
    id: request.id,
    status: request.status || 'accepted',
    member: {
      id: request.member.id,
      name: request.member.name,
      imageUrl: request.member.imageUrl,
    },
    label: request.label
      ? {
          id: request.label.id,
          name: request.label.name,
        }
      : null,
  };
}

export function transformTask(task: {
  id: number;
  labelId?: number;
  label?: any;
  text?: string;
  content?: string;
  priority?: number;
  completed?: boolean;
  schedule?: any;
}): ITask {
  return {
    id: task.id,
    labelId: task.labelId ? task.labelId : task.label.id,
    text: task.text || '',
    content: task.content || '',
    priority: task.priority || 0,
    completed: Boolean(task.completed),
    schedule: task.schedule === null ? null : transformSchedule(task.schedule),
  };
}

export function transformUser(user: { id: number; name: string; email: string; imageUrl: string }): IUser {
  return {
    id: user.id,
    name: user.name || '',
    email: user.email || '',
    imageUrl: user.imageUrl || '',
  };
}

export function transformMember(user: { id: number; name: string; imageUrl: string }): IMember {
  return {
    id: user.id,
    name: user.name || '',
    imageUrl: user.imageUrl || '',
  };
}

export function transformLabelMemeber(member: {
  id: number;
  name: string;
  imageUrl: string;
  requestId: number;
  status: string;
}): ILabelMember {
  return {
    id: member.id,
    name: member.name,
    imageUrl: member.imageUrl,
    requestId: member.requestId,
    status: member.status,
  };
}

export function transformLabel(label: {
  id: number;
  name?: string;
  priority?: number;
  visibled?: boolean;
  members?: {
    id: number;
    name: string;
    imageUrl: string;
    requestId: number;
    status: string;
  }[];
}): ILabel {
  return {
    id: label.id,
    name: label.name || '',
    visibled: Boolean(label.visibled),
    priority: label.priority || 0,
    members: label.members ? label.members.map(transformLabelMemeber) : [],
  };
}

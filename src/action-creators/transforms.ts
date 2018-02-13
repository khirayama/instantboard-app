function transformSchedule(schedule: ITaskScheduleResponse | null): ITaskSchedule | null {
  if (schedule === null) {
    return null;
  }

  return {
    shortMonthName: schedule.shortMonthName,
    shortDayName: schedule.shortDayName,
    date: schedule.date,
  };
}

export function transformRequestResponse(request: IRequestResponse): IRequest {
  return {
    id: request.id,
    status: request.status || 'accepts',
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

export function transformTaskResponse(task: ITaskResponse): ITask {
  return {
    id: task.id,
    labelId: task.label.id,
    text: task.text || '',
    content: task.content || '',
    priority: task.priority || 0,
    completed: Boolean(task.completed),
    schedule: transformSchedule(task.schedule) || null,
  };
}

export function transformTaskRequest(task: any): ITask {
  return {
    id: task.id,
    labelId: task.labelId,
    text: task.text || '',
    content: task.content || '',
    priority: task.priority || 0,
    completed: Boolean(task.completed),
    schedule: transformSchedule(task.schedule) || null,
  };
}

export function transformUserResponse(user: IUserResponse): IUser {
  return {
    id: user.id,
    name: user.name || '',
    email: user.email || '',
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
  members?: ILabelMemberResponse[] | ILabelMember[];
}): ILabel {
  return {
    id: label.id,
    name: label.name || '',
    visibled: Boolean(label.visibled),
    priority: label.priority || 0,
    members: label.members ? label.members.map(transformLabelMemeber) : [],
  };
}

export function transformSchedule(schedule: any): ISchedule|null {
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
      email: request.member.email,
    },
    label: (request.label) ? {
      id: request.label.id,
      name: request.label.name,
    } : null,
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

export function transformTaskRequest(task: ITaskRequest): ITask {
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
  };
}

export function transformLabelResponse(label: ILabelResponse): ILabel {
  return {
    id: label.id,
    name: label.name || '',
    visibled: Boolean(label.visibled),
    priority: label.priority || 0,
    requests: (label.requests) ? label.requests.map(transformRequestResponse) : [],
  };
}

export function transformLabelRequest(label: ILabelRequest): ILabel {
  return {
    id: label.id,
    name: label.name || '',
    visibled: Boolean(label.visibled),
    priority: label.priority || 0,
    requests: (label.requests) ? label.requests : [],
  };
}

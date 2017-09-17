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
    id: request.id || null,
    status: request.status || 'accepts',
    member: (request.member) ? {
      id: request.member.id,
      name: request.member.name,
    } : null,
  };
}

export function transformTaskResponse(task: ITaskResponse): ITask {
  return {
    id: String(task.id || ''),
    labelId: String(task.label.id || ''),
    text: task.text || '',
    content: task.content || '',
    priority: task.priority || 0,
    completed: (task.completed) ? true : false,
    schedule: transformSchedule(task.schedule) || null,
  };
}

export function transformTaskRequest(task: ITaskRequest): ITask {
  return {
    id: String(task.id || ''),
    labelId: String(task.labelId || ''),
    text: task.text || '',
    content: task.content || '',
    priority: task.priority || 0,
    completed: (task.completed) ? true : false,
    schedule: transformSchedule(task.schedule) || null,
  };
}

export function transformUser(user: IUserRequest|IUserResponse): IUser {
  return {
    id: String(user.id || ''),
    name: user.name || '',
  };
}

export function transformLabelResponse(label: ILabelResponse): ILabel {
  return {
    id: String(label.id || ''),
    name: label.name || '',
    visibled: (label.visibled) ? true : false,
    priority: label.priority || 0,
    requests: (label.requests) ? label.requests.map(transformRequestResponse) : [],
  };
}

export function transformLabelRequest(label: ILabelRequest): ILabel {
  return {
    id: String(label.id || ''),
    name: label.name || '',
    visibled: (label.visibled) ? true : false,
    priority: label.priority || 0,
    requests: (label.requests) ? label.requests : [],
  };
}

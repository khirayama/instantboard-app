import * as React from 'react';

class MainActivity extends React.Component<any, any> {
  public render() {
    return <div>MainActivity</div>;
  }
}

class LoginActivity extends React.Component<any, any> {
  public render() {
    return <div>LoginActivity</div>;
  }
}

class UserActivity extends React.Component<any, any> {
  public render() {
    return <div>UserActivity</div>;
  }
}

class TaskActivity extends React.Component<any, any> {
  public render() {
    return <div>TaskActivity</div>;
  }
}

class LabelActivity extends React.Component<any, any> {
  public render() {
    return <div>LabelActivity</div>;
  }
}

const activities = {
  loginActivity: {
    key: '__LOGIN_ACTIVITY',
    component: LoginActivity,
  },
  userActivity: {
    key: '__USER_ACTIVITY',
    component: UserActivity,
  },
  mainActivity: {
    key: '__MAIN_ACTIVITY',
    component: MainActivity,
  },
  taskActivity: {
    key: '__TASK_ACTIVITY',
    component: TaskActivity,
  },
  labelActivity: {
    key: '__LABEL_ACTIVITY',
    component: LabelActivity,
  },
};

function findActivity(key: string): IActivity|null {
  const objectKeys: string[] = Object.keys(activities);
  for (let i = 0; i < objectKeys.length; i++) {
    const objectKey: string = objectKeys[i];
    const activity: any = activities[objectKey];
    if (activity.key === key) {
      return activity;
    }
  }
  return null;
}

export {
  activities,
  findActivity,
};

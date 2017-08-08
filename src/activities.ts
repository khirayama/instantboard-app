import LoginActivity from './containers/login-activity';
import UserActivity from './containers/user-activity';
import MainActivity from './containers/main-activity';
import TaskActivity from './containers/task-activity';
import LabelActivity from './containers/label-activity';

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

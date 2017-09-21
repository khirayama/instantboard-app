import LabelIndexPage from '../containers/label-index-page';
import LabelPage from '../containers/label-page';
import LoginPage from '../containers/login-page';
import NotificationIndexPage from '../containers/notification-index-page';
import ProfilePage from '../containers/profile-page';
import TaskIndexPage from '../containers/task-index-page';
import TaskPage from '../containers/task-page';
import UserPage from '../containers/user-page';

const routes: IRoute[] = [{
  path: '/login',
  title: 'Login',
  component: LoginPage,
}, {
  path: '/users/new',
  title: 'New User',
  component: UserPage,
}, {
  path: '/tasks',
  title: 'Instantboard',
  component: TaskIndexPage,
}, {
  path: '/tasks/new',
  title: 'New Task',
  component: TaskPage,
}, {
  path: '/tasks/:id/edit',
  title: 'Edit Task',
  component: TaskPage,
}, {
  path: '/labels',
  title: 'Labels',
  component: LabelIndexPage,
}, {
  path: '/labels/new',
  title: 'New Label',
  component: LabelPage,
}, {
  path: '/labels/:id/edit',
  title: 'Edit label',
  component: LabelPage,
}, {
  path: '/notifications',
  title: 'Notifications',
  component: NotificationIndexPage,
}, {
  path: '/profile',
  title: 'Profile',
  component: ProfilePage,
}];
export default routes;

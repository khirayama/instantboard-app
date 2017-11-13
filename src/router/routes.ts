import LabelIndexPage from '../presentations/containers/label-index-page';
import LabelPage from '../presentations/containers/label-page';
import LoginPage from '../presentations/containers/login-page';
import NotificationIndexPage from '../presentations/containers/notification-index-page';
import ProfilePage from '../presentations/containers/profile-page';
import TaskIndexPage from '../presentations/containers/task-index-page';
import TaskPage from '../presentations/containers/task-page';

const routes: IRoute[] = [{
  path: '/login',
  title: 'Login',
  component: LoginPage,
}, {
  path: '/',
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

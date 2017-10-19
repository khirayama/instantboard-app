import LabelIndexPage from '../containers/desktop/label-index-page';
import LabelPage from '../containers/desktop/label-page';
import LoginPage from '../containers/desktop/login-page';
import NotificationIndexPage from '../containers/desktop/notification-index-page';
import ProfilePage from '../containers/desktop/profile-page';
import TaskIndexPage from '../containers/desktop/task-index-page';
import TaskPage from '../containers/desktop/task-page';

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

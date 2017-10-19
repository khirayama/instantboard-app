import LabelIndexPage from '../containers/mobile/label-index-page';
import LabelPage from '../containers/mobile/label-page';
import LoginPage from '../containers/mobile/login-page';
import NotificationIndexPage from '../containers/mobile/notification-index-page';
import ProfilePage from '../containers/mobile/profile-page';
import TaskIndexPage from '../containers/mobile/task-index-page';
import TaskPage from '../containers/mobile/task-page';

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

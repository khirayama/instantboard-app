import LabelIndexPage from '../containers/desktop/label-index-page';
import LoginPage from '../containers/desktop/login-page';
import NotificationIndexPage from '../containers/desktop/notification-index-page';
import ProfilePage from '../containers/desktop/profile-page';
import TaskIndexPage from '../containers/desktop/task-index-page';

const routes: IRoute[] = [{
  path: '/login',
  title: 'Login',
  component: LoginPage,
}, {
  path: '/',
  title: 'Instantboard',
  component: TaskIndexPage,
}, {
  path: '/labels',
  title: 'Labels',
  component: LabelIndexPage,
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

import LabelIndexPageContainer from '../presentations/containers/label-index-page-container';
import LabelPageContainer from '../presentations/containers/label-page-container';
import LoginPageContainer from '../presentations/containers/login-page-container';
import NotificationIndexPageContainer from '../presentations/containers/notification-index-page-container';
import ProfilePageContainer from '../presentations/containers/profile-page-container';
import TaskIndexPageContainer from '../presentations/containers/task-index-page-container';
import TaskPageContainer from '../presentations/containers/task-page-container';

const routes: IRoute[] = [{
  path: '/login',
  title: 'Login',
  component: LoginPageContainer,
}, {
  path: '/',
  title: 'Instantboard',
  component: TaskIndexPageContainer,
}, {
  path: '/tasks/new',
  title: 'New Task',
  component: TaskPageContainer,
}, {
  path: '/tasks/:id/edit',
  title: 'Edit Task',
  component: TaskPageContainer,
}, {
  path: '/labels',
  title: 'Labels',
  component: LabelIndexPageContainer,
}, {
  path: '/labels/new',
  title: 'New Label',
  component: LabelPageContainer,
}, {
  path: '/labels/:id/edit',
  title: 'Edit label',
  component: LabelPageContainer,
}, {
  path: '/notifications',
  title: 'Notifications',
  component: NotificationIndexPageContainer,
}, {
  path: '/profile',
  title: 'Profile',
  component: ProfilePageContainer,
}];
export default routes;

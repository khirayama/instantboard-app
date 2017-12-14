import LabelIndexMobilePage from '../presentations/containers/label-index-page/label-index-mobile-page';
import LabelMobilePage from '../presentations/containers/label-page/label-mobile-page';
import LoginMobilePage from '../presentations/containers/login-page/login-mobile-page';
import NotificationIndexMobilePage from '../presentations/containers/notification-index-page/notification-index-mobile-page'; /* tslint:disable-line */ /* eslint-disable-line */
import ProfileMobilePage from '../presentations/containers/profile-page/profile-mobile-page';
import TaskIndexDesktopPage from '../presentations/containers/task-index-page/task-index-desktop-page';
import TaskIndexMobilePage from '../presentations/containers/task-index-page/task-index-mobile-page';
import TaskMobilePage from '../presentations/containers/task-page/task-mobile-page';

function isMobileUI() {
  return window.innerWidth < 980;
}

const routes: IRoute[] = [{
  path: '/login',
  title: 'Login',
  component: () => {
    return LoginMobilePage;
  },
}, {
  path: '/',
  title: 'Instantboard',
  component: () => {
    return (isMobileUI()) ? TaskIndexMobilePage : TaskIndexDesktopPage;
  },
}, {
  path: '/tasks/new',
  title: 'New Task',
  component: () => {
    return TaskMobilePage;
  },
}, {
  path: '/tasks/:id/edit',
  title: 'Edit Task',
  component: () => {
    return TaskMobilePage;
  },
}, {
  path: '/labels',
  title: 'Labels',
  component: () => {
    return LabelIndexMobilePage;
  },
}, {
  path: '/labels/new',
  title: 'New Label',
  component: () => {
    return LabelMobilePage;
  },
}, {
  path: '/labels/:id/edit',
  title: 'Edit label',
  component: () => {
    return LabelMobilePage;
  },
}, {
  path: '/notifications',
  title: 'Notifications',
  component: () => {
    return NotificationIndexMobilePage;
  },
}, {
  path: '/profile',
  title: 'Profile',
  component: () => {
    return ProfileMobilePage;
  },
}];
export default routes;

import LabelIndexDesktopPage from 'presentations/containers/LabelIndexDesktopPage';
import LabelIndexMobilePage from 'presentations/containers/LabelIndexMobilePage';
import LabelMobilePage from 'presentations/containers/labelMobilePage';
import LoginMobilePage from 'presentations/containers/loginMobilePage';
import NotificationIndexDesktopPage from 'presentations/containers/NotificationIndexDesktopPage';
import NotificationIndexMobilePage from 'presentations/containers/NotificationIndexMobilePage';
import ProfileDesktopPage from 'presentations/containers/ProfileDesktopPage';
import ProfileMobilePage from 'presentations/containers/ProfileMobilePage';
import TaskIndexDesktopPage from 'presentations/containers/TaskIndexDesktopPage';
import TaskIndexMobilePage from 'presentations/containers/TaskIndexMobilePage';
import TaskMobilePage from 'presentations/containers/TaskMobilePage';

function isMobileUI(): boolean {
  return window.innerWidth < 568;
}

const routes: IRoute[] = [
  {
    path: '/login',
    title: 'Login',
    component: () => {
      return LoginMobilePage;
    }
  },
  {
    path: '/',
    title: 'Instantboard',
    component: () => {
      return isMobileUI() ? TaskIndexMobilePage : TaskIndexDesktopPage;
    }
  },
  {
    path: '/tasks/new',
    title: 'New Task',
    component: () => {
      return TaskMobilePage;
    }
  },
  {
    path: '/tasks/:id/edit',
    title: 'Edit Task',
    component: () => {
      return TaskMobilePage;
    }
  },
  {
    path: '/labels',
    title: 'Labels',
    component: () => {
      return isMobileUI() ? LabelIndexMobilePage : LabelIndexDesktopPage;
    }
  },
  {
    path: '/labels/new',
    title: 'New Label',
    component: () => {
      return LabelMobilePage;
    }
  },
  {
    path: '/labels/:id/edit',
    title: 'Edit label',
    component: () => {
      return LabelMobilePage;
    }
  },
  {
    path: '/notifications',
    title: 'Notifications',
    component: () => {
      return isMobileUI() ? NotificationIndexMobilePage : NotificationIndexDesktopPage;
    }
  },
  {
    path: '/profile',
    title: 'Profile',
    component: () => {
      return isMobileUI() ? ProfileMobilePage : ProfileDesktopPage;
    }
  }
];

export default routes;

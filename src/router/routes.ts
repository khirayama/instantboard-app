import { LabelIndexDesktopPage } from 'presentations/containers/LabelIndexDesktopPage';
import { LabelIndexMobilePage } from 'presentations/containers/LabelIndexMobilePage';
import { LabelMobilePage } from 'presentations/containers/LabelMobilePage';
import { LoginMobilePage } from 'presentations/containers/LoginMobilePage';
import { NotificationIndexDesktopPage } from 'presentations/containers/NotificationIndexDesktopPage';
import { NotificationIndexMobilePage } from 'presentations/containers/NotificationIndexMobilePage';
import { ProfileDesktopPage } from 'presentations/containers/ProfileDesktopPage';
import { ProfileMobilePage } from 'presentations/containers/ProfileMobilePage';
import { TaskIndexDesktopPage } from 'presentations/containers/TaskIndexDesktopPage';
import { TaskIndexMobilePage } from 'presentations/containers/TaskIndexMobilePage';
import { TaskMobilePage } from 'presentations/containers/TaskMobilePage';

function isMobileUI(): boolean {
  return window.innerWidth < 568;
}

export const routes: IRoute[] = [
  {
    path: '/login',
    title: 'Login',
    component: (): typeof LoginMobilePage => {
      return LoginMobilePage;
    },
  },
  {
    path: '/',
    title: 'Instantboard',
    component: (): typeof TaskIndexMobilePage | typeof TaskIndexDesktopPage => {
      return isMobileUI() ? TaskIndexMobilePage : TaskIndexDesktopPage;
    },
  },
  {
    path: '/tasks/new',
    title: 'New Task',
    component: (): typeof TaskMobilePage => {
      return TaskMobilePage;
    },
  },
  {
    path: '/tasks/:id/edit',
    title: 'Edit Task',
    component: (): typeof TaskMobilePage => {
      return TaskMobilePage;
    },
  },
  {
    path: '/labels',
    title: 'Labels',
    component: (): typeof LabelIndexMobilePage | typeof LabelIndexDesktopPage => {
      return isMobileUI() ? LabelIndexMobilePage : LabelIndexDesktopPage;
    },
  },
  {
    path: '/labels/new',
    title: 'New Label',
    component: (): typeof LabelMobilePage => {
      return LabelMobilePage;
    },
  },
  {
    path: '/labels/:id/edit',
    title: 'Edit label',
    component: (): typeof LabelMobilePage => {
      return LabelMobilePage;
    },
  },
  {
    path: '/notifications',
    title: 'Notifications',
    component: (): typeof NotificationIndexMobilePage | typeof NotificationIndexDesktopPage => {
      return isMobileUI() ? NotificationIndexMobilePage : NotificationIndexDesktopPage;
    },
  },
  {
    path: '/profile',
    title: 'Profile',
    component: (): typeof ProfileMobilePage | typeof ProfileDesktopPage => {
      return isMobileUI() ? ProfileMobilePage : ProfileDesktopPage;
    },
  },
];

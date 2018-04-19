import LabelIndexDesktopPage from 'presentations/containers/LabelIndexDesktopPage';
import LabelIndexMobilePage from 'presentations/containers/LabelIndexMobilePage';
import LabelMobilePage from 'presentations/containers/LabelMobilePage';
import LoginMobilePage from 'presentations/containers/LoginMobilePage';
import NotificationIndexDesktopPage from 'presentations/containers/NotificationIndexDesktopPage';
import { NotificationIndexMobilePage } from 'presentations/containers/NotificationIndexMobilePage';
import { ProfileDesktopPage } from 'presentations/containers/ProfileDesktopPage';
import { ProfileMobilePage } from 'presentations/containers/ProfileMobilePage';
import { TaskIndexDesktopPage } from 'presentations/containers/TaskIndexDesktopPage';
import { TaskIndexMobilePage } from 'presentations/containers/TaskIndexMobilePage';
import { TaskMobilePage } from 'presentations/containers/TaskMobilePage';

function isMobileUI(): boolean {
  return window.innerWidth < 568;
}

/* tslint:disable:no-any */
export const routes: IRoute[] = [
  {
    path: '/login',
    title: 'Login',
    component: (): any => {
      return LoginMobilePage;
    },
  },
  {
    path: '/',
    title: 'Instantboard',
    component: (): any => {
      return isMobileUI() ? TaskIndexMobilePage : TaskIndexDesktopPage;
    },
  },
  {
    path: '/tasks/new',
    title: 'New Task',
    component: (): any => {
      return TaskMobilePage;
    },
  },
  {
    path: '/tasks/:id/edit',
    title: 'Edit Task',
    component: (): any => {
      return TaskMobilePage;
    },
  },
  {
    path: '/labels',
    title: 'Labels',
    component: (): any => {
      return isMobileUI() ? LabelIndexMobilePage : LabelIndexDesktopPage;
    },
  },
  {
    path: '/labels/new',
    title: 'New Label',
    component: (): any => {
      return LabelMobilePage;
    },
  },
  {
    path: '/labels/:id/edit',
    title: 'Edit label',
    component: (): any => {
      return LabelMobilePage;
    },
  },
  {
    path: '/notifications',
    title: 'Notifications',
    component: (): any => {
      return isMobileUI() ? NotificationIndexMobilePage : NotificationIndexDesktopPage;
    },
  },
  {
    path: '/profile',
    title: 'Profile',
    component: (): any => {
      return isMobileUI() ? ProfileMobilePage : ProfileDesktopPage;
    },
  },
];

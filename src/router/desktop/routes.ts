import { LabelIndexDesktopPage } from 'presentations/containers/LabelIndexDesktopPage';
import { LabelMobilePage } from 'presentations/containers/LabelMobilePage';
import { LoginMobilePage } from 'presentations/containers/LoginMobilePage';
import { NotificationIndexDesktopPage } from 'presentations/containers/NotificationIndexDesktopPage';
import { ProfileDesktopPage } from 'presentations/containers/ProfileDesktopPage';
import { TaskIndexDesktopPage } from 'presentations/containers/TaskIndexDesktopPage';
import { TaskMobilePage } from 'presentations/containers/TaskMobilePage';

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
    component: (): typeof TaskIndexDesktopPage => {
      return TaskIndexDesktopPage;
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
    component: (): typeof LabelIndexDesktopPage => {
      return LabelIndexDesktopPage;
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
    component: (): typeof NotificationIndexDesktopPage => {
      return NotificationIndexDesktopPage;
    },
  },
  {
    path: '/profile',
    title: 'Profile',
    component: (): typeof ProfileDesktopPage => {
      return ProfileDesktopPage;
    },
  },
];

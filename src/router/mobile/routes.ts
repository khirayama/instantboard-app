import { LabelIndexMobilePage } from 'presentations/containers/LabelIndexMobilePage';
import { LabelMobilePage } from 'presentations/containers/LabelMobilePage';
import { LoginMobilePage } from 'presentations/containers/LoginMobilePage';
import { NotificationIndexMobilePage } from 'presentations/containers/NotificationIndexMobilePage';
import { ProfileMobilePage } from 'presentations/containers/ProfileMobilePage';
import { TaskIndexMobilePage } from 'presentations/containers/TaskIndexMobilePage';
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
    component: (): typeof TaskIndexMobilePage => {
      return TaskIndexMobilePage;
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
    component: (): typeof LabelIndexMobilePage => {
      return LabelIndexMobilePage;
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
    component: (): typeof NotificationIndexMobilePage => {
      return NotificationIndexMobilePage;
    },
  },
  {
    path: '/profile',
    title: 'Profile',
    component: (): typeof ProfileMobilePage => {
      return ProfileMobilePage;
    },
  },
];

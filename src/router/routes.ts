import LoginPage from '../containers/login-page';
import UserPage from '../containers/user-page';
import MainPage from '../containers/main-page';
import TaskPage from '../containers/task-page';
import LabelPage from '../containers/label-page';

const routes: IRoute[] = [{
  path: '/login',
  title: 'Login',
  component: LoginPage,
}, {
  path: '/users/new',
  title: 'New User',
  component: UserPage,
}, {
  path: '/',
  title: 'Instantboard',
  component: MainPage,
}, {
  path: '/tasks/new',
  title: 'New Task',
  component: TaskPage,
}, {
  path: '/tasks/:id/edit',
  title: 'Edit Task',
  component: TaskPage,
}, {
  path: '/labels/new',
  title: 'New Label',
  component: LabelPage,
}, {
  path: '/labels/:id/edit',
  title: 'Edit label',
  component: LabelPage,
}];
export default routes;

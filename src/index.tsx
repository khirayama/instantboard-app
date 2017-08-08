import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Store from './store';
import reducers from './reducers';

const activities = {
  LOGIN_ACTIVITY: '__LOGIN_ACTIVITY',
  USER_ACTIVITY: '__USER_ACTIVITY',
  MAIN_ACTIVITY: '__MAIN_ACTIVITY',
  TASK_ACTIVITY: '__TASK_ACTIVITY',
  LABEL_ACTIVITY: '__LABEL_ACTIVITY',
};

const initialState: IState = {
  idToken: null,
  profile: null,
  tasks: [],
  labels: [],
  requests: [],
  members: [],
  ui: {
    activity: activities.MAIN_ACTIVITY,
    selectedTaskId: null,
    selectedLabelId: null,
    isLoadingTasks: false,
    isLoadingLabels: false,
    isLoadingRequests: false,
    isLoadingMembers: false,
    isShownTaskModal: false,
    isShownLabelModal: false,
    errors: [],
  },
};

const store = new Store(initialState, reducers);

window.addEventListener('DOMContentLoaded', () => {
  console.log(`Start app at ${new Date()}.`);

  const applicationMainElement: any = document.querySelector('.application--main');
  ReactDOM.render(<div>hoge</div>, applicationMainElement);

  const applicationLoadingElement: any = document.querySelector('.application--loader');
  if (applicationLoadingElement !== null) {
    applicationLoadingElement.parentNode.removeChild(applicationLoadingElement);
  }
});

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Store from './store';
import reducers from './reducers';
import {activities} from './activities';
import Provider from './provider';

const initialState: IState = {
  idToken: null,
  profile: null,
  tasks: [],
  labels: [],
  requests: [],
  members: [],
  ui: {
    activityKey: activities.mainActivity.key,
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

const store: IStore = new Store(initialState, reducers);

window.addEventListener('DOMContentLoaded', () => {
  console.log(`Start app at ${new Date()}.`);

  const applicationMainElement: any = document.querySelector('.application--main');
  ReactDOM.render(<Provider store={store} />, applicationMainElement);

  const applicationLoadingElement: any = document.querySelector('.application--loader');
  if (applicationLoadingElement !== null) {
    applicationLoadingElement.parentNode.removeChild(applicationLoadingElement);
  }
});

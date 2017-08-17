import * as uuid from 'uuid/v4';

const mockLabels = [{
  cid: uuid(),
  name: 'TODAY',
  visibled: true,
}, {
  cid: uuid(),
  name: 'LATER',
  visibled: true,
}];

const mockTasks = [{
  cid: uuid(),
  labelId: mockLabels[0].cid,
  text: 'fuga casdjhbcalds cadjskcn dsajncadslc dnsa csadkc asdc adsc kjcqd asd casd casd c',
  completed: false,
  schedule: {
    shortMonthName: 'Feb',
    shortDayName: 'Mon',
    date: 28,
  },
}, {
  cid: uuid(),
  labelId: mockLabels[0].cid,
  text: 'fuga',
  completed: false,
  schedule: null,
}, {
  cid: uuid(),
  labelId: mockLabels[0].cid,
  text: 'foo',
  completed: false,
  schedule: {
    shortMonthName: 'Feb',
    shortDayName: 'Mon',
    date: 28,
  },
}, {
  cid: uuid(),
  labelId: mockLabels[0].cid,
  text: 'fuga casdjhbcalds cadjskcn dsajncadslc dnsa csadkc asdc adsc kjcqd asd casd casd c',
  completed: true,
  schedule: null,
}, {
  cid: uuid(),
  labelId: mockLabels[0].cid,
  text: 'fuga https://material.io/icons/ https://lightworks-blog.com/team-building casdjhbcalds cadjskcn dsajsd casd c',
  completed: false,
  schedule: null,
}];

const initialState: IState = {
  idToken: null,
  profile: null,
  tasks: mockTasks,
  labels: mockLabels,
  requests: [],
  members: [],
  ui: {
    selectedTaskId: null,
    selectedLabelId: null,
    isLoadingTasks: false,
    isLoadingTaskCids: [],
    isLoadingLabels: false,
    isLoadingLabelCids: [],
    isLoadingRequests: false,
    isLoadingRequestCids: [],
    isLoadingMembers: false,
    isLoadingMemberCids: [],
    errors: [],
  },
};
export default initialState;

const mockTasks = [{
  cid: '123',
  labelId: '123',
  text: 'fuga casdjhbcalds cadjskcn dsajncadslc dnsa csadkc asdc adsc kjcqd asd casd casd c',
  completed: false,
  schedule: {
    shortMonthName: 'Feb',
    shortDayName: 'Mon',
    date: 28,
  },
}, {
  cid: '125',
  labelId: '123',
  text: 'fuga',
  completed: false,
  schedule: null,
}, {
  cid: '127',
  labelId: '123',
  text: 'foo',
  completed: false,
  schedule: {
    shortMonthName: 'Feb',
    shortDayName: 'Mon',
    date: 28,
  },
}, {
  cid: '126',
  labelId: '123',
  text: 'fuga casdjhbcalds cadjskcn dsajncadslc dnsa csadkc asdc adsc kjcqd asd casd casd c',
  completed: true,
  schedule: null,
}, {
  cid: '124',
  labelId: '123',
  text: 'fuga https://material.io/icons/ https://lightworks-blog.com/team-building casdjhbcalds cadjskcn dsajsd casd c',
  completed: false,
  schedule: null,
}];

const mockLabels = [{
  cid: '123',
  name: 'TODAY',
  visibled: true,
}, {
  cid: '124',
  name: 'LATER',
  visibled: true,
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

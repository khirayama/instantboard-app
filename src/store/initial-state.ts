const mockTasks = [{
  id: '123',
  labelId: '123',
  text: 'fuga casdjhbcalds cadjskcn dsajncadslc dnsa csadkc asdc adsc kjcqd asd casd casd c',
  completed: false,
  connecting: false,
  schedule: {
    shortMonthName: 'Feb',
    shortDayName: 'Mon',
    date: 28,
  },
}, {
  id: '125',
  labelId: '123',
  text: 'fuga',
  completed: false,
  connecting: false,
}, {
  id: '127',
  labelId: '123',
  text: 'foo',
  completed: false,
  connecting: false,
  schedule: {
    shortMonthName: 'Feb',
    shortDayName: 'Mon',
    date: 28,
  },
}, {
  id: '126',
  labelId: '123',
  text: 'fuga casdjhbcalds cadjskcn dsajncadslc dnsa csadkc asdc adsc kjcqd asd casd casd c',
  completed: true,
  connecting: false,
}, {
  id: '124',
  labelId: '123',
  text: 'fuga https://material.io/icons/ https://lightworks-blog.com/team-building casdjhbcalds cadjskcn dsajsd casd c',
  completed: false,
  connecting: false,
}];

const mockLabels = [{
  id: '123',
  name: 'TODAY',
  visibled: true,
  connecting: false,
}, {
  id: '124',
  name: 'LATER',
  visibled: true,
  connecting: false,
}];

const initialState: IState = {
  idToken: null,
  profile: {
    connecting: false,
    data: null,
  },
  tasks: {
    connecting: false,
    data: mockTasks,
  },
  labels: {
    connecting: false,
    data: mockLabels,
  },
  requests: {
    connecting: false,
    data: [],
  },
  members: {
    connecting: false,
    data: [],
  },
  ui: {
    selectedTaskId: null,
    selectedLabelId: null,
    errors: [],
  },
};
export default initialState;

const mockTasks = [{
  connecting: false,
  cid: '0',
  data: {
    id: '123',
    labelId: '123',
    text: 'fuga casdjhbcalds cadjskcn dsajncadslc dnsa csadkc asdc adsc kjcqd asd casd casd c',
    completed: false,
    schedule: {
      shortMonthName: 'Feb',
      shortDayName: 'Mon',
      date: 28,
    },
  },
}, {
  connecting: false,
  cid: '1',
  data: {
    id: '125',
    labelId: '123',
    text: 'fuga',
    completed: false,
    schedule: null,
  },
}, {
  connecting: false,
  cid: '2',
  data: {
    id: '127',
    labelId: '123',
    text: 'foo',
    completed: false,
    schedule: {
      shortMonthName: 'Feb',
      shortDayName: 'Mon',
      date: 28,
    },
  },
}, {
  connecting: false,
  cid: '3',
  data: {
    id: '126',
    labelId: '123',
    text: 'fuga casdjhbcalds cadjskcn dsajncadslc dnsa csadkc asdc adsc kjcqd asd casd casd c',
    completed: true,
    schedule: null,
  },
}, {
  connecting: false,
  cid: '4',
  data: {
    id: '124',
    labelId: '123',
    text: 'fuga https://material.io/icons/ https://lightworks-blog.com/team-building casdjhbcalds cadjskcn dsajsd casd c',
    completed: false,
    connecting: false,
    schedule: null,
  },
}];

const mockLabels = [{
  connecting: false,
  cid: '0',
  data: {
    id: '123',
    name: 'TODAY',
    visibled: true,
    connecting: false,
  },
}, {
  connecting: false,
  cid: '1',
  data: {
    id: '124',
    name: 'LATER',
    visibled: true,
    connecting: false,
  },
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

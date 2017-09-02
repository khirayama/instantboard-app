import * as uuid from 'uuid/v4';

const mockLabels = [{
  id: uuid(),
  name: 'TODAY',
  visibled: true,
}, {
  id: uuid(),
  name: 'LATER',
  visibled: true,
}, {
  id: uuid(),
  name: 'MEMO',
  visibled: false,
}];

const mockTasks = [{
  id: uuid(),
  labelId: mockLabels[0].id,
  text: 'fuga casdjhbcalds cadjskcn dsajncadslc dnsa csadkc asdc adsc kjcqd asd casd casd c',
  completed: false,
  schedule: {
    shortMonthName: 'Feb',
    shortDayName: 'Mon',
    date: 28,
  },
}, {
  id: uuid(),
  labelId: mockLabels[0].id,
  text: 'fuga',
  completed: false,
  schedule: null,
}, {
  id: uuid(),
  labelId: mockLabels[0].id,
  text: 'foo',
  completed: false,
  schedule: {
    shortMonthName: 'Feb',
    shortDayName: 'Mon',
    date: 28,
  },
}, {
  id: uuid(),
  labelId: mockLabels[0].id,
  text: 'fuga casdjhbcalds cadjskcn dsajncadslc dnsa csadkc asdc adsc kjcqd asd casd casd c',
  completed: true,
  schedule: null,
}, {
  id: uuid(),
  labelId: mockLabels[0].id,
  text: 'fuga https://material.io/icons/ https://lightworks-blog.com/team-building casdjhbcalds cadjskcn dsajsd casd c',
  completed: false,
  schedule: null,
}];

const initialState: IState = {
  profile: null,
  tasks: [],
  labels: [],
  requests: [],
  members: [],
  ui: {
    selectedTaskId: null,
    selectedLabelId: null,
    isLoadingTasks: false,
    isLoadingLabels: false,
    isLoadingRequests: false,
    isLoadingMembers: false,
    errors: [],
  },
};
export default initialState;

import actionTypes from '../constants/action-types';
import {Label} from '../services';

// Label
export function fetchLabel(dispatch) {
  return new Promise(resolve => {
    const {data, sync} = Label.fetch();

    const _action = {
      type: actionTypes.FETCH_LABEL,
      payload: {
        labels: data.labels,
        isLoadingLabels: true,
      },
    };
    dispatch(_action);

    sync().then(labels => {
      const action = {
        type: actionTypes.FETCH_LABEL_SUCCESS,
        payload: {labels},
      };
      dispatch(action);
      resolve(action);
    }).catch(() => {
      const action = {
        type: actionTypes.FETCH_LABEL_FAILURE,
      };
      dispatch(action);
      resolve(action);
    });
  });
}

export function createLabel(dispatch, label) {
  return new Promise(resolve => {
    const {data, sync} = Label.create(label);

    const _action = {
      type: actionTypes.CREATE_LABEL,
      payload: {label: data.label},
    };
    dispatch(_action);

    sync().then(newLabel => {
      const action = {
        type: actionTypes.CREATE_LABEL_SUCCESS,
        payload: {label: newLabel},
      };
      dispatch(action);
      resolve(action);
    }).catch(() => {
      const action = {
        type: actionTypes.CREATE_LABEL_FAILURE,
      };
      dispatch(action);
      resolve(action);
    });
  });
}

export function updateLabel(dispatch, label) {
  return new Promise(resolve => {
    const {data, sync} = Label.update(label);

    const _action = {
      type: actionTypes.UPDATE_LABEL,
      payload: {label: data.label},
    };
    dispatch(_action);

    sync().then(newLabel => {
      const action = {
        type: actionTypes.UPDATE_LABEL_SUCCESS,
        payload: {label: newLabel},
      };
      dispatch(action);
      resolve(action);
    }).catch(() => {
      const action = {
        type: actionTypes.UPDATE_LABEL_FAILURE,
      };
      dispatch(action);
      resolve(action);
    });
  });
}

export function destroyLabel(dispatch, label) {
  return new Promise(resolve => {
    const {data, sync} = Label.destroy(label);

    const _action = {
      type: actionTypes.DESTROY_LABEL,
      payload: {labels: data.labels},
    };
    dispatch(_action);

    sync().then(() => {
      const action = {
        type: actionTypes.DESTROY_LABEL_SUCCESS,
      };
      dispatch(action);
      resolve(action);
    }).catch(() => {
      const action = {
        type: actionTypes.DESTROY_LABEL_FAILURE,
      };
      dispatch(action);
      resolve(action);
    });
  });
}

export function sortLabel(dispatch, label, to) {
  return new Promise(resolve => {
    const {data, sync} = Label.sort(label, to);

    const _action = {
      type: actionTypes.SORT_LABEL,
      payload: {labels: data.labels},
    };
    dispatch(_action);

    sync().then(() => {
      const action = {
        type: actionTypes.SORT_LABEL_SUCCESS,
      };
      dispatch(action);
      resolve(action);
    }).catch(() => {
      const action = {
        type: actionTypes.SORT_LABEL_FAILURE,
      };
      dispatch(action);
      resolve(action);
    });
  });
}

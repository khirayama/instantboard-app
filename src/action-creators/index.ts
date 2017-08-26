import actionTypes from '../constants/action-types';
import {Label} from '../services';

export function fetchLabel(dispatch) {
  return new Promise((resolve) => {
    const _labels = Label.cache();
    const _action = {
      type: actionTypes.FETCH_LABEL,
      payload: {
        labels: _labels,
        isLoadingLabels: true,
      },
    };
    dispatch(_action);

    Label.fetch().then((labels: ILabel[]) => {
      const action = {
        type: actionTypes.FETCH_LABEL_SUCCESS,
        payload: {
          labels,
          isLoadingLabels: false,
        },
      };
      dispatch(action);
      resolve(action);
    });
  });
}

export function createLabel(dispatch, label) {
  return new Promise((resolve) => {
    const _label = Label.build(label);
    const _action = {
      type: actionTypes.CREATE_LABEL,
      payload: {label: _label},
    };
    dispatch(_action);

    Label.create(_label).then((newLabel: ILabel) => {
      const action = {
        type: actionTypes.CREATE_LABEL_SUCCESS,
        payload: {label: newLabel},
      };
      dispatch(action);
      resolve(action);
    });
  });
}

export function updateLabel(dispatch, label) {
  return new Promise((resolve) => {
    const _label = Label.build(label);
    const _action = {
      type: actionTypes.UPDATE_LABEL,
      payload: {label: _label},
    };
    dispatch(_action);

    Label.update(_label).then((newLabel: ILabel) => {
      const action = {
        type: actionTypes.UPDATE_LABEL_SUCCESS,
        payload: {label: newLabel},
      };
      dispatch(action);
      resolve(action);
    });
  });
}

export function destroyLabel(dispatch, label) {
  return new Promise((resolve) => {
    const _action = {
      type: actionTypes.DESTROY_LABEL,
      payload: {label},
    };
    dispatch(_action);

    Label.destroy(label).then(() => {
      // const action = {
      //   type: actionTypes.DESTROY_LABEL_SUCCESS,
      //   payload: {label},
      // };
      // dispatch(action);
      // resolve(action);
    });
  });
}

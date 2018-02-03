import actionTypes from '../constants/action-types';
import { Label, Request } from '../services';
import { transformLabelRequest, transformLabelResponse } from './transforms';

export function fetchLabel(dispatch: IDispatch): Promise<IAction> {
  const preAction: IAction = {
    type: actionTypes.FETCH_LABEL,
  };
  dispatch(preAction);

  return new Promise(resolve => {
    Label.fetch()
      .then((labels: ILabelResponse[]) => {
        const transformedLabels: ILabel[] = labels.map(transformLabelResponse);
        const action: IAction = {
          type: actionTypes.FETCH_LABEL_SUCCESS,
          payload: {
            labels: transformedLabels,
          },
        };
        dispatch(action);
        resolve(action);
      })
      .catch(() => {
        const action: IAction = {
          type: actionTypes.FETCH_LABEL_FAILURE,
        };
        dispatch(action);
        resolve(action);
      });
  });
}

export function createLabel(
  dispatch: IDispatch,
  label: { name: string; members: ITemporaryMember[] },
): Promise<IAction> {
  const preAction: IAction = {
    type: actionTypes.CREATE_LABEL,
  };
  dispatch(preAction);

  return new Promise((resolve, reject) => {
    Label.create(label)
      .then((newLabel: ILabelResponse) => {
        const transformedLabel: ILabel = transformLabelResponse(newLabel);
        const action: IAction = {
          type: actionTypes.CREATE_LABEL_SUCCESS,
          payload: {
            label: transformedLabel,
          },
        };
        dispatch(action);

        Promise.all(
          label.members.map((member: ITemporaryMember) => {
            return Request.create({
              labelId: transformedLabel.id,
              memberId: member.id,
            });
          }),
        )
          .then(() => {
            const postAction: IAction = {
              type: actionTypes.UPDATE_REQUEST_SUCCESS,
            };
            dispatch(action);
            resolve(action);
          })
          .catch(() => {
            const postAction: IAction = {
              type: actionTypes.UPDATE_REQUEST_FAILURE,
            };
            dispatch(action);
            resolve(action);
          });
      })
      .catch(() => {
        const action: IAction = {
          type: actionTypes.CREATE_LABEL_FAILURE,
        };
        dispatch(action);
        resolve(action);
      });
  });
}

export function updateLabel(
  dispatch: IDispatch,
  label: { id: number; name: string; visibled: boolean; members: any[] },
): Promise<IAction> {
  const preAction: IAction = {
    type: actionTypes.UPDATE_LABEL,
  };
  dispatch(preAction);

  return new Promise((resolve, reject) => {
    Label.update(label)
      .then((newLabel: ILabelResponse) => {
        const transformedLabel: ILabel = transformLabelResponse(newLabel);
        const action: IAction = {
          type: actionTypes.UPDATE_LABEL_SUCCESS,
          payload: {
            label: transformedLabel,
          },
        };
        dispatch(action);

        Promise.all(
          label.members.map((member: ITemporaryMember) => {
            return Request.create({
              labelId: transformedLabel.id,
              memberId: member.id,
            });
          }),
        )
          .then(() => {
            const postAction: IAction = {
              type: actionTypes.UPDATE_REQUEST_SUCCESS,
            };
            dispatch(action);
            resolve(action);
          })
          .catch(() => {
            const postAction: IAction = {
              type: actionTypes.UPDATE_REQUEST_FAILURE,
            };
            dispatch(action);
            resolve(action);
          });
      })
      .catch(() => {
        const action: IAction = {
          type: actionTypes.UPDATE_LABEL_FAILURE,
        };
        dispatch(action);
        resolve(action);
      });
  });
}

export function destroyLabel(dispatch: IDispatch, label: ILabelRequestId): Promise<IAction> {
  const preAction: IAction = {
    type: actionTypes.DESTROY_LABEL,
    payload: {
      label: transformLabelRequest(label),
    },
  };
  dispatch(preAction);

  return new Promise(resolve => {
    Label.destroy(label)
      .then(() => {
        const action: IAction = {
          type: actionTypes.DESTROY_LABEL_SUCCESS,
        };
        dispatch(action);
        resolve(action);
      })
      .catch(() => {
        const action: IAction = {
          type: actionTypes.DESTROY_LABEL_FAILURE,
        };
        dispatch(action);
        resolve(action);
      });
  });
}

export function sortLabel(dispatch: IDispatch, label: ILabelRequestId, to: number): Promise<IAction> {
  const preAction: IAction = {
    type: actionTypes.SORT_LABEL,
    payload: {
      label: transformLabelRequest(label),
      priority: to,
    },
  };
  dispatch(preAction);

  return new Promise(resolve => {
    Label.sort(label, to)
      .then((labels: ILabelResponse[]) => {
        const action: IAction = {
          type: actionTypes.SORT_LABEL_SUCCESS,
          payload: {
            labels: labels.map(transformLabelResponse),
          },
        };
        dispatch(action);
        resolve(action);
      })
      .catch(() => {
        const action = {
          type: actionTypes.SORT_LABEL_FAILURE,
        };
        dispatch(action);
        resolve(action);
      });
  });
}

import actionTypes from '../constants/action-types';
import { Label, Request } from '../services';
import { transformLabelRequest, transformLabelResponse } from './transforms';

export function fetchLabel(dispatch: IDispatch): Promise<{}> {
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

export function createLabel(dispatch: IDispatch, label: ILabel): Promise<{}> {
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

        if (label.members.length) {
          const result: any = {
            label: transformedLabel,
            members: [],
          };
          label.members.forEach((member: ILabelMember) => {
            const requestHandler = (success: any, res: any) => {
              result.members.push({
                success,
                labelId: transformedLabel.id,
                name: member.name,
                errors: success ? [] : [res.error],
              });

              if (result.members.length === label.members.length) {
                if (
                  result.members.length === result.members.filter((memberResult: any) => memberResult.success).length
                ) {
                  resolve(result);
                } else {
                  reject(result);
                }
              }
            };
            Request.create({
              labelId: transformedLabel.id,
              memberId: member.id,
            })
              .then(res => {
                requestHandler(true, res);
              })
              .catch(res => {
                requestHandler(false, res);
              });
          });
        } else {
          resolve(action);
        }
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

export function updateLabel(dispatch: IDispatch, label: ILabel): Promise<{}> {
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

        if (label.members && label.members.length) {
          const result: any = {
            label: transformedLabel,
            members: [],
          };
          label.members.forEach((member: ILabelMember) => {
            const requestHandler = (success: any, res: any) => {
              result.members.push({
                success,
                labelId: transformedLabel.id,
                name: member.name,
                errors: success ? [] : [res.error],
              });

              if (result.members.length === label.members.length) {
                if (
                  result.members.length === result.members.filter((memberResult: any) => memberResult.success).length
                ) {
                  resolve(result);
                } else {
                  reject(result);
                }
              }
            };
            Request.create({
              labelId: transformedLabel.id,
              memberId: member.id,
            })
              .then(res => {
                requestHandler(true, res);
              })
              .catch(res => {
                requestHandler(false, res);
              });
          });
        }
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

export function destroyLabel(dispatch: IDispatch, label: ILabelRequestId): Promise<{}> {
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

export function sortLabel(dispatch: IDispatch, label: ILabelRequestId, to: number): Promise<{}> {
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

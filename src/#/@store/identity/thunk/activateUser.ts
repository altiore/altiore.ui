import { push } from 'connected-react-router';
import { Dispatch } from 'redux';

import { identifier, projectIdSearchParam } from '#/@store/router';

import { getAuthActivate, IGetAuthActivateData, setIsLoading } from '../actions';
import { userBearerKey } from '../selectors';
import { loadInitialData } from './loadInitialData';
import { logOut } from './logOut';

import { IState } from '@types';

export const activateUser = () => async (dispatch: Dispatch<any>, getState: () => IState) => {
  try {
    dispatch(setIsLoading());
    const state = getState();
    const bearerKey = identifier(state);
    if (!bearerKey) {
      throw new Error('BearerKey not found');
    }
    const activateParams: IGetAuthActivateData = {
      oneTimeToken: bearerKey,
    };
    const projectId = projectIdSearchParam(state);
    if (projectId) {
      activateParams.project = projectId;
    }
    const currentBearerKey = userBearerKey(state);
    if (currentBearerKey) {
      await dispatch(logOut());
    }
    await dispatch(getAuthActivate(activateParams));
    dispatch(push('/'));
    dispatch(setIsLoading(false));
    return dispatch(loadInitialData() as any);
  } catch (e) {
    dispatch(push('/'));
    dispatch(setIsLoading(false));
    return e;
  }
};

import { connect } from 'react-redux';

import { push } from 'connected-react-router';
import get from 'lodash/get';
import { destroy, reduxForm } from 'redux-form';

import { DialogProps } from '@material-ui/core';

import { onSubmitForm } from '#/@store/@common/helpers';
import { store } from '#/@store/createStore';
import { DEFAULT_TRANSITION_DURATION } from '#/@store/dialog';
import { CREATE_PROJECT_FORM, IPostProjectData, postProject } from '#/@store/projects';

import { CreateProjectPopupJsx } from './create-project-popup';

import { PROJECT_TYPE } from '@types';

const mapDispatch = {
  goToPage: push,
};

const CreateProjectPopup = connect(
  undefined,
  mapDispatch
)(
  reduxForm<{}, any>({
    destroyOnUnmount: false,
    form: CREATE_PROJECT_FORM,
    initialValues: {
      type: PROJECT_TYPE.SOCIALLY_USEFUL,
    },
    onSubmit: onSubmitForm<IPostProjectData>(postProject),
    onSubmitFail: () => true,
    onSubmitSuccess: (res, dispatch, { onClose, goToPage }) => {
      onClose();
      dispatch(destroy(CREATE_PROJECT_FORM));
      return goToPage(`/projects/${get(res, 'payload.data.id')}`);
    },
  })(CreateProjectPopupJsx) as any
);

const createProjectDialogProps: Partial<DialogProps> = {
  fullWidth: true,
  maxWidth: 'sm',
  onClose: () => {
    setTimeout(() => {
      store.dispatch(destroy(CREATE_PROJECT_FORM));
    }, DEFAULT_TRANSITION_DURATION);
  },
  scroll: 'body',
};

export { CreateProjectPopup, createProjectDialogProps };

import { connect } from 'react-redux';

import { isValid } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';

import { showError } from '#/@store/notifications';
import { getProjectById, ownProjectList } from '#/@store/projects';
import { allTaskListWithoutDefProject } from '#/@store/tasks';
import { currentProjectId } from '#/@store/timer';
import { CREATE_USER_WORK_FORM_NAME, startUserWork } from '#/@store/user-works';

import { AutoTaskFieldTsx } from './AutoTaskField';
import { styles } from './styles';

import { ITask } from '@types';

const mapState = createStructuredSelector({
  getProjectById,
  isValid: isValid(CREATE_USER_WORK_FORM_NAME),
  projectId: currentProjectId,
  projects: ownProjectList,
  suggestions: allTaskListWithoutDefProject,
} as any);

const mapDispatch = {
  showError,
  startUserWork: (task: ITask) =>
    startUserWork({ taskId: task.id, projectId: task.projectId, description: task.title }),
};

const mergeProps = (
  { isValid, ...restState }: any,
  { showError, startUserWork, ...restDispatch }: any,
  ownProps: any
) => ({
  ...restState,
  ...restDispatch,
  ...ownProps,
  onSelect: (task: ITask) => {
    if (isValid) {
      startUserWork(task);
    } else {
      showError({
        message: 'Длина названия задачи не может превышать 140 символов',
        position: 'tc',
        title: 'Ошибка валидации!',
      });
    }
  },
});

export default connect(
  mapState,
  mapDispatch,
  mergeProps
)(withStyles(styles, { withTheme: true })(AutoTaskFieldTsx));

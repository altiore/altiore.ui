import React from 'react';

import { InjectedFormProps } from 'redux-form';

import Fab from '@material-ui/core/Fab';
import { Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
// import { length } from 'redux-form-validators';

// import AutoTaskField from './AutoTaskField';

export interface IInternalProps {
  classes: any;
  selectedProject: any;
  theme: Theme;
}

export interface IStartFormData {
  description: string;
  projectId: number;
}

export class IStartFormProps {
  title?: string;
  buttonText?: string;
}

export const StartFormJsx: React.FunctionComponent<
  IInternalProps & InjectedFormProps<IStartFormData, IStartFormProps>
> = React.memo(({ classes, handleSubmit, selectedProject }) => (
  <form onSubmit={handleSubmit} className={classes.form}>
    {/*<div className={classes.inputBlock}>*/}
    {/*  <Field*/}
    {/*    name="description"*/}
    {/*    component={AutoTaskField}*/}
    {/*    label="Выбери или создай задачу..."*/}
    {/*    validate={[length({ max: 140, msg: 'Превышен максимум 140 символов' })]}*/}
    {/*  />*/}
    {/*</div>*/}
    {selectedProject && (
      <Tooltip title={`Создать новую задачу в проекте "${selectedProject.title}"`} placement={'top'}>
        <Fab onClick={handleSubmit} className={classes.add}>
          <AddIcon fontSize={'default'} />
        </Fab>
      </Tooltip>
    )}
  </form>
));

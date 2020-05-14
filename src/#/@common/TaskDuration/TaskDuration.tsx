import React, { useCallback, useMemo, useState } from 'react';
import Popover from 'react-popover';

import { makeStyles, Theme } from '@material-ui/core/styles';

import TaskDuration from '@components/TaskDuration';

import CurrentDurationItem from './CurrentDurationItem';
import { UserWorkTable } from './UserWorkTable';

import { ITask } from '@types';

export interface ITaskDurationProps {
  currentTaskId: number | string;
  getTaskById: (id: string | number) => ITask;
  taskId: number | string;
}

export const useStyles = makeStyles((theme: Theme) => ({
  duration: {
    '& > button': {
      padding: theme.spacing(0.75, 0),
      width: '100%',
    },
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    width: theme.spacing(10),
  },
  userWorkTable: {
    zIndex: 1300,
  },
}));

export const TaskDurationTsx: React.FC<ITaskDurationProps> = ({ currentTaskId, getTaskById, taskId }) => {
  const classes = useStyles();

  const task = useMemo(() => {
    return getTaskById(taskId);
  }, [getTaskById, taskId]);

  const isCurrent = useMemo(() => task && task.id === currentTaskId, [currentTaskId, task]);

  const [isWorkTableOpen, setIsWorkTableOpen] = useState(false);

  const onToggleOpenWorkTable = useCallback(() => setIsWorkTableOpen(st => !st), [setIsWorkTableOpen]);

  return (
    <Popover
      tipSize={4}
      className={classes.userWorkTable}
      isOpen={isWorkTableOpen}
      onOuterAction={onToggleOpenWorkTable}
      body={task ? <UserWorkTable task={task} onClose={onToggleOpenWorkTable} /> : <div />}
    >
      <div className={classes.duration}>
        {isCurrent ? (
          <CurrentDurationItem isOpen={isWorkTableOpen} hoursPerDay={24} onClick={onToggleOpenWorkTable} />
        ) : (
          <TaskDuration
            isOpen={isWorkTableOpen}
            hoursPerDay={24}
            onClick={task.durationInSeconds ? undefined : onToggleOpenWorkTable}
            time={task.durationInSeconds}
          />
        )}
      </div>
    </Popover>
  );
};

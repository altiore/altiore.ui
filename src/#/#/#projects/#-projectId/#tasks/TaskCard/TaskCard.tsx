import React, { useMemo } from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

import get from 'lodash/get';

import grey from '@material-ui/core/colors/grey';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import BugReportIcon from '@material-ui/icons/BugReport';
import ExtensionIcon from '@material-ui/icons/Extension';

import Avatar from '@components/Avatar';

import { Task } from '#/@store/tasks';

import { IUser } from '@types';

export interface ITaskCard extends Partial<Task> {
  classes: any;
  getProjectMemberById: (_: any) => IUser;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  onClick: any;
}

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // change background colour if dragging
  background: isDragging ? grey[50] : '#ffffff',

  // styles we need to apply on draggables
  ...draggableStyle,
  cursor: 'pointer',
});

export const TaskCardTsx: React.FC<ITaskCard> = ({
  classes,
  getProjectMemberById,
  onClick,
  title,
  typeId,
  value,
  performerId,
  provided,
  snapshot,
}) => {
  const taskPerformer = useMemo<IUser>(() => {
    return getProjectMemberById(performerId);
  }, [getProjectMemberById, performerId]);

  return (
    <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      onClick={onClick}
      className={classes.root}
      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
    >
      <span className={classes.row}>
        {typeId ? (
          <BugReportIcon fontSize="small" className={classes.iconBug} />
        ) : (
          <ExtensionIcon fontSize="small" className={classes.iconStory} />
        )}
        <Typography gutterBottom component="span">
          {title}
        </Typography>
      </span>
      <div className={classes.footer}>
        <div className={classes.row}>
          <div className={classes.value}>
            <Typography component="span" variant="caption" className={classes.valueText}>
              {value || '-'}
            </Typography>
          </div>
        </div>
        <Tooltip title={get(taskPerformer, 'userName', 'N/A')}>
          <Avatar size="sm" src={get(taskPerformer, ['avatar', 'url'])}>
            {get(taskPerformer, ['email'], '--')}
          </Avatar>
        </Tooltip>
      </div>
    </div>
  );
};

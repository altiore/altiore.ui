import React, { useCallback, useEffect } from 'react';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';

import cn from 'classnames';

import ButtonBase from '@material-ui/core/ButtonBase';
import amber from '@material-ui/core/colors/amber';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';

import { PatchTaskForm } from '#/@common/TaskForm';
import { TASKS_ROUTE } from '#/@store/router';
import { STATUS_NAMES, Task } from '#/@store/tasks';

import { useStyles } from './styles';
import { TaskCard } from './TaskCard';

const CARD_WIDTH = 296;

const getListStyle = (isDraggingOver: boolean, height: number) => ({
  background: isDraggingOver ? amber[50] : '#DFE3E6',
  maxHeight: height - 198,
  minHeight: 75.89,
  width: CARD_WIDTH,
});

export interface IDragAndDropProps {
  fetchProjectTasks: any;
  height: number;
  items: Task[];
  moveProjectTask: any;
  openDialog: any;
  openedStatuses: number[];
  projectId: number;
  push: any;
  statuses: number[];
  toggleOpenedTab: any;
}

export const DragAndDrop: React.FC<IDragAndDropProps> = ({
  fetchProjectTasks,
  height,
  items,
  moveProjectTask,
  openDialog,
  openedStatuses,
  projectId,
  push,
  statuses,
  toggleOpenedTab,
}) => {
  const classes = useStyles();

  useEffect(() => {
    fetchProjectTasks(projectId);
  }, [fetchProjectTasks, projectId]);

  // const getList = useCallback((id: string) => items.filter(el => el.status === parseInt(id, 0)), [items]);

  const handleToggleOpened = useCallback(
    e => {
      const toggledStatus = parseInt(e.currentTarget.value, 0);
      if (typeof toggledStatus === 'number') {
        toggleOpenedTab(toggledStatus);
      } else {
        console.log('current target is', e.currentTarget);
      }
    },
    [toggleOpenedTab]
  );

  const handleTaskClick = useCallback(
    (sequenceNumber: number | string) => () => {
      push({
        pathname: `${TASKS_ROUTE(projectId)}/${sequenceNumber}`,
        state: {
          modal: true,
          projectId,
          sequenceNumber,
        },
      });
    },
    [projectId, push]
  );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination, draggableId } = result;

      // dropped outside the list
      if (!destination) {
        return;
      }

      if (source.droppableId === destination.droppableId) {
        console.log('just reorder', {
          destination,
          source,
        });
      } else {
        moveProjectTask({
          prevStatus: parseInt(source.droppableId, 0),
          projectId,
          sequenceNumber: parseInt(draggableId, 0),
          status: parseInt(destination.droppableId, 0),
        });
      }
    },
    [moveProjectTask, projectId]
  );

  const createTask = useCallback(
    (projectId: number | string, status: number) => () => {
      openDialog(<PatchTaskForm projectId={projectId} initialValues={{ status }} />, { maxWidth: 'lg' });
    },
    [openDialog]
  );

  return (
    <div className={classes.root}>
      <DragDropContext onDragEnd={onDragEnd}>
        {statuses.map(status => {
          const filteredItems = items.filter(el => el.status === status);
          const filteredItemsLength = filteredItems.length;
          return (
            <div className={classes.column} key={status}>
              <Typography variant="h6" className={classes.columnTitle}>
                <span>{STATUS_NAMES[status]}</span>
                {!!filteredItemsLength && (
                  <ButtonBase value={status} className={classes.arrowWrap} onClick={handleToggleOpened}>
                    <KeyboardArrowDown
                      className={cn(classes.arrow, { [classes.arrowDown]: openedStatuses.indexOf(status) !== -1 })}
                    />
                  </ButtonBase>
                )}
              </Typography>
              <Droppable droppableId={status.toString()}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver, height)}
                    className={classes.columnContent}
                  >
                    {openedStatuses.indexOf(status) !== -1 && filteredItemsLength ? (
                      filteredItems.map((item: Task, index) => {
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.sequenceNumber ? item.sequenceNumber.toString() : '0'}
                            index={index}
                            type={'div'}
                          >
                            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                              <TaskCard
                                provided={provided}
                                snapshot={snapshot}
                                {...item}
                                onClick={handleTaskClick(item.sequenceNumber)}
                              />
                            )}
                          </Draggable>
                        );
                      })
                    ) : (
                      <ButtonBase
                        value={status}
                        className={cn(classes.placeholderCard, { [classes.pointer]: !!filteredItemsLength })}
                        onClick={handleToggleOpened}
                      >
                        {filteredItemsLength} задач
                      </ButtonBase>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <ButtonBase className={classes.columnFooter} onClick={createTask(projectId, status)}>
                <AddIcon fontSize="small" /> Добавить задачу
              </ButtonBase>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};

DragAndDrop.defaultProps = {
  statuses: [0, 1, 2, 3, 4],
};

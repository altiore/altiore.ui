import React, { useCallback, useEffect, useMemo } from 'react';
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
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import TooltipBig from '@components/tooltip-big';
import ValueField from '@components/value';

import { PatchTaskForm } from '#/@common/task-form';
import { DEFAULT_TRANSITION_DURATION } from '#/@store/dialog';
import { TASKS_ROUTE } from '#/@store/router';
import { EDIT_TASK_FORM, STATUS_NAMES } from '#/@store/tasks';
import { STATUS_TYPE_NAME } from '#/@store/tasksFilter/TasksFilter';

import { useStyles } from './styles';
import { TaskCard } from './task-card';

import { IRoleColumn, ITask, PROJECT_STRATEGY } from '@types';

const CARD_WIDTH = 296;
const HEIGHT_OFFSET = 198;

const getListStyle = (isDraggingOver: boolean, height: number) => ({
  background: isDraggingOver ? amber[50] : '#DFE3E6',
  maxHeight: height - HEIGHT_OFFSET,
  minHeight: 75.89,
  width: CARD_WIDTH,
});

export interface IDragAndDropProps {
  columns: IRoleColumn[];
  destroy: any;
  fetchProjectTasks: any;
  height: number;
  items: ITask[];
  moveProjectTask: any;
  openDialog: any;
  openedStatuses: string[];
  projectId?: number;
  push: any;
  toggleOpenedTab: any;
  getProjectStrategyByProjectId: (projectId: number) => string;
}

export const DragAndDrop: React.FC<IDragAndDropProps> = ({
  columns,
  destroy,
  fetchProjectTasks,
  height,
  items,
  moveProjectTask,
  openDialog,
  openedStatuses,
  projectId,
  push,
  toggleOpenedTab,
  getProjectStrategyByProjectId,
}) => {
  const classes = useStyles();

  useEffect(() => {
    fetchProjectTasks(projectId);
  }, [fetchProjectTasks, projectId]);

  // const getList = useCallback((id: string) => items.filter(el => el.status === parseInt(id, 10)), [items]);

  const handleToggleOpened = useCallback(
    e => {
      const toggledStatus = e.currentTarget.value;
      if (typeof toggledStatus === 'string') {
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
    async (result: DropResult) => {
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
        try {
          const taskSN = parseInt(draggableId, 10);
          const task = items.find(el => el.projectId === projectId && el.sequenceNumber === taskSN);
          if (task) {
            await moveProjectTask({
              prevStatusTypeName: task.statusTypeName,
              projectId,
              sequenceNumber: parseInt(draggableId, 10),
              statusTypeName: destination.droppableId,
            });
          }
        } catch (e) {
          if (process.env.NODE_ENV === 'development') {
            console.log(e);
          }
        }
      }
    },
    [items, moveProjectTask, projectId]
  );

  /**
   * Удаление формы должно быть ручное, потому что мы не удаляем данные, чтоб отображать их в момент закрытия формы
   */
  const handleCloseTaskFrom = useCallback(() => {
    setTimeout(() => {
      destroy(EDIT_TASK_FORM);
    }, DEFAULT_TRANSITION_DURATION);
  }, [destroy]);

  const createTask = useCallback(
    (statusName: string, statusFrom: any, pId?: number | string) => () => {
      openDialog(
        <PatchTaskForm
          projectId={pId}
          initialValues={{
            projectId,
            status: statusFrom,
            statusTypeName: statusName,
          }}
        />,
        {
          maxWidth: 'lg',
          onClose: handleCloseTaskFrom,
        }
      );
    },
    [handleCloseTaskFrom, openDialog, projectId]
  );

  const isSimpleStrategy = projectId && getProjectStrategyByProjectId(projectId) === PROJECT_STRATEGY.SIMPLE;
  const columnsToRender = useMemo(() => {
    const columnsCopy = [...columns];
    if (isSimpleStrategy) {
      columnsCopy.splice(2, 0, {
        column: STATUS_TYPE_NAME.IN_PROGRESS,
        moves: [],
        statuses: [STATUS_TYPE_NAME.IN_PROGRESS],
      });
      return columnsCopy;
    }
    return columns;
  }, [isSimpleStrategy, columns]);

  return (
    <div className={classes.root}>
      <DragDropContext onDragEnd={onDragEnd}>
        {columnsToRender.map(({ column, statuses }, statusFrom) => {
          const filteredItems = items.filter(el => {
            if (isSimpleStrategy && column === STATUS_TYPE_NAME.IN_PROGRESS) {
              return el.inProgress;
            }
            if (isSimpleStrategy) {
              return statuses.includes(el.statusTypeName) && !el.inProgress;
            }
            return statuses.includes(el.statusTypeName);
          });
          const filteredItemsLength = filteredItems.length;
          const valueSum = filteredItems.reduce((res, cur) => {
            return res + cur.value;
          }, 0);
          const isMinimized = openedStatuses.indexOf(column) === -1;
          const statusName = STATUS_NAMES[column] || column;
          return (
            <div
              className={cn(classes.column, {
                [classes.columnMinimized]: isMinimized,
              })}
              key={column}
              style={isMinimized ? { height: height - 118 } : {}}
            >
              <Typography
                variant="h6"
                className={cn({
                  [classes.columnTitle]: !isMinimized,
                  [classes.columnTitleClosed]: isMinimized,
                })}
              >
                <ButtonBase value={column} className={classes.arrowWrap} onClick={handleToggleOpened}>
                  <KeyboardArrowRight
                    className={cn(classes.arrow, {
                      [classes.arrowDown]: isMinimized,
                    })}
                  />
                </ButtonBase>
                <div className={cn(classes.columnTitleText)}>
                  <span
                    className={cn({
                      [classes.columnTitleMargin]: !isMinimized,
                    })}
                  >
                    {statusName}
                  </span>
                  {Boolean(valueSum) && (
                    <span className={classes.columnTitleRight}>
                      <TooltipBig
                        title={`${filteredItemsLength || 0} задач находятся в статусе "${statusName}"`}
                        placement="bottom"
                      >
                        <span className={classes.columnTitleText}>
                          <span>{filteredItemsLength || 0}шт.</span>
                        </span>
                      </TooltipBig>

                      <TooltipBig
                        title={`Сумма ценности задач в статусе "${statusName}" - ${valueSum}`}
                        placement="bottom"
                      >
                        <span className={classes.columnTitleSum}>
                          <ValueField disableTooltip showSumIcon>
                            {valueSum}
                          </ValueField>
                        </span>
                      </TooltipBig>
                    </span>
                  )}
                </div>
              </Typography>
              {!isMinimized && (
                <>
                  <Droppable droppableId={column}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver, height)}
                        className={classes.columnContent}
                      >
                        {!filteredItemsLength && (
                          <ButtonBase
                            value={column}
                            className={cn(classes.placeholderCard, {
                              [classes.pointer]: !!filteredItemsLength,
                            })}
                            onClick={handleToggleOpened}
                          >
                            {filteredItemsLength} задач
                          </ButtonBase>
                        )}

                        {filteredItemsLength
                          ? filteredItems.map((item: ITask, index) => {
                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.sequenceNumber ? item.sequenceNumber.toString() : '0'}
                                  index={index}
                                  type={'div'}
                                >
                                  {(
                                    draggableProvided: DraggableProvided,
                                    draggableStateSnapshot: DraggableStateSnapshot
                                  ) => (
                                    <TaskCard
                                      provided={draggableProvided}
                                      snapshot={draggableStateSnapshot}
                                      {...item}
                                      onClick={handleTaskClick(item.sequenceNumber)}
                                    />
                                  )}
                                </Draggable>
                              );
                            })
                          : ''}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                  <ButtonBase className={classes.columnFooter} onClick={createTask(column, statusFrom, projectId)}>
                    <AddIcon fontSize="small" /> Добавить задачу
                  </ButtonBase>
                </>
              )}
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};

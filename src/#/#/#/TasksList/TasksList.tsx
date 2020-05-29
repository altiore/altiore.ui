import React from 'react';
import FlipMove from 'react-flip-move';

import get from 'lodash/get';

import { Project } from '#/@store/projects';

import { Filter } from './Filter';
import TaskComponent from './TaskComponent';

import { ITask } from '@types';

export interface ITaskListState {
  page: number;
  perPage: number;
}

export interface ITasksListProps {
  currentTaskId?: number | string;
  getProjectById: (id: number | string) => Project;
  tasks: Array<ITask | 'filter'>;
  tasksFilter: any;
}

export class TasksListJsx extends React.Component<ITasksListProps, ITaskListState> {
  state = {
    page: 0,
    perPage: 5,
  };

  shouldComponentUpdate(
    nextProps: Readonly<ITasksListProps>,
    nextState: Readonly<ITaskListState>,
    nextContext: any
  ): boolean {
    if (
      (nextProps.currentTaskId !== this.props.currentTaskId && nextProps.currentTaskId) ||
      nextProps.tasksFilter !== this.props.tasksFilter ||
      nextState.page !== this.state.page ||
      nextState.perPage !== this.state.perPage
    ) {
      return true;
    }
    const newTs = this.currentPageTasks(nextProps, nextState);
    const oldTs = this.currentPageTasks(this.props, this.state);
    const newL = newTs.length;
    if (newL !== oldTs.length) {
      return true;
    }
    for (let i = 0; i < newL; i++) {
      if (i === 1 || !newTs[i]) {
        continue;
      }
      if (!get(newTs, [i, 'id']) || !get(oldTs, [i, 'id']) || get(newTs, [i, 'id']) !== get(oldTs, [i, 'id'])) {
        return false;
      }
      if (get(newTs, [i, 'title']) !== get(oldTs, [i, 'title'])) {
        return true;
      }
    }
    return false;
  }

  render() {
    // console.log(this.state);
    // console.log(this.props);
    const sortedTasks = this.currentPageTasks(this.props, this.state);
    // return <FlipMove easing="cubic-bezier(0.39, 0, 0.45, 1.4)">{sortedTasks.map(this.renderListItem)}</FlipMove>;
    return <FlipMove>{sortedTasks.map(this.renderListItem)}</FlipMove>;
  }

  currentPageTasks(props: ITasksListProps, state: ITaskListState): Array<ITask | 'filter'> {
    const { tasks } = props;
    const { page, perPage } = state;
    return [...tasks.slice(0, 2), ...tasks.slice(page * perPage + 2, (page + 1) * perPage + 2)];
  }

  private renderListItem = (task: ITask | 'filter', index: number) => {
    if (!task) {
      return <div key="undefined task" />;
    }
    const { currentTaskId, getProjectById } = this.props;
    if (task === 'filter') {
      const { tasks } = this.props;
      const { page, perPage } = this.state;
      const length = tasks.length - 2;
      return (
        <div key={task + index}>
          <Filter page={page} perPage={perPage} count={length} changePage={this.handleChangePage} />
        </div>
      );
    }
    const CurrentTaskComponent: any = TaskComponent;
    return (
      <div key={task.id}>
        <CurrentTaskComponent
          isCurrent={currentTaskId === task.id}
          taskId={task.id}
          project={getProjectById(task.projectId)}
        />
      </div>
    );
  };

  private handleChangePage = (index: number) => () => {
    let page = index;
    const { tasks } = this.props;
    const { perPage } = this.state;
    const length = tasks.length - 2;
    const max = Math.ceil(length / perPage);
    if (page < 0) {
      page = max - 1;
    }
    if (page > max - 1) {
      page = 0;
    }
    this.setState({ page });
  };
}

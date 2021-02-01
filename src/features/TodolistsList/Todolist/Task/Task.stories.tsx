import {Meta, Story} from '@storybook/react/types-6-0';
import {action} from '@storybook/addon-actions';
import {Task, TaskPropsType} from './Task';
import React from 'react';
import {TaskPriorities, TaskStatuses} from '../../../../api/tasks-api';
import {v1} from 'uuid';
import {TaskDomainType} from '../tasks-reducer';


export default {
  title: 'Todolist/Task',
  component: Task,
} as Meta;

const changeTaskStatusAction = action('Status changed inside Task')
const removeTaskAction = action('Remove button clicked inside Task')
const editTaskTitleAction = action('Title changed inside Task')

const Template: Story<TaskPropsType> = (args) => <div><Task {...args}/></div>

const baseArgs = {
  changeTaskStatus: changeTaskStatusAction,
  removeTask: removeTaskAction,
  editTaskTitle: editTaskTitleAction
}
const task1: TaskDomainType = {
  id: '1', title: 'HTML', addedDate: '', deadline: '', description: '',
  order: 0, priority: TaskPriorities.High, startDate: '',
  status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todoListID1'
}
const task2: TaskDomainType = {
  id: '2', title: 'Milk', addedDate: '', deadline: '', description: '',
  order: 0, priority: TaskPriorities.High, startDate: '',
  status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todolistId2'
}
export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
  ...baseArgs,
  task: task1
};

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
  ...baseArgs,
  task: task2
};
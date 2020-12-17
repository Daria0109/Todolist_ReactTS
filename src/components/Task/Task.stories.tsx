import {Meta, Story} from '@storybook/react/types-6-0';
import {action} from '@storybook/addon-actions';
import {Task, TaskPropsType} from './Task';
import React from 'react';
import {TaskStatuses} from '../../api/tasks-api';


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

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
  ...baseArgs,
  taskId: '1',
  title: 'React',
  status: TaskStatuses.New,
  todolistId: 'todolistId1'
};

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
  ...baseArgs,
  taskId: '2',
  title: 'Redux',
  status: TaskStatuses.Completed,
  todolistId: 'todolistId2'
};
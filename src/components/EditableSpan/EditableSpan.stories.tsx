import { Story, Meta } from '@storybook/react/types-6-0';
import {action} from '@storybook/addon-actions';
import React from 'react';
import EditableSpan, {EditableSpanPropsType} from './EditableSpan';


export default {
  title: 'Todolist/EditableSpan',
  component: EditableSpan,
  argTypes: {
    onClick: {
      description: 'Changed value EditableSpan'
    },
    value: {
      defaultValue: 'HTML',
      description: 'Start value to editable span'
    }
  },
} as Meta;


const Template: Story<EditableSpanPropsType> = (args) =>
  <EditableSpan {...args}/>


export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
  title: 'HTML',
  editTitle: action('Value changed'),
  notEdited: false
};
export const EditableSpanNotEditedExample = Template.bind({});
EditableSpanNotEditedExample.args = {
  title: 'HTML',
  editTitle: action('Value changed'),
  notEdited: true
};


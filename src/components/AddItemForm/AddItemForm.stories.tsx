import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import AddItemForm, {AddItemFormPropsType} from './AddItemForm';
import {action} from '@storybook/addon-actions';


export default {
  title: 'Todolist/AddItemForm',
  component: AddItemForm,
  argTypes: {
    onClick: {
      description: 'AddItemFormExample clicked'
    }
  },
} as Meta;

const callback = action('New Item added')

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args} />;

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
  addItem: callback
};
export const AddItemFormDisabledExample = Template.bind({});
AddItemFormDisabledExample.args = {
  addItem: callback,
  disabled: true
};


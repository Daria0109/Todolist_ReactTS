import { Story, Meta } from '@storybook/react/types-6-0';
import React from 'react';
import AppWithRedux from './AppWithRedux';
import {ReduxStoreProviderDecorator} from './stories/decorators/ReduxStoreProviderDecorator';


export default {
  title: 'Todolist/AppWithRedux',
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator]
} as Meta;


const Template: Story<{}> = (args) => <AppWithRedux/>


export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {
};
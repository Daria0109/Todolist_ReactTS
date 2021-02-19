import { Story, Meta } from '@storybook/react/types-6-0';
import React from 'react';
import App from './App';
import {ReduxStoreProviderDecorator} from '../stories/decorators/ReduxStoreProviderDecorator';


export default {
  title: 'Todolist/App',
  component: App,
  decorators: [ReduxStoreProviderDecorator]
} as Meta;


const Template: Story<{}> = (args) => <App/>


export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {
};
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import QuickAdd from "../components/QuickAdd";
import { Provider } from 'react-redux';
import { defaultStore } from '.././redux';

export default {
    component: QuickAdd,
  } as ComponentMeta<typeof QuickAdd>;

  const Template: ComponentStory<typeof QuickAdd> = (args) => <QuickAdd
  />; 

  export const DefaultStore = Template.bind({});

  DefaultStore.decorators = [
    (story) => <Provider store={defaultStore}><BrowserRouter>{story()}</BrowserRouter></Provider>
  ]

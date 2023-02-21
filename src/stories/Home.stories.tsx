import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import Home from "../components/Home";
import { Provider } from 'react-redux';
import { defaultStore } from '.././redux';

export default {
    component: Home,
  } as ComponentMeta<typeof Home>;

  const Template: ComponentStory<typeof Home> = (args) => <Home/>;

  export const DefaultStore = Template.bind({});

  DefaultStore.decorators = [
    (story) => <Provider store={defaultStore}><BrowserRouter>{story()}</BrowserRouter></Provider>
  ]
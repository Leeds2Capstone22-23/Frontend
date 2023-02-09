import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import Page404 from "../components/Page404";
import { Provider } from 'react-redux';
import { defaultStore } from '.././redux';

export default {
    component: Page404,
  } as ComponentMeta<typeof Page404>;

  const Template: ComponentStory<typeof Page404> = (args) => <Page404/>;

  export const DefaultStore = Template.bind({});

  DefaultStore.decorators = [
    (story) => <Provider store={defaultStore}><BrowserRouter>{story()}</BrowserRouter></Provider>
  ]
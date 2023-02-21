import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import TagPage from "../components/TagPage";
import { Provider } from 'react-redux';
import { defaultStore } from '.././redux';

export default {
    component: TagPage,
  } as ComponentMeta<typeof TagPage>;

  const Template: ComponentStory<typeof TagPage> = (args) => <TagPage/>;

  export const DefaultStore = Template.bind({});

  DefaultStore.decorators = [
    (story) => <Provider store={defaultStore}><BrowserRouter>{story()}</BrowserRouter></Provider>
  ]
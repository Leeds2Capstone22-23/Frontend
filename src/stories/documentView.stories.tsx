import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import DocumentView from "../components/documents/documentView";
import { Provider } from 'react-redux';
import { defaultStore } from '.././redux';

export default {
    component: DocumentView,
  } as ComponentMeta<typeof DocumentView>;

  const Template: ComponentStory<typeof DocumentView> = (args) => <DocumentView/>; //temporarily empty

  // dangerous. messes with the actual store
  export const DefaultStore = Template.bind({});

  DefaultStore.decorators = [
    (story) => <Provider store={defaultStore}><BrowserRouter>{story()}</BrowserRouter></Provider>
  ]

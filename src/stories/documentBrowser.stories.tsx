import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import DocumentBrowser from "../components/documents/documentBrowser";
import { Provider } from 'react-redux';
import { defaultStore } from '.././redux';

export default {
    component: DocumentBrowser,
  } as ComponentMeta<typeof DocumentBrowser>;

  const Template: ComponentStory<typeof DocumentBrowser> = (args) => <DocumentBrowser/>;

  // dangerous. messes with the actual store
  export const DefaultStore = Template.bind({});

  DefaultStore.decorators = [
    (story) => <Provider store={defaultStore}><BrowserRouter>{story()}</BrowserRouter></Provider>
  ]

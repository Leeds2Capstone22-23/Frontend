import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import LabelBrowser from "../components/labels/labelBrowser";
import { Provider } from 'react-redux';
import { defaultStore } from '.././redux';

export default {
    component: LabelBrowser,
  } as ComponentMeta<typeof LabelBrowser>;

  const Template: ComponentStory<typeof LabelBrowser> = (args) => <LabelBrowser/>;

  // dangerous. messes with the actual store
  export const DefaultStore = Template.bind({});

  DefaultStore.decorators = [
    (story) => <Provider store={defaultStore}><BrowserRouter>{story()}</BrowserRouter></Provider>
  ]

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import LabelView from "../components/labels/labelView";
import { Provider } from 'react-redux';
import { defaultStore } from '.././redux';

export default {
    component: LabelView,
  } as ComponentMeta<typeof LabelView>;

  const Template: ComponentStory<typeof LabelView> = (args) => <LabelView/>; //temporarily empty

  // dangerous. messes with the actual store
  export const DefaultStore = Template.bind({});

  DefaultStore.decorators = [
    (story) => <Provider store={defaultStore}><BrowserRouter>{story()}</BrowserRouter></Provider>
  ]

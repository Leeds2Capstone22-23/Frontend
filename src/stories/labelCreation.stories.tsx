import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import LabelCreation from "../components/labels/labelCreation";
import { Provider } from 'react-redux';
import { defaultStore } from '.././redux';

export default {
    component: LabelCreation,
  } as ComponentMeta<typeof LabelCreation>;

  const Template: ComponentStory<typeof LabelCreation> = (args) => <LabelCreation showModal={true}
  setShowModal={(() => {return})}
  setRefreshDocs={(() => {return})}/>; //temporarily empty

  // dangerous. messes with the actual store
  export const DefaultStore = Template.bind({});

  DefaultStore.decorators = [
    (story) => <Provider store={defaultStore}><BrowserRouter>{story()}</BrowserRouter></Provider>
  ]

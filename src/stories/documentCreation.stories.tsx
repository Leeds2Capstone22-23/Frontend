import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import DocumentCreation from "../components/documents/documentCreation";
import { Provider } from 'react-redux';
import { defaultStore } from '.././redux';

export default {
    component: DocumentCreation,
  } as ComponentMeta<typeof DocumentCreation>;

  const Template: ComponentStory<typeof DocumentCreation> = (args) => <DocumentCreation showModal={true}
  setShowModal={(() => {return})}
  setRefreshDocs={(() => {return})}/>; //temporarily empty

  // dangerous. messes with the actual store
  export const DefaultStore = Template.bind({});

  DefaultStore.decorators = [
    (story) => <Provider store={defaultStore}><BrowserRouter>{story()}</BrowserRouter></Provider>
  ]

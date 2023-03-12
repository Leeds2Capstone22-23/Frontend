import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import DeleteConfirmation from "../components/deleteConfirmation";
import { Provider } from 'react-redux';
import { defaultStore } from '.././redux';

export default {
    component: DeleteConfirmation,
  } as ComponentMeta<typeof DeleteConfirmation>;

  const Template: ComponentStory<typeof DeleteConfirmation> = (args) => <DeleteConfirmation showModal={true}
  setShowModal={(() => {return})}
  setResponse={(() => {return})}
  itemString={'label "Example"'}/>; 

  export const DefaultStore = Template.bind({});

  DefaultStore.decorators = [
    (story) => <Provider store={defaultStore}><BrowserRouter>{story()}</BrowserRouter></Provider>
  ]

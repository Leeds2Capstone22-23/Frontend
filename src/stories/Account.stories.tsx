import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import Account from "../components/Account";
import { Provider } from 'react-redux';
import { defaultStore } from '.././redux';

export default {
    component: Account,
  } as ComponentMeta<typeof Account>;

  const Template: ComponentStory<typeof Account> = (args) => <Account/>;

  //this is dangerous. will log you out on the app (because i'm not using a testing store yet)
  export const DefaultStore = Template.bind({});

  DefaultStore.decorators = [
    (story) => <Provider store={defaultStore}><BrowserRouter>{story()}</BrowserRouter></Provider>
  ]
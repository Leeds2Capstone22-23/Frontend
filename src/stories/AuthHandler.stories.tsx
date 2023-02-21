import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AuthHandler from "../components/AuthHandler";
import { Provider } from 'react-redux';
import { defaultStore } from '.././redux';

export default {
    component: AuthHandler,
  } as ComponentMeta<typeof AuthHandler>;

  const Template: ComponentStory<typeof AuthHandler> = (args) => <AuthHandler/>;

  // dangerous. messes with the actual store
  export const DefaultStore = Template.bind({});

  DefaultStore.decorators = [
    (story) => <Provider store={defaultStore}>{story()}</Provider>
  ]

  // - has its own router and redirects straight to home. shows a 404 if currently logged in
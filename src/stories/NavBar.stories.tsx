import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import NavBar from '../components/NavBar';
import { Provider } from 'react-redux';
import { defaultStore } from '.././redux';


export default {
  component: NavBar,
} as ComponentMeta<typeof NavBar>;

const Template: ComponentStory<typeof NavBar> = (args) => <NavBar {...args} />;

// uses the default store (whatever it currently looks like in the actual app, i.e. who's logged in and what labels they have)
export const DefaultStore = Template.bind({});
DefaultStore.decorators = [
  (story) => <Provider store={defaultStore}><BrowserRouter>{story()}</BrowserRouter></Provider>
]

// todo: logged out? all labels selected

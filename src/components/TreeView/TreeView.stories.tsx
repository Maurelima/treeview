import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TreeView from './TreeView';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'ReactComponentLibrary/TreeView',
  component: TreeView,
} as ComponentMeta<typeof TreeView>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TreeView> = (args) => <TreeView {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = [
  {
    cod: 1,
    description: 'Tall Things',
    checked: false,
    submenu: [
      {
        cod: 1,
        description: 'Buildings',
        checked: false,
        submenu: [],
      },
      {
        cod: 2,
        description: 'Giants',
        checked: false,
        submenu: [
          {
            cod: 1,
            description: 'Andre',
            checked: false,
          },
          {
            cod: 2,
            description: 'Paul Bunyan',
            checked: false,
          }
        ],
      },
      {
        cod: 3,
        description: 'Two sandwiches',
        checked: false,
        submenu: [],
      }
    ],
  },
  {
    cod: 2,
    description: 'Short Things',
    checked: false,
    submenu: [
      {
        cod: 4,
        description: 'Smurfs',
        checked: false,
      },
      {
        cod: 5,
        description: 'Mushrooms',
        checked: false,
        submenu: [],
      },
      {
        cod: 6,
        description: 'One Sandwich',
        checked: false,
        submenu: [],
      }
    ],
  }
];

export const Secondary = Template.bind({});
Secondary.args = {
  showTreeView: true,
  menuData: [
    {
      menuDescription: 'Teste 2',
      menuFunction: () => { },
    }
  ],
  anchorPoint: {
    xClickPosition: 0,
    yClickPosition: 0,
  }
};
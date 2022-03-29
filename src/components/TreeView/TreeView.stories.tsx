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
Primary.args = {
  showTreeView: true,
    menuData: [
      {
        menuDescription: 'Teste',
        menuFunction: () => {},
      }
    ],
    anchorPoint: {
        xClickPosition: 0,
        yClickPosition: 0,
    }
};

export const Secondary = Template.bind({});
Secondary.args = {
  showTreeView: true,
    menuData: [
      {
        menuDescription: 'Teste 2',
        menuFunction: () => {},
      }
    ],
    anchorPoint: {
        xClickPosition: 0,
        yClickPosition: 0,
    }
};
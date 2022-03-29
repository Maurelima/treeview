import React from 'react';
import { render } from '@testing-library/react';

import TreeView from './TreeView';

describe('TreeView', () => {
    test("renders the context component", () => {
        render(<TreeView menuData={[]} anchorPoint={{
            xClickPosition: 0,
            yClickPosition: 0
        }} />)
    })
})
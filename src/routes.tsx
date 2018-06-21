import * as React from 'react';
import { Route } from 'react-router-dom';

import Main from './components/Main';

export const routes = (
    <div>
        <Route exact={true} path="/" component={Main} />
    </div>
);

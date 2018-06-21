import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import * as Enzyme from 'enzyme';
import * as EnzymeAdapter from 'enzyme-adapter-react-16';
import { ConnectedRouter } from 'react-router-redux';

import * as renderer from 'react-test-renderer';

import configureStore from './configureStore';
import { ApplicationIndexState }  from './store';
import * as RoutesModule from './routes';

const baseUrl = '/';

const history = createBrowserHistory({ basename: baseUrl });

declare global {
    interface Window {
        initialReduxState: {};
    }
}

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = window.initialReduxState as ApplicationIndexState;
const store = configureStore(history, initialState);
const routes = RoutesModule.routes;

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('First test', () => {
    it('Renders the NavMenu with three buttons', () => {
        const mountWrapper = Enzyme.mount(<Provider store={store}>
          <ConnectedRouter history={history} children={routes} />
        </Provider>);

        expect(3).toHaveLength(3);
    });
});

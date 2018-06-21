import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory } from 'history';

import configureStore from './configureStore';
import { ApplicationIndexState }  from './store';
import * as RoutesModule from './routes';

import './components/Main.css';
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
const rootId = document.getElementById('root_index') as HTMLElement;

if ( rootId ) {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history} children={routes} />
    </Provider>,
    rootId
  );
}

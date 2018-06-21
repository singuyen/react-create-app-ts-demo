import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
  GenericStoreEnhancer,
  Store,
  StoreEnhancerStoreCreator,
  ReducersMapObject
} from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { History } from 'history';
import * as ObjectAssign from 'es6-object-assign';

import { ApplicationIndexState, reducers } from './store';

declare global {
    interface Window {
        devToolsExtension?: () => void;
    }

    interface Object {
        assign: () => void;
    }
}

export default function configureStore(history: History, initialState?: ApplicationIndexState) {
    // Build middleware. These are functions that can process the actions before they reach the store.
    const windowIfDefined = typeof window === 'undefined' ? null : window;
    // If devTools is installed, connect to it
    const devToolsExtension = windowIfDefined && windowIfDefined.devToolsExtension as () => GenericStoreEnhancer;
    const createStoreWithMiddleware = compose(
        applyMiddleware(thunk, routerMiddleware(history)),
        devToolsExtension ? devToolsExtension() : <S>(next: StoreEnhancerStoreCreator<S>) => next
    )(createStore);

    // Combine all reducers and instantiate the app-wide store instance
    const allReducers = buildRootReducer(reducers);
    const store = createStoreWithMiddleware(allReducers, initialState) as Store<ApplicationIndexState>;

    return store;
}

function buildRootReducer(allReducers: ReducersMapObject) {
    ObjectAssign.polyfill();
    
    return combineReducers<ApplicationIndexState>(Object.assign({}, allReducers, { routing: routerReducer }));
}

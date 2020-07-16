import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import bookReducer from './reducers/bookReducer.js';

import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    bookApp: bookReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
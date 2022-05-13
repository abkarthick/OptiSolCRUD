import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Users } from './users';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { initialUser } from './forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            users: Users,
            ...createForms({
                initUser: initialUser
            })
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
};

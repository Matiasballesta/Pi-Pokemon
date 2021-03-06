import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducer';

const STORE = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default STORE;

import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { authMiddleware } from './middleware/authMiddleware';
import { profileMiddleware } from './middleware/profileMiddleware'
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(authMiddleware, profileMiddleware)));
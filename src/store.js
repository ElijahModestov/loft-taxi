import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { authMiddleware } from './middleware/authMiddleware';
import { profileMiddleware } from './middleware/profileMiddleware'

export const store = createStore(rootReducer, applyMiddleware(authMiddleware, profileMiddleware));
import { configureStore, combineReducers } from '@reduxjs/toolkit';

// -----o----- reducers -----o----- //
import counterReducer from './counter';
// -----x----- reducers -----x----- //

const rootReducer = combineReducers({
  counter: counterReducer,
});

const preloadedState = () => {
  try {
    if (typeof window === 'undefined') return null;

    const serializedState = localStorage.getItem('reduxState');

    if (!serializedState) return null;
    else return JSON.parse(serializedState);
  } catch (error) {
    if (process.env.NODE_ENV !== 'development') {
      console.error('Could not load state from localStorage');
    }
    return null;
  }
};

export const store = configureStore({
  reducer: rootReducer,
  ...(preloadedState() && { preloadedState: preloadedState() }),
});

export type RootState = ReturnType<typeof store.getState>;

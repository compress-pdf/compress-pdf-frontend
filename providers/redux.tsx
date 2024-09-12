'use client';

import { Provider } from 'react-redux';

import { store } from '@/redux/store';

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        {children}
        {/* </PersistGate> */}
      </Provider>
    </>
  );
};

export default ReduxProvider;

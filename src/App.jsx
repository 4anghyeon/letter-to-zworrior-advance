import AppRouter from './shared/AppRouter';
import {GlobalStyle} from './styles/GloabalStyle';
import {Provider} from 'react-redux';
import store from './redux/config/store';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

function App() {
  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <AppRouter />
      </Provider>
      <ToastContainer />
    </>
  );
}

export default App;

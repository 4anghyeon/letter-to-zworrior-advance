import AppRouter from './shared/AppRouter';
import {GlobalStyle} from './styles/GloabalStyle';
import {Provider} from 'react-redux';
import store from './redux/config/store';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Provider store={store}>
        <AppRouter />
      </Provider>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;

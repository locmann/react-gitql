import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ApolloProvider } from '@apollo/client';
import client from './apollo/client.ts';
import { Provider } from 'react-redux';
import { store } from 'store/store.ts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RepoCard from 'components/RepoCard/RepoCard.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1>Error</h1>,
  },
  {
    path: '/info',
    element: <RepoCard />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
);

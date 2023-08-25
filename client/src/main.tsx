import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import {ApolloProvider} from '@apollo/client';
import './app/styles/fonts.css'
import {apolloClient} from "./app/providers/graphql";



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ApolloProvider client={apolloClient}>
          <App />
      </ApolloProvider>
  </React.StrictMode>,
)

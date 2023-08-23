import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import './app/styles/fonts.css'

const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql',
    cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ApolloProvider client={client}>
          <App />
      </ApolloProvider>
  </React.StrictMode>,
)

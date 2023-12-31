import {ApolloClient, ApolloLink, concat, createHttpLink, DefaultOptions, InMemoryCache} from "@apollo/client";

const httpLink = createHttpLink({
    uri: 'http://localhost:8080/',
    credentials: 'include'
});


const authMiddleware = new ApolloLink((operation, forward) => {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
        operation.setContext({
            headers: {'Authorization': `Bearer ${accessToken}`},
        });
    }
    return forward(operation);
})

const defaultOptions: DefaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
}

export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink),
    defaultOptions: defaultOptions
});
import {ApolloClient, ApolloLink, concat, createHttpLink, InMemoryCache} from "@apollo/client";

const httpLink = createHttpLink({
    uri: 'http://localhost:8080/graphql',
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

export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink)
});
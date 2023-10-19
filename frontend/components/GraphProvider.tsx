'use client'

import { graphUri } from '@/utils/constants';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ReactNode } from 'react';

export default function GraphProvider({
    children
} : {
    children: ReactNode
}) {

    const client = new ApolloClient({
        uri: graphUri,
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}
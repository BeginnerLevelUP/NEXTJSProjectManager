import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { gql } from "graphql-tag";

import resolvers from './schema/resolvers'
import typeDefs from './schema/typeDefs'

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
    context: async req => ({ req }),
});

export { handler as GET, handler as POST };
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";

import resolvers from './schema/resolvers'
import typeDefs from './schema/typeDefs'
import { establishConnection } from "@/utils/database";

await establishConnection()
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
    context: async req => ({ req }),
});

export { handler as GET, handler as POST };
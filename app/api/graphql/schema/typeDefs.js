import { gql } from "graphql-tag";

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    projects: [Project]
  }

  type Project {
    _id: ID
    dateCreated: String
    dateUpdated: String
    name: String
    description: String
    completed: Boolean
    gitRepoUrl: String
    deployedSite: String
    comments: [Comment]
  }

  type Comment {
    _id: ID
    text: String
    user: User
    createdAt: String
    replies: [Reply]
  }

  type Reply {
    _id: ID
    text: String
    user: User
    createdAt: String
  }


  input CreateCommentInput {
    text: String!
    user: ID!
    projectId: ID!
  }

  input CreateReplyInput {
    commentId: ID!
    text: String!
    user: ID!
  }

type Query{
users:[User]
user(id: ID!): User
projects: [Project]
project(id: ID!): Project
comments: [Comment]
comment(id: ID!): Comment

}
  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    updateUser(id: ID!, username: String, email: String, password: String): User
    deleteUser(id: ID!): User

    createProject( 
    name: String!
    description: String!
    completed: Boolean
    gitRepoUrl: String
    deployedSite: String
    userId: ID!): Project
    
    updateProject(id: ID!, name: String, description: String, completed: Boolean, gitRepoUrl: String, deployedSite: String): Project
    deleteProject(id: ID!): Project


    createComment(input: CreateCommentInput!): Comment
    updateComment(id: ID!, text: String!): Comment
    deleteComment(id: ID!): Comment
    createReply(input: CreateReplyInput!): Comment
    updateReply(commentId: ID!, replyId: ID!, text: String!): Comment
    deleteReply(commentId: ID!, replyId: ID!): Comment
  }
`;

export default typeDefs;

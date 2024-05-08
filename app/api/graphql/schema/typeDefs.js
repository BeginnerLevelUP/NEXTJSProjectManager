import { gql } from "graphql-tag";

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    associates:[User]
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
    tasks:[Task]
    members:[User]
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

    type Task {
    _id: ID
    name: String
    description: String
    status: String
    dueDate: String
    assignedTo: [User]
    ranking: String
    createdAt: String
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
tasks: [Task!]!
task(id: ID!): Task

}
  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    updateUser(id: ID!, username: String, email: String, password: String): User
    deleteUser(id: ID!): User
    addAssociate(email:String!,associateName:String!): User!
    removeAssociate(_id: ID!, associateId: ID!): User!
    createProject( 
    name: String!
    description: String!
    completed: Boolean
    gitRepoUrl: String
    deployedSite: String
    userId: ID!): Project
    
    updateProject(id: ID!, name: String, description: String, completed: Boolean, gitRepoUrl: String, deployedSite: String): Project
    deleteProject(id: ID!): Project
    addProjectMember(projectId: ID!, userId: ID!): Project
    removeProjectMember(projectId: ID!, userId: ID!): Project

    createComment( 
    text: String!
    user: ID!
    projectId: ID!
    ): Comment
    updateComment(id: ID!, text: String!): Comment
    deleteComment(id: ID!): Comment
    createReply(input: CreateReplyInput!): Comment
    updateReply(commentId: ID!, replyId: ID!, text: String!): Comment
    deleteReply(commentId: ID!, replyId: ID!): Comment

    createTask(
  name: String!, 
  description: String!, 
  dueDate: String,
   assignedTo: [ID], 
   ranking: String, 
   status: String, 
   projectId: ID!): Task

   updateTask(taskId: ID!, name: String, description: String, status: String, dueDate: String, assignedTo: [ID!], ranking: String): Task
  deleteTask(id: ID!): Task
  }


`;

export default typeDefs;

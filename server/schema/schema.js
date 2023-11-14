import Client from "../models/Client.js";
import Project from "../models/Project.js";

import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} from "graphql";

// Project Type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve: async (parent, args) => {
        return await Client.findById(parent.clientId);
      },
    },
  }),
});

// Client Type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// GQL Object for querying database
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // Get all clients
    clients: {
      // Return list of clients
      type: new GraphQLList(ClientType),
      resolve: async (parent, args) => {
        // mongoose find
        return await Client.find();
      },
    },
    // Get one client by ID
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => {
        // mongoose findById
        return await Client.findById(args.id);
      },
    },
    // Get all projects
    projects: {
      type: new GraphQLList(ProjectType),
      resolve: async (parent, args) => {
        // mongoose find
        return await Project.find();
      },
    },
    // Get one project by ID
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => {
        // mongoose findById
        return await Project.findById(args.id);
      },
    },
  },
});

// GQL Object for mutating database
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Add a client
    addClient: {
      // Return type
      type: ClientType,
      // need to pass in name, email and phone
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        // Insert new document into Client collection
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });

        return client.save();
      },
    },
    // Delete a client
    deleteClient: {
      type: ClientType,
      // Delete through ID
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        return Client.findByIdAndDelete(args.id);
      },
    },
    // Add a project
    addProject: {
      type: ProjectType,
      // Need to pass in name, desc, clientId (refering to its respective client)
      // Status is optional as there is a default value to insert if is not given
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });
        return project.save();
      },
    },
    // Delete a project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Project.findByIdAndDelete(args.id);
      },
    },
    // Update a project
    updateProject: {
      type: ProjectType,
      // ID is required, where other fields are optional
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          // if not exist, create a new document for it
          { new: true }
        );
      },
    },
  },
});

export let schema = new GraphQLSchema({
  query: RootQuery,
  mutation,
});

const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;
const auth = require('../services/auth');
const UserType = require('./types/UserType');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve: (parentValue, {email, password}, req) => {
        return auth.signup({email, password, req});
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req;
        req.logout();
        return user;
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return auth.login({ email, password, req });
      }
    }
  }
});

module.exports = mutation;
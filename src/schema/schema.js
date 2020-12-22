const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

//Schema file should:
//define type
//define relationships between types
//define root queries
//Root queries are how a user can grab data

const books = [
  { title: 'Lego Shakespeare', genre: 'other', id: '1', authorId: '1' },
  { title: '100 Years of Solitude', genre: 'Literature', id: '2', authorId: '2' },
  { title: 'Diane Arbus Revelations', genre: 'Art', id: '3', authorId: '3' }
]

const authors = [
  { name: 'William Shakespeare', id: '1' },
  { name: 'Gabriel Garcia Marquez', id: '2' },
  { name: 'Diane Arbus', id: '2' },
]

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  })
})
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return authors.find(a => a.id == parent.authorId);
      }
    }
  })
});



const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //get data from database or other source
        return books.find(b => b.id == args.id);
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return authors.find(a => a.id === args.id);
      }
    }
  }
})



module.exports = new GraphQLSchema({
  query: RootQuery
})
const { gql } = require("graphql-tag")


const typeDefs = gql`
type Products{
    id:ID!,
    title:String!,
    category:String!,
    price:float!,
    inStock:Boolean!
}

type Query{
    products
}
`
// const products = require("../data/products")
const Product = require('../models/Product')

const resolvers = {
    Query: {
        products: async () => await Product.find({}),
        product: async (_, { id }) => await Product.findById(id),
    },

    Mutation: {

        createProduct: async (_, args) => {
            const newlyCreatedProduct = new Product(args);
            return await newlyCreatedProduct.save()
        },

        deleteProduct: async (_, { id }) => {
            const result = await Product.findByIdAndDelete(id);
            return !!result
        }
        ,
        updateProduct: async (_, { id, ...updateFields }) => {
            return await Product.findByIdAndUpdate(id, updateFields, { new: true });

        }
    },
}

module.exports = resolvers;
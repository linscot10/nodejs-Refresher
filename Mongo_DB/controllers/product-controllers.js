const Product = require("../models/Products")


const insertSampleProducts = async (req, res) => {
    try {
        const sampleProducts = [
            {
                name: "Laptop",
                category: "Electronics",
                price: 999,
                inStock: true,
                tags: ["computer", "tech"]
            },
            {
                name: "SmartPhone",
                category: "Electronics",
                price: 699,
                inStock: true,
                tags: ["computer", "tech"]
            },
            {
                name: "HeadPhones",
                category: "Electronics",
                price: 199,
                inStock: false,
                tags: ["audio", "tech"]
            },
            {
                name: "Running Shoes",
                category: "Sports",
                price: 89,
                inStock: true,
                tags: ["footwear", "running"]
            },
            {
                name: "Novel",
                category: "Books",
                price: 15,
                inStock: true,
                tags: ["fiction", "bestseller"]
            }
        ]

        const result = await Product.insertMany(sampleProducts);

        res.status(201).json({
            success: true,
            data: `Inserted ${result.length} sample products`
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Some error Occurred"
        })
    }
}

module.exports= {
    insertSampleProducts
}
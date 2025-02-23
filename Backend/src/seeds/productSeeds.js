const Products = require("../models/Products");
const Sizes = require("../models/Sizes");

async function seedProducts() {
    let sizes = await Sizes.find();
    if (sizes.length === 0) {
        sizes = [
            new Sizes({ name: "Small", description: "4 Slices. Serves 1" }),
            new Sizes({ name: "Medium", description: "8 Slices. Serves 2" }),
            new Sizes({ name: "Large", description: "10 Slices. Serves 3" }),
        ];
        await Sizes.bulkSave(sizes);
    }

    let products = await Products.find();
    if (products.length === 0) {
        products = [
            new Products({
                image: "pizza1.jpg",
                title: "Margherita",
                description: "Classic Italian pizza with tomato sauce, mozzarella, and fresh basil.",
                sizes: [
                    { price: 8.99, sizeId: sizes[0]._id },
                    { price: 11.99, sizeId: sizes[1]._id },
                    { price: 14.99, sizeId: sizes[2]._id },
                ],
            }),
            new Products({
                image: "pizza2.jpg",
                title: "Pepperoni Feast",
                description: "Loaded with pepperoni for that perfect spicy kick.",
                sizes: [
                    { price: 9.99, sizeId: sizes[0]._id },
                    { price: 12.99, sizeId: sizes[1]._id },
                    { price: 15.99, sizeId: sizes[2]._id },
                ],
            }),
            new Products({
                image: "pizza3.jpg",
                title: "Veggie Supreme",
                description: "A colorful mix of vegetables on a cheesy base.",
                sizes: [
                    { price: 10.49, sizeId: sizes[0]._id },
                    { price: 13.49, sizeId: sizes[1]._id },
                    { price: 16.49, sizeId: sizes[2]._id },
                ],
            }),
            new Products({
                image: "pizza4.jpg",
                title: "BBQ Chicken",
                description: "Grilled chicken with BBQ sauce, red onions, and cheese.",
                sizes: [
                    { price: 11.99, sizeId: sizes[0]._id },
                    { price: 15.99, sizeId: sizes[1]._id },
                    { price: 18.99, sizeId: sizes[2]._id },
                ],
            }),
            new Products({
                image: "pizza5.jpg",
                title: "Hawaiian Delight",
                description: "A unique blend of ham, pineapple, and cheese for a sweet and savory experience.",
                sizes: [
                    { price: 9.49, sizeId: sizes[0]._id },
                    { price: 12.49, sizeId: sizes[1]._id },
                    { price: 15.49, sizeId: sizes[2]._id },
                ],
            }),
        ];
        await Products.bulkSave(products);
    }
}

module.exports = seedProducts;
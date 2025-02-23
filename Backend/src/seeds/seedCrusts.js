const Crusts = require("../models/Crusts");
const Sizes = require("../models/Sizes");

async function seedCrusts() {
    // Fetch existing sizes
    let sizes = await Sizes.find();
    if (sizes.length === 0) {
        throw new Error("No sizes found. Please seed sizes first using seedProducts.");
    }

    // Seed Crusts
    let crusts = await Crusts.find();
    if (crusts.length === 0) {
        crusts = [
            new Crusts({
                image: "c1.jpg",
                name: "Hand Crafted",
                nutritionFacts: "Calories: 180",
                description: "A traditional hand-tossed crust with a light, airy texture.",
                sizes: [sizes[0]._id, sizes[1]._id, sizes[2]._id], // Small, Medium, Large
                addonPrice: 0.00,
            }),
            new Crusts({
                image: "c2.jpg",
                name: "Handcrafted with Garlic",
                nutritionFacts: "Calories: 200",
                description: "Hand-tossed crust brushed with savory garlic butter.",
                sizes: [sizes[0]._id, sizes[1]._id, sizes[2]._id], // Small, Medium, Large
                addonPrice: 0.99,
            }),
            new Crusts({
                image: "c3.jpg",
                name: "Pan",
                nutritionFacts: "Calories: 250",
                description: "A thick, crispy crust baked in a deep pan for a hearty bite.",
                sizes: [sizes[1]._id, sizes[2]._id], // Medium, Large
                addonPrice: 1.99,
            }),
            new Crusts({
                image: "c4.jpg",
                name: "Stuffed Crust",
                nutritionFacts: "Calories: 300",
                description: "A golden crust stuffed with gooey mozzarella cheese.",
                sizes: [sizes[1]._id, sizes[2]._id], // Medium, Large
                addonPrice: 2.99,
            }),
            new Crusts({
                image: "c5.jpg",
                name: "Cheesy Bites",
                nutritionFacts: "Calories: 320",
                description: "A fun crust with detachable cheesy bite-sized pieces.",
                sizes: [sizes[2]._id], // Large only
                addonPrice: 3.99,
            }),
        ];
        await Crusts.bulkSave(crusts);
        console.log("Crusts seeded successfully!");
    } else {
        console.log("Crusts already exist, skipping seeding.");
    }
}

module.exports = seedCrusts;
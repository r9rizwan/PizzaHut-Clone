const urlHolder = "http://localhost:5000/public/images";

const titles = [
    "Loaded Cookie Dough made with KITKAT® Vanilla Ice Cream",
    "Chocolate Chip Cookie Dough Vanilla ice cream",
    "White Choc Chip Caramel Cookie Dough Vanilla ice cream",
    "Ben & Jerrys Marshmallow and S'more 465ml",
    "Ben & Jerry's Cookie Dough Ice Cream 465ml",
    "Ben And Jerrys Cookie Dough 100ml",
    "Ben & Jerry's Chocolate Fudge Brownie 465ml",
    "Ben And Jerrys Chocolate Fudge Brownie 100ml"
];

const descriptions = [
    "Choc chip cookie dough with KITKAT®crumb & sauce, vanilla ice cream. Great for 2",
    "Served with a Small Vanilla Ice Cream. Great For 2 To Share!",
    "Served with a Small Vanilla Ice Cream. Great For 2 To Share!",
    "With marshmallow swirls, topped with caramel & popping candy choc chunks",
    "Vanilla ice cream with chunks of chocolate chip cookie dough and chocolatey chunks.",
    "Ben And Jerrys Cookie Dough 100ml",
    "Chocolate ice cream with chocolate brownie chunks",
    "Chocolate ice cream with chocolate brownie chunks"
];

const prices = [
    "7.99", "5.99", "5.99", "5.99", "5.99", "2.99", "5.99", "2.99"
];

// Generate sides data dynamically

const dessertsData = titles.map((title, index) => ({
    id: `dessert-${index + 1}`,
    image: `${urlHolder}/desserts/deserts${index + 1}.jpg`,
    title,
    description: descriptions[index],
    price: prices[index],
}));

const bannerData = [
    {
        id: "b1",
        image: `${urlHolder}/banners/banner.jpg`,
    },
];

module.exports = {
    dessertsData,
    bannerData,
};
const urlHolder = "http://localhost:5000/public/images";

const titles = [
    "Jimmy's Iced Coffee Original 250ml",
    "Lipton Ice Tea Peach 500ml",
    "Pepsi Max",
    "Robinsons Refresh’d Apple & Raspberry 500ml",
    "Pepsi Max Cherry 1.5 L",
    "7up Free",
    "Pepsi",
    "Tango",
    "Still Water 500ml"
];

const descriptions = [
    "The absolute go to if you’re looking for a straight up Iced Coffee ",
    "A burst of peach flavour and fruity taste",
    "1.5 L",
    "Raspberry & Apple Still water with real fruit",
    "1.5 L",
    "1.5 L",
    "1.5 L",
    "1.5 L",
    "500ml"
];

const prices = [
    "1.99", "1.49", "2.49", "1.49", "1.49", "2.49", "2.49", "2.49", "0.99"
];

const drinksData = titles.map((title, index) => ({
    id: `drink-${index + 1}`,
    image: `${urlHolder}/drinks/drinks${index + 1}.jpg`,
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
    drinksData,
    bannerData,
};

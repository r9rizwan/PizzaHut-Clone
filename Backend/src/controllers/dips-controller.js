const urlHolder = "http://localhost:5000/public/images";

const titles = [
    "BBQ Dip",
    "Sweet Chilli Dip",
    "Garlic & Herb Dip",
    "Sour Cream & Chive Dip"
];

const descriptions = [
    "BBQ Dip",
    "Sweet Chilli Dip",
    "Garlic & Herb Dip",
    "Sour Cream & Chive Dip"
];

const prices = [
    "0.49", "0.49", "0.49", "0.49"
];

const dipsData = titles.map((title, index) => ({
    id: `dip-${index + 1}`,
    image: `${urlHolder}/dips/dips${index + 1}.jpg`,
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
    dipsData,
    bannerData,
};
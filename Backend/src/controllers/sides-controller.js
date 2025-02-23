const urlHolder = "http://localhost:5000/public/images";
const sidesData = [
  {
    id: 'side-1',
    title: "Breaded Chicken Strips",
    description:
      "Strips of succulent chicken breast marinated then coated with crispy breadcrumbs",

    price: "6.79",
    image: `${urlHolder}/sides/sides1.jpg`,
    type: "classic",
  },
  {
    id: 'side-2',
    title: "Hot 'n' Spicy Chicken Strips",
    description: "Chicken Breast Strips Coated in Hot and Spicy Breadcrumbs",
    price: "6.79",
    image: `${urlHolder}/sides/sides2.jpg`,
    type: "classic",
  },
  {
    id: 'side-3',
    title: "Onion Rings",
    description: "Onion pieces coated in a delicious crispy batter. 10 pieces",
    price: "5.49",
    image: `${urlHolder}/sides/sides3.jpg`,
    type: "classic",
  },
  {
    id: 'side-4',
    title: "BBQ Bacon Loaded Wedges",
    description:
      "Potato wedges loaded with melted triple cheese, beef bacon & drizzled with BBQ sauce",
    price: "5.49",
    image: `${urlHolder}/sides/sides4.jpg`,
    type: "classic",
  },
  {
    id: 'side-5',
    title: "Cheese & Jalapeño Loaded Wedges",
    description: "Potato wedges loaded with melted triple cheese and jalapeños",
    price: "5.49",
    image: `${urlHolder}/sides/sides5.jpg`,
    type: "classic",
  },
  {
    id: 'side-6',
    title: "Potato Wedges",
    description: "Chunky Potato Chunks Covered In A Light Seasoning",
    price: "4.99",
    image: `${urlHolder}/sides/sides6.jpg`,
    type: "classic",
  },
  {
    id: 'side-7',
    title: "Fries",
    description: "Hot & Crispy fries covered in a delicious seasoning",
    price: "4.99",
    image: `${urlHolder}/sides/sides7.jpg`,
    type: "classic",
  },
  {
    id: 'side-8',
    title: "Halloumi Fries",
    description:
      "Halloumi pieces coated in a delicious crispy batter. 5 pieces",
    price: "5.49",
    image: `${urlHolder}/sides/sides8.jpg`,
    type: "classic",
  },
  {
    id: 'side-9',
    title: "Doritos Cheesy Nachos",
    description: "Tortilla chips with melted cheese, salsa, jalapenos, and dip",
    price: "5.49",
    image: `${urlHolder}/sides/sides9.jpg`,
    type: "classic",
  },
  {
    id: 'side-10',
    title: "Cheese & Garlic Tear 'n' Share",
    description: "Cheese & garlic pizza bread strips, ideal for sharing",
    price: "7.99",
    image: `${urlHolder}/sides/sides10.jpg`,
    type: "classic",
  },
  {
    id: 'side-11',
    title: "Garlic Bread (4 pieces)",
    description: "Baguette Slices Flavoured With Garlic And Herbs",
    price: "5.49",
    image: `${urlHolder}/sides/sides11.jpg`,
    type: "classic",
  },
  {
    id: 'side-12',
    title: "Cheesy Garlic Bread (4 pieces)",
    description: "Four fully loaded slices of garlic bread topped with cheese",
    price: "5.69",
    image: `${urlHolder}/sides/sides12.jpg`,
    type: "classic",
  },
  {
    id: 'side-13',
    title: "Cheese Triangles (7 pieces)",
    description:
      "Triangles Of Warm Creamy Cheese Coated In Delicious Crispy Breadcrumbs",
    price: "5.99",
    image: `${urlHolder}/sides/sides13.jpg`,
    type: "classic",
  },
  {
    id: 'side-14',
    title: "Mac 'n' Cheese",
    description:
      "Macaroni pasta in a creamy cheddar cheese sauce topped with mozzarella cheese",
    price: "6.49",
    image: `${urlHolder}/sides/sides14.jpg`,
    type: "classic",
  },
  {
    id: 'side-15',
    title: "Mix Leaf Salad",
    description:
      "Cherry Tomatoes, Red Cabbage, Carrot With Garlic & Herb Dressing",
    price: "4.99",
    image: `${urlHolder}/sides/sides15.jpg`,
    type: "classic",
  },
];

// Generate sides data dynamically
// const sidesData = titles.map((title, index) => ({
//   id: `s${index + 1}`,
//   image: `${urlHolder}/sides/sides${index + 1}.jpg`,
//   title,
//   description: descriptions[index],
//   price: prices[index],
// }));

const bannerData = [
  {
    id: "b1",
    image: `${urlHolder}/banners/banner.jpg`,
  },
];

module.exports = {
  sidesData,
  bannerData,
};

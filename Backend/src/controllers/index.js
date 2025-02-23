// The arguments passed in above function are known as request, response cycle.

// REQUEST

// 1. Request is intitaled by client-side when it needs some data or service from server.
// 2. The request is sent over an HTTPS or HTTP protocol.
// 3. Key componenets of this request include.

//      a) GET
//      b) POST
//      c) PUT
//      d) DELETE

// 4. URL = The Uniform Resource Locator specifies the address of the resource the client wants to access. It might look like /api/users or /home.
// 5. Body: The body contains the data the client wants to send to the server. This is typically used in POST, PUT, and PATCH requests.
//    For example, when a user submits a login form, the body might contain the username and password.

// RESPONSE

// The response of the server is contains the result and are also send back over HTTP or HTTPS.

// Status code: like 200 (ok), 201 (created), 404 (not found), 500 (internal server error)

// Headers: These provide additional metadata about the response, such as:

//  Content - Type: Specifies the format of the response data(e.g., JSON, HTML).

//    Set - Cookie: Instructs the client to store a cookie.
//    Body: The body contains the data the server is sending back to the client.This could be in various formats, such as:

// NEXT

//  In Express.js, next is a callback function that you can call to pass control to the next middleware function in the stack.
//  Middleware functions in Express can perform tasks such as logging, authentication, or error handling, and then either send a response or pass control to the next function.

// hashing gives the safety.
// hashing is done during the insertion of data. for example, registration of new user.
// client side (frontend) => plain text for email, password (json object).
// compare the plain text with the hash in the db.
// if plain text is same as original text we get a boolean value of true that indicates the hash is from this text.

const dealsData = [
  {
    id: "d1",
    image: "/images/deals/deal1.jpg",
    title: "The Ultimate Pizza Feast",
    description:
      "2 Medium Pizzas, 2 Classic Sides, 1 Cookie Dough & 1.5L Bottle Of Drink. Go Large For +£2 Per Pizza.",
    pretext: "From",
    // category: ["pizzas", "2", "sides", "2", "desserts", "1", "drinks", "1"],
    category: [
      {
        type: "pizzas",
        quantity: 2,
        sizes: ["medium"],
      },
      {
        type: "sides",
        quantity: 2,
        variant: "classic",
      },
      {
        type: "desserts",
        quantity: 1,
        variant: "cookie-dough",
      },
      {
        type: "drinks",
        quantity: 1,
        sizes: ["1.5-ltr"],
      },
    ],
    price: "26.99",
    previousPrice: "£45.94",
  },
  {
    id: "d2",
    image: "/images/deals/deal2.jpg",
    title: "£10 - Any Size Pizza",
    description: "£10 Any Size Pizza (Excludes Big New Yorker).",
    pretext: "From",
    // category: ["pizzas", "1"],
    category: [
      {
        type: "pizzas",
        quantity: 1,
        excludes: ["xxl"],
      },
    ],
    price: "10.00",
  },

  {
    id: "d3",
    image: "/images/deals/deal3.jpg",
    title: "1 large pizza, 1 classic side and 1.5L drink",
    description: " ",
    pretext: "From",
    price: "19.99",
    // category: ["pizzas", "1", "sides", "1", "drinks", "1"],
    category: [
      {
        type: "pizzas",
        quantity: 1,
        sizes: ["large"],
      },
      {
        type: "sides",
        quantity: 1,
        variant: "classic",
      },
      {
        type: "drinks",
        quantity: 1,
        sizes: ["1.5-ltr"],
      },
    ],
    previousPrice: "£27.96",
  },

  {
    id: "d4",
    image: "/images/deals/deal4.jpg",
    title: "Any Two Pizzas. Excludes Big New Yorker.",
    description: " ",
    pretext: "From",
    // category: ["pizzas", "2"],
    category: [
      {
        type: "pizzas",
        quantity: 2,
        excludes: ["xxl"],
      },
    ],
    price: "20.00",
  },

  {
    id: "d5",
    image: "/images/deals/deal5.jpg",
    title: "The Mega Feast",
    description: "2 Large Pizzas, 2 Classic Sides and a 1.5L Bottle of Drink",
    pretext: "From",
    price: "29.99",
    // category: ["pizzas", "2", "sides", "2", "drinks", "1"],
    category: [
      {
        type: "pizzas",
        quantity: 2,
        sizes: ["large"],
      },
      {
        type: "sides",
        quantity: 2,
        variant: "classic",
      },
      {
        type: "drinks",
        quantity: 1,
        sizes: ["1.5-ltr"],
      },
    ],
    previousPrice: "£44.95",
  },

  {
    id: "d6",
    image: "/images/deals/deal6.jpg",
    title: "Big New Yorker Pizza",
    description: "Choice of Margherita, Pepperoni or CYO - Collection only",
    pretext: "From",
    price: "13.99",
    // category: ["pizzas", "1"],
    category: [
      {
        type: "pizzas",
        quantity: 1,
        sizes: ["xxl"],
      },
    ],
    previousPrice: "£23.99",
  },

  {
    id: "d7",
    image: "/images/deals/deal7.jpg",
    title: "2 cookie doughs",
    description:
      "Choose from White Choc Chip Caramel, Chocolate Chip, and new KITKAT®",
    pretext: "From",
    // category: ["desserts", "1"],
    category: [
      {
        type: "desserts",
        quantity: 2,
        variant: "cookie-dough",
      },
    ],
    price: "8.99",
  },

  {
    id: "d8",
    image: "/images/deals/deal8.jpg",
    title: "Choose three sides",
    description:
      "Choose from Fries, Onion Rings, Potato Wedges, Garlic Bread and Mixed Leaf Salad",
    pretext: "From",
    // category: ["sides", "1"],
    category: [
      {
        type: "sides",
        quantity: 3,
        all: true,
      },
    ],
    price: "8.99",
  },

  {
    id: "d9",
    image: "/images/deals/deal9.jpg",
    title: "Any small pizza",
    description: "Collection only",
    pretext: "From",
    // category: ["pizzas", "1"],
    category: [
      {
        type: "pizzas",
        quantity: 1,
        sizes: ["small"],
      },
    ],
    price: "5.99",
  },

  {
    id: "d10",
    image: "/images/deals/deal10.jpg",
    title: "Any medium pizza",
    description: "Collection only",
    pretext: "From",
    // category: ["pizzas", "1"],
    category: [
      {
        type: "pizzas",
        quantity: 1,
        sizes: ["medium"],
      },
    ],
    price: "7.99",
  },

  {
    id: "d11",
    image: "/images/deals/deal11.jpg",
    title: "Any large pizza",
    description: "Collection only",
    pretext: "From",
    // category: ["pizzas", "1"],
    category: [
      {
        type: "pizzas",
        quantity: 1,
        sizes: ["large"],
      },
    ],
    price: "9.99",
  },
  // {
  //   id: "d12",
  //   image: "/images/deals/deal12.jpg",
  //   title: "Create your own LARGE pizza with two toppings",
  //   description: "Collection only",
  //   pretext: "From",
  //   category: ["pizzas", "1"],
  //   price: "21.99",
  // },
  {
    id: "d13",
    image: "/images/deals/deal13.jpg",
    title: "Big New Yorker Bundle",
    description: "1 Big New Yorker pizza, 2 classic sides and 1.5l drink",
    pretext: "From",
    price: "24.99",
    // category: ["pizzas", "1", "sides", "2", "drinks", "1"],
    category: [
      {
        type: "pizzas",
        quantity: 1,
        sizes: ["xxl"],
      },
      {
        type: "sides",
        quantity: 2,
        variant: "classic",
      },
      {
        type: "drinks",
        quantity: 1,
        sizes: ["1.5-ltr"],
      },
    ],
    previousPrice: "£26.95",
  },

  {
    id: "d14",
    image: "/images/deals/deal14.jpg",
    title: "Melts",
    description: "Each loaded with Mozzarella and topped with herbs.",
    pretext: "From",
    // category: ["melts", "1"],
    category: [
      {
        type: "melts",
        quantity: 1,
      },
    ],
    price: "6.99",
  },

  {
    id: "d15",
    image: "/images/deals/deal15.jpg",
    title: "3 Large Pizzas, 1 chicken side, 1 classic side & 1.5L bottle drink",
    description: " ",
    pretext: "From",
    // category: ["pizzas", "3", "sides", "2", "drinks", "1"],
    category: [
      {
        type: "pizzas",
        quantity: 3,
        sizes: ["large"],
      },
      {
        type: "sides",
        quantity: 1,
        variant: "chicken",
      },
      {
        type: "sides",
        quantity: 1,
        variant: "classic",
      },
      {
        type: "drinks",
        quantity: 1,
        sizes: ["1.5-ltr"],
      },
    ],
    price: "49.99",
  },

  {
    id: "d16",
    image: "/images/deals/deal16.jpg",
    title: "Any 2 Classic Sides for £5.99",
    description: " ",
    pretext: "From",
    // category: ["sides", "2"],
    category: [
      {
        type: "sides",
        quantity: 2,
        variant: "classic",
      },
    ],
    price: "5.99",
  },

  {
    id: "d17",
    image: "/images/deals/deal17.jpg",
    title: "Any size pizza",
    description: "Collection Only",
    pretext: "From",
    category: ["pizzas", "1"],
    category: [
      {
        type: "pizzas",
        quantity: 1,
        all: true,
      },
    ],
    price: "9.99",
  },

  {
    id: "d18",
    image: "/images/deals/deal8.jpg",
    title: "2 Dips For 99P",
    description: " ",
    pretext: "From",
    // category: ["dips", "2"],
    category: [
      {
        type: "dips",
        quantity: 2,
        all: true,
      },
    ],
    price: "0.99",
  },

  {
    id: "d19",
    image: "/images/deals/deal19.jpg",
    title: "Classic Feast",
    description: "2 Medium Pizzas and 2 Classic Sides",
    pretext: "From",
    price: "25.99",
    // category: ["pizzas", "2", "sides", "2"],
    category: [
      {
        type: "pizzas",
        quantity: 2,
        sizes: ["medium"],
      },
      {
        type: "sides",
        quantity: 2,
        variant: "classic",
      },
    ],
    previousPrice: "37.96",
  },

  {
    id: "d20",
    image: "/images/deals/deal20.jpg",
    title: "Double Melts",
    description: "2 x Melts, 1 classic side & 1 x 1.5 L bottle of drink",
    pretext: "From",
    price: "16.99",
    // category: ["melts", "2", "sides", "1", "drinks", "2"],
    category: [
      {
        type: "melts",
        quantity: 2,
        all: true,
      },
      {
        type: "sides",
        quantity: 2,
        variant: "classic",
      },
      {
        type: "drinks",
        sizes: ["1.5-ltr"],
        quantity: 2,
      },
    ],
    previousPrice: "21.45",
  },

  {
    id: "d21",
    image: "/images/deals/deal21.jpg",
    title: "Lunch Meal Deal",
    description:
      "1 Melt & GarlicZ Bread or Potato Wedges & 1.5 L bottle of drink",
    pretext: "From",
    price: "8.99",
    // category: ["melts", "1", "sides", "1"],
    category: [
      {
        type: "melt",
        quantity: 1,
        all: true,
      },
      {
        type: "sides",
        quantity: 1,
        variants: ["potato-wedges", "garlic-bread"],
      },
    ],
    previousPrice: "12.97",
  },

  // {
  //   id: "d22",
  //   image: "/images/deals/deal22.jpg",
  //   title: "2 My Box's and 2 500ml drinks",
  //   description: "2 x My Box Meals & 2 x 500ml bottle of drinks",
  //   pretext: "From",
  //   price: "19.99",
  //   category: ["pizzas", "2", "drinks", "2"],
  //   previousPrice: "£36.94",
  // },

  {
    id: "d23",
    image: "/images/deals/deal23.jpg",
    title: "My Box",
    description: "1 small pizza & 1 side. Collection Only",
    pretext: "From",
    // category: ["pizzas", "1", "sides", "1"],
    category: [
      {
        type: "pizzas",
        quantity: 1,
        sizes: ["small"],
      },
      {
        type: "sides",
        quantity: 1,
        all: true,
      },
    ],
    price: "6.99",
  },

  // {
  //   id: "d24",
  //   image: "/images/deals/deal24.jpg",
  //   title: "50% off Regular Priced Pizzas",
  //   description: "50% off Regular Priced Pizzas when you spend £25 or more",
  //   pretext: "",
  //   category: ["pizzas", "1"],
  //   price: ",
  // },
];

const bannerData = [
  {
    id: "b1",
    image: "/images/banners/banner.jpg",
  },
];

module.exports = {
  dealsData,
  bannerData,
};

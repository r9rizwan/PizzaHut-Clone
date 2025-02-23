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


const urlHolder = "http://localhost:5000/public/images";

const titles = [


    "Toasted Three Cheese Melts", "Meat Feast Melt", "Pepperoni Feast Melt", "BBQ Chicken Melt", "Spicy Veg Melt",
];

const descriptions = [
    "Triple cheese mozzarella with garlic sprinkles and marinara sauce for dipping",
    "Mozzarella, beef pepperoni, turkey ham, beef, garlic and marinated sauce",
    "Beef pepperoni,cheese and garlic sprinkles and marinated sauce for dipping",
    "Mozzarella,pulled chicken,red onion,garlic sprinkles and BBQ sauce",
    "Mozzarella,peppers,red onion,garlic sprinkles and marinara sauce",
];

const prices = [
    "6.99", "6.99", "6.99", "6.99", "6.99",
];

// Generate sides data dynamically
const meltsData = titles.map((title, index) => ({
    id: `melt-${index + 1}`,
    image: `${urlHolder}/melts/melts${index + 1}.jpg`,
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
    meltsData,
    bannerData,
};

const Users = require("../models/Users");
const bcrypt = require('bcrypt')

async function userSeeds() {
    let user = null;
    let admin = null;
    user = await Users.findOne({ $or: [{ email: 'john@pizzahut.com' }, { contactNumber: 7890123456 }] });

    admin = await Users.findOne({ $or: [{ email: 'admin@pizzahut.com' }, { contactNumber: 6789012345 }] });

    if (!user) {
        const passwordHash = bcrypt.hashSync("user12345", 10)
        await Users.create({
            firstName: "John",
            address: {
                line1: "123 Example Street",
                line2: "Apartment 4B",
                postCode: "E1 6AN"
            },
            lastName: "Doe",
            email: "john@pizzahut.com",
            contactNumber: 7890123456,
            role: "user",
            password: passwordHash,
            active: true
        });
    }

    if (!admin) {
        const passwordHash = bcrypt.hashSync("admin12345", 10)
        await Users.create({
            firstName: "Alice",
            address: {
                line1: "456 Admin Road",
                line2: null,
                postCode: "WC2N 5DU"
            },
            lastName: "Smith",
            email: "admin@pizzahut.com",
            contactNumber: 6789012345,
            role: "admin",
            password: passwordHash,
            active: true
        });
    }

};

module.exports = userSeeds;
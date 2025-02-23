const Users = require("../models/Users");
const { createResponseObject } = require("../utility");

class UsersController {
  async getCurrentUser(req, res) {
    const userId = req.user.id; // Assume userId is passed from the frontend

    if (!userId)
      return res
        .status(400)
        .json(createResponseObject(false, "Please send a valid id!"));

    const isUser = await Users.findById(userId);

    if (!isUser)
      return res
        .status(404)
        .json(createResponseObject(false, "User not found!"));

    // Format the user object for the response
    const user = {
      email: isUser.email,
      firstName: isUser.firstName,
      lastName: isUser.lastName,
      contactNumber: isUser.contactNumber,
      role: isUser.role,
    };

    return res.status(200).json(createResponseObject(true, "User found", user));
  }
}

module.exports = { UsersController };

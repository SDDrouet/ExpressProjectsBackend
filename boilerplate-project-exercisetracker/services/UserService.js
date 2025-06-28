const User = require('../models/Users');

class UserService {
  async createUser(username) {
    const user = new User({ username });
    return await user.save();
  }

  async getUserById(userId) {
    return await User.findById(userId);
  }

  async getAllUsers() {
    return await User.find({});
  }

  async deleteUser(userId) {
    return await User.findByIdAndDelete(userId);
  }
}

module.exports = new UserService();

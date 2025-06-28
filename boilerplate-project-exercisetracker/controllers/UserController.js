// funciones para devolver en el controller
const UserService = require('../services/UserService');

class UserController {
    async createUser(req, res) {
        const { username } = req.body;
        try {
            const user = await UserService.createUser(username);
            user.__v = undefined; // Exclude __v field from response
            res.status(201).json(user);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Error creating user', details: error.message });
        }
    }

    async getUserById(req, res) {
        const { id } = req.params;
        try {
            const user = await UserService.getUserById(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            user.__v = undefined; // Exclude __v field from response
            res.json(user);
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ error: 'Error fetching user', details: error.message });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Error fetching users', details: error.message });
        }
    }
}

module.exports = new UserController();

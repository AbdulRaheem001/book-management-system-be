import userService from '../services/userService.js';

const authController = {
  async signup(req, res) {
    try {
      const { name, phone, email, password } = req.body;
      await userService.createUser(name, phone, email, password);
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userService.authenticateUser(email, password);
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const token = userService.generateToken(user);
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  async deleteUser(req, res) {
    try {
      const userId = req.user._id;
      console.log('in delet', userId);
      const result = await userService.deleteUserById(userId);
      if (!result) {
        return res.status(401).json({ message: 'user Did not deleted' });
      }
      res.json({ result });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

export default authController;

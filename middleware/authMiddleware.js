import jwt from 'jsonwebtoken';
import userService from '../services/userService.js';

const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization');
  const actualToken = token.split(' ')[1];
  if (!actualToken) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  try {
    const decoded = jwt.verify(actualToken, 'testTask');
    const user = await userService.getUserById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default authenticateUser;

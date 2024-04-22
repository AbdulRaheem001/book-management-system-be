import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../schema/user.js';
import Book from '../schema/book.js';
import Shelf from '../schema/shelf.js';

const userService = {
  async createUser(name, phone, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, phone, email, password: hashedPassword });
    await newUser.save();
  },

  async authenticateUser(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      return null;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    return passwordMatch ? user : null;
  },
async getUserById(userId){
  await User.findByIdAndDelete(userId);
  await Book.deleteMany({ userId });
  await Shelff.deleteMany({ userId });
return 'deleted';
},
async deleteUserById(userId){
  const user = await User.findById(userId);
  return user;
  },
    generateToken(user) {
      return jwt.sign({ userId: user._id }, 'testTask', { expiresIn: '1h' });
    },
};

export default userService;

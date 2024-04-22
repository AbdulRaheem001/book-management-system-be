const validateSignup = (req, res, next) => {
    const { name, phone, email, password } = req.body;
    if (!name || !phone || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    next();
  };
  
  const validateLoin = (req, res, next) => {
    const {  email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email or Password are required' });
    }
    next();
  };
  
  export { validateSignup, validateLoin };
  
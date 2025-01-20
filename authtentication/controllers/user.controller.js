import { registerUser, loginUser } from '../services/user.services.js';

export const signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await registerUser(username, password);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Error signing up', error: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await loginUser(username, password);

    // Save user ID in session
    req.session.userId = user._id;
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(400).json({ message: 'Error logging in', error: error.message });
  }
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(400).json({ message: 'Error logging out' });
    } else {
      res.status(200).json({ message: 'Logout successful' });
    }
  });
};

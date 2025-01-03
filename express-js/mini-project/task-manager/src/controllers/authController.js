export const login = (req, res) => {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }
  
    req.session.user = { username };
    res.cookie('username', username, { httpOnly: true, maxAge: 1000 * 60 * 30 });
    res.json({ message: 'Login successful', username });
  };

  export const logout = (req, res) => {
    res.clearCookie('username');
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error logging out' });
      }
      res.json({ message: 'Logout successful' });
    });
  };
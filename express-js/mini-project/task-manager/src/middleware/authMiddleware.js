export const authMiddleware = (req, res, next) => {
  console.log(req.session , "and" ,  req.session.user);
    if (req.session && req.session.user) {
      return next();
    }
    res.status(401).json({ message: 'Unauthorized: Please log in' });
  };
  
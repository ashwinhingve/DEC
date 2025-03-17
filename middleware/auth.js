const jwt = require('jsonwebtoken');

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token, authorization denied' 
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Check role authorization
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ 
          success: false, 
          message: 'Unauthorized access' 
        });
      }

      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ 
        success: false, 
        message: 'Token is not valid' 
      });
    }
  };
};

module.exports = authMiddleware;
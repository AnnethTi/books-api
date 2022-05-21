const permission = (...allowedRoles) => {
    return (req, res, next) => {
      const { user } = req;
      if (user && allowedRoles.includes(user.type)) {
        return next(); // si coincide con los permisos, se usara el next 
      }
      return res.status(403).json({ message: 'Forbidden' });
    };
  }
  
  module.exports = permission;

////////////////////////////////////////
 auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];



  // acá normalmente:
  // jwt.verify(token, process.env.JWT_SECRET)

  next();
};
module.exports =auth
const JWT = require("jsonwebtoken");
const httpStatus = require("http-status");

const authenticateToken = (req, res, next) => {
  const token = req.headers?.token;
  if (!token) return res.status(httpStatus.UNAUTHORIZED).send({ message: "Bu işlemi yapabilmek için ilk olarak giriş yapmanız gerekmektedir." });
  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
    if (err) return res.status(httpStatus.FORBIDDEN).send(err);
    if (!user?._doc?.isAdmin) return res.status(httpStatus.UNAUTHORIZED).send({ message: "Bu işlemi yapabilmek için yönetici olmanız gerekmektedir." });
    req.user = user?._doc;
    next();
  });
};

module.exports = authenticateToken;

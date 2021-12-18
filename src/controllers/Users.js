const hs = require("http-status");
const { list, insert, findOne, modify } = require("../services/Users");
const { passwordToHash, generateJWTAccessToken, generateJWTRefreshToken } = require("../scripts/utils/helper");
const uuid = require("uuid");
const eventEmitter = require("../scripts/events/eventEmitter");

const index = (req, res) => {
  list()
    .then((userList) => {
      if (!userList) res.status(hs.INTERNAL_SERVER_ERROR).send({ error: "Sorun var.." });
      res.status(hs.OK).send(userList);
    })
    .catch((e) => res.status(hs.INTERNAL_SERVER_ERROR).send(e));
};

const create = (req, res) => {
  req.body.password = passwordToHash(req.body.password);
  insert(req.body)
    .then((createdUser) => {
      if (!createdUser) res.status(hs.INTERNAL_SERVER_ERROR).send({ error: "Sorun var.." });
      res.status(hs.OK).send(createdUser);
    })
    .catch((e) => res.status(hs.INTERNAL_SERVER_ERROR).send(e));
};

const login = (req, res) => {
  req.body.password = passwordToHash(req.body.password);
  findOne(req.body)
    .then((user) => {
      if (!user) return res.status(hs.NOT_FOUND).send({ message: "Böyle bir kullanıcı bulunmamaktadır." });
      user = {
        ...user.toObject(),
        tokens: {
          access_token: generateJWTAccessToken(user),
          refresh_token: generateJWTRefreshToken(user),
        },
      };
      delete user.password;
      res.status(hs.OK).send(user);
    })
    .catch((e) => res.status(hs.INTERNAL_SERVER_ERROR).send(e));
};

//! ÖDEV Video Üzerinden izleyip implemente edilecek.
// https://www.youtube.com/watch?v=pMi3PiITsMc
const resetPassword = (req, res) => {
  const { email } = req.body;
  const newPassword = uuid.v4()?.split("-")[0] || new Date().getTime();
  
  modify({ email }, { password: passwordToHash(newPassword) })
    .then((updatedUser) => {
      console.log(updatedUser);
      if (!updatedUser) return res.status(hs.NOT_FOUND).send({ message: "Böyle bir kullanıcı bulunmamaktadır." });
      eventEmitter.emit("send_email", {
        to: updatedUser.email,
        subject: "Şifre Sıfırlama",
        text: `Merhaba ${updatedUser.first_name} ${updatedUser.last_name} \nŞifreniz: ${newPassword}`,
      });
      res.status(hs.OK).send({ message: "Şifreniz başarıyla sıfırlandı. Mailinizi kontrol edin" });
    })
    .catch((res) => {
      res.status(hs.INTERNAL_SERVER_ERROR).send({ error: "Sorun var.." });
    });
};

module.exports = {
  index,
  create,
  login,
  resetPassword,
};

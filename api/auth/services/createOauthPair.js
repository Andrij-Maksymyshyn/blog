const { Oauth } = require("../../../models");

const createOauthPair = tokenData => {
  return Oauth.create(tokenData);
};

module.exports = createOauthPair;

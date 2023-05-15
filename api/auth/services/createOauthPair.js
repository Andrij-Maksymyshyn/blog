const { Oauth } = require("../../../models");

const createOauthPair = async tokenData => {
  const newOauthPair = await Oauth.create(tokenData);

  return newOauthPair;
};

module.exports = createOauthPair;

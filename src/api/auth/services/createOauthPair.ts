import { Oauth } from "../../../models";

import { IOauth } from "../../../interfaces/schemaInterface";

const createOauthPair = async (tokenData: IOauth): Promise<IOauth> => {
  const newOauthPair = await Oauth.create(tokenData);

  return newOauthPair;
};

export { createOauthPair };

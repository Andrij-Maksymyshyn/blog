import { IloginInput } from "../../interfaces/loginInput";
import { User } from "../../models";
import { checkPasswords, generateAccessTokenPair } from "../../services";
import { createOauthPair } from "../../api/auth/services";

const loginUser = async ({
  loginInput
}: {
  loginInput: IloginInput;
}): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  const { email, password } = loginInput;
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Email or password is wrong");
  }

  await checkPasswords(user.password, password);
  const tokenPair = generateAccessTokenPair({ ...(user?._id as object) });
  await createOauthPair({ ...tokenPair, user: user._id });

  return tokenPair;
};

export { loginUser };

// const { User } = require("../../models");
// const { checkPasswords, generateAccessTokenPair } = require("../../services");
// const { createOauthPair } = require("../../api/auth/services");

// const loginUser = async ({ loginInput }) => {
//   const { email, password } = loginInput;
//   const user = await User.findOne({ email });

//   if (!user) {
//     throw new Error("Email or password is wrong");
//   }

//   await checkPasswords(user.password, password);
//   const tokenPair = generateAccessTokenPair({ ...user?._id });
//   await createOauthPair({ ...tokenPair, user: user._id });

//   return tokenPair;
// };

// module.exports = loginUser;

import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import { BadRequest } from "../errors/ApiError";
import { IQueryIn } from "../helpers/buildFilterQuery";
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const hashPassword = async (password: string): Promise<string> =>
  await bcrypt.hash(password, 10);

const checkPasswords = async (
  hashedPassword: string = "",
  password: string = ""
): Promise<void> => {
  const isPasswordEquals = await bcrypt.compare(password, hashedPassword);

  if (!isPasswordEquals) {
    throw new BadRequest("Email or password is wrong");
  }
};

const generateAccessTokenPair = (
  encodeData: IQueryIn = {}
): {
  accessToken: string;
  refreshToken: string;
} => {
  const accessToken = <string>jwt.sign(encodeData, ACCESS_TOKEN_SECRET || "", {
    expiresIn: "2h"
  });

  const refreshToken = <string>jwt.sign(
    encodeData,
    REFRESH_TOKEN_SECRET || "",
    {
      expiresIn: "30d"
    }
  );

  return {
    accessToken,
    refreshToken
  };
};

const verifyToken = (token = "", tokenType = ""): string | jwt.JwtPayload => {
  switch (tokenType) {
    case "accessToken":
      tokenType = ACCESS_TOKEN_SECRET || "";
      break;

    case "refreshToken":
      tokenType = REFRESH_TOKEN_SECRET || "";
      break;

    default:
      throw new BadRequest("Invalid token (signature)");
  }

  return jwt.verify(token, tokenType);
};

export { hashPassword, checkPasswords, generateAccessTokenPair, verifyToken };

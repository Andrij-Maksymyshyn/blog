import dayJs from "dayjs";
import utc from "dayjs/plugin/utc";
dayJs.extend(utc);

import { Oauth } from "../models/oauth";

const removeOldTokens = async (): Promise<void> => {
  const oneWeekBeforeNow = dayJs().utc().subtract(7, "days").format();

  await Oauth.deleteMany({
    createdAt: { $lte: oneWeekBeforeNow }
  });
};

export default removeOldTokens;

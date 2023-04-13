const dayJs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayJs.extend(utc);

const { Oauth } = require("../models");

module.exports = async () => {
  const oneWeekBeforeNow = dayJs().utc().subtract(7, "days").format();

  await Oauth.deleteMany({
    createdAt: { $lte: oneWeekBeforeNow }
  });
};

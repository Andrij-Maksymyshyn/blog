const cron = require("node-cron");

const removeOldTokens = require("./removeOldTokens");

cron.schedule("0 0 * * 5", removeOldTokens);

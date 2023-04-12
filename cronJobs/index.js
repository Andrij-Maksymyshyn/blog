const cron = require("node-cron");

const removeOldTokens = require("./removeOldTokens");

cron.schedule("0 0 1-31 1-12 5", removeOldTokens);

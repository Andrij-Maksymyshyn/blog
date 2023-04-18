const cron = require("node-cron");

const removeOldTokens = require("./removeOldTokens");

cron.schedule("* * * * 5", removeOldTokens);

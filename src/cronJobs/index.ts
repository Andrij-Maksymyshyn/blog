import cron from "node-cron";
import removeOldTokens from "./removeOldTokens";

const cronJob = cron.schedule("* * * * 5", removeOldTokens);

export default cronJob;

import { Queue } from "bullmq";
import redis from "./Redis";

export const emailQueue = new Queue("emailQueue", {
  connection: redis,
});

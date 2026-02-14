import { Queue } from "bullmq";
import connection from "./Redis";

export const emailQueue = new Queue("emailQueue", {
  connection:connection,
  defaultJobOptions: {
    removeOnComplete: true, // VERY IMPORTANT (Upstash safe)
    removeOnFail: false,
    attempts: 2,
  },
});
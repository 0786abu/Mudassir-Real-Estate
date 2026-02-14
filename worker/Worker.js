const { Worker } = require("bullmq");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
// import Email from "@/backend/model/subscribeEmailModel";
const Email = require("./EmailSchema.js");
const DataBase = require("./DB.js");
const PropertyALertTemplate = require("./EmailTemplate.js");
const connection = require("../src/utils/Redis.js");

async function startWorker() {
  await DataBase();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const worker = new Worker(
    "emailQueue",
    async (job) => {
      const { property } = job.data;

      console.log(`Processing property: ${property.title}`);

      const batchSize = 50;
      let page = 0;

      while (true) {
        const subscribers = await Email.find()
          .skip(page * batchSize)
          .limit(batchSize);

        if (subscribers.length === 0) break;

        for (const user of subscribers) {
          await transporter.sendMail({
            from: `"Real Estate Platform" <${process.env.EMAIL}>`,
            to: user.email,
            subject: "New Property Listed",
            html: PropertyALertTemplate({
              title: property.title,
              category: property.category,
              type: property.type,
              price: property.price,
              url: `${process.env.NEXT_PUBLIC_BASE_URL}/properties/${property.slug}`,
            }),
          });
        }

        console.log(`Batch ${page + 1} sent`);
        page++;
      }

      console.log("All emails sent successfully.");
    },
    {
      connection: connection,
      concurrency: 2, // safe concurrency
    }
  );

  worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed`);
  });

  worker.on("failed", (job, err) => {
    console.error(`Job ${job.id} failed:`, err);
  });

  console.log("✅ Email Worker Started...");
  worker.close();
}

startWorker();
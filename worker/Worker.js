const { Worker } = require("bullmq");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
// import Email from "@/backend/model/subscribeEmailModel";
const redis = require("../src/utils/Redis.js") ;
const Email = require("./EmailSchema.js");
const DataBase = require("./DB.js");
const PropertyALertTemplate = require("./EmailTemplate.js");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

new Worker(
  "emailQueue",
  async job => {
    const { property } = job.data;
    const batchSize = 50;
    let page = 0;

while (true) {
  await DataBase();
  const subscribers = await Email.find()
    .skip(page * batchSize)
    .limit(batchSize);

  if (subscribers.length === 0) break; // no more emails

  await Promise.all(
    subscribers.map(user =>
      transporter.sendMail({
        from: `"Real Estate Platform" <${process.env.EMAIL}>`,
        to: user.email,
        subject: "New Property Listed",
        html: PropertyALertTemplate({title:property.title,category:property.category,type:property.type,price:property.price,url:`${process.env.NEXT_PUBLIC_BASE_URL}/properties/${property.slug}`}),
      })
    )
  );

  console.log(`Batch ${page + 1} sent`);

  page++;
  await new Promise((res) => setTimeout(res, 3000)); // rate limit
}
  },
  { connection: redis }
);

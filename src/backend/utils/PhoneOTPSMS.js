// utils/PhoneOTPSMS.js
export const sendSMS = async ({ phone, message }) => {
  console.log(`Fake SMS to ${phone}: ${message}`);
  // Always return success
   const data ="SMS sent (mock)"
   return data
};

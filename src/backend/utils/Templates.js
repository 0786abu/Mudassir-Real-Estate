
export const OTPTEMPLATE = ({otp,name})=> `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your OTP Code</title>
  <style>
    body {
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
      font-family: 'Arial', sans-serif;
    }

    .wrapper {
      width: 100%;
      padding: 40px 0;
      background-color: #f5f5f5;
    }

    .container {
      max-width: 500px;
      background: #ffffff;
      margin: auto;
      padding: 30px 35px;
      border-radius: 12px;
      box-shadow: 0 4px 25px rgba(0,0,0,0.08);
    }

    h2 {
      text-align: center;
      color: #222;
      margin-bottom: 10px;
      font-weight: 600;
    }

    p {
      color: #555;
      line-height: 1.6;
      font-size: 15px;
    }

    .otp-box {
      margin: 30px auto;
      padding: 15px 0;
      background: #f0f4ff;
      border-radius: 10px;
      text-align: center;
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 6px;
      color: #3b5bdb;
      border: 1px solid #dce3ff;
      width: 60%;
    }

    .footer {
      text-align: center;
      margin-top: 25px;
      color: #888;
      font-size: 13px;
    }
  </style>
</head>

<body>
  <div class="wrapper">
    <div class="container">

      <h2>Your OTP Code</h2>

      <p>Hello ${name},</p>
      <p>
        Use the OTP code below to verify your email.  
        This code is valid for <strong>5 minutes</strong>.
      </p>

      <div class="otp-box">${otp}</div>

      <p>
        If you did not request this code, please ignore this email.
      </p>

      <div class="footer">
        © 2025 Your Company. All Rights Reserved.
      </div>

    </div>
  </div>
</body>
</html>`

export const ResetPasswordTemplate = ({name,link})=>`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Password Reset</title>
  <style>
    body {
      background: #f5f7fa;
      font-family: Arial, Helvetica, sans-serif;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 500px;
      margin: 40px auto;
      background: #ffffff;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }

    h2 {
      color: #111827;
      text-align: center;
      font-weight: 600;
    }

    p {
      color: #4b5563;
      line-height: 1.6;
      font-size: 15px;
    }

    .btn {
      display: inline-block;
      width: 100%;
      margin-top: 20px;
      background: #3b82f6;
      color: white !important;
      text-decoration: none;
      padding: 14px 0;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      text-align: center;
    }

    .footer {
      text-align: center;
      font-size: 13px;
      color: #9ca3af;
      margin-top: 20px;
    }
  </style>
</head>
<body>

  <div class="container">
    <h2>Password Reset Request</h2>

    <p>Hi ${name},</p>

    <p>We received a request to reset your password.  
    Click the button below to safely reset it:</p>

    <a href="${link}" class="btn">Reset Password</a>

    <p>If you did not request this, you can safely ignore this email.</p>

    <div class="footer">
      © 2025 Your Company — All Rights Reserved.
    </div>
  </div>

</body>
</html>
`
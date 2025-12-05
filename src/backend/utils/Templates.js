
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
export const ForGotTemplate = ({name,link})=>`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Password Reset</title>
</head>
<body style="margin:0; padding:0; background:#f5f7fa; font-family:Arial, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background:#f5f7fa; padding:40px 0;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:520px; background:white; border-radius:12px; padding:40px; box-shadow:0 4px 20px rgba(0,0,0,0.05);">
          
          <!-- Logo -->
          <tr>
            <td style="text-align:center;">
              <h2 style="margin:0; font-size:24px; color:#111;">Real Estate Project</h2>
            </td>
          </tr>
           <tr>
            <td style="text-align:center;">
              <h2 style="margin:0; font-size:24px; color:#111;">Hello dear ${name}</h2>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding-top:25px; text-align:center;">
              <h3 style="margin:0; font-size:22px; color:#333; font-weight:600;">Reset Your Password</h3>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding-top:15px; text-align:left; color:#555; font-size:16px; line-height:24px;">
              <p style="margin:0;">
                Hello,
                <br/><br/>
                We received a request to reset your password. Click the button below to set a new password.
              </p>
            </td>
          </tr>

          <!-- Button -->
          <tr>
            <td style="padding:35px 0; text-align:center;">
              <a href="${link}" 
                style="background:#4F46E5; color:white; padding:14px 26px; 
                text-decoration:none; font-size:16px; border-radius:8px; 
                display:inline-block; font-weight:600;">
                Reset Password
              </a>
            </td>
          </tr>

          <!-- Expire info -->
          <tr>
            <td style="text-align:left; color:#777; font-size:14px; line-height:22px;">
              <p style="margin:0;">
                This link will expire in <strong>15 minutes</strong>.  
                If you didn’t request this, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:25px 0;">
              <hr style="border:0; border-top:1px solid #eee;" />
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="text-align:center; color:#999; font-size:13px;">
              © 2025 Your Platform — All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

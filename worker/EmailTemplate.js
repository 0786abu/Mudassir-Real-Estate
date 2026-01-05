const PropertyALertTemplate = ({title,category,type,url,price})=> `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Property Listed</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4; padding:20px;">
    <tr>
      <td align="center">
        
        <!-- Card -->
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background:#ffffff; border-radius:10px; overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="padding:20px; background:#111827; color:#ffffff;">
              <h2 style="margin:0; font-size:20px;">🏡 New Property Listed</h2>
              <p style="margin:5px 0 0; font-size:14px; color:#d1d5db;">
                A new opportunity just for you
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:20px;">
              
              <h3 style="margin:0 0 10px; color:#111827; font-size:18px;">
                ${title}
              </h3>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin:15px 0;">
                <tr>
                  <td style="padding:8px 0; color:#374151; font-size:14px;">
                    <strong>Category:</strong> ${category}
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0; color:#374151; font-size:14px;">
                    <strong>Type:</strong> ${type}
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0; color:#374151; font-size:14px;">
                    <strong>Price:</strong> 
                    <span style="color:#16a34a; font-weight:bold;">
                      ${price}
                    </span>
                  </td>
                </tr>
              </table>

              <p style="font-size:14px; color:#6b7280; line-height:1.6;">
                This property offers excellent location, modern design, and great value.
                Click below to explore full details and images.
              </p>

              <!-- Button -->
              <table cellpadding="0" cellspacing="0" style="margin-top:20px;">
                <tr>
                  <td>
                    <a href="${url}"
                       style="
                         display:inline-block;
                         padding:12px 24px;
                         background:#2563eb;
                         color:#ffffff;
                         text-decoration:none;
                         font-size:14px;
                         border-radius:6px;
                         font-weight:bold;
                       ">
                      View Property
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:15px; background:#f9fafb; text-align:center; font-size:12px; color:#9ca3af;">
              © 2025 Real Estate Platform  
              <br/>
              You are receiving this email because you subscribed to property alerts.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`
module.exports = PropertyALertTemplate
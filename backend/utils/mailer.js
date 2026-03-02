const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const BRAND_NAME = "Azad";
const EVENT_NAME = "Your Launch Ticket Is Here";

// ✅ Use PNG transform (SVG often won’t render in email clients)
const LOGO_URL =
  "https://res.cloudinary.com/dc7bb6868/image/upload/f_png,w_180,q_auto/v1772433347/Azad_dahd8f.svg";

function escapeHtml(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function sendTicketEmail({ to, name, pdfBuffer, ticketCode, pdfUrl }) {
  const from = process.env.MAIL_FROM;
  if (!from) throw new Error("MAIL_FROM is missing");
  if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY is missing");

  const base64Pdf = pdfBuffer.toString("base64");
  const year = new Date().getFullYear();

  const safeName = escapeHtml(name);
  const safeCode = escapeHtml(ticketCode);

  // Theme colors
  const BG = "#050505";
  const CARD = "#0B0B0B";
  const BORDER = "#1F1F1F";
  const TEXT = "#E5E7EB";
  const MUTED = "#9CA3AF";
  const RED = "#E11D2E";
  const WHITE = "#FFFFFF";

  const html = `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <!-- Poppins (supported in some clients; others will fallback gracefully) -->
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
      </style>
    </head>
    <body style="margin:0;padding:0;background:${BG};">
      <!-- Preheader (hidden) -->
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
        Your ${BRAND_NAME} ticket is confirmed. PDF attached.
      </div>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};padding:34px 12px;">
        <tr>
          <td align="center">

            <table role="presentation" width="640" cellpadding="0" cellspacing="0"
              style="width:640px;max-width:640px;background:${CARD};border-radius:18px;overflow:hidden;border:1px solid ${BORDER};box-shadow:0 14px 40px rgba(0,0,0,0.45);">

              <!-- Header -->
              <tr>
                <td style="padding:26px 26px 18px 26px;background:linear-gradient(135deg,#070707 0%,#0B0B0B 55%,#070707 100%);">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td valign="middle" style="width:140px;">
                        <!-- Logo (PNG fallback via Cloudinary transform) -->
                        <img
                          src="${LOGO_URL}"
                          alt="${BRAND_NAME}"
                          width="110"
                          style="display:block;border:0;outline:none;text-decoration:none;height:auto;max-width:110px;"
                        />
                      </td>
                      <td valign="middle" style="padding-left:12px;">
                        <div style="font-family:'Poppins',ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;color:${WHITE};">
                          <div style="font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:${MUTED};">
                            Ticket Confirmation
                          </div>
                          <div style="margin-top:6px;font-size:20px;font-weight:800;line-height:1.25;color:${WHITE};">
                            ${EVENT_NAME}
                          </div>
                          <div style="margin-top:10px;font-size:13px;line-height:1.7;color:${TEXT};">
                            Hi <span style="font-weight:700;color:${WHITE};">${safeName}</span>, your ticket PDF is attached and ready.
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>

                  <!-- Red accent line -->
                  <div style="margin-top:18px;height:2px;background:${RED};border-radius:2px;"></div>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:22px 26px 10px 26px;">
                  <div style="font-family:'Poppins',ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;color:${TEXT};">

                    <!-- Ticket Card -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                      style="border:1px solid ${BORDER};border-radius:16px;background:#0A0A0A;">
                      <tr>
                        <td style="padding:18px 18px 16px 18px;">
                          <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:${MUTED};">
                            Ticket ID
                          </div>

                          <div style="margin-top:10px;font-size:18px;font-weight:800;letter-spacing:0.02em;color:${WHITE};">
                            <span style="display:inline-block;padding:8px 10px;border-radius:12px;background:rgba(225,29,46,0.12);border:1px solid rgba(225,29,46,0.35);">
                              ${safeCode}
                            </span>
                          </div>

                          <div style="margin-top:12px;font-size:13px;line-height:1.7;color:${TEXT};">
                            Keep this email for your records. Present the attached PDF at entry.
                          </div>

                          <div style="margin-top:10px;font-size:12px;line-height:1.7;color:${MUTED};">
                            One ticket per email • Limited slots • Secure confirmation via Stripe
                          </div>
                        </td>
                      </tr>
                    </table>

                    <!-- CTA -->
                    ${
                      pdfUrl
                        ? `
                      <div style="margin-top:18px;">
                        <a href="${pdfUrl}" target="_blank" rel="noreferrer"
                          style="display:inline-block;background:${RED};color:${WHITE};text-decoration:none;padding:12px 16px;border-radius:12px;font-size:14px;font-weight:800;">
                          View Ticket PDF
                        </a>
                      </div>

                      <div style="margin-top:10px;font-size:12px;color:${MUTED};line-height:1.7;">
                        If the button doesn’t work, copy & paste this link:<br/>
                        <span style="word-break:break-all;color:${TEXT};">${pdfUrl}</span>
                      </div>
                    `
                        : `
                      <div style="margin-top:16px;font-size:12px;color:${MUTED};line-height:1.7;">
                        Your ticket PDF is attached to this email.
                      </div>
                    `
                    }

                    <!-- Divider -->
                    <div style="margin:22px 0 0 0;height:1px;background:${BORDER};"></div>

                    <div style="padding:14px 0 0 0;font-size:12px;color:${MUTED};line-height:1.7;">
                      Need help? Reply to this email and our team will assist you.
                    </div>

                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding:14px 26px 22px 26px;">
                  <div style="font-family:'Poppins',ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;font-size:12px;color:${MUTED};line-height:1.7;">
                    © ${year} ${BRAND_NAME}. If you didn’t purchase this ticket, please contact support immediately.
                  </div>
                </td>
              </tr>

            </table>

            <div style="margin-top:14px;font-family:'Poppins',ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;color:${MUTED};font-size:12px;">
              Sent by ${BRAND_NAME}
            </div>

          </td>
        </tr>
      </table>
    </body>
  </html>
  `;

  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject: `${BRAND_NAME} Ticket Confirmation — ${ticketCode}`,
    html,
    attachments: [
      {
        filename: `ticket-${ticketCode}.pdf`,
        content: base64Pdf,
      },
    ],
  });

  if (error) throw new Error(error.message || "Resend send failed");
}

module.exports = { sendTicketEmail };
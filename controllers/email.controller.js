import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

export async function sendTestEmail(recipientEmail) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    logger: true,
    debug: true,
  });

  const logoPath = path.join("..", "client", "public", "img", "str.png");

  let mailOptions = {
    from: process.env.EMAIL,
    to: recipientEmail,
    subject: "Vítejte v Calorics!",
    html: `
      <div style="text-align: center;">
        <img src="cid:caloricsLogo" alt="Calorics Logo" style="max-width: 200px;"/>
        <h1>Vítáme Vás v Calorics!</h1>
        <p>Jsme skvělá aplikace pro sledování kalorií, která vám pomůže dosáhnout vašich cílů v oblasti výživy a fitness.</p>
      </div>
    `,
    attachments: [
      {
        filename: "str.png",
        path: logoPath,
        cid: "caloricsLogo",
      },
    ],
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (err) {
    console.error("Error occurred: " + err.message);
  }
}

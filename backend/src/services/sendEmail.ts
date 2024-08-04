import nodemailer, { Transporter } from "nodemailer";

const sendEmail = async (
  to: string,
  subject: string,
  text: string
): Promise<void> => {
  try {
    const transporter: Transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });


    const mailOptions = {
      from: `"Codemancers Ecommerce👻" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email", error);
  }
};

export default sendEmail;

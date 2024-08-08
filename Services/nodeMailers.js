// // resetPasswordMail.js
// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: process.env.PASSMAIL,
//     pass: process.env.PASSKEY,
//   },
// });

// export const sendPasswordResetEmail = async (user, token) => {
//   try {
//     const info = await transporter.sendMail({
//       from: process.env.PASSMAIL, // sender address
//       to: user.email, // receiver address
//       subject: "Password Reset", // Subject line
//       text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
//             `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
//             `http://localhost:5173/reset-password/${user._id}/${token}\n\n` +
//             `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
//     });

//     console.log("Message sent: %s", info.messageId);
//     return info.messageId;
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw new Error("Failed to send email");
//   }
// };

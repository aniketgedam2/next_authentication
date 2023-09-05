import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType == "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType == "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgetPasswordToken: hashedToken,
        forgetPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "faff367700ccd5",
        pass: "a0caade63a2a57",
      },
    });

    const mailOptions = {
      from: "aniketgedam200@gmail.com",
      to: email,
      subject:
        emailType == "VERIFY" ? "Verify your email" : "Reset your password",
      html:
        emailType == "VERIFY"
          ? `<p>Click <a href="${
              process.env.DOMAIN
            }/verifyemail?token=${hashedToken}">here</a> to ${
              emailType == "VERIFY"
                ? "Verify your email"
                : "Reset your password"
            }</p>`
          : `<p>Click <a href="${process.env.DOMAIN}/newpassword?token=${hashedToken}">here</a> to Reset your password}</p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

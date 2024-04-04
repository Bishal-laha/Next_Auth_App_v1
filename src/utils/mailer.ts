import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"
import User from "@/models/userModel";



export const sendMail = async ({ email, emailType, userID }: any) => {
    try {

        const hashedToken = await bcryptjs.hash(userID.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userID, { $set: { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 600000 } });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userID, { $set: { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 600000 } });
        }


        const transport = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: Number(process.env.MAILTRAP_PORT),
            auth: {
                user: process.env.MAILTRAP_AUTH_USER,
                pass: process.env.MAILTRAP_AUTH_PASS,
            }
        });

        const mailOptions = {
            from: " Bishal <bishal@gmail.com>",
            to: email,
            subject: emailType === "VERIFY" ? "Verify Your Mail" : "Reset Your Password",
            text: "Hello world?",
            html: `<p>Click <a href="${process.env.DOMAIN}/verify?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verify?token=${hashedToken}
            </p>`,
        };

        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;

    } catch (error: any) {
        console.log("SENDING MAIL ERROR : " + error.message);
        throw new Error(error);
    }
}
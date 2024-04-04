import { connectDB } from "@/DbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/utils/mailer";


connectDB();

export const POST = async (req: NextRequest) => {
    try {
        const reqBody = await req.json();

        const { username, email, password } = reqBody;

        const user = await User.findOne({ email });

        if (user)
            return NextResponse.json({ error: "USER ALREADY EXISTS" }, { status: 400 });

        const salt = await bcryptjs.genSalt(10);

        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({ username, email, password: hashedPassword });

        const savedUser = await newUser.save();

        await sendMail({ email, emailType: "VERIFY", userID: savedUser._id });

        return NextResponse.json({ message: "USER REGISTERED SUCCESSFULLY", success: true, savedUser }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
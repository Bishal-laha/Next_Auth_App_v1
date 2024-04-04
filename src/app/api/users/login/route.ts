import { connectDB } from "@/DbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


connectDB();

export const POST = async (request: NextRequest) => {
    try {
        const { email, password } = await request.json();

        const user = await User.findOne({ email });

        if (!user)
            return NextResponse.json({ error: "USER DOESN'T EXIST" });

        const result = await bcryptjs.compare(password, user.password);

        if (!result)
            return NextResponse.json({ error: "INVALID PASSWORD" }, { status: 400 });

        const tokenData = {
            id: user._id,
            username: user.username
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "2h" });

        const response = NextResponse.json({ message: "LOGGED IN SUCCESSFULLY", success: true }, { status: 200 });

        response.cookies.set("token", token, { httpOnly: true });

        return response;


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
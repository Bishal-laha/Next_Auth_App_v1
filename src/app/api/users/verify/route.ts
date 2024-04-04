import User from "@/models/userModel";
import { connectDB } from "@/DbConfig/dbConfig";

import { NextRequest, NextResponse } from "next/server";

connectDB();

export const POST = async (request: NextRequest) => {

    try {
        const { token } = await request.json();

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });

        if (!user)
            return NextResponse.json({ error: "INVALID TOKEN" }, { status: 400 });

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({ message: "VERIFIED SUCCESSFULLY", success: true }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
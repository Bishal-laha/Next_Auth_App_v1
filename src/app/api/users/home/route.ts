import { connectDB } from "@/DbConfig/dbConfig";
import User from "@/models/userModel";
import { getIdFromToken } from "@/utils/getIdFromJwtToken";
import { NextRequest, NextResponse } from "next/server";



connectDB();


export const GET = async (request: NextRequest) => {
    const userId = await getIdFromToken(request);
    const user = await User.findById(userId).select("-password");
    // const user = await User.findOne({_id:userId}).select("-password");
    return NextResponse.json({ message: "USER FOUND", data: user }, { status: 200 });
}
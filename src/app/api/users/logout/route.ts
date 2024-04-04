import { connectDB } from "@/DbConfig/dbConfig";
import { NextResponse } from "next/server";



connectDB();

export const GET = () => {

    try {

        const response = NextResponse.json({ message: "LOGOUT SUCCESSFULLY", success: true });
        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
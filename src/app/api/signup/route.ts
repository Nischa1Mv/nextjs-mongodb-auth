import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/User";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const { email, password } = requestBody;
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json(
                { error: "User already exists with that email" },
                { status: 400 }
            );
        }
        const encrptedPassword = await bcryptjs.hash(password, 10);
        const newUser = new User ({
            email,
            password: encrptedPassword
        })
        await newUser.save();
        return NextResponse.json({
            message: "User created successfully",
            success: true
        });
        

    } catch (error: any) {
        console.error("Error in POST handler:", error);
        return NextResponse.json(
            { error: error.message || "An unexpected error occurred" },
            { status: 500 }
        );


    }

}
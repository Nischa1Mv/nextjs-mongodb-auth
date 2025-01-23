import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/User";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import {connectDB }from "../../../../server/server";
import dotenv from "dotenv";
dotenv.config();
connectDB();

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

    // Fetch the user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Compare passwords
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Ensure JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    // Create a JWT token
    const tokenPayload = { id: user._id };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY || "1d",
    });

    // Send success response with cookie
    const response = NextResponse.json({
      message: "User logged in successfully",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure in production
      maxAge: 24 * 60 * 60, // 1 day
    });

    return response;
  } catch (error: any) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

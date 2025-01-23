import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/User";
import bcryptjs from "bcryptjs";
import { connectDB } from "../../../../server/server";
import validator from "validator";
connectDB();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { email, password } = requestBody;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Validate email
    if (!validator.isEmail(email)) {
        return NextResponse.json(
          { error: "Invalid email address" },
          { status: 400 }
        );
      }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists with that email" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // Return success response
    return NextResponse.json({
      message: "User created successfully",
      success: true,
    });
  } catch (error: any) {
    console.log("Error in POST handler:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

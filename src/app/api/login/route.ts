import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/User";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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
        { error: "User not found with that Email" },
        { status: 404 }
      );
    }

    // Compare passwords
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid Password" },
        { status: 401 }
      );
    }

    // Create a JWT token
    const tokenPayload = { id: user._id };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    // send success response
    const response = NextResponse.json({
        message: "User logged in successfully",
        success: true,
      });
  
      // token is sent in the cookies
      //httpsOnly is so that the token is not accessible by user or js but only by the server
      response.cookies.set("token", token, { httpOnly: true });
      return response;
    
  } catch (error:any) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

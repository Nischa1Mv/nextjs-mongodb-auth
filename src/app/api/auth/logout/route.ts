import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "User is not logged in", success: false },
        { status: 400 }
      );
    }

    // Clear the token cookie
    const response = NextResponse.json({
      message: "User logged out successfully",
      success: true,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict", 
      path: "/", 
      expires: new Date(0), 
    });

    return response;
  } catch (error: any) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred", success: false },
      { status: 500 }
    );
  }
}

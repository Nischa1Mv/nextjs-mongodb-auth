import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try {
        const token = request.cookies.get("token");
        if (!token) {
            return NextResponse.json(
                { error: "User is not logged in" },
                { status: 400 }
            );
        }

        const response = NextResponse.json({
            message: "User logged out successfully",
            success: true,
        });
        response.cookies.set("token", "", { httpOnly: true });
        return response;
        
        
    } catch (error:any) {
        console.error("Error in POST handler:", error);
        return NextResponse.json(
            { error: error.message || "An unexpected error occurred" },
            { status: 500 }
        );
        
    }
    
}
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export const middleware = async (request:NextRequest) => {
    const bearerToken = request.headers.get("Authorization") as string
    if (!bearerToken) {
      return new NextResponse(JSON.stringify({
         errorMsg: "Bearer token not define"
      }),{status: 401})
    }
    const token = bearerToken.split(" ")[1];
    if (!token) {
      return new NextResponse(JSON.stringify({
         errorMsg: "Token not define"
     }),{status: 401})
    }
    const signature = new TextEncoder().encode(process.env.JWT_SECRECT);
    
    try {
     await jose.jwtVerify(token, signature);
    } catch (error) {
      return new NextResponse(JSON.stringify({
        errorMsg: "Unauthorized request"
     }),{status: 401})
    }
};

export const config = {
    matcher: ["/api/user/me"]
};
